import React, { useState } from 'react';
import styles from '../../app/dashboard/dashboard.module.css';

interface SettingsViewProps {
  userProfile: any;
  updateProfile: (data: any) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ 
  userProfile, 
  updateProfile, 
  darkMode, 
  toggleDarkMode 
}) => {
  const [notifications, setNotifications] = useState({
    emailUpdates: userProfile?.settings?.emailUpdates ?? true,
    projectInvites: userProfile?.settings?.projectInvites ?? true,
    weeklyDigest: userProfile?.settings?.weeklyDigest ?? false,
    commitReminders: userProfile?.settings?.commitReminders ?? true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: userProfile?.settings?.profileVisible ?? true,
    showEmail: userProfile?.settings?.showEmail ?? false,
    showCommits: userProfile?.settings?.showCommits ?? true,
    showCourses: userProfile?.settings?.showCourses ?? true
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    const newNotifications = { ...notifications, [key]: value };
    setNotifications(newNotifications);
    updateProfile({ 
      settings: { 
        ...userProfile?.settings, 
        ...newNotifications,
        ...privacy
      } 
    });
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    const newPrivacy = { ...privacy, [key]: value };
    setPrivacy(newPrivacy);
    updateProfile({ 
      settings: { 
        ...userProfile?.settings, 
        ...notifications,
        ...newPrivacy
      } 
    });
  };

  const exportData = () => {
    const exportData = {
      profile: userProfile,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `acm-profile-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE MY ACCOUNT') {
      // This would trigger account deletion process
      alert('Account deletion would be processed. This is a demo - no actual deletion performed.');
      setShowDeleteDialog(false);
      setDeleteConfirmation('');
    } else {
      alert('Please type exactly "DELETE MY ACCOUNT" to confirm.');
    }
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
          ⚙️ Settings
        </h2>
        <p style={{ color: '#6b7280' }}>
          Manage your account preferences and privacy settings.
        </p>
      </div>

      {/* Appearance Settings */}
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z"/>
          </svg>
          Appearance
        </h3>
        
        <div className={styles.toggleGroup}>
          <div>
            <strong>Dark Mode</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Switch between light and dark themes
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      {/* Notification Settings */}
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
          </svg>
          Notifications
        </h3>
        
        <div className={styles.toggleGroup}>
          <div>
            <strong>Email Updates</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Receive important updates via email
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={notifications.emailUpdates}
              onChange={(e) => handleNotificationChange('emailUpdates', e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleGroup}>
          <div>
            <strong>Project Invitations</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Get notified when invited to projects
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={notifications.projectInvites}
              onChange={(e) => handleNotificationChange('projectInvites', e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleGroup}>
          <div>
            <strong>Weekly Digest</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Receive weekly summary of ACM activities
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={notifications.weeklyDigest}
              onChange={(e) => handleNotificationChange('weeklyDigest', e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleGroup}>
          <div>
            <strong>Commit Reminders</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Gentle reminders to keep your coding streak alive
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={notifications.commitReminders}
              onChange={(e) => handleNotificationChange('commitReminders', e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
          </svg>
          Privacy
        </h3>

        <div className={styles.toggleGroup}>
          <div>
            <strong>Profile Visibility</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Allow other members to view your profile
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={privacy.profileVisible}
              onChange={(e) => handlePrivacyChange('profileVisible', e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleGroup}>
          <div>
            <strong>Show Email Address</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Display email address on your public profile
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={privacy.showEmail}
              onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleGroup}>
          <div>
            <strong>Show Commit Statistics</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Include your commits in leaderboards and profiles
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={privacy.showCommits}
              onChange={(e) => handlePrivacyChange('showCommits', e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleGroup}>
          <div>
            <strong>Show Course History</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Display completed courses on your profile
            </p>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={privacy.showCourses}
              onChange={(e) => handlePrivacyChange('showCourses', e.target.checked)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      {/* Account Management */}
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
          </svg>
          Account Management
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ color: '#374151', margin: '0 0 0.5rem 0' }}>Export Your Data</h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
              Download a copy of all your profile data, projects, and settings.
            </p>
            <button onClick={exportData} className={styles.btnSecondary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Export Data
            </button>
          </div>

          <div>
            <h4 style={{ color: '#374151', margin: '0 0 0.5rem 0' }}>Change Password</h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
              Update your account password for security.
            </p>
            <button className={styles.btnSecondary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
              </svg>
              Change Password
            </button>
          </div>

          <div>
            <h4 style={{ color: '#374151', margin: '0 0 0.5rem 0' }}>Two-Factor Authentication</h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
              Add an extra layer of security to your account.
            </p>
            <button className={styles.btnSecondary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
              </svg>
              Setup 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Role Management (Admin Only) */}
      {userProfile?.role === 'admin' && (
        <div className={styles.settingsSection}>
          <h3 className={styles.settingsTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
            </svg>
            Admin Tools
          </h3>

          <div>
            <h4 style={{ color: '#374151', margin: '0 0 0.5rem 0' }}>Manage User Roles</h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
              Assign roles and permissions to other members.
            </p>
            <button className={styles.btnPrimary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
              </svg>
              Manage Roles
            </button>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      <div className={styles.settingsSection} style={{ borderColor: '#dc2626' }}>
        <h3 className={styles.settingsTitle} style={{ color: '#dc2626' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
          </svg>
          Danger Zone
        </h3>

        <div>
          <h4 style={{ color: '#dc2626', margin: '0 0 0.5rem 0' }}>Delete Account</h4>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button 
            onClick={() => setShowDeleteDialog(true)}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
            </svg>
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Dialog */}
      {showDeleteDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h3 style={{ color: '#dc2626', margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
              ⚠️ Confirm Account Deletion
            </h3>
            <p style={{ color: '#374151', marginBottom: '1rem' }}>
              This will permanently delete your account, including:
            </p>
            <ul style={{ color: '#6b7280', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
              <li>Your profile and personal information</li>
              <li>All projects and associated data</li>
              <li>Course history and achievements</li>
              <li>Commit statistics and leaderboard position</li>
            </ul>
            <p style={{ color: '#374151', marginBottom: '1rem', fontWeight: '600' }}>
              Type "DELETE MY ACCOUNT" to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className={styles.formInput}
              placeholder="DELETE MY ACCOUNT"
              style={{ marginBottom: '1.5rem' }}
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeleteConfirmation('');
                }}
                className={styles.btnSecondary}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  opacity: deleteConfirmation === 'DELETE MY ACCOUNT' ? 1 : 0.5
                }}
                disabled={deleteConfirmation !== 'DELETE MY ACCOUNT'}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;