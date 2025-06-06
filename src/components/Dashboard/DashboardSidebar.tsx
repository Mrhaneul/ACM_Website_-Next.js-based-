import React from 'react';
import Image from 'next/image';
import { UserProfile, DashboardView } from '../../types/dashboard';
import styles from '../../app/dashboard/dashboard.module.css';

interface DashboardSidebarProps {
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
  userProfile: UserProfile | null;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeView,
  setActiveView,
  userProfile
}) => {
  const navigationItems = [
    {
      id: 'profile' as DashboardView,
      label: 'Profile',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    },
    {
      id: 'projects' as DashboardView,
      label: 'Projects',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      )
    },
    {
      id: 'leaderboard' as DashboardView,
      label: 'Commits Leaderboard',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      )
    },
    {
      id: 'transcript' as DashboardView,
      label: 'Transcript Parser',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
      )
    },
    {
      id: 'passwords' as DashboardView,
      label: 'Password Manager',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
        </svg>
      )
    },
    {
      id: 'settings' as DashboardView,
      label: 'Settings',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
        </svg>
      )
    }
  ];

  // Filter navigation based on user role
  const getFilteredNavigation = () => {
    const baseItems = navigationItems.filter(item => 
      item.id !== 'passwords' || 
      (userProfile?.role === 'admin' || userProfile?.role === 'leader')
    );
    return baseItems;
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Image 
          src="/acm.png" 
          alt="ACM Logo" 
          width={60} 
          height={60}
          className={styles.sidebarLogo}
        />
        <h2 className={styles.sidebarTitle}>ACM Dashboard</h2>
      </div>
      
      <nav>
        <ul className={styles.sidebarNav}>
          {getFilteredNavigation().map((item) => (
            <li key={item.id} className={styles.navItem}>
              <button
                onClick={() => setActiveView(item.id)}
                className={`${styles.navLink} ${activeView === item.id ? styles.active : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;