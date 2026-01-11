// ========== ENHANCEMENTS-AUTH.JS ==========
// Enhanced authentication system that works alongside existing auth
// Uses localStorage for demo purposes

(function() {
    'use strict';
    
    const ENHANCED_STORAGE_KEYS = {
        ENHANCED_USERS: 'enhanced_vault_users',
        ENHANCED_SESSIONS: 'enhanced_vault_sessions',
        ENHANCED_PREFERENCES: 'enhanced_vault_prefs',
        ENHANCED_CURRENT_USER: 'enhanced_current_user'
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEnhancedAuth);
    } else {
        initEnhancedAuth();
    }
    
    function initEnhancedAuth() {
        console.log('Initializing enhanced authentication...');
        
        // Check for existing session
        checkExistingSession();
        
        // Enhance existing auth modal with additional features
        enhanceAuthModal();
        
        // Setup enhanced authentication forms
        setupEnhancedAuthForms();
        
        // Monitor existing auth system for login/logout events
        monitorExistingAuth();
        
        console.log('Enhanced auth initialized');
    }
    
    // ========== ENHANCED AUTH FUNCTIONS ==========
    
    function checkExistingSession() {
        const session = getEnhancedSession();
        
        if (session && session.userId) {
            console.log('Enhanced session found for user:', session.userId);
            
            // Check if user exists in enhanced storage
            const user = getEnhancedUser(session.userId);
            if (user) {
                console.log('Enhanced user loaded:', user.name);
                
                // Show enhanced dashboard after a brief delay
                // to ensure original site is loaded first
                setTimeout(() => {
                    showEnhancedDashboard(user);
                }, 500);
            }
        } else {
            console.log('No enhanced session found');
        }
    }
    
    function enhanceAuthModal() {
        const existingAuthModal = document.getElementById('authModal');
        if (!existingAuthModal) return;
        
        // Add enhanced event listeners to existing forms
        const existingLoginForm = document.getElementById('loginForm');
        const existingSignupForm = document.getElementById('signupForm');
        
        if (existingLoginForm) {
            existingLoginForm.addEventListener('submit', handleExistingLogin);
        }
        
        if (existingSignupForm) {
            existingSignupForm.addEventListener('submit', handleExistingSignup);
        }
    }
    
    function handleExistingLogin(e) {
        // Don't prevent default - let existing auth.js handle it
        // Just capture the credentials for enhanced system
        
        setTimeout(() => {
            const email = document.getElementById('loginEmail')?.value;
            const password = document.getElementById('loginPassword')?.value;
            const role = document.getElementById('loginRole')?.value;
            
            if (email && password && role) {
                console.log('Enhanced auth: Captured login attempt');
                
                // Check if user exists in enhanced storage
                const user = findEnhancedUser(email);
                
                if (user) {
                    // User exists in enhanced system
                    console.log('Enhanced user found:', user.name);
                    
                    // Start enhanced session
                    startEnhancedSession(user);
                    
                    // Show enhanced dashboard after a delay
                    setTimeout(() => {
                        showEnhancedDashboard(user);
                    }, 1000);
                } else {
                    // User doesn't exist in enhanced system
                    // Create enhanced user from existing credentials
                    console.log('Creating enhanced user from existing login...');
                    
                    const enhancedUser = createEnhancedUserFromExisting(email, password, role);
                    if (enhancedUser) {
                        startEnhancedSession(enhancedUser);
                        
                        setTimeout(() => {
                            showEnhancedDashboard(enhancedUser);
                        }, 1000);
                    }
                }
            }
        }, 100);
    }
    
    function handleExistingSignup(e) {
        setTimeout(() => {
            const name = document.getElementById('signupName')?.value;
            const email = document.getElementById('signupEmail')?.value;
            const password = document.getElementById('signupPassword')?.value;
            const role = document.getElementById('signupRole')?.value;
            
            if (name && email && password && role) {
                console.log('Enhanced auth: Captured signup attempt');
                
                // Create enhanced user
                const enhancedUser = createEnhancedUser({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    createdAt: new Date().toISOString()
                });
                
                if (enhancedUser) {
                    startEnhancedSession(enhancedUser);
                    
                    // Show welcome message
                    showEnhancedToast(`Welcome to enhanced Vault, ${name}!`, 'success');
                    
                    setTimeout(() => {
                        showEnhancedDashboard(enhancedUser);
                    }, 1500);
                }
            }
        }, 100);
    }
    
    // ========== ENHANCED USER MANAGEMENT ==========
    
    function createEnhancedUser(userData) {
        try {
            // Get existing users
            const users = JSON.parse(localStorage.getItem(ENHANCED_STORAGE_KEYS.ENHANCED_USERS) || '[]');
            
            // Check if user already exists
            const existingUser = users.find(u => u.email === userData.email);
            if (existingUser) {
                console.log('Enhanced user already exists:', existingUser.name);
                return existingUser;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                role: userData.role,
                avatar: generateAvatar(userData.name),
                vaultScore: userData.role === 'founder' ? 10 : 0,
                createdAt: userData.createdAt || new Date().toISOString(),
                bio: `${userData.role} at Vault Africa`,
                location: 'Africa',
                tags: getDefaultTagsForRole(userData.role),
                stats: {
                    posts: 0,
                    connections: 0,
                    investments: 0,
                    mentorshipSessions: 0
                }
            };
            
            // Add to users array
            users.push(newUser);
            localStorage.setItem(ENHANCED_STORAGE_KEYS.ENHANCED_USERS, JSON.stringify(users));
            
            console.log('Enhanced user created:', newUser.name);
            return newUser;
            
        } catch (error) {
            console.error('Error creating enhanced user:', error);
            return null;
        }
    }
    
    function createEnhancedUserFromExisting(email, password, role) {
        // Generate a name from email
        const name = email.split('@')[0];
        const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1);
        
        return createEnhancedUser({
            name: nameFormatted,
            email: email,
            password: password,
            role: role,
            createdAt: new Date().toISOString()
        });
    }
    
    function findEnhancedUser(email) {
        try {
            const users = JSON.parse(localStorage.getItem(ENHANCED_STORAGE_KEYS.ENHANCED_USERS) || '[]');
            return users.find(u => u.email === email);
        } catch (error) {
            console.error('Error finding enhanced user:', error);
            return null;
        }
    }
    
    function getEnhancedUser(userId) {
        try {
            const users = JSON.parse(localStorage.getItem(ENHANCED_STORAGE_KEYS.ENHANCED_USERS) || '[]');
            return users.find(u => u.id === userId);
        } catch (error) {
            console.error('Error getting enhanced user:', error);
            return null;
        }
    }
    
    // ========== ENHANCED SESSION MANAGEMENT ==========
    
    function startEnhancedSession(user) {
        try {
            const session = {
                userId: user.id,
                userRole: user.role,
                userName: user.name,
                startedAt: new Date().toISOString(),
                token: generateToken()
            };
            
            localStorage.setItem(ENHANCED_STORAGE_KEYS.ENHANCED_CURRENT_USER, JSON.stringify(session));
            
            // Add to session history
            const sessions = JSON.parse(localStorage.getItem(ENHANCED_STORAGE_KEYS.ENHANCED_SESSIONS) || '[]');
            sessions.push(session);
            localStorage.setItem(ENHANCED_STORAGE_KEYS.ENHANCED_SESSIONS, JSON.stringify(sessions));
            
            console.log('Enhanced session started for:', user.name);
            return session;
            
        } catch (error) {
            console.error('Error starting enhanced session:', error);
            return null;
        }
    }
    
    function getEnhancedSession() {
        try {
            return JSON.parse(localStorage.getItem(ENHANCED_STORAGE_KEYS.ENHANCED_CURRENT_USER));
        } catch (error) {
            console.error('Error getting enhanced session:', error);
            return null;
        }
    }
    
    function endEnhancedSession() {
        try {
            localStorage.removeItem(ENHANCED_STORAGE_KEYS.ENHANCED_CURRENT_USER);
            console.log('Enhanced session ended');
            return true;
        } catch (error) {
            console.error('Error ending enhanced session:', error);
            return false;
        }
    }
    
    // ========== ENHANCED DASHBOARD DISPLAY ==========
    
    function showEnhancedDashboard(user) {
        console.log('Showing enhanced dashboard for:', user.name);
        
        // Hide original site (without modifying it)
        hideOriginalSite();
        
        // Show enhanced dashboard layer
        const dashboardLayer = document.getElementById('enhanced-dashboard-layer');
        if (dashboardLayer) {
            dashboardLayer.style.display = 'block';
            
            // Update dashboard with user info
            updateDashboardForUser(user);
            
            // Load appropriate dashboard content
            loadRoleDashboard(user.role);
            
            // Show welcome message
            showEnhancedToast(`Welcome to your enhanced ${user.role} dashboard, ${user.name}!`, 'success');
        }
    }
    
    function hideOriginalSite() {
        // Hide original site by fading it out
        // This doesn't modify the original structure
        const originalSite = document.getElementById('landingPage');
        if (originalSite) {
            originalSite.style.transition = 'opacity 0.5s ease';
            originalSite.style.opacity = '0.1';
            originalSite.style.pointerEvents = 'none';
        }
    }
    
    function restoreOriginalSite() {
        // Restore original site visibility
        const originalSite = document.getElementById('landingPage');
        if (originalSite) {
            originalSite.style.opacity = '1';
            originalSite.style.pointerEvents = 'auto';
        }
        
        // Hide enhanced dashboard
        const dashboardLayer = document.getElementById('enhanced-dashboard-layer');
        if (dashboardLayer) {
            dashboardLayer.style.display = 'none';
        }
    }
    
    // ========== UTILITY FUNCTIONS ==========
    
    function generateAvatar(name) {
        // Simple avatar generation from initials
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        return initials.substring(0, 2);
    }
    
    function generateToken() {
        return 'enhanced_' + Math.random().toString(36).substr(2) + Date.now().toString(36);
    }
    
    function getDefaultTagsForRole(role) {
        const tags = {
            founder: ['Innovator', 'Entrepreneur', 'Startup', 'African Founder'],
            investor: ['Angel Investor', 'VC', 'Funding', 'Portfolio'],
            mentor: ['Advisor', 'Expert', 'Coach', 'Industry Leader']
        };
        return tags[role] || ['Vault Member'];
    }
    
    function setupEnhancedAuthForms() {
        // This function sets up enhanced standalone auth forms
        // Currently using existing forms, but can be extended
    }
    
    function monitorExistingAuth() {
        // Monitor the existing auth system for changes
        // This is a simple observer for demo purposes
        
        setInterval(() => {
            const authModal = document.getElementById('authModal');
            if (authModal && !authModal.classList.contains('hidden')) {
                // Auth modal is visible
                console.log('Enhanced auth: Monitoring active auth modal');
            }
        }, 1000);
    }
    
    // ========== EXPOSE ENHANCED AUTH FUNCTIONS ==========
    
    window.enhancedAuth = {
        login: function(email, password, role) {
            const user = findEnhancedUser(email);
            if (user) {
                startEnhancedSession(user);
                showEnhancedDashboard(user);
                return true;
            }
            return false;
        },
        
        logout: function() {
            endEnhancedSession();
            restoreOriginalSite();
            showEnhancedToast('Successfully logged out', 'info');
        },
        
        getCurrentUser: function() {
            return getEnhancedSession();
        },
        
        isLoggedIn: function() {
            return !!getEnhancedSession();
        }
    };
    
    // ========== ENHANCED LOGOUT FUNCTIONALITY ==========
    
    document.addEventListener('click', function(e) {
        // Handle logout from enhanced dashboard
        if (e.target.closest('#enhanced-logout-btn') || 
            e.target.closest('.enhanced-logout')) {
            e.preventDefault();
            window.enhancedAuth.logout();
        }
    });
    
})();