import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UserProfile, Project } from '../../types/dashboard';
import styles from '../../app/dashboard/dashboard.module.css';

interface ProjectsViewProps {
  userProfile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ userProfile, updateProfile }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    status: 'planning',
    isPublic: true,
    githubRepo: '',
    passwords: [],
    documents: [],
    invitedMembers: [],
    createdBy: userProfile?.uid || '',
    createdAt: '',
    lastUpdated: ''
  });

  useEffect(() => {
    if (userProfile?.uid) {
      fetchProjects();
    }
  }, [userProfile]);

  const fetchProjects = async () => {
    if (!userProfile?.uid) return;
    
    try {
      // Fetch projects where user is creator or invited member
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, where('createdBy', '==', userProfile.uid));
      const querySnapshot = await getDocs(q);
      
      const userProjects: Project[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Project));
      
      setProjects(userProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const createProject = async () => {
    if (!userProfile?.uid) return;
    
    try {
      const projectData: Omit<Project, 'id'> = {
        ...newProject,
        createdBy: userProfile.uid,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'projects'), projectData);
      
      setNewProject({
        title: '',
        description: '',
        status: 'planning',
        isPublic: true,
        githubRepo: '',
        passwords: [],
        documents: [],
        invitedMembers: [],
        createdBy: userProfile.uid,
        createdAt: '',
        lastUpdated: ''
      });
      
      setShowCreateForm(false);
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'completed':
        return '#6b7280';
      case 'planning':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#004AAD', margin: 0 }}>
          My Projects
        </h2>
        <button 
          onClick={() => setShowCreateForm(true)}
          className={styles.createProjectBtn}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
          </svg>
          Create New Project
        </button>
      </div>

      {/* Create Project Form */}
      {showCreateForm && (
        <div className={styles.profileSection} style={{ marginBottom: '2rem' }}>
          <h3 className={styles.sectionTitle}>Create New Project</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Project Title</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                className={styles.formInput}
                placeholder="Enter project title"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Status</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({...newProject, status: e.target.value as 'planning' | 'active' | 'completed'})}
                className={styles.formSelect}
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                className={styles.formTextarea}
                placeholder="Describe your project"
                rows={3}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>GitHub Repository</label>
              <input
                type="text"
                value={newProject.githubRepo}
                onChange={(e) => setNewProject({...newProject, githubRepo: e.target.value})}
                className={styles.formInput}
                placeholder="https://github.com/username/repo"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Visibility</label>
              <select
                value={newProject.isPublic ? 'public' : 'private'}
                onChange={(e) => setNewProject({...newProject, isPublic: e.target.value === 'public'})}
                className={styles.formSelect}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={createProject} className={styles.btnPrimary}>
              Create Project
            </button>
            <button 
              onClick={() => setShowCreateForm(false)} 
              className={styles.btnSecondary}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <span 
                className={`${styles.projectStatus} ${styles[project.status]}`}
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                {project.status}
              </span>
            </div>
            
            <p className={styles.projectDescription}>
              {project.description || 'No description provided'}
            </p>
            
            <div className={styles.projectMeta}>
              <span>
                {project.isPublic ? 'Public' : 'Private'}
              </span>
              <span>
                Created {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {project.githubRepo && (
              <div style={{ marginTop: '1rem' }}>
                <a 
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondary}
                  style={{ textDecoration: 'none', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
                  </svg>
                  View Repository
                </a>
              </div>
            )}
          </div>
        ))}
        
        {projects.length === 0 && !showCreateForm && (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '3rem',
            color: '#6b7280'
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 auto 1rem' }}>
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <h3>No Projects Yet</h3>
            <p>Create your first project to get started!</p>
          </div>
        )}
      </div>

      {/* Project Management Features (Coming Soon) */}
      <div className={styles.profileSection} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
          </svg>
          Advanced Features (Coming Soon)
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ 
            padding: '1rem', 
            background: '#f8fafc', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb',
            opacity: 0.7
          }}>
            <h4 style={{ color: '#004AAD', margin: '0 0 0.5rem 0' }}>Team Invitations</h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              Invite team members to collaborate on projects
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            background: '#f8fafc', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb',
            opacity: 0.7
          }}>
            <h4 style={{ color: '#004AAD', margin: '0 0 0.5rem 0' }}>Document Sharing</h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              Upload and share project documents securely
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            background: '#f8fafc', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb',
            opacity: 0.7
          }}>
            <h4 style={{ color: '#004AAD', margin: '0 0 0.5rem 0' }}>Access Control</h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              Manage repository and resource access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsView;