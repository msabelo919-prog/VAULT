// ========== ENHANCEMENTS-DATA.JS ==========
// Mock data management for enhanced features

(function() {
    'use strict';
    
    const ENHANCED_DATA_KEYS = {
        ENHANCED_POSTS: 'enhanced_posts',
        ENHANCED_NOTIFICATIONS: 'enhanced_notifications',
        ENHANCED_ACTIVITIES: 'enhanced_activities',
        ENHANCED_SETTINGS: 'enhanced_settings'
    };
    
    // Initialize demo data if needed
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEnhancedData);
    } else {
        initEnhancedData();
    }
    
    function initEnhancedData() {
        console.log('Initializing enhanced data...');
        
        // Check if we need to create demo data
        createDemoDataIfNeeded();
        
        // Load any initial data needed
        loadInitialData();
        
        console.log('Enhanced data initialized');
    }
    
    // ========== DEMO DATA CREATION ==========
    
    function createDemoDataIfNeeded() {
        // Check if enhanced posts exist
        if (!localStorage.getItem(ENHANCED_DATA_KEYS.ENHANCED_POSTS)) {
            createDemoPosts();
        }
        
        // Check if enhanced notifications exist
        if (!localStorage.getItem(ENHANCED_DATA_KEYS.ENHANCED_NOTIFICATIONS)) {
            createDemoNotifications();
        }
        
        // Check if enhanced activities exist
        if (!localStorage.getItem(ENHANCED_DATA_KEYS.ENHANCED_ACTIVITIES)) {
            createDemoActivities();
        }
    }
    
    function createDemoPosts() {
        const demoPosts = [
            {
                id: 'post_001',
                authorId: 'user_001',
                authorName: 'Alex Kamau',
                authorAvatar: 'AK',
                title: 'Funding Milestone Achieved!',
                content: 'We just closed our seed round of $500K! Building Africa\'s future one innovation at a time.',
                category: 'Announcement',
                tags: ['Funding', 'Startup', 'AfricaTech'],
                roleVisible: ['founder', 'investor', 'mentor'],
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                stats: {
                    views: 245,
                    likes: 42,
                    comments: 15,
                    shares: 8,
                    endorsements: 12
                }
            },
            {
                id: 'post_002',
                authorId: 'user_002',
                authorName: 'Investor Network Africa',
                authorAvatar: 'IN',
                title: 'Investment Opportunity: Agri-tech in Kenya',
                content: 'Looking for co-investors for a promising Agri-tech startup in Kenya. Strong team, proven traction.',
                category: 'Investment',
                tags: ['AgriTech', 'Kenya', 'Investment', 'Opportunity'],
                roleVisible: ['investor', 'mentor'],
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
                stats: {
                    views: 189,
                    likes: 31,
                    comments: 9,
                    shares: 5,
                    endorsements: 8
                }
            },
            {
                id: 'post_003',
                authorId: 'user_003',
                authorName: 'Sarah Mensah',
                authorAvatar: 'SM',
                title: 'Mentorship Session Insights',
                content: 'Just had an amazing mentorship session with a fintech founder. The African startup ecosystem is thriving!',
                category: 'Experience',
                tags: ['Mentorship', 'FinTech', 'Ecosystem'],
                roleVisible: ['founder', 'investor', 'mentor'],
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
                stats: {
                    views: 167,
                    likes: 28,
                    comments: 7,
                    shares: 3,
                    endorsements: 6
                }
            }
        ];
        
        localStorage.setItem(ENHANCED_DATA_KEYS.ENHANCED_POSTS, JSON.stringify(demoPosts));
        console.log('Created demo posts');
    }
    
    function createDemoNotifications() {
        const demoNotifications = [
            {
                id: 'notif_001',
                userId: 'current_user',
                title: 'Welcome to Enhanced Vault!',
                message: 'Your enhanced dashboard is now active with role-based features.',
                type: 'welcome',
                icon: 'fas fa-party-horn',
                unread: false,
                timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
            },
            {
                id: 'notif_002',
                userId: 'current_user',
                title: 'New Connection Request',
                message: 'Alex Kamau wants to connect with you.',
                type: 'connection',
                icon: 'fas fa-user-plus',
                unread: true,
                timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 minutes ago
            },
            {
                id: 'notif_003',
                userId: 'current_user',
                title: 'Mentorship Opportunity',
                message: 'A founder in your sector is looking for mentorship.',
                type: 'mentorship',
                icon: 'fas fa-hands-helping',
                unread: true,
                timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() // 10 minutes ago
            }
        ];
        
        localStorage.setItem(ENHANCED_DATA_KEYS.ENHANCED_NOTIFICATIONS, JSON.stringify(demoNotifications));
        console.log('Created demo notifications');
    }
    
    function createDemoActivities() {
        const demoActivities = [
            {
                id: 'activity_001',
                userId: 'user_001',
                type: 'post_created',
                content: 'Created a new post about funding',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                roleVisible: ['founder', 'investor']
            },
            {
                id: 'activity_002',
                userId: 'user_002',
                type: 'investment_made',
                content: 'Invested $100K in Agri-tech startup',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                roleVisible: ['investor']
            },
            {
                id: 'activity_003',
                userId: 'user_003',
                type: 'mentorship_completed',
                content: 'Completed mentorship session with startup founder',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                roleVisible: ['mentor', 'founder']
            }
        ];
        
        localStorage.setItem(ENHANCED_DATA_KEYS.ENHANCED_ACTIVITIES, JSON.stringify(demoActivities));
        console.log('Created demo activities');
    }
    
    // ========== DATA MANAGEMENT FUNCTIONS ==========
    
    function loadInitialData() {
        // Load any initial data needed for enhanced features
        // This can be extended based on what features are used
        
        const currentUser = getCurrentEnhancedUser();
        if (currentUser) {
            console.log('Current enhanced user:', currentUser.name);
        }
    }
    
    // ========== DATA RETRIEVAL FUNCTIONS ==========
    
    function getEnhancedPosts(role = null) {
        try {
            const posts = JSON.parse(localStorage.getItem(ENHANCED_DATA_KEYS.ENHANCED_POSTS) || '[]');
            
            if (role) {
                return posts.filter(post => 
                    !post.roleVisible || post.roleVisible.includes(role)
                );
            }
            
            return posts;
        } catch (error) {
            console.error('Error getting enhanced posts:', error);
            return [];
        }
    }
    
    function getEnhancedNotifications(userId = 'current_user') {
        try {
            const notifications = JSON.parse(localStorage.getItem(ENHANCED_DATA_KEYS.ENHANCED_NOTIFICATIONS) || '[]');
            return notifications.filter(notif => notif.userId === userId);
        } catch (error) {
            console.error('Error getting enhanced notifications:', error);
            return [];
        }
    }
    
    function getEnhancedActivities(role = null) {
        try {
            const activities = JSON.parse(localStorage.getItem(ENHANCED_DATA_KEYS.ENHANCED_ACTIVITIES) || '[]');
            
            if (role) {
                return activities.filter(activity => 
                    !activity.roleVisible || activity.roleVisible.includes(role)
                );
            }
            
            return activities;
        } catch (error) {
            console.error('Error getting enhanced activities:', error);
            return [];
        }
    }
    
    function getCurrentEnhancedUser() {
        try {
            const session = JSON.parse(localStorage.getItem('enhanced_current_user'));
            if (session && session.userId) {
                const users = JSON.parse(localStorage.getItem('enhanced_vault_users') || '[]');
                return users.find(user => user.id === session.userId);
            }
            return null;
        } catch (error) {
            console.error('Error getting current enhanced user:', error);
            return null;
        }
    }
    
    // ========== DATA MODIFICATION FUNCTIONS ==========
    
    function addEnhancedPost(postData) {
        try {
            const posts = getEnhancedPosts();
            
            const newPost = {
                id: 'post_' + Date.now(),
                authorId: postData.authorId || 'current_user',
                authorName: postData.authorName || 'User',
                authorAvatar: postData.authorAvatar || 'UU',
                title: postData.title || 'New Post',
                content: postData.content || '',
                category: postData.category || 'General',
                tags: postData.tags || [],
                roleVisible: postData.roleVisible || ['founder', 'investor', 'mentor'],
                timestamp: new Date().toISOString(),
                stats: {
                    views: 0,
                    likes: 0,
                    comments: 0,
                    shares: 0,
                    endorsements: 0
                }
            };
            
            posts.unshift(newPost);
            localStorage.setItem(ENHANCED_DATA_KEYS.ENHANCED_POSTS, JSON.stringify(posts));
            
            console.log('Added enhanced post:', newPost.title);
            return newPost;
        } catch (error) {
            console.error('Error adding enhanced post:', error);
            return null;
        }
    }
    
    function addEnhancedNotification(notificationData) {
        try {
            const notifications = getEnhancedNotifications();
            
            const newNotification = {
                id: 'notif_' + Date.now(),
                userId: notificationData.userId || 'current_user',
                title: notificationData.title || 'Notification',
                message: notificationData.message || '',
                type: notificationData.type || 'info',
                icon: getNotificationIcon(notificationData.type),
                unread: notificationData.unread !== false,
                timestamp: new Date().toISOString()
            };
            
            notifications.unshift(newNotification);
            localStorage.setItem(ENHANCED_DATA_KEYS.ENHANCED_NOTIFICATIONS, JSON.stringify(notifications));
            
            return newNotification;
        } catch (error) {
            console.error('Error adding enhanced notification:', error);
            return null;
        }
    }
    
    function markNotificationAsRead(notificationId) {
        try {
            const notifications = JSON.parse(localStorage.getItem(ENHANCED_DATA_KEYS.ENHANCED_NOTIFICATIONS) || '[]');
            const notificationIndex = notifications.findIndex(n => n.id === notificationId);
            
            if (notificationIndex !== -1) {
                notifications[notificationIndex].unread = false;
                localStorage.setItem(ENHANCED_DATA_KEYS.ENHANCED_NOTIFICATIONS, JSON.stringify(notifications));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return false;
        }
    }
    
    // ========== UTILITY FUNCTIONS ==========
    
    function getNotificationIcon(type) {
        const icons = {
            welcome: 'fas fa-party-horn',
            connection: 'fas fa-user-plus',
            investment: 'fas fa-handshake',
            mentorship: 'fas fa-hands-helping',
            post: 'fas fa-newspaper',
            comment: 'fas fa-comment',
            like: 'fas fa-thumbs-up',
            endorsement: 'fas fa-star',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle',
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle'
        };
        
        return icons[type] || icons.info;
    }
    
    function getUnreadNotificationCount(userId = 'current_user') {
        const notifications = getEnhancedNotifications(userId);
        return notifications.filter(n => n.unread).length;
    }
    
    // ========== EXPOSE FUNCTIONS ==========
    
    window.enhancedData = {
        // Data retrieval
        getPosts: getEnhancedPosts,
        getNotifications: getEnhancedNotifications,
        getActivities: getEnhancedActivities,
        getCurrentUser: getCurrentEnhancedUser,
        
        // Data modification
        addPost: addEnhancedPost,
        addNotification: addEnhancedNotification,
        markNotificationAsRead: markNotificationAsRead,
        
        // Utility
        getUnreadNotificationCount: getUnreadNotificationCount,
        
        // Demo data
        resetDemoData: function() {
            createDemoPosts();
            createDemoNotifications();
            createDemoActivities();
            console.log('Enhanced demo data reset');
            return true;
        }
    };
    
    // Initialize data on window load
    window.addEventListener('load', function() {
        console.log('Enhanced data system ready');
        
        // Check if we should show any data-related messages
        const unreadCount = getUnreadNotificationCount();
        if (unreadCount > 0) {
            console.log(`You have ${unreadCount} unread notifications`);
        }
    });
    
})();