// ========== ENHANCEMENTS-UI.JS ==========
// Visual enhancements that run alongside existing code
// NO modifications to existing functions or variables

(function() {
    'use strict';
    
    console.log('Enhanced UI loading...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEnhancements);
    } else {
        initEnhancements();
    }
    
    function initEnhancements() {
        console.log('Initializing enhanced features...');
        
        // 1. Add background image to hero section (first blue section)
        addBackgroundImage();
        
        // 2. Initialize scroll-to-top button
        initScrollToTop();
        
        // 3. Initialize dark/light mode toggle
        initThemeToggle();
        
        // 4. Add enhanced hover effects to new elements
        initEnhancedHoverEffects();
        
        // 5. Monitor for existing auth modal and enhance it
        enhanceExistingAuthModal();
        
        console.log('Enhanced features initialized successfully');
    }
    
    // ========== BACKGROUND IMAGE IMPLEMENTATION ==========
    function addBackgroundImage() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Check if we've already added the overlay
        if (heroSection.querySelector('.enhanced-bg-overlay')) return;
        
        // Create the overlay wrapper
        const overlay = document.createElement('div');
        overlay.className = 'enhanced-bg-overlay';
        overlay.setAttribute('data-target-section', 'hero-section');
        
        // Insert it at the beginning of hero section
        heroSection.insertBefore(overlay, heroSection.firstChild);
        
        console.log('Added background image overlay to hero section');
    }
    
    // ========== SMOOTH SCROLL-TO-TOP BUTTON ==========
    function initScrollToTop() {
        const scrollBtn = document.getElementById('enhanced-scroll-top');
        if (!scrollBtn) return;
        
        // Initially hide the button
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        // Smooth scroll to top when clicked
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== DARK/LIGHT MODE TOGGLE ==========
    function initThemeToggle() {
        const themeToggle = document.getElementById('enhanced-theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        if (!themeToggle || !themeIcon) return;
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('enhanced-theme') || 'light';
        applyTheme(savedTheme);
        
        // Toggle theme on click
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-enhanced-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            applyTheme(newTheme);
            localStorage.setItem('enhanced-theme', newTheme);
            
            // Show feedback
            showEnhancedToast(`Switched to ${newTheme} mode`, 'info');
        });
    }
    
    function applyTheme(theme) {
        document.body.setAttribute('data-enhanced-theme', theme);
        
        const themeToggle = document.getElementById('enhanced-theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        if (!themeToggle || !themeIcon) return;
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('title', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('title', 'Switch to dark mode');
        }
    }
    
    // ========== ENHANCED HOVER EFFECTS ==========
    function initEnhancedHoverEffects() {
        // Add hover effects only to enhanced elements
        const enhancedElements = document.querySelectorAll('.enhanced-ui-element, .enhanced-btn, .enhanced-nav-link');
        
        enhancedElements.forEach(element => {
            // Add hover class on mouseenter
            element.addEventListener('mouseenter', function() {
                this.classList.add('enhanced-hover');
            });
            
            // Remove hover class on mouseleave
            element.addEventListener('mouseleave', function() {
                this.classList.remove('enhanced-hover');
            });
            
            // Add active class on mousedown
            element.addEventListener('mousedown', function() {
                this.classList.add('enhanced-active');
            });
            
            // Remove active class on mouseup
            element.addEventListener('mouseup', function() {
                this.classList.remove('enhanced-active');
            });
            
            // Remove active class if mouse leaves while pressed
            element.addEventListener('mouseleave', function() {
                this.classList.remove('enhanced-active');
            });
        });
    }
    
    // ========== ENHANCE EXISTING AUTH MODAL ==========
    function enhanceExistingAuthModal() {
        const existingAuthModal = document.getElementById('authModal');
        if (!existingAuthModal) return;
        
        // Add data attribute to identify enhanced modal
        existingAuthModal.setAttribute('data-enhanced', 'true');
        
        // Add role selection enhancement
        const roleSelects = document.querySelectorAll('#loginRole, #signupRole');
        roleSelects.forEach(select => {
            select.addEventListener('change', function() {
                const role = this.value;
                if (role) {
                    showEnhancedToast(`Selected role: ${role.charAt(0).toUpperCase() + role.slice(1)}`, 'info');
                }
            });
        });
        
        // Enhance form submission
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                // Don't interfere with existing auth.js
                // Just add enhanced feedback
                const role = document.getElementById('loginRole')?.value;
                if (role) {
                    setTimeout(() => {
                        showEnhancedToast(`Logging in as ${role}...`, 'info');
                    }, 100);
                }
            });
        }
        
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                const role = document.getElementById('signupRole')?.value;
                if (role) {
                    setTimeout(() => {
                        showEnhancedToast(`Creating ${role} account...`, 'info');
                    }, 100);
                }
            });
        }
    }
    
    // ========== ENHANCED TOAST NOTIFICATION ==========
    function showEnhancedToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let container = document.getElementById('enhanced-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'enhanced-toast-container';
            container.className = 'enhanced-toast-container';
            document.body.appendChild(container);
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `enhanced-toast enhanced-toast-${type}`;
        
        // Set icon based on type
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        if (type === 'warning') icon = 'fa-exclamation-triangle';
        
        toast.innerHTML = `
            <div class="enhanced-toast-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="enhanced-toast-content">
                <p>${message}</p>
            </div>
            <button class="enhanced-toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (toast.parentElement) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // ========== ENHANCED LOADING INDICATOR ==========
    function showEnhancedLoading(show = true) {
        let loader = document.getElementById('enhanced-loading');
        
        if (show) {
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'enhanced-loading';
                loader.className = 'enhanced-loading-overlay';
                loader.innerHTML = `
                    <div class="enhanced-loading-spinner"></div>
                    <p>Loading enhanced features...</p>
                `;
                document.body.appendChild(loader);
            }
            loader.style.display = 'flex';
        } else if (loader) {
            loader.style.display = 'none';
        }
    }
    
    // ========== MAKE FUNCTIONS AVAILABLE ==========
    // Only expose functions that don't conflict with existing ones
    window.enhanced = {
        showToast: showEnhancedToast,
        toggleTheme: function() {
            const themeToggle = document.getElementById('enhanced-theme-toggle');
            if (themeToggle) themeToggle.click();
        },
        scrollToTop: function() {
            const scrollBtn = document.getElementById('enhanced-scroll-top');
            if (scrollBtn) scrollBtn.click();
        }
    };
    
    // Check if we should auto-show enhancements based on URL
    function checkUrlForEnhancements() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('enhanced')) {
            console.log('Enhanced mode activated via URL parameter');
        }
    }
    
    // Run URL check
    checkUrlForEnhancements();
    
})();