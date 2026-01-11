// ========== ENHANCEMENTS-DASHBOARD.JS ==========
// Role-based dashboard system that overlays on original site

(function() {
    'use strict';
    
    let currentRole = 'founder';
    let currentUser = null;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEnhancedDashboards);
    } else {
        initEnhancedDashboards();
    }
    
    function initEnhancedDashboards() {
        console.log('Initializing enhanced dashboards...');
        
        // Load current user from enhanced session
        loadCurrentUser();
        
        // Setup dashboard navigation
        setupDashboardNav();
        
        // Setup role switching
        setupRoleSwitching();
        
        // Setup notifications
        setupNotifications();
        
        // Setup profile menu
        setupProfileMenu();
        
        // Setup quick actions
        setupQuickActions();
        
        console.log('Enhanced dashboards initialized');
    }
    
    function loadCurrentUser() {
        // Try to get user from enhanced auth
        if (window.enhancedAuth && window.enhancedAuth.getCurrentUser) {
            const session = window.enhancedAuth.getCurrentUser();
            if (session) {
                currentUser = session;
                currentRole = session.userRole;
                
                // Update UI with user info
                updateUserInfo(session);
                return;
            }
        }
        
        // Fallback: check localStorage directly
        try {
            const session = JSON.parse(localStorage.getItem('enhanced_current_user'));
            if (session) {
                currentUser = session;
                currentRole = session.userRole;
                updateUserInfo(session);
            }
        } catch (error) {
            console.error('Error loading current user:', error);
        }
    }
    
    function updateUserInfo(session) {
        // Update dashboard with user info
        const userNameEl = document.getElementById('enhanced-user-name');
        const userEmailEl = document.getElementById('enhanced-user-email');
        const currentRoleEl = document.getElementById('enhanced-current-role');
        
        if (userNameEl && session.userName) {
            userNameEl.textContent = session.userName;
        }
        
        if (userEmailEl && session.userEmail) {
            userEmailEl.textContent = session.userEmail;
        }
        
        if (currentRoleEl) {
            currentRoleEl.textContent = session.userRole ? 
                session.userRole.charAt(0).toUpperCase() + session.userRole.slice(1) : 
                '';
        }
        
        // Update dashboard navigation role
        const dashboardNav = document.getElementById('enhanced-dashboard-nav');
        if (dashboardNav) {
            dashboardNav.setAttribute('data-role', currentRole);
        }
    }
    
    // ========== DASHBOARD NAVIGATION ==========
    
    function setupDashboardNav() {
        const navLinks = document.querySelectorAll('.enhanced-nav-link[data-dashboard]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const dashboardType = this.getAttribute('data-dashboard');
                showDashboardSection(dashboardType);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Set default active dashboard
        showDashboardSection('overview');
    }
    
    function showDashboardSection(section) {
        console.log('Showing dashboard section:', section);
        
        // Hide loading indicator
        const loadingEl = document.getElementById('enhanced-dashboard-loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
        
        // Load section content
        loadDashboardContent(section);
    }
    
    function loadDashboardContent(section) {
        const contentArea = document.getElementById('enhanced-dashboard-content');
        if (!contentArea) return;
        
        // Clear existing content
        contentArea.innerHTML = '';
        
        // Load role-specific content
        let content = '';
        
        switch(section) {
            case 'overview':
                content = getOverviewContent();
                break;
            case 'feed':
                content = getFeedContent();
                break;
            case 'discover':
                content = getDiscoverContent();
                break;
            case 'profile':
                content = getProfileContent();
                break;
            default:
                content = getOverviewContent();
        }
        
        contentArea.innerHTML = content;
        
        // Initialize any interactive elements in the new content
        initializeDashboardInteractions(section);
    }
    
    // ========== ROLE-SPECIFIC DASHBOARD CONTENT ==========
    
    function getOverviewContent() {
        // Role-specific overview content
        const roleTemplates = {
            founder: `
                <div class="enhanced-dashboard-overview enhanced-founder-overview">
                    <div class="enhanced-welcome-banner">
                        <h2>Welcome back, Founder!</h2>
                        <p>Track your innovation journey and connect with investors</p>
                    </div>
                    
                    <div class="enhanced-stats-grid">
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>5</h3>
                                <p>Active Projects</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>72</h3>
                                <p>Vault Score</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>12</h3>
                                <p>Investor Connections</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>3/5</h3>
                                <p>Courses Completed</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="enhanced-overview-sections">
                        <div class="enhanced-section">
                            <h3><i class="fas fa-rocket"></i> Project Pipeline</h3>
                            <div class="enhanced-pipeline">
                                <div class="enhanced-pipeline-stage active">
                                    <span class="enhanced-stage-label">Draft</span>
                                    <span class="enhanced-stage-count">2</span>
                                </div>
                                <div class="enhanced-pipeline-stage">
                                    <span class="enhanced-stage-label">Submitted</span>
                                    <span class="enhanced-stage-count">1</span>
                                </div>
                                <div class="enhanced-pipeline-stage">
                                    <span class="enhanced-stage-label">Funded</span>
                                    <span class="enhanced-stage-count">1</span>
                                </div>
                                <div class="enhanced-pipeline-stage">
                                    <span class="enhanced-stage-label">In Progress</span>
                                    <span class="enhanced-stage-count">1</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="enhanced-section">
                            <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
                            <div class="enhanced-quick-actions-grid">
                                <button class="enhanced-action-btn" onclick="enhancedUI.createPost()">
                                    <i class="fas fa-plus-circle"></i>
                                    <span>Post Update</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.findInvestors()">
                                    <i class="fas fa-search-dollar"></i>
                                    <span>Find Investors</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.browseCourses()">
                                    <i class="fas fa-graduation-cap"></i>
                                    <span>Take Course</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.requestMentorship()">
                                    <i class="fas fa-hands-helping"></i>
                                    <span>Get Mentorship</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            
            investor: `
                <div class="enhanced-dashboard-overview enhanced-investor-overview">
                    <div class="enhanced-welcome-banner">
                        <h2>Welcome back, Investor!</h2>
                        <p>Discover Africa's most promising innovations</p>
                    </div>
                    
                    <div class="enhanced-stats-grid">
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-chart-pie"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>8</h3>
                                <p>Portfolio Companies</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-hand-holding-usd"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>$2.4M</h3>
                                <p>Total Invested</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-filter"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>24</h3>
                                <p>Deals in Pipeline</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-percentage"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>18.5%</h3>
                                <p>Avg. ROI</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="enhanced-overview-sections">
                        <div class="enhanced-section">
                            <h3><i class="fas fa-funnel-dollar"></i> Deal Flow</h3>
                            <div class="enhanced-deal-flow">
                                <div class="enhanced-deal-stage">
                                    <span class="enhanced-stage-label">New</span>
                                    <span class="enhanced-stage-count">12</span>
                                </div>
                                <div class="enhanced-deal-stage">
                                    <span class="enhanced-stage-label">Reviewed</span>
                                    <span class="enhanced-stage-count">8</span>
                                </div>
                                <div class="enhanced-deal-stage">
                                    <span class="enhanced-stage-label">Due Diligence</span>
                                    <span class="enhanced-stage-count">3</span>
                                </div>
                                <div class="enhanced-deal-stage">
                                    <span class="enhanced-stage-label">Invested</span>
                                    <span class="enhanced-stage-count">1</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="enhanced-section">
                            <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
                            <div class="enhanced-quick-actions-grid">
                                <button class="enhanced-action-btn" onclick="enhancedUI.discoverStartups()">
                                    <i class="fas fa-binoculars"></i>
                                    <span>Discover Startups</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.portfolioAnalytics()">
                                    <i class="fas fa-chart-bar"></i>
                                    <span>Portfolio Analytics</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.marketReports()">
                                    <i class="fas fa-file-alt"></i>
                                    <span>Market Reports</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.coinvest()">
                                    <i class="fas fa-users"></i>
                                    <span>Find Co-investors</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            
            mentor: `
                <div class="enhanced-dashboard-overview enhanced-mentor-overview">
                    <div class="enhanced-welcome-banner">
                        <h2>Welcome back, Mentor!</h2>
                        <p>Guide Africa's next generation of innovators</p>
                    </div>
                    
                    <div class="enhanced-stats-grid">
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>6</h3>
                                <p>Active Mentees</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>15</h3>
                                <p>Sessions This Month</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>4.8</h3>
                                <p>Average Rating</p>
                            </div>
                        </div>
                        
                        <div class="enhanced-stat-card">
                            <div class="enhanced-stat-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="enhanced-stat-content">
                                <h3>3</h3>
                                <p>Workshops Hosted</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="enhanced-overview-sections">
                        <div class="enhanced-section">
                            <h3><i class="fas fa-tasks"></i> Mentorship Queue</h3>
                            <div class="enhanced-queue-list">
                                <div class="enhanced-queue-item">
                                    <div class="enhanced-queue-content">
                                        <strong>Review pitch deck</strong>
                                        <small>From: Tech startup in Lagos</small>
                                    </div>
                                    <button class="enhanced-btn enhanced-btn-small">Review</button>
                                </div>
                                <div class="enhanced-queue-item">
                                    <div class="enhanced-queue-content">
                                        <strong>Business strategy session</strong>
                                        <small>Scheduled: Tomorrow 2 PM</small>
                                    </div>
                                    <button class="enhanced-btn enhanced-btn-small">Join</button>
                                </div>
                                <div class="enhanced-queue-item">
                                    <div class="enhanced-queue-content">
                                        <strong>New mentorship request</strong>
                                        <small>From: Founder in Nairobi</small>
                                    </div>
                                    <button class="enhanced-btn enhanced-btn-small">View</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="enhanced-section">
                            <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
                            <div class="enhanced-quick-actions-grid">
                                <button class="enhanced-action-btn" onclick="enhancedUI.viewMentees()">
                                    <i class="fas fa-user-friends"></i>
                                    <span>View Mentees</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.scheduleSession()">
                                    <i class="fas fa-calendar-plus"></i>
                                    <span>Schedule Session</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.createContent()">
                                    <i class="fas fa-edit"></i>
                                    <span>Create Content</span>
                                </button>
                                <button class="enhanced-action-btn" onclick="enhancedUI.communityForum()">
                                    <i class="fas fa-comments"></i>
                                    <span>Community Forum</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };
        
        return roleTemplates[currentRole] || roleTemplates.founder;
    }
    
    function getFeedContent() {
        return `
            <div class="enhanced-feed">
                <div class="enhanced-feed-header">
                    <h2><i class="fas fa-newspaper"></i> Activity Feed</h2>
                    <button class="enhanced-btn enhanced-btn-primary" onclick="enhancedUI.createPost()">
                        <i class="fas fa-plus"></i> New Post
                    </button>
                </div>
                
                <div class="enhanced-feed-content">
                    <div class="enhanced-post-card">
                        <div class="enhanced-post-header">
                            <div class="enhanced-post-avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <div class="enhanced-post-author">
                                <strong>Alex Kamau</strong>
                                <small>${currentRole === 'founder' ? 'Founder' : currentRole === 'investor' ? 'Investor' : 'Mentor'} " 2 hours ago</small>
                            </div>
                        </div>
                        <div class="enhanced-post-body">
                            <p>Just secured our first round of funding! <‰ Building Africa's future one innovation at a time.</p>
                            <div class="enhanced-post-tags">
                                <span class="enhanced-tag">#Funding</span>
                                <span class="enhanced-tag">#StartupSuccess</span>
                                <span class="enhanced-tag">#AfricaTech</span>
                            </div>
                        </div>
                        <div class="enhanced-post-actions">
                            <button class="enhanced-post-action">
                                <i class="far fa-thumbs-up"></i> 24
                            </button>
                            <button class="enhanced-post-action">
                                <i class="far fa-comment"></i> 8
                            </button>
                            <button class="enhanced-post-action">
                                <i class="far fa-share-square"></i> 3
                            </button>
                        </div>
                    </div>
                    
                    <div class="enhanced-post-card">
                        <div class="enhanced-post-header">
                            <div class="enhanced-post-avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <div class="enhanced-post-author">
                                <strong>Investor Network Africa</strong>
                                <small>Investor Group " 5 hours ago</small>
                            </div>
                        </div>
                        <div class="enhanced-post-body">
                            <p>New investment opportunity: Agri-tech startup in Kenya looking for $500K seed funding. Strong team, proven traction, and scalable model.</p>
                            <div class="enhanced-post-tags">
                                <span class="enhanced-tag">#InvestmentOpportunity</span>
                                <span class="enhanced-tag">#AgriTech</span>
                                <span class="enhanced-tag">#Kenya</span>
                            </div>
                        </div>
                        <div class="enhanced-post-actions">
                            <button class="enhanced-post-action">
                                <i class="far fa-thumbs-up"></i> 42
                            </button>
                            <button class="enhanced-post-action">
                                <i class="far fa-comment"></i> 15
                            </button>
                            <button class="enhanced-post-action">
                                <i class="far fa-bookmark"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function getDiscoverContent() {
        const discoverTemplates = {
            founder: `
                <div class="enhanced-discover">
                    <h2><i class="fas fa-compass"></i> Discover Investors & Mentors</h2>
                    <div class="enhanced-discover-grid">
                        <div class="enhanced-discover-card">
                            <div class="enhanced-discover-avatar">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <h3>Investor Match</h3>
                            <p>Find investors interested in your sector</p>
                            <button class="enhanced-btn enhanced-btn-primary">Find Investors</button>
                        </div>
                        <div class="enhanced-discover-card">
                            <div class="enhanced-discover-avatar">
                                <i class="fas fa-hands-helping"></i>
                            </div>
                            <h3>Mentor Connect</h3>
                            <p>Connect with industry experts</p>
                            <button class="enhanced-btn enhanced-btn-primary">Find Mentors</button>
                        </div>
                        <div class="enhanced-discover-card">
                            <div class="enhanced-discover-avatar">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>Founder Network</h3>
                            <p>Connect with other African founders</p>
                            <button class="enhanced-btn enhanced-btn-primary">Join Network</button>
                        </div>
                    </div>
                </div>
            `,
            
            investor: `
                <div class="enhanced-discover">
                    <h2><i class="fas fa-compass"></i> Discover Startups</h2>
                    <div class="enhanced-discover-filters">
                        <select class="enhanced-filter">
                            <option>Sector: All</option>
                            <option>FinTech</option>
                            <option>AgriTech</option>
                            <option>HealthTech</option>
                        </select>
                        <select class="enhanced-filter">
                            <option>Stage: All</option>
                            <option>Pre-seed</option>
                            <option>Seed</option>
                            <option>Series A</option>
                        </select>
                        <select class="enhanced-filter">
                            <option>Location: All Africa</option>
                            <option>East Africa</option>
                            <option>West Africa</option>
                            <option>Southern Africa</option>
                        </select>
                    </div>
                    <div class="enhanced-discover-grid">
                        <div class="enhanced-startup-card">
                            <h3>FarmConnect</h3>
                            <p>Kenya " AgriTech " Seed Stage</p>
                            <div class="enhanced-startup-stats">
                                <span><i class="fas fa-star"></i> 85 Vault Score</span>
                                <span><i class="fas fa-user"></i> Team of 5</span>
                            </div>
                            <button class="enhanced-btn enhanced-btn-primary">View Details</button>
                        </div>
                        <div class="enhanced-startup-card">
                            <h3>MediPay</h3>
                            <p>Nigeria " HealthTech " Series A</p>
                            <div class="enhanced-startup-stats">
                                <span><i class="fas fa-star"></i> 92 Vault Score</span>
                                <span><i class="fas fa-user"></i> Team of 12</span>
                            </div>
                            <button class="enhanced-btn enhanced-btn-primary">View Details</button>
                        </div>
                    </div>
                </div>
            `,
            
            mentor: `
                <div class="enhanced-discover">
                    <h2><i class="fas fa-compass"></i> Discover Founders</h2>
                    <div class="enhanced-discover-grid">
                        <div class="enhanced-mentee-card">
                            <div class="enhanced-mentee-avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <h3>Sarah Chukwu</h3>
                            <p>FinTech Founder " Lagos</p>
                            <div class="enhanced-mentee-score">
                                <i class="fas fa-star"></i> Vault Score: 78
                            </div>
                            <button class="enhanced-btn enhanced-btn-primary">Offer Mentorship</button>
                        </div>
                        <div class="enhanced-mentee-card">
                            <div class="enhanced-mentee-avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <h3>David Omondi</h3>
                            <p>EdTech Founder " Nairobi</p>
                            <div class="enhanced-mentee-score">
                                <i class="fas fa-star"></i> Vault Score: 65
                            </div>
                            <button class="enhanced-btn enhanced-btn-primary">Offer Mentorship</button>
                        </div>
                    </div>
                </div>
            `
        };
        
        return discoverTemplates[currentRole] || discoverTemplates.founder;
    }
    
    function getProfileContent() {
        return `
            <div class="enhanced-profile">
                <div class="enhanced-profile-header">
                    <div class="enhanced-profile-avatar-large">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="enhanced-profile-info">
                        <h2>${currentUser ? currentUser.userName : 'User Name'}</h2>
                        <p class="enhanced-profile-role">
                            <i class="fas fa-badge-check"></i>
                            ${currentRole ? currentRole.charAt(0).toUpperCase() + currentRole.slice(1) : 'Member'}
                        </p>
                        <p class="enhanced-profile-location">
                            <i class="fas fa-map-marker-alt"></i>
                            Africa
                        </p>
                    </div>
                </div>
                
                <div class="enhanced-profile-sections">
                    <div class="enhanced-profile-section">
                        <h3><i class="fas fa-info-circle"></i> About</h3>
                        <p>${currentRole === 'founder' ? 'Innovator building Africa\'s future' : 
                           currentRole === 'investor' ? 'Investor in African innovation' : 
                           'Mentor guiding African founders'}</p>
                    </div>
                    
                    <div class="enhanced-profile-section">
                        <h3><i class="fas fa-chart-line"></i> Stats</h3>
                        <div class="enhanced-profile-stats">
                            <div class="enhanced-profile-stat">
                                <strong>${currentRole === 'founder' ? 'Projects' : currentRole === 'investor' ? 'Investments' : 'Mentees'}</strong>
                                <span>${currentRole === 'founder' ? '5' : currentRole === 'investor' ? '8' : '6'}</span>
                            </div>
                            <div class="enhanced-profile-stat">
                                <strong>Connections</strong>
                                <span>24</span>
                            </div>
                            <div class="enhanced-profile-stat">
                                <strong>${currentRole === 'founder' ? 'Vault Score' : 'Impact Score'}</strong>
                                <span>${currentRole === 'founder' ? '72' : '4.8'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // ========== ROLE SWITCHING ==========
    
    function setupRoleSwitching() {
        const roleSwitcher = document.getElementById('enhanced-role-switcher');
        const roleModal = document.getElementById('enhanced-role-modal');
        const closeRoleModal = document.getElementById('enhanced-close-role-modal');
        const roleOptions = document.querySelectorAll('.enhanced-role-option');
        
        if (roleSwitcher && roleModal) {
            roleSwitcher.addEventListener('click', () => {
                roleModal.style.display = 'flex';
            });
        }
        
        if (closeRoleModal && roleModal) {
            closeRoleModal.addEventListener('click', () => {
                roleModal.style.display = 'none';
            });
        }
        
        roleOptions.forEach(option => {
            option.addEventListener('click', () => {
                const newRole = option.getAttribute('data-role');
                switchRole(newRole);
                roleModal.style.display = 'none';
            });
        });
        
        // Close modal when clicking outside
        if (roleModal) {
            roleModal.addEventListener('click', (e) => {
                if (e.target === roleModal) {
                    roleModal.style.display = 'none';
                }
            });
        }
    }
    
    function switchRole(newRole) {
        if (newRole === currentRole) return;
        
        console.log('Switching role from', currentRole, 'to', newRole);
        currentRole = newRole;
        
        // Update UI
        updateRoleUI(newRole);
        
        // Reload current dashboard section
        const activeLink = document.querySelector('.enhanced-nav-link.active');
        if (activeLink) {
            const section = activeLink.getAttribute('data-dashboard');
            loadDashboardContent(section);
        }
        
        showEnhancedToast(`Switched to ${newRole} dashboard`, 'success');
    }
    
    function updateRoleUI(role) {
        // Update dashboard navigation
        const dashboardNav = document.getElementById('enhanced-dashboard-nav');
        if (dashboardNav) {
            dashboardNav.setAttribute('data-role', role);
        }
        
        // Update current role display
        const currentRoleEl = document.getElementById('enhanced-current-role');
        if (currentRoleEl) {
            currentRoleEl.textContent = role.charAt(0).toUpperCase() + role.slice(1);
        }
    }
    
    // ========== NOTIFICATIONS ==========
    
    function setupNotifications() {
        const notificationsBtn = document.getElementById('enhanced-notifications');
        const notificationsPanel = document.getElementById('enhanced-notifications-panel');
        const notificationsClose = document.querySelector('.enhanced-notifications-close');
        
        if (notificationsBtn && notificationsPanel) {
            notificationsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsPanel.style.display = 
                    notificationsPanel.style.display === 'block' ? 'none' : 'block';
            });
        }
        
        if (notificationsClose && notificationsPanel) {
            notificationsClose.addEventListener('click', () => {
                notificationsPanel.style.display = 'none';
            });
        }
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (notificationsPanel && 
                !notificationsPanel.contains(e.target) && 
                !notificationsBtn.contains(e.target)) {
                notificationsPanel.style.display = 'none';
            }
        });
    }
    
    // ========== PROFILE MENU ==========
    
    function setupProfileMenu() {
        const profileBtn = document.getElementById('enhanced-profile-menu');
        const profilePanel = document.getElementById('enhanced-profile-panel');
        
        if (profileBtn && profilePanel) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profilePanel.style.display = 
                    profilePanel.style.display === 'block' ? 'none' : 'block';
            });
        }
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (profilePanel && 
                !profilePanel.contains(e.target) && 
                !profileBtn.contains(e.target)) {
                profilePanel.style.display = 'none';
            }
        });
    }
    
    // ========== QUICK ACTIONS ==========
    
    function setupQuickActions() {
        const quickActions = document.querySelectorAll('.enhanced-quick-action');
        
        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const actionType = action.getAttribute('data-action');
                handleQuickAction(actionType);
            });
        });
    }
    
    function handleQuickAction(action) {
        switch(action) {
            case 'create-post':
                showDashboardSection('feed');
                showEnhancedToast('Create new post', 'info');
                break;
            case 'search':
                showEnhancedToast('Search activated', 'info');
                break;
            case 'help':
                showEnhancedToast('Help & Support', 'info');
                break;
        }
    }
    
    // ========== HELPER FUNCTIONS ==========
    
    function initializeDashboardInteractions(section) {
        // Initialize any interactive elements in the loaded content
        // This is called after new content is loaded
        
        if (section === 'feed') {
            // Initialize feed interactions
            const likeButtons = document.querySelectorAll('.enhanced-post-action');
            likeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        showEnhancedToast('Post liked!', 'success');
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        showEnhancedToast('Post unliked', 'info');
                    }
                });
            });
        }
    }
    
    function showEnhancedToast(message, type = 'info') {
        // Use the enhanced UI toast function if available
        if (window.enhanced && window.enhanced.showToast) {
            window.enhanced.showToast(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
    
    function loadRoleDashboard(role) {
        currentRole = role;
        showDashboardSection('overview');
    }
    
    // ========== EXPOSE FUNCTIONS ==========
    
    window.enhancedDashboards = {
        switchRole: switchRole,
        showDashboard: showDashboardSection,
        getCurrentRole: () => currentRole,
        getCurrentUser: () => currentUser
    };
    
    // Enhanced UI actions for dashboard buttons
    window.enhancedUI = {
        createPost: function() {
            showEnhancedToast('Creating new post...', 'info');
        },
        findInvestors: function() {
            showEnhancedToast('Finding investors...', 'info');
        },
        browseCourses: function() {
            showEnhancedToast('Browsing courses...', 'info');
        },
        requestMentorship: function() {
            showEnhancedToast('Requesting mentorship...', 'info');
        },
        discoverStartups: function() {
            showEnhancedToast('Discovering startups...', 'info');
        },
        portfolioAnalytics: function() {
            showEnhancedToast('Opening portfolio analytics...', 'info');
        },
        marketReports: function() {
            showEnhancedToast('Loading market reports...', 'info');
        },
        coinvest: function() {
            showEnhancedToast('Finding co-investors...', 'info');
        },
        viewMentees: function() {
            showEnhancedToast('Viewing mentees...', 'info');
        },
        scheduleSession: function() {
            showEnhancedToast('Scheduling session...', 'info');
        },
        createContent: function() {
            showEnhancedToast('Creating content...', 'info');
        },
        communityForum: function() {
            showEnhancedToast('Opening community forum...', 'info');
        }
    };
    
})();