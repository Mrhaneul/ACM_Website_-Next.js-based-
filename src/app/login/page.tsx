"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { UserProfile } from '../../types/dashboard';
import styles from './page.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user && user.emailVerified) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Calculate progress percentage
  const getFormCompletion = () => {
    if (!isSignup) return 0;
    
    const fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
    const filledFields = fields.filter(field => formData[field].trim() !== '');
    const completion = (filledFields.length / fields.length) * 100;
    
    return completion;
  };

  const formCompletion = getFormCompletion();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
    setShowEmailVerification(false);
  };

  const createUserProfile = async (user: any, firstName: string, lastName: string) => {
    try {
      const defaultProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        firstName: firstName,
        lastName: lastName,
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
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignup) {
        // Signup flow
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        // Create user profile in Firestore
        await createUserProfile(userCredential.user, formData.firstName, formData.lastName);
        
        // Send email verification
        await sendEmailVerification(userCredential.user);
        
        // Show email verification animation
        setShowEmailVerification(true);
        setSuccess('Account created! Please check your email to verify your account before signing in.');
        
        // Hide the animation after 4 seconds
        setTimeout(() => {
          setShowEmailVerification(false);
        }, 4000);
        
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        });
        
      } else {
        // Login flow
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        if (!userCredential.user.emailVerified) {
          setError('Please verify your email before signing in. Check your inbox for the verification link.');
          return;
        }
        
        setSuccess('Successfully logged in! Redirecting to dashboard...');
        
        // Clear form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        });

        // Redirect to dashboard after a brief delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      
      // Handle specific Firebase auth errors
      let errorMessage = 'An error occurred';
      
      switch (err.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = err.message || 'An error occurred';
      }
      
      setError(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  const getProgressText = () => {
    if (formCompletion === 0) return "Let's get started!";
    if (formCompletion > 0 && formCompletion < 40) return "Great start! Keep going...";
    if (formCompletion >= 40 && formCompletion < 80) return "You're doing awesome!";
    if (formCompletion >= 80 && formCompletion < 100) return "Almost there!";
    if (formCompletion === 100) return "Perfect! Ready to join ACM! 🎉";
    return "";
  };

  const handleModeToggle = () => {
    setIsSignup(!isSignup);
    setShowEmailVerification(false);
    setError('');
    setSuccess('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.campus}>
          <div className={styles.overlay}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              color: '#004AAD'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #e5e7eb',
                borderTop: '4px solid #004AAD',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '1rem'
              }}></div>
              <p>Checking authentication...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.campus}>
        <div className={styles.overlay}>
          {/* Email Verification Screen */}
          {showEmailVerification ? (
            <div className={styles.emailVerificationContainer}>
              <div className={styles.emailAnimation}>
                <div className={styles.emailIcon}>
                  <svg viewBox="0 0 24 24" fill="none" className={styles.emailSvg}>
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="m2 6 10 7 10-7" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="18" cy="8" r="3" fill="#10B981" className={styles.checkCircle}>
                      <animate attributeName="r" values="0;3;3" dur="0.5s" begin="1s"/>
                    </circle>
                    <path d="m16.5 8.5 1 1 2-2" stroke="white" strokeWidth="1.5" fill="none" className={styles.checkMark}>
                      <animate attributeName="stroke-dasharray" values="0,10;4,10;4,10" dur="0.3s" begin="1.2s"/>
                      <animate attributeName="stroke-dashoffset" values="10;6;6" dur="0.3s" begin="1.2s"/>
                    </path>
                  </svg>
                </div>
                <h3 className={styles.emailTitle}>Check Your Email!</h3>
                <p className={styles.emailText}>
                  We've sent a verification link to<br/>
                  <strong>{formData.email}</strong>
                </p>
                <div className={styles.emailSteps}>
                  <div className={styles.emailStep}>
                    <span className={styles.stepNumber}>1</span>
                    <span>Open your email</span>
                  </div>
                  <div className={styles.emailStep}>
                    <span className={styles.stepNumber}>2</span>
                    <span>Click the verification link</span>
                  </div>
                  <div className={styles.emailStep}>
                    <span className={styles.stepNumber}>3</span>
                    <span>Come back and login!</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowEmailVerification(false);
                    setIsSignup(false);
                    setFormData({
                      email: '',
                      password: '',
                      confirmPassword: '',
                      firstName: '',
                      lastName: ''
                    });
                  }}
                  className={styles.backToLoginButton}
                >
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            /* Normal Form */
            <div className={styles.authContainer}>
              <div className={styles.authCard}>
                <div className={styles.header}>
                  <h1 className={styles.title}>
                    {isSignup ? 'Join ACM @ CBU' : 'Welcome Back'}
                  </h1>
                  <p className={styles.subtitle}>
                    {isSignup 
                      ? 'Create your account to get started' 
                      : 'Login to access your dashboard'
                    }
                  </p>
                  
                  {isSignup && (
                    <div className={styles.progressContainer}>
                      <div className={styles.progressCircle}>
                        <svg viewBox="0 0 100 100" className={styles.progressSvg}>
                          <defs>
                            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#004AAD">
                                <animate attributeName="stop-color" 
                                  values="#004AAD;#58cbf7;#004AAD" 
                                  dur="3s" 
                                  repeatCount="indefinite"/>
                              </stop>
                              <stop offset="50%" stopColor="#58cbf7">
                                <animate attributeName="stop-color" 
                                  values="#58cbf7;#004AAD;#58cbf7" 
                                  dur="3s" 
                                  repeatCount="indefinite"/>
                              </stop>
                              <stop offset="100%" stopColor="#004AAD">
                                <animate attributeName="stop-color" 
                                  values="#004AAD;#58cbf7;#004AAD" 
                                  dur="3s" 
                                  repeatCount="indefinite"/>
                              </stop>
                            </linearGradient>
                          </defs>
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className={styles.progressBg}
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className={styles.progressFill}
                            style={{
                              strokeDashoffset: `${283 - (283 * formCompletion) / 100}`,
                              '--dash-offset': `${283 - (283 * formCompletion) / 100}`
                            } as React.CSSProperties}
                          />
                        </svg>
                        
                        <div className={styles.acmText}>
                          <span className={`${styles.acmLetter} ${formCompletion >= 20 ? styles.visible : ''}`}>
                            A
                          </span>
                          <span className={`${styles.acmLetter} ${formCompletion >= 60 ? styles.visible : ''}`}>
                            C
                          </span>
                          <span className={`${styles.acmLetter} ${formCompletion >= 100 ? styles.visible : ''}`}>
                            M
                          </span>
                        </div>
                      </div>
                      
                      <div className={styles.progressText}>
                        {getProgressText()}
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  {isSignup && (
                    <div className={styles.nameFields}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="firstName" className={styles.label}>
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label htmlFor="lastName" className={styles.label}>
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>

                  {isSignup && (
                    <div className={styles.inputGroup}>
                      <label htmlFor="confirmPassword" className={styles.label}>
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                      />
                    </div>
                  )}

                  {error && (
                    <div className={styles.error}>
                      {error}
                    </div>
                  )}

                  {success && !showEmailVerification && (
                    <div className={styles.success}>
                      {success}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={formLoading}
                  >
                    {formLoading 
                      ? (isSignup ? 'Creating Account...' : 'Signing In...') 
                      : isSignup 
                        ? 'Create Account' 
                        : 'Login'
                    }
                  </button>
                </form>

                <div className={styles.switchAuth}>
                  <p>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <button
                      type="button"
                      onClick={handleModeToggle}
                      className={styles.switchButton}
                    >
                      {isSignup ? 'Login' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}