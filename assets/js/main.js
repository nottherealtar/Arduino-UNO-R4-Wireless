// Arduino UNO R4 WiFi Journey - Interactive JavaScript

// Global state management
const AppState = {
    currentModule: 1,
    selectedPath: null,
    progress: {
        module1: 0,
        module2: 0,
        module3: 0,
        module4: 0,
        module5: 0
    },
    userPreferences: {
        experience: 'beginner',
        location: 'south-africa',
        budget: 1000
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadUserProgress();
    setupEventListeners();
    animateOnScroll();
});

// App initialization
function initializeApp() {
    console.log('Arduino UNO R4 WiFi Journey - Interactive Guide Loaded');
    updateProgressBar();
    loadSavedPreferences();
    
    // Add fade-in animation to main elements
    const elements = document.querySelectorAll('.module-card, .path-card, .tool-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in');
        }, index * 100);
    });
}

// Event Listeners Setup
function setupEventListeners() {
    // Module indicator clicks
    document.querySelectorAll('.module-indicator').forEach(indicator => {
        indicator.addEventListener('click', function() {
            const moduleNum = parseInt(this.dataset.module);
            switchToModule(moduleNum);
        });
    });
    
    // Tool card clicks
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', function() {
            const toolType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            openTool(toolType);
        });
    });
    
    // Path selector clicks
    document.querySelectorAll('.path-card').forEach(card => {
        card.addEventListener('click', function() {
            const pathType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            selectPath(pathType);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Path Selection System
function selectPath(pathType) {
    AppState.selectedPath = pathType;
    
    // Visual feedback
    document.querySelectorAll('.path-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    event.target.closest('.path-card').classList.add('selected');
    
    // Update user preferences
    const experienceMap = {
        'beginner': 'beginner',
        'intermediate': 'intermediate', 
        'advanced': 'advanced'
    };
    
    AppState.userPreferences.experience = experienceMap[pathType] || 'beginner';
    
    // Show personalized recommendations
    showPathRecommendations(pathType);
    
    // Save to localStorage
    saveUserPreferences();
    
    // Analytics (mock)
    trackEvent('path_selected', { path: pathType });
}

function showPathRecommendations(pathType) {
    const recommendations = {
        'beginner': {
            modules: [1, 2, 3, 4, 5],
            estimatedTime: '40 hours',
            suggestedOrder: ['safety', 'theory', 'hardware', 'setup', 'basic-code', 'projects'],
            budget: 'R1000-R2000'
        },
        'intermediate': {
            modules: [2, 3, 4, 5],
            estimatedTime: '20 hours', 
            suggestedOrder: ['hardware', 'setup', 'advanced-code', 'projects'],
            budget: 'R1500-R2500'
        },
        'advanced': {
            modules: [4, 5],
            estimatedTime: '10 hours',
            suggestedOrder: ['advanced-code', 'peripheral-spoofing', 'custom-projects'],
            budget: 'R2000-R3000'
        }
    };
    
    const rec = recommendations[pathType];
    
    // Create and show recommendation modal
    createRecommendationModal(rec, pathType);
}

function createRecommendationModal(recommendations, pathType) {
    const modal = document.createElement('div');
    modal.className = 'recommendation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-route"></i> Your Personalized Learning Path</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="path-summary">
                    <h4>${pathType.charAt(0).toUpperCase() + pathType.slice(1)} Path Selected</h4>
                    <div class="path-stats">
                        <div class="stat-item">
                            <i class="fas fa-clock"></i>
                            <span>Estimated Time: ${recommendations.estimatedTime}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>Budget Range: ${recommendations.budget}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-list"></i>
                            <span>Modules: ${recommendations.modules.length} recommended</span>
                        </div>
                    </div>
                </div>
                <div class="recommended-flow">
                    <h4>Suggested Learning Flow:</h4>
                    <div class="flow-steps">
                        ${recommendations.suggestedOrder.map((step, index) => `
                            <div class="flow-step">
                                <div class="step-number">${index + 1}</div>
                                <div class="step-content">
                                    <h5>${formatStepName(step)}</h5>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="startRecommendedPath('${pathType}')">
                    Start This Path
                </button>
                <button class="btn btn-outline" onclick="closeModal()">
                    Choose Different Path
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not exists
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .recommendation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: var(--card-bg);
                border-radius: var(--border-radius);
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: var(--box-shadow);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 25px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-header h3 {
                color: var(--primary-color);
                margin: 0;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: var(--text-color);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 5px;
            }
            
            .modal-body {
                padding: 25px;
            }
            
            .path-stats {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin: 15px 0;
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-muted);
            }
            
            .stat-item i {
                color: var(--accent-color);
                width: 20px;
            }
            
            .flow-steps {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-top: 15px;
            }
            
            .flow-step {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .step-number {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: var(--primary-color);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 0.9rem;
            }
            
            .step-content h5 {
                margin: 0;
                color: var(--text-color);
            }
            
            .modal-footer {
                padding: 25px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                gap: 15px;
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(styles);
    }
}

function formatStepName(step) {
    const stepNames = {
        'safety': 'Safety Guidelines & Ethics',
        'theory': 'Arduino & Electronics Theory',
        'hardware': 'Hardware Selection & Purchase',
        'setup': 'Software & Hardware Setup',
        'basic-code': 'Basic Programming & WiFi',
        'advanced-code': 'Advanced Programming Techniques',
        'projects': 'Hands-on Projects',
        'peripheral-spoofing': 'Peripheral Spoofing Techniques',
        'custom-projects': 'Custom Project Development'
    };
    return stepNames[step] || step.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function startRecommendedPath(pathType) {
    closeModal();
    
    // Navigate to first recommended module
    const moduleMap = {
        'beginner': 1,
        'intermediate': 2,
        'advanced': 4
    };
    
    const firstModule = moduleMap[pathType] || 1;
    
    // Show loading state
    document.body.classList.add('loading');
    
    setTimeout(() => {
        window.location.href = `modules/module-${firstModule}.html?path=${pathType}`;
    }, 1000);
}

function closeModal() {
    const modal = document.querySelector('.recommendation-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Interactive Tools
function openTool(toolType) {
    const tools = {
        'cost-calculator': {
            title: 'South African Cost Calculator',
            url: 'tools/cost-calculator.html',
            description: 'Calculate your project costs with current SA market prices'
        },
        'hardware-wizard': {
            title: 'Hardware Selection Wizard',
            url: 'tools/hardware-wizard.html',
            description: 'Get personalized hardware recommendations based on your needs'
        },
        'supplier-finder': {
            title: 'SA Supplier Finder',
            url: 'tools/supplier-finder.html',
            description: 'Find trusted Arduino suppliers near you in South Africa'
        },
        'code-playground': {
            title: 'Arduino Code Playground',
            url: 'tools/code-playground.html',
            description: 'Test and experiment with Arduino code in your browser'
        }
    };
    
    const tool = tools[toolType];
    if (tool) {
        // For now, show coming soon message
        showToolComingSoon(tool);
        
        // Track tool usage
        trackEvent('tool_opened', { tool: toolType });
    }
}

function showToolComingSoon(tool) {
    const modal = document.createElement('div');
    modal.className = 'recommendation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-tools"></i> ${tool.title}</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="coming-soon-content">
                    <i class="fas fa-rocket" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 20px;"></i>
                    <h4>Coming Soon!</h4>
                    <p>${tool.description}</p>
                    <p>This interactive tool is currently under development. Check back soon for the full experience!</p>
                    <div class="progress-preview">
                        <h5>What to expect:</h5>
                        <ul>
                            <li><i class="fas fa-check"></i> Real-time calculations with SA market prices</li>
                            <li><i class="fas fa-check"></i> Interactive interface with instant feedback</li>
                            <li><i class="fas fa-check"></i> Personalized recommendations</li>
                            <li><i class="fas fa-check"></i> Export and save your results</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Module Navigation
function switchToModule(moduleNum) {
    AppState.currentModule = moduleNum;
    
    // Update progress bar
    updateProgressBar();
    
    // Update active indicator
    document.querySelectorAll('.module-indicator').forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    document.querySelector(`[data-module="${moduleNum}"]`).classList.add('active');
    
    // Scroll to module
    const moduleCard = document.querySelector(`.module-card[data-module="${moduleNum}"]`);
    if (moduleCard) {
        moduleCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight effect
        moduleCard.style.transform = 'scale(1.02)';
        moduleCard.style.borderColor = 'var(--primary-color)';
        
        setTimeout(() => {
            moduleCard.style.transform = '';
            moduleCard.style.borderColor = '';
        }, 1000);
    }
    
    // Save progress
    saveUserProgress();
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = (AppState.currentModule / 5) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }
}

// Data Persistence
function saveUserPreferences() {
    localStorage.setItem('arduinoJourneyPrefs', JSON.stringify(AppState.userPreferences));
}

function loadSavedPreferences() {
    const saved = localStorage.getItem('arduinoJourneyPrefs');
    if (saved) {
        AppState.userPreferences = { ...AppState.userPreferences, ...JSON.parse(saved) };
    }
}

function saveUserProgress() {
    localStorage.setItem('arduinoJourneyProgress', JSON.stringify({
        currentModule: AppState.currentModule,
        progress: AppState.progress,
        selectedPath: AppState.selectedPath
    }));
}

function loadUserProgress() {
    const saved = localStorage.getItem('arduinoJourneyProgress');
    if (saved) {
        const data = JSON.parse(saved);
        AppState.currentModule = data.currentModule || 1;
        AppState.progress = { ...AppState.progress, ...data.progress };
        AppState.selectedPath = data.selectedPath;
        
        updateProgressBar();
    }
}

// Animation and UI Effects
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.module-card, .tool-card, .path-card').forEach(el => {
        observer.observe(el);
    });
}

// Analytics and Tracking (Mock implementation)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    
    // In a real implementation, this would send to analytics service
    // gtag('event', eventName, properties);
}

// Utility Functions
function formatCurrency(amount, currency = 'ZAR') {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    }).format(amount);
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Show user-friendly error message
    const errorToast = document.createElement('div');
    errorToast.className = 'error-toast';
    errorToast.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>Something went wrong. Please refresh the page.</span>
    `;
    
    document.body.appendChild(errorToast);
    
    setTimeout(() => {
        document.body.removeChild(errorToast);
    }, 5000);
});

// Export for use in other modules
window.ArduinoJourney = {
    AppState,
    selectPath,
    openTool,
    switchToModule,
    trackEvent
};