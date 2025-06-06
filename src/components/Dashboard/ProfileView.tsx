import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../app/dashboard/dashboard.module.css';

interface ProfileViewProps {
  userProfile: any;
  updateProfile: (data: any) => void;
  currentUser: any;
}

const ProfileView: React.FC<ProfileViewProps> = ({ 
  userProfile, 
  updateProfile, 
  currentUser 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    major: userProfile?.major || '',
    graduationYear: userProfile?.graduationYear || '',
    bio: userProfile?.bio || '',
    githubUsername: userProfile?.githubUsername || '',
    linkedinUrl: userProfile?.linkedinUrl || '',
    skills: userProfile?.skills || []
  });
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const connectGitHub = async () => {
    if (!editData.githubUsername) {
      alert('Please add your GitHub username first!');
      return;
    }
    
    try {
      // Simulate GitHub API call to get commit count
      const response = await fetch(`https://api.github.com/users/${editData.githubUsername}/repos`);
      if (response.ok) {
        const repos = await response.json();
        // This is a simplified commit count - in reality you'd need to fetch commits for each repo
        const estimatedCommits = repos.length * 10; // Rough estimation
        
        updateProfile({
          ...editData,
          commits: estimatedCommits,
          githubConnected: true
        });
        
        alert(`GitHub connected! Found approximately ${estimatedCommits} commits.`);
      }
    } catch (error) {
      console.error('Error connecting to GitHub:', error);
      alert('Error connecting to GitHub. Please check your username.');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return '#dc2626';
      case 'leader':
        return '#f59e0b';
      case 'member':
        return '#004AAD';
      default:
        return '#6b7280';
    }
  };

  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.profileImageContainer}>
          <Image
            src={userProfile.profileImage || '/profile.png'}
            alt="Profile"
            width={150}
            height={150}
            className={styles.profileImage}
          />
          <button className={styles.profileImageUpload} title="Upload Photo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </button>
        </div>
        
        <div className={styles.profileInfo}>
          {isEditing ? (
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={editData.firstName}
                  onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={editData.lastName}
                  onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                  className={styles.formInput}
                />
              </div>
            </div>
          ) : (
            <h1 className={styles.profileName}>
              {userProfile.firstName} {userProfile.lastName}
            </h1>
          )}
          
          <span 
            className={styles.profileRole}
            style={{ backgroundColor: getRoleColor(userProfile.role) }}
          >
            {userProfile.role?.toUpperCase() || 'MEMBER'}
          </span>
          
          <div className={styles.profileMeta}>
            <div className={styles.profileMetaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>{userProfile.major || 'Computer Science'}</span>
            </div>
            <div className={styles.profileMetaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H3.5C2.67 2 2 2.67 2 3.5v17C2 21.33 2.67 22 3.5 22h17c.83 0 1.5-.67 1.5-1.5v-17C22 2.67 21.33 2 20.5 2z"/>
              </svg>
              <span>Class of {userProfile.graduationYear || '2025'}</span>
            </div>
            <div className={styles.profileMetaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
              <span>{userProfile.commits || 0} Commits</span>
            </div>
          </div>
          
          {isEditing ? (
            <textarea
              placeholder="Tell us about yourself..."
              value={editData.bio}
              onChange={(e) => setEditData({...editData, bio: e.target.value})}
              className={styles.formTextarea}
              rows={3}
            />
          ) : (
            <p className={styles.profileBio}>
              {userProfile.bio || 'No bio available. Click edit to add one!'}
            </p>
          )}
          
          <div className={styles.profileActions}>
            {isEditing ? (
              <>
                <button onClick={handleSave} className={styles.btnPrimary}>
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className={styles.btnSecondary}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className={styles.btnPrimary}
                >
                  Edit Profile
                </button>
                <button 
                  onClick={connectGitHub}
                  className={styles.btnSecondary}
                  disabled={!userProfile.githubUsername}
                >
                  Connect GitHub
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content Grid */}
      <div className={styles.profileContent}>
        {/* Skills Section */}
        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Skills
          </h3>
          
          {isEditing && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className={styles.formInput}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button onClick={addSkill} className={styles.btnPrimary}>
                  Add
                </button>
              </div>
            </div>
          )}
          
          <div className={styles.skillsGrid}>
            {(isEditing ? editData.skills : userProfile.skills)?.map((skill, index) => (
              <span key={index} className={styles.skillTag}>
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    style={{ 
                      marginLeft: '0.5rem', 
                      background: 'none', 
                      border: 'none', 
                      color: 'white', 
                      cursor: 'pointer' 
                    }}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
            {(!userProfile.skills || userProfile.skills.length === 0) && !isEditing && (
              <p>No skills added yet.</p>
            )}
          </div>
        </div>

        {/* Courses Section */}
        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5,3H7V9H5V3M11,3H13V7H11V3M15,3H17V5H15V3M3,5H5V9H3V5M8,15H10V19H8V15M12,15H14V19H12V15M16,15H18V19H16V15M5,10H19A1,1 0 0,1 20,11V21A1,1 0 0,1 19,22H5A1,1 0 0,1 4,21V11A1,1 0 0,1 5,10Z"/>
            </svg>
            Courses Completed
          </h3>
          
          <div className={styles.coursesList}>
            {userProfile.courses?.map((course, index) => (
              <div key={index} className={styles.courseItem}>
                <span className={styles.courseCode}>{course.code}</span>
                <span className={styles.courseTitle}>{course.title}</span>
              </div>
            ))}
            {(!userProfile.courses || userProfile.courses.length === 0) && (
              <p>No courses added yet. Use the Transcript Parser to add courses!</p>
            )}
          </div>
        </div>

        {/* GitHub & Links Section */}
        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59,13.41C11,13.8 11,14.4 10.59,14.81C10.2,15.2 9.6,15.2 9.19,14.81L7.78,13.4L6.37,14.81C5.96,15.2 5.36,15.2 4.95,14.81C4.54,14.4 4.54,13.8 4.95,13.41L6.36,12L4.95,10.59C4.54,10.2 4.54,9.6 4.95,9.19C5.36,8.78 5.96,8.78 6.37,9.19L7.78,10.6L9.19,9.19C9.6,8.78 10.2,8.78 10.59,9.19C11,9.6 11,10.2 10.59,10.59L9.18,12L10.59,13.41M19.05,13.41L20.46,12L19.05,10.59C18.64,10.2 18.64,9.6 19.05,9.19C19.46,8.78 20.06,8.78 20.47,9.19L21.88,10.6L23.29,9.19C23.7,8.78 24.3,8.78 24.71,9.19C25.12,9.6 25.12,10.2 24.71,10.59L23.3,12L24.71,13.41C25.12,13.8 25.12,14.4 24.71,14.81C24.3,15.2 23.7,15.2 23.29,14.81L21.88,13.4L20.47,14.81C20.06,15.2 19.46,15.2 19.05,14.81C18.64,14.4 18.64,13.8 19.05,13.41M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
            </svg>
            Links & Connections
          </h3>
          
          {isEditing ? (
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>GitHub Username</label>
                <input
                  type="text"
                  placeholder="github-username"
                  value={editData.githubUsername}
                  onChange={(e) => setEditData({...editData, githubUsername: e.target.value})}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={editData.linkedinUrl}
                  onChange={(e) => setEditData({...editData, linkedinUrl: e.target.value})}
                  className={styles.formInput}
                />
              </div>
            </div>
          ) : (
            <div>
              {userProfile.githubUsername && (
                <div className={styles.profileMetaItem} style={{ marginBottom: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
                  </svg>
                  <a 
                    href={`https://github.com/${userProfile.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#004AAD', textDecoration: 'none' }}
                  >
                    @{userProfile.githubUsername}
                  </a>
                </div>
              )}
              
              {userProfile.linkedinUrl && (
                <div className={styles.profileMetaItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/>
                  </svg>
                  <a 
                    href={userProfile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#004AAD', textDecoration: 'none' }}
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
              
              {!userProfile.githubUsername && !userProfile.linkedinUrl && (
                <p>No links added yet. Edit your profile to add social links!</p>
              )}
            </div>
          )}
        </div>

        {/* Recent Activity Section */}
        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
            </svg>
            Recent Activity
          </h3>
          
          <div>
            <div className={styles.profileMetaItem} style={{ marginBottom: '0.5rem' }}>
              <span>Joined ACM on {new Date(userProfile.joinDate).toLocaleDateString()}</span>
            </div>
            {userProfile.githubConnected && (
              <div className={styles.profileMetaItem} style={{ marginBottom: '0.5rem' }}>
                <span>GitHub connected - {userProfile.commits} total commits</span>
              </div>
            )}
            {userProfile.courses && userProfile.courses.length > 0 && (
              <div className={styles.profileMetaItem}>
                <span>Completed {userProfile.courses.length} courses</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;