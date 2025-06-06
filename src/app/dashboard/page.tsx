"use client";

import React, { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserProfile, LeaderboardEntry, DashboardView } from '../../types/dashboard';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import ProfileView from '../../components/Dashboard/ProfileView';
import ProjectsView from '../../components/Dashboard/ProjectsView';
import LeaderboardView from '../../components/Dashboard/LeaderboardView';
import SettingsView from '../../components/Dashboard/SettingsView';
import TranscriptParser from '../../components/Dashboard/TranscriptParser';
import PasswordManager from '../../components/Dashboard/PasswordManager';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const [user, loading, error] = useAuthState(auth);
  const [activeView, setActiveView] = useState<DashboardView>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchLeaderboard();
    }
  }, [user]);

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as UserProfile);
      } else {
        // Create default profile
        const defaultProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          firstName: '',
          lastName: '',
          role: 'member',
          major: '',
          graduationYear: '',
          bio: '',
          skills: [],
          githubUsername: '',
          linkedinUrl: '',
          profileImage: '',
          courses: [],
          commits: 0,
          joinDate: new Date().toISOString(),
          settings: {
            emailUpdates: true,
            profileVisible: true,
            showCommits: true,
            showEmail: false,
            showCourses: true,
            projectInvites: true,
            weeklyDigest: false,
            commitReminders: true
          }
        };
        await setDoc(doc(db, 'users', user.uid), defaultProfile);
        setUserProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('commits', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const leaderboard: LeaderboardEntry[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          uid: data.uid,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          major: data.major,
          commits: data.commits || 0,
          profileImage: data.profileImage,
          githubUsername: data.githubUsername
        };
      });
      setLeaderboardData(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    
    try {
      const newProfile = { ...userProfile, ...updatedData };
      await setDoc(doc(db, 'users', user.uid), newProfile, { merge: true });
      setUserProfile(newProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.errorContainer}>
        <h2>Access Denied</h2>
        <p>Please log in to access the dashboard.</p>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'profile':
        return (
          <ProfileView 
            userProfile={userProfile} 
            updateProfile={updateProfile}
            currentUser={user}
          />
        );
      case 'projects':
        return (
          <ProjectsView 
            userProfile={userProfile}
            updateProfile={updateProfile}
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardView 
            leaderboardData={leaderboardData}
            currentUser={userProfile}
          />
        );
      case 'transcript':
        return (
          <TranscriptParser 
            userProfile={userProfile}
            updateProfile={updateProfile}
          />
        );
      case 'passwords':
        return (
          <PasswordManager 
            userProfile={userProfile}
          />
        );
      case 'settings':
        return (
          <SettingsView 
            userProfile={userProfile}
            updateProfile={updateProfile}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        );
      default:
        return <ProfileView userProfile={userProfile} updateProfile={updateProfile} currentUser={user} />;
    }
  };

  return (
    <div className={`${styles.dashboardContainer} ${darkMode ? styles.dark : ''}`}>
      <DashboardSidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        userProfile={userProfile}
      />
      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1 className={styles.pageTitle}>
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </h1>
          <div className={styles.userInfo}>
            <img 
              src={userProfile?.profileImage || '/profile.png'} 
              alt="Profile"
              className={styles.userAvatar}
            />
            <span>{userProfile?.firstName} {userProfile?.lastName}</span>
          </div>
        </div>
        <div className={styles.viewContent}>
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
}