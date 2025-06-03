import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UserProfile, Project } from '../../types/dashboard';
import styles from '../../app/dashboard/dashboard.module.css';

interface PasswordManagerProps {
  userProfile: UserProfile | null;
}

const PasswordManager: React.FC<PasswordManagerProps> = ({ userProfile }) => {
  const [accessibleProjects, setAccessibleProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile?.uid) {
      fetchAccessibleProjects();
    }
  }, [userProfile]);

  const fetchAccessibleProjects = async () => {
    if (!userProfile?.uid) return;
    
    try {
      setLoading(true);
      
      // Fetch projects where user is creator or invited member
      const projectsRef = collection(db, 'projects');
      
      // Get projects created by user
      const createdQuery = query(projectsRef, where('createdBy', '==', userProfile.uid));
      const createdSnapshot = await getDocs(createdQuery);
      
      // Get projects where user is invited (this would need more complex querying in real implementation)
      const invitedQuery = query(projectsRef, where('invitedMembers', 'array-contains', userProfile.uid));
      const invitedSnapshot = await getDocs(invitedQuery);
      
      const projects: Project[] = [
        ...createdSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          role: 'owner' 
        } as Project & { role: string })),
        ...invitedSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          role: 'member' 
        } as Project & { role: string }))
      ];
      
      // Filter out projects without passwords or where user doesn't have access
      const projectsWithPasswords = projects.filter(project => 
        project.passwords && project.passwords.length > 0
      );
      
      setAccessibleProjects(projectsWithPasswords);
    } catch (error) {
      console.error('Error fetching accessible projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (projectId: string, passwordId: string) => {
    const key = `${projectId}-${passwordId}`;
    setShowPasswords(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${type} copied to clipboard!`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy to clipboard');
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return { level: 'weak', color: '#dc2626', text: 'Weak' };
    if (strength <= 3) return { level: 'medium', color: '#f59e0b', text: 'Medium' };
    return { level: 'strong', color: '#10b981', text: 'Strong' };
  };

  if (!userProfile || (userProfile.role !== 'admin' && userProfile.role !== 'leader')) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="#dc2626" style={{ margin: '0 auto 1rem' }}>
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Access Restricted</h2>
        <p style={{ color: '#6b7280' }}>
          Password Manager is only available to Admins and Project Leaders.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div className={styles.loadingSpinner} style={{ margin: '0 auto 1rem' }}></div>
        <p>Loading password vault...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: '#004AAD', 
          margin: '0 0 1rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🔐 Password Manager
          <span style={{ 
            background: '#dc2626',
            color: 'white',
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontWeight: '600'
          }}>
            {userProfile.role.toUpperCase()} ONLY
          </span>
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Manage passwords and credentials for your accessible projects. Only admins and project leaders can view this section.
        </p>
      </div>

      {/* Project Selection */}
      <div className={styles.profileSection} style={{ marginBottom: '2rem' }}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          Select Project
        </h3>
        
        {accessibleProjects.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#6b7280'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 auto 1rem' }}>
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <h4>No Projects with Passwords</h4>
            <p>Create projects with password storage to access them here.</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {accessibleProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{
                  padding: '1.5rem',
                  background: selectedProject?.id === project.id ? '#eff6ff' : '#f8fafc',
                  border: selectedProject?.id === project.id ? '2px solid #004AAD' : '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'start',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{ 
                    color: '#004AAD', 
                    margin: 0,
                    fontSize: '1.125rem',
                    fontWeight: '600'
                  }}>
                    {project.title}
                  </h4>
                  <span style={{
                    background: (project as any).role === 'owner' ? '#10b981' : '#6b7280',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    {(project as any).role || 'member'}
                  </span>
                </div>
                <p style={{ 
                  color: '#6b7280', 
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem'
                }}>
                  {project.description || 'No description'}
                </p>
                <div style={{ 
                  color: '#004AAD', 
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {project.passwords?.length || 0} passwords stored
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Password Vault */}
      {selectedProject && (
        <div className={styles.profileSection}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
              </svg>
              {selectedProject.title} - Password Vault
            </h3>
            <button 
              onClick={() => setSelectedProject(null)}
              className={styles.btnSecondary}
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              Back to Projects
            </button>
          </div>

          {selectedProject.passwords && selectedProject.passwords.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedProject.passwords.map((passwordItem, index) => {
                const showKey = `${selectedProject.id}-${index}`;
                const isVisible = showPasswords[showKey];
                const strength = getPasswordStrength(passwordItem.password);
                
                return (
                  <div 
                    key={index}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '1.5rem'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h4 style={{ 
                          color: '#004AAD', 
                          margin: '0 0 0.25rem 0',
                          fontSize: '1.125rem',
                          fontWeight: '600'
                        }}>
                          {passwordItem.title || `Password ${index + 1}`}
                        </h4>
                        {passwordItem.description && (
                          <p style={{ 
                            color: '#6b7280', 
                            margin: 0,
                            fontSize: '0.875rem'
                          }}>
                            {passwordItem.description}
                          </p>
                        )}
                      </div>
                      <div style={{
                        background: strength.color,
                        color: 'white',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontWeight: '600'
                      }}>
                        {strength.text}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {/* Username/Email */}
                      {passwordItem.username && (
                        <div>
                          <label style={{ 
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                          }}>
                            Username/Email
                          </label>
                          <div style={{ 
                            display: 'flex', 
                            gap: '0.5rem',
                            alignItems: 'center'
                          }}>
                            <input
                              type="text"
                              value={passwordItem.username}
                              readOnly
                              className={styles.formInput}
                              style={{ flex: 1 }}
                            />
                            <button
                              onClick={() => copyToClipboard(passwordItem.username, 'Username')}
                              className={styles.btnSecondary}
                              style={{ 
                                fontSize: '0.875rem', 
                                padding: '0.5rem',
                                minWidth: 'auto'
                              }}
                              title="Copy username"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Password */}
                      <div>
                        <label style={{ 
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#374151',
                          marginBottom: '0.5rem'
                        }}>
                          Password
                        </label>
                        <div style={{ 
                          display: 'flex', 
                          gap: '0.5rem',
                          alignItems: 'center'
                        }}>
                          <input
                            type={isVisible ? 'text' : 'password'}
                            value={passwordItem.password}
                            readOnly
                            className={styles.formInput}
                            style={{ flex: 1, fontFamily: 'monospace' }}
                          />
                          <button
                            onClick={() => togglePasswordVisibility(selectedProject.id || '', index.toString())}
                            className={styles.btnSecondary}
                            style={{ 
                              fontSize: '0.875rem', 
                              padding: '0.5rem',
                              minWidth: 'auto'
                            }}
                            title={isVisible ? 'Hide password' : 'Show password'}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              {isVisible ? (
                                <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.37,7 12,7Z"/>
                              ) : (
                                <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                              )}
                            </svg>
                          </button>
                          <button
                            onClick={() => copyToClipboard(passwordItem.password, 'Password')}
                            className={styles.btnSecondary}
                            style={{ 
                              fontSize: '0.875rem', 
                              padding: '0.5rem',
                              minWidth: 'auto'
                            }}
                            title="Copy password"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* URL */}
                      {passwordItem.url && (
                        <div>
                          <label style={{ 
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                          }}>
                            URL
                          </label>
                          <div style={{ 
                            display: 'flex', 
                            gap: '0.5rem',
                            alignItems: 'center'
                          }}>
                            <input
                              type="text"
                              value={passwordItem.url}
                              readOnly
                              className={styles.formInput}
                              style={{ flex: 1 }}
                            />
                            <a
                              href={passwordItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.btnSecondary}
                              style={{ 
                                fontSize: '0.875rem', 
                                padding: '0.5rem',
                                minWidth: 'auto',
                                textDecoration: 'none'
                              }}
                              title="Open URL"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {passwordItem.notes && (
                        <div>
                          <label style={{ 
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                          }}>
                            Notes
                          </label>
                          <textarea
                            value={passwordItem.notes}
                            readOnly
                            className={styles.formTextarea}
                            rows={2}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#6b7280'
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 auto 1rem' }}>
                <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
              </svg>
              <h4>No Passwords Stored</h4>
              <p>This project doesn't have any passwords stored yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div style={{ 
        background: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '12px',
        padding: '1rem',
        marginTop: '2rem',
        display: 'flex',
        alignItems: 'start',
        gap: '0.75rem'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" style={{ flexShrink: 0, marginTop: '0.125rem' }}>
          <path d="M12,2L13.09,8.26L22,9L17,14L18.18,21L12,17.77L5.82,21L7,14L2,9L10.91,8.26L12,2Z"/>
        </svg>
        <div>
          <h4 style={{ color: '#92400e', margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '600' }}>
            Security Notice
          </h4>
          <p style={{ color: '#92400e', margin: 0, fontSize: '0.875rem' }}>
            All passwords are encrypted and only accessible to authorized project members. 
            Always use strong, unique passwords and enable 2FA when available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;