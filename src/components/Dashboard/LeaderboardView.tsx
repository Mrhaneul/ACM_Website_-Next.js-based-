import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../app/dashboard/dashboard.module.css';

interface LeaderboardViewProps {
  leaderboardData: any[];
  currentUser: any;
}

const LeaderboardView: React.FC<LeaderboardViewProps> = ({ 
  leaderboardData, 
  currentUser 
}) => {
  const [sortBy, setSortBy] = useState('commits');
  const [timeFilter, setTimeFilter] = useState('all');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbbf24">
            <path d="M5,16L3,5H1V3H4L6,14L18,14L20,6H8L8.5,4H22L19,17H5M12,19A2,2 0 0,1 14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21A2,2 0 0,1 12,19M19,19A2,2 0 0,1 21,21A2,2 0 0,1 19,23A2,2 0 0,1 17,21A2,2 0 0,1 19,19Z"/>
          </svg>
        );
      case 2:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#9ca3af">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case 3:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#cd7c2f">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getStreakData = (user: any) => {
    // Simulated streak data - in real implementation, this would come from GitHub API
    return Math.floor(Math.random() * 30) + 1;
  };

  const getCurrentUserRank = () => {
    const userIndex = leaderboardData.findIndex(user => user.uid === currentUser?.uid);
    return userIndex >= 0 ? userIndex + 1 : null;
  };

  const currentUserRank = getCurrentUserRank();

  return (
    <div className={styles.leaderboardContainer}>
      {/* Header */}
      <div className={styles.leaderboardHeader}>
        <h2 className={styles.leaderboardTitle}>
          🏆 Commits Leaderboard
        </h2>
        <p className={styles.leaderboardSubtitle}>
          See who's been the most active in our community!
        </p>
        
        {currentUserRank && (
          <div style={{ 
            background: 'linear-gradient(135deg, #004AAD 0%, #58cbf7 100%)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            margin: '1rem 0',
            textAlign: 'center'
          }}>
            <strong>Your Rank: #{currentUserRank}</strong>
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '600',
            color: '#374151'
          }}>
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.formSelect}
            style={{ minWidth: '150px' }}
          >
            <option value="commits">Total Commits</option>
            <option value="recent">Recent Activity</option>
            <option value="streak">Current Streak</option>
          </select>
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '600',
            color: '#374151'
          }}>
            Time Period:
          </label>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className={styles.formSelect}
            style={{ minWidth: '150px' }}
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium */}
      {leaderboardData.length >= 3 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'end',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {/* Second Place */}
          <div style={{ 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '3px solid #9ca3af',
            minWidth: '200px'
          }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Image
                src={leaderboardData[1]?.profileImage || '/profile.png'}
                alt="Profile"
                width={80}
                height={80}
                className={styles.leaderboardAvatar}
                style={{ width: '80px', height: '80px' }}
              />
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '-10px',
                background: '#9ca3af',
                color: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                2
              </div>
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
              {leaderboardData[1]?.firstName} {leaderboardData[1]?.lastName}
            </h3>
            <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
              {leaderboardData[1]?.role}
            </p>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#004AAD' }}>
              {leaderboardData[1]?.commits || 0} commits
            </p>
          </div>

          {/* First Place */}
          <div style={{ 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
            padding: '2rem',
            borderRadius: '16px',
            border: '3px solid #fbbf24',
            minWidth: '220px',
            transform: 'scale(1.1)'
          }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Image
                src={leaderboardData[0]?.profileImage || '/profile.png'}
                alt="Profile"
                width={100}
                height={100}
                className={styles.leaderboardAvatar}
                style={{ width: '100px', height: '100px' }}
              />
              <div style={{ 
                position: 'absolute', 
                top: '-15px', 
                right: '-15px',
                background: '#fbbf24',
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                1
              </div>
              <div style={{ 
                position: 'absolute', 
                top: '-25px', 
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '2rem'
              }}>
                👑
              </div>
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>
              {leaderboardData[0]?.firstName} {leaderboardData[0]?.lastName}
            </h3>
            <p style={{ margin: '0 0 0.5rem 0', color: '#92400e', fontSize: '0.875rem' }}>
              {leaderboardData[0]?.role}
            </p>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#92400e' }}>
              {leaderboardData[0]?.commits || 0} commits
            </p>
          </div>

          {/* Third Place */}
          <div style={{ 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #fef3c7 0%, #cd7c2f 100%)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '3px solid #cd7c2f',
            minWidth: '200px'
          }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Image
                src={leaderboardData[2]?.profileImage || '/profile.png'}
                alt="Profile"
                width={80}
                height={80}
                className={styles.leaderboardAvatar}
                style={{ width: '80px', height: '80px' }}
              />
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '-10px',
                background: '#cd7c2f',
                color: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                3
              </div>
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>
              {leaderboardData[2]?.firstName} {leaderboardData[2]?.lastName}
            </h3>
            <p style={{ margin: '0 0 0.5rem 0', color: '#92400e', fontSize: '0.875rem' }}>
              {leaderboardData[2]?.role}
            </p>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#92400e' }}>
              {leaderboardData[2]?.commits || 0} commits
            </p>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ 
          textAlign: 'center', 
          marginBottom: '1.5rem',
          color: '#004AAD',
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>
          Complete Rankings
        </h3>
        
        <ul className={styles.leaderboardList}>
          {leaderboardData.map((user, index) => (
            <li 
              key={user.id} 
              className={styles.leaderboardItem}
              style={{
                background: user.uid === currentUser?.uid 
                  ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
                  : undefined,
                border: user.uid === currentUser?.uid 
                  ? '2px solid #004AAD' 
                  : undefined
              }}
            >
              <div className={`${styles.leaderboardRank} ${
                index === 0 ? styles.first : 
                index === 1 ? styles.second : 
                index === 2 ? styles.third : ''
              }`}>
                {index < 3 ? getRankIcon(index + 1) : index + 1}
              </div>
              
              <Image
                src={user.profileImage || '/profile.png'}
                alt="Profile"
                width={50}
                height={50}
                className={styles.leaderboardAvatar}
              />
              
              <div className={styles.leaderboardInfo}>
                <h4 className={styles.leaderboardName}>
                  {user.firstName} {user.lastName}
                  {user.uid === currentUser?.uid && (
                    <span style={{ 
                      color: '#004AAD', 
                      fontWeight: 'normal', 
                      fontSize: '0.875rem',
                      marginLeft: '0.5rem'
                    }}>
                      (You)
                    </span>
                  )}
                </h4>
                <p className={styles.leaderboardRole}>
                  {user.role} • {user.major || 'Computer Science'}
                </p>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div className={styles.leaderboardCommits}>
                  {user.commits || 0}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  commits
                </div>
                <div style={{ 
                  color: '#10b981', 
                  fontSize: '0.75rem',
                  marginTop: '0.25rem'
                }}>
                  🔥 {getStreakData(user)} day streak
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {leaderboardData.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#6b7280'
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 auto 1rem' }}>
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
            <h3>No Data Available</h3>
            <p>Connect your GitHub account to see commit statistics!</p>
          </div>
        )}
      </div>

      {/* Statistics Section */}
      <div className={styles.profileSection} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z"/>
          </svg>
          Community Statistics
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ 
            textAlign: 'center',
            padding: '1.5rem',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#004AAD',
              marginBottom: '0.5rem'
            }}>
              {leaderboardData.reduce((sum, user) => sum + (user.commits || 0), 0).toLocaleString()}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Total Community Commits
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            padding: '1.5rem',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#004AAD',
              marginBottom: '0.5rem'
            }}>
              {leaderboardData.length}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Active Contributors
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            padding: '1.5rem',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#004AAD',
              marginBottom: '0.5rem'
            }}>
              {leaderboardData.length > 0 ? Math.round(leaderboardData.reduce((sum, user) => sum + (user.commits || 0), 0) / leaderboardData.length) : 0}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Average Commits per Person
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            padding: '1.5rem',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#004AAD',
              marginBottom: '0.5rem'
            }}>
              {leaderboardData.filter(user => (user.commits || 0) > 0).length}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              GitHub Connected Users
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className={styles.profileSection} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Achievement Badges
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ 
            padding: '1rem',
            background: '#f0f9ff',
            borderRadius: '12px',
            border: '2px solid #0ea5e9',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
            <h4 style={{ color: '#0369a1', margin: '0 0 0.25rem 0' }}>Top Contributor</h4>
            <p style={{ color: '#0369a1', fontSize: '0.875rem', margin: 0 }}>
              Most commits this month
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem',
            background: '#f0fdf4',
            borderRadius: '12px',
            border: '2px solid #10b981',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
            <h4 style={{ color: '#059669', margin: '0 0 0.25rem 0' }}>Streak Master</h4>
            <p style={{ color: '#059669', fontSize: '0.875rem', margin: 0 }}>
              30+ day commit streak
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem',
            background: '#fefce8',
            borderRadius: '12px',
            border: '2px solid #eab308',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <h4 style={{ color: '#ca8a04', margin: '0 0 0.25rem 0' }}>Rising Star</h4>
            <p style={{ color: '#ca8a04', fontSize: '0.875rem', margin: 0 }}>
              Most improved this week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardView;