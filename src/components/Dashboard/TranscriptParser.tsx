import React, { useState } from 'react';
import { UserProfile, Course } from '../../types/dashboard';
import styles from '../../app/dashboard/dashboard.module.css';

interface TranscriptParserProps {
  userProfile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const TranscriptParser: React.FC<TranscriptParserProps> = ({ 
  userProfile, 
  updateProfile 
}) => {
  const [transcriptText, setTranscriptText] = useState('');
  const [parsedCourses, setParsedCourses] = useState<Course[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const parseTranscript = () => {
    setIsProcessing(true);
    
    try {
      // Simulate processing delay
      setTimeout(() => {
        const courses = extractCoursesFromCBUTranscript(transcriptText);
        setParsedCourses(courses);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Error parsing transcript:', error);
      setIsProcessing(false);
    }
  };

  const extractCoursesFromCBUTranscript = (text: string): Course[] => {
    const courses: Course[] = [];
    const lines = text.split('\n');
    
    let currentSemester = '';
    let currentYear = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines and headers
      if (!line || line.length < 10) continue;
      
      // Detect semester and year (e.g., "2023 Fall", "2024 Spring")
      const semesterMatch = line.match(/^(\d{4})\s+(Fall|Spring|Summer|Winter)/i);
      if (semesterMatch) {
        currentYear = semesterMatch[1];
        currentSemester = semesterMatch[2];
        continue;
      }
      
      // Parse course lines - CBU format: CODE-SECTION	Title	Grade	Repeat	Units	Notes
      // Example: EGR101-D	Enginrg from a Christian Wrldvw	A	N	3.00
      const courseMatch = line.match(/^([A-Z]{2,4}\d{3,4})-([A-Z0-9]+)\s+(.+?)\s+([A-F][+-]?|IP|CP|P|W)\s+([YN])\s+(\d+\.\d+)(?:\s+(.*))?$/);
      
      if (courseMatch) {
        const [, coursePrefix, section, title] = courseMatch;
        const courseCode = coursePrefix; // Just the base course code without section
        
        // Clean up the title (remove extra whitespace)
        const cleanTitle = title.replace(/\s+/g, ' ').trim();
        
        // Skip certain types of courses
        if (cleanTitle.toLowerCase().includes('chapel convocation')) {
          continue;
        }
        
        courses.push({
          code: courseCode,
          title: cleanTitle,
          semester: currentSemester || 'Unknown',
          year: currentYear || 'Unknown'
        });
      }
    }
    
    // Remove duplicates based on course code
    const uniqueCourses = courses.filter((course, index, self) => 
      index === self.findIndex(c => c.code === course.code)
    );
    
    return uniqueCourses;
  };

  const saveCourses = () => {
    if (!userProfile) return;
    
    const existingCourses = userProfile.courses || [];
    const newCourses = parsedCourses.filter(course => 
      !existingCourses.some(existing => existing.code === course.code)
    );
    
    const updatedCourses = [...existingCourses, ...newCourses];
    
    updateProfile({ courses: updatedCourses });
    setParsedCourses([]);
    setTranscriptText('');
    
    alert(`Added ${newCourses.length} new courses to your profile!`);
  };

  const removeCourse = (courseCode: string) => {
    setParsedCourses(prev => prev.filter(course => course.code !== courseCode));
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: '#004AAD', 
          margin: '0 0 1rem 0' 
        }}>
          📚 CBU Transcript Parser
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Import your courses from your CBU unofficial transcript to showcase your academic progress!
        </p>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div className={styles.profileSection} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"/>
              </svg>
              How to Use with CBU Transcript
            </h3>
            <button 
              onClick={() => setShowInstructions(false)}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '1.5rem', 
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ 
                background: '#004AAD', 
                color: 'white', 
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                1
              </div>
              <div>
                <strong>Access Your CBU Unofficial Transcript</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280' }}>
                  Log into InsideCBU → Academics → Transcript Request → View Unofficial Transcript
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ 
                background: '#004AAD', 
                color: 'white', 
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                2
              </div>
              <div>
                <strong>Select All Transcript Text</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280' }}>
                  Press Ctrl+A (Windows) or Cmd+A (Mac) to select all the transcript content
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ 
                background: '#004AAD', 
                color: 'white', 
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                3
              </div>
              <div>
                <strong>Copy and Paste Here</strong>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280' }}>
                  Copy the text (Ctrl+C or Cmd+C) and paste it into the text area below
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ 
            background: '#e0f2fe',
            border: '1px solid #0288d1',
            borderRadius: '8px',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <h4 style={{ color: '#01579b', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
              💡 CBU-Specific Features
            </h4>
            <ul style={{ color: '#01579b', margin: 0, paddingLeft: '1.5rem' }}>
              <li>Extracts course codes (EGR101, CST100, MAT245, etc.)</li>
              <li>Captures full course titles</li>
              <li>Automatically detects semester and year</li>
              <li>Filters out Chapel Convocation courses</li>
            </ul>
          </div>
        </div>
      )}

      {/* Text Input Area */}
      <div className={styles.profileSection} style={{ marginBottom: '2rem' }}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          Paste Your CBU Transcript
        </h3>
        
        <textarea
          value={transcriptText}
          onChange={(e) => setTranscriptText(e.target.value)}
          placeholder="Paste your CBU unofficial transcript text here..."
          className={styles.formTextarea}
          rows={12}
          style={{ 
            fontFamily: 'monospace',
            fontSize: '0.875rem'
          }}
        />
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginTop: '1rem',
          alignItems: 'center'
        }}>
          <button 
            onClick={parseTranscript}
            disabled={!transcriptText.trim() || isProcessing}
            className={styles.btnPrimary}
            style={{ opacity: (!transcriptText.trim() || isProcessing) ? 0.6 : 1 }}
          >
            {isProcessing ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.loadingSpinner}>
                  <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                </svg>
                Processing CBU Transcript...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                Parse CBU Courses
              </>
            )}
          </button>
          
          {transcriptText && (
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {transcriptText.length.toLocaleString()} characters
            </span>
          )}
        </div>
      </div>

      {/* Parsed Results */}
      {parsedCourses.length > 0 && (
        <div className={styles.profileSection} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
              </svg>
              Found {parsedCourses.length} CBU Courses
            </h3>
            <button 
              onClick={saveCourses}
              className={styles.btnPrimary}
            >
              Save to Profile
            </button>
          </div>
          
          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'auto',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            {parsedCourses.map((course, index) => (
              <div 
                key={index} 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderBottom: index < parsedCourses.length - 1 ? '1px solid #e5e7eb' : 'none',
                  background: index % 2 === 0 ? '#f9fafb' : 'white'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: '600', 
                    color: '#004AAD',
                    marginBottom: '0.25rem'
                  }}>
                    {course.code}
                  </div>
                  <div style={{ 
                    color: '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    {course.title}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>
                    {course.semester} {course.year}
                  </div>
                </div>
                <button
                  onClick={() => removeCourse(course.code)}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Remove course"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Courses Display */}
      {userProfile?.courses && userProfile.courses.length > 0 && (
        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5,3H7V9H5V3M11,3H13V7H11V3M15,3H17V5H15V3M3,5H5V9H3V5M8,15H10V19H8V15M12,15H14V19H12V15M16,15H18V19H16V15M5,10H19A1,1 0 0,1 20,11V21A1,1 0 0,1 19,22H5A1,1 0 0,1 4,21V11A1,1 0 0,1 5,10Z"/>
            </svg>
            Your Current Courses ({userProfile.courses.length})
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '0.5rem',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {userProfile.courses.map((course, index) => (
              <div 
                key={index}
                className={styles.courseItem}
              >
                <span className={styles.courseCode}>{course.code}</span>
                <span className={styles.courseTitle}>{course.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CBU Format Examples */}
      <div className={styles.profileSection} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
          </svg>
          CBU Transcript Format
        </h3>
        
        <div style={{ 
          background: '#f8fafc',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          color: '#374151'
        }}>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Expected CBU course format:</div>
          <div>EGR101-D → EGR101 | Engineering from a Christian Worldview</div>
          <div>MAT245-B → MAT245 | Analytical Geometry and Calculus I</div>
          <div>CST100-KE → CST100 | Overview of the Bible</div>
          <div>CSC312-A → CSC312 | Algorithms</div>
          <div style={{ marginTop: '0.5rem', fontStyle: 'italic', color: '#6b7280' }}>
            Parser extracts: Course Code + Course Title only
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptParser;