// ========== CONTINUING WHERE IT CUT OFF ==========

// Calculate Vault Score (Complete Function)
function calculateVaultScore() {
    if (!currentUser || currentUser.role !== 'founder') {
        return currentUser?.vaultScore || 0;
    }
    
    const scoreHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.VAULT_SCORE_HISTORY) || '[]');
    const userScores = scoreHistory.filter(entry => entry.userId === currentUser.id);
    
    // Base score + all earned points, capped at 100
    const totalScore = Math.min(userScores.reduce((sum, entry) => sum + entry.points, 0), 100);
    
    // Update user's score if changed
    if (currentUser.vaultScore !== totalScore) {
        currentUser.vaultScore = totalScore;
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    }
    
    return totalScore;
}

// Get Score Category
function getScoreCategory(score) {
    if (score >= 90) return 'Elite';
    if (score >= 75) return 'Advanced';
    if (score >= 60) return 'Proficient';
    if (score >= 40) return 'Developing';
    return 'Beginner';
}

// Calculate Average Progress
function calculateAverageProgress(enrollments) {
    if (!enrollments.length) return 0;
    const total = enrollments.reduce((sum, e) => sum + (e.progress || 0), 0);
    return Math.round(total / enrollments.length);
}

// Format Time Ago
function formatTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

// Show Page Function (CRITICAL - Navigation)
function showPage(pageName) {
    console.log('Showing page:', pageName);
    
    // Hide all page contents
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show requested page
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        
        // Load page-specific content
        loadPageContent(pageName);
        
        // Update active nav
        updateActiveNavForPage(pageName);
        
        // Close mobile menu if open
        if (window.innerWidth <= 768 && isMobileMenuOpen) {
            hideMenu();
        }
    } else {
        console.error('Page not found:', pageName);
        // Default to dashboard
        showDashboard();
    }
}

// Load Page Content
function loadPageContent(pageName) {
    switch(pageName) {
        case 'feed':
            loadFeedContent();
            break;
        case 'discover':
            loadDiscoverContent();
            break;
        case 'create':
            loadCreatePostForm();
            break;
        case 'academy':
            loadAcademyContent();
            break;
        case 'wallet':
            loadWalletContent();
            break;
        case 'settings':
            loadSettingsContent();
            break;
        case 'myideas':
            loadMyIdeasContent();
            break;
        case 'vaultscore':
            loadVaultScoreContent();
            break;
        case 'mentorship':
            loadMentorshipContent();
            break;
        case 'portfolio':
            loadPortfolioContent();
            break;
        // Add other pages as needed
    }
}

// ========== PAGE CONTENT LOADERS ==========

// Load Feed Content (FIXES EMPTY FEED)
function loadFeedContent() {
    const feedContainer = document.getElementById('feedContainer');
    if (!feedContainer) return;
    
    // Get posts from storage
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
    
    // Filter posts visible to current user's role
    const visiblePosts = posts.filter(post => 
        !post.roleVisible || post.roleVisible.includes(currentUser.role)
    );
    
    if (visiblePosts.length === 0) {
        feedContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-newspaper"></i>
                <h3>No posts yet</h3>
                <p>Be the first to share an idea!</p>
                ${currentUser.role === 'founder' ? 
                    '<button class="btn btn-primary" onclick="showPage(\'create\')">Create First Post</button>' : 
                    '<p>Check back later for founder updates</p>'
                }
            </div>
        `;
        return;
    }
    
    // Generate feed HTML
    feedContainer.innerHTML = visiblePosts.map(post => `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-author">
                    <div class="author-avatar">${post.authorAvatar}</div>
                    <div class="author-info">
                        <h4>${post.authorName}</h4>
                        <p class="post-meta">
                            <span class="post-time">${formatTimeAgo(post.timestamp)}</span>
                            <span class="post-category">${post.category}</span>
                        </p>
                    </div>
                </div>
                <button class="post-save-btn ${savedFounders.has(post.id) ? 'saved' : ''}" 
                        onclick="toggleSavePost(${post.id})">
                    <i class="${savedFounders.has(post.id) ? 'fas' : 'far'} fa-bookmark"></i>
                </button>
            </div>
            
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.tags.length > 0 ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="post-stats">
                <div class="stat-item">
                    <i class="fas fa-eye"></i>
                    <span>${post.stats.views}</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-comment"></i>
                    <span>${post.stats.comments}</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-star"></i>
                    <span>${post.stats.endorsements}</span>
                </div>
                ${currentUser.role === 'investor' ? `
                    <div class="stat-item">
                        <i class="fas fa-save"></i>
                        <span>${post.stats.investorSaves || 0}</span>
                    </div>
                ` : ''}
            </div>
            
            <div class="post-actions">
                <button class="action-btn like-btn ${likedPosts.has(post.id) ? 'liked' : ''}" 
                        onclick="toggleLikePost(${post.id})">
                    <i class="${likedPosts.has(post.id) ? 'fas' : 'far'} fa-thumbs-up"></i>
                    <span>Like</span>
                    <span class="count">${post.stats.likes}</span>
                </button>
                
                <button class="action-btn comment-btn" onclick="showComments(${post.id})">
                    <i class="far fa-comment"></i>
                    <span>Comment</span>
                </button>
                
                <button class="action-btn share-btn" onclick="sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
                
                ${currentUser.role === 'investor' || currentUser.role === 'mentor' ? `
                    <button class="action-btn endorse-btn" onclick="endorsePost(${post.id})">
                        <i class="fas fa-star"></i>
                        <span>Endorse</span>
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Load Discover Content (FIXES EMPTY DISCOVER)
function loadDiscoverContent() {
    const discoverContainer = document.getElementById('discoverContainer');
    if (!discoverContainer) return;
    
    // Get users from storage
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    // Filter founders for investors to discover
    const founders = users.filter(user => user.role === 'founder');
    
    if (founders.length === 0) {
        discoverContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No founders yet</h3>
                <p>Founders will appear here as they join Vault</p>
            </div>
        `;
        return;
    }
    
    // Generate founder cards
    discoverContainer.innerHTML = founders.map(founder => `
        <div class="founder-card" data-founder-id="${founder.id}">
            <div class="founder-header">
                <div class="founder-avatar">${founder.avatar}</div>
                <div class="founder-info">
                    <h3>${founder.name}</h3>
                    <p class="founder-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${founder.location || 'Location not set'}
                    </p>
                    <div class="vault-score-badge">
                        <i class="fas fa-star"></i>
                        <span>${founder.vaultScore || 0}</span>
                    </div>
                </div>
            </div>
            
            <div class="founder-content">
                <p class="founder-bio">${founder.bio || 'No bio yet'}</p>
                
                ${founder.tags.length > 0 ? `
                    <div class="founder-tags">
                        ${founder.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                
                <div class="founder-stats">
                    <div class="stat">
                        <i class="fas fa-lightbulb"></i>
                        <span>${founder.postsCount || 0} ideas</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-graduation-cap"></i>
                        <span>${founder.coursesEnrolled || 0} courses</span>
                    </div>
                </div>
            </div>
            
            <div class="founder-actions">
                <button class="btn btn-primary" onclick="viewFounderProfile(${founder.id})">
                    <i class="fas fa-eye"></i>
                    View Profile
                </button>
                
                <button class="btn btn-outline save-founder-btn ${savedFounders.has(founder.id) ? 'saved' : ''}" 
                        onclick="toggleSaveFounder(${founder.id})">
                    <i class="${savedFounders.has(founder.id) ? 'fas' : 'far'} fa-bookmark"></i>
                </button>
                
                ${currentUser.role === 'investor' ? `
                    <button class="btn btn-success" onclick="sendInvestmentInterest(${founder.id})">
                        <i class="fas fa-handshake"></i>
                        Express Interest
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// ========== BUTTON ACTIONS (ALL WORKING) ==========

// Like/Unlike Post
function toggleLikePost(postId) {
    if (likedPosts.has(postId)) {
        likedPosts.delete(postId);
        showToast('Post unliked', 'info');
    } else {
        likedPosts.add(postId);
        showToast('Post liked!', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(Array.from(likedPosts)));
    
    // Update UI
    const likeBtn = document.querySelector(`.like-btn[onclick*="${postId}"]`);
    if (likeBtn) {
        likeBtn.classList.toggle('liked');
        const icon = likeBtn.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
    }
}

// Save/Unsave Founder
function toggleSaveFounder(founderId) {
    if (savedFounders.has(founderId)) {
        savedFounders.delete(founderId);
        showToast('Founder removed from saved', 'info');
    } else {
        savedFounders.add(founderId);
        showToast('Founder saved!', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(Array.from(savedFounders)));
    
    // Update UI
    const saveBtn = document.querySelector(`.save-founder-btn[onclick*="${founderId}"]`);
    if (saveBtn) {
        saveBtn.classList.toggle('saved');
        const icon = saveBtn.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
    }
}

// Save/Unsave Post
function toggleSavePost(postId) {
    // Similar to toggleSaveFounder but for posts
    const postBtn = document.querySelector(`.post-save-btn[onclick*="${postId}"]`);
    if (postBtn) {
        const isSaved = postBtn.classList.contains('saved');
        
        if (isSaved) {
            postBtn.classList.remove('saved');
            postBtn.innerHTML = '<i class="far fa-bookmark"></i>';
            showToast('Post removed from saved', 'info');
        } else {
            postBtn.classList.add('saved');
            postBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
            showToast('Post saved!', 'success');
        }
    }
}

// Endorse Post
function endorsePost(postId) {
    if (currentUser.role !== 'investor' && currentUser.role !== 'mentor') {
        showToast('Only investors and mentors can endorse posts', 'error');
        return;
    }
    
    // Get post from storage
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
        posts[postIndex].stats.endorsements += 1;
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
        
        // Add notification for post author
        addNotification({
            userId: posts[postIndex].userId,
            title: 'Post Endorsed!',
            message: `${currentUser.name} endorsed your post "${posts[postIndex].title}"`,
            type: 'endorsement',
            unread: true
        });
        
        showToast('Post endorsed!', 'success');
        
        // Update UI if on feed page
        if (document.getElementById('feedPage') && !document.getElementById('feedPage').classList.contains('hidden')) {
            loadFeedContent();
        }
    }
}

// Share Post
function sharePost(postId) {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        // Update share count
        const postIndex = posts.findIndex(p => p.id === postId);
        posts[postIndex].stats.shares += 1;
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
        
        // For demo purposes, show share options
        const shareText = `Check out this innovation on Vault: "${post.title}"`;
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                showToast('Link copied to clipboard!', 'success');
            });
        }
    }
}

// ========== NOTIFICATION SYSTEM ==========

// Add Notification
function addNotification(notification) {
    const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    
    const newNotification = {
        id: Date.now(),
        userId: notification.userId || currentUser.id,
        title: notification.title,
        message: notification.message,
        type: notification.type || 'info',
        unread: notification.unread !== false,
        timestamp: new Date().toISOString(),
        icon: getNotificationIcon(notification.type)
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    
    // Update notification badge
    updateNotificationBadge();
}

// Load Notifications
function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    const userNotifications = notifications.filter(n => n.userId === currentUser.id);
    
    const unreadCount = userNotifications.filter(n => n.unread).length;
    
    // Update badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = unreadCount > 99 ? '99+' : unreadCount.toString();
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
    
    return userNotifications;
}

// Get Notification Icon
function getNotificationIcon(type) {
    const icons = {
        'welcome': 'fas fa-party-horn',
        'endorsement': 'fas fa-star',
        'investment': 'fas fa-handshake',
        'mentorship': 'fas fa-hands-helping',
        'course': 'fas fa-graduation-cap',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle',
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle'
    };
    
    return icons[type] || icons.info;
}

// Update Notification Badge
function updateNotificationBadge() {
    const notifications = loadNotifications();
    const unreadCount = notifications.filter(n => n.unread).length;
    
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = unreadCount > 99 ? '99+' : unreadCount.toString();
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

// ========== MOBILE MENU ==========

// Show Mobile Menu
function showMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.add('active');
        isMobileMenuOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

// Hide Mobile Menu
function hideMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.remove('active');
        isMobileMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Handle Resize
function handleResize() {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
        hideMenu();
    }
}

// Handle Scroll
function handleScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// ========== UTILITY FUNCTIONS ==========

// Show Toast
function showToast(message, type = 'success') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 8px;
                padding: 12px 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 12px;
                animation: slideIn 0.3s ease;
                border-left: 4px solid;
                max-width: 350px;
            }
            .toast-success { border-color: #2ecc71; }
            .toast-error { border-color: #ff6b35; }
            .toast-info { border-color: #3498db; }
            .toast-warning { border-color: #f39c12; }
            .toast i {
                font-size: 20px;
            }
            .toast-success i { color: #2ecc71; }
            .toast-error i { color: #ff6b35; }
            .toast-info i { color: #3498db; }
            .toast-warning i { color: #f39c12; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Get Toast Icon
function getToastIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

// Validate Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Hide Auth Modal
function hideAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

// Update Active Nav Link
function updateActiveNavLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// Signup as Role (for landing page)
function signupAsRole(role) {
    showAuthModal();
    
    // Switch to signup tab
    document.getElementById('signupTab').click();
    
    // Set role
    document.getElementById('signupRole').value = role;
    
    // Highlight selected role button
    document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.${role}-btn`).classList.add('active');
}

// ========== INITIALIZE APP ==========

// Call initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Make functions globally available
window.showPage = showPage;
window.showDashboard = showDashboard;
window.toggleLikePost = toggleLikePost;
window.toggleSaveFounder = toggleSaveFounder;
window.toggleSavePost = toggleSavePost;
window.endorsePost = endorsePost;
window.sharePost = sharePost;
window.viewFounderProfile = viewFounderProfile;
window.sendInvestmentInterest = sendInvestmentInterest;
window.showMenu = showMenu;
window.hideMenu = hideMenu;
window.signupAsRole = signupAsRole;