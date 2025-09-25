// Module-specific JavaScript functionality

// Module state management
const ModuleState = {
    currentSection: 'overview',
    completedSections: [],
    quizAnswers: {},
    currentQuizQuestion: 1,
    totalQuizQuestions: 5,
    quizScore: 0,
    safetyChecksComplete: false,
    ethicsChecksComplete: false
};

// Quiz correct answers
const QuizAnswers = {
    q1: 'renesas-ra4m1',
    q2: 'accessibility', 
    q3: 'esd-protection',
    q4: 'reliable-suppliers',
    q5: 'wifi-hid'
};

// Initialize module functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeModule();
    setupModuleEventListeners();
    loadModuleProgress();
    updateProgressDisplay();
});

function initializeModule() {
    console.log('Module 1 initialized');
    
    // Set initial active section based on URL hash or default
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        navigateToSection(hash);
    } else {
        navigateToSection('overview');
    }
    
    // Initialize interactive elements
    setupSafetyChecklist();
    setupEthicsChecklist();
    setupQuizNavigation();
}

function setupModuleEventListeners() {
    // Navigation pill clicks
    document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            const section = this.dataset.section;
            navigateToSection(section);
        });
    });
    
    // Quiz option changes
    document.querySelectorAll('.quiz-option input').forEach(input => {
        input.addEventListener('change', function() {
            const questionNum = this.name;
            const answer = this.value;
            ModuleState.quizAnswers[questionNum] = answer;
            saveModuleProgress();
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            navigateToSection(hash, false);
        }
    });
}

// Section Navigation
function navigateToSection(sectionId, updateHistory = true) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        ModuleState.currentSection = sectionId;
        
        // Update navigation pills
        document.querySelectorAll('.nav-pill').forEach(pill => {
            pill.classList.remove('active');
        });
        
        const activePill = document.querySelector(`[data-section="${sectionId}"]`);
        if (activePill) {
            activePill.classList.add('active');
        }
        
        // Update URL hash
        if (updateHistory) {
            history.pushState(null, null, `#${sectionId}`);
        }
        
        // Scroll to top of content
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Track section view
        trackEvent('module_section_viewed', { 
            module: 1, 
            section: sectionId,
            timestamp: new Date().toISOString()
        });
        
        saveModuleProgress();
    }
}

// Section Completion
function completeSection(sectionId) {
    if (!ModuleState.completedSections.includes(sectionId)) {
        ModuleState.completedSections.push(sectionId);
        
        // Update checklist
        const checklistItem = document.querySelector(`.checklist-item[data-item="${sectionId}"]`);
        if (checklistItem) {
            checklistItem.classList.add('completed');
            checklistItem.querySelector('i').className = 'fas fa-check-circle';
        }
        
        // Show completion feedback
        showCompletionFeedback(sectionId);
        
        // Update progress
        updateProgressDisplay();
        
        // Save progress
        saveModuleProgress();
        
        // Track completion
        trackEvent('module_section_completed', { 
            module: 1, 
            section: sectionId,
            totalCompleted: ModuleState.completedSections.length
        });
    }
}

function showCompletionFeedback(sectionId) {
    const messages = {
        overview: "Great! You now understand what this module covers.",
        safety: "Excellent! Safety is the foundation of all good electronics work.",
        theory: "Well done! You have a solid understanding of Arduino basics.",
        ethics: "Perfect! Ethical learning is crucial for responsible development.",
        quiz: "Congratulations! You've completed the knowledge check."
    };
    
    const message = messages[sectionId] || "Section completed!";
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'completion-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast styles if not exists
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .completion-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success-color);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: var(--box-shadow);
                z-index: 1000;
                animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// Safety Checklist
function setupSafetyChecklist() {
    const checkboxes = document.querySelectorAll('input[name="safety-check"]');
    const completeBtn = document.getElementById('safety-complete-btn');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            completeBtn.disabled = !allChecked;
            
            if (allChecked && !ModuleState.safetyChecksComplete) {
                completeBtn.textContent = 'Complete Safety Commitment ';
                completeBtn.innerHTML += '<i class="fas fa-shield-alt"></i>';
            }
        });
    });
}

function completeSafetyCheck() {
    ModuleState.safetyChecksComplete = true;
    completeSection('safety');
    
    // Show special safety completion message
    const toast = document.createElement('div');
    toast.className = 'completion-toast safety-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-shield-alt"></i>
            <span>Safety commitment recorded! You're ready to work safely with electronics.</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 4000);
    
    // Auto-navigate to next section after a delay
    setTimeout(() => {
        navigateToSection('theory');
    }, 2000);
}

// Ethics Checklist
function setupEthicsChecklist() {
    const checkboxes = document.querySelectorAll('input[name="ethics-check"]');
    const completeBtn = document.getElementById('ethics-complete-btn');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            completeBtn.disabled = !allChecked;
            
            if (allChecked && !ModuleState.ethicsChecksComplete) {
                completeBtn.textContent = 'I Commit to Ethical Learning ';
                completeBtn.innerHTML += '<i class="fas fa-handshake"></i>';
            }
        });
    });
}

function completeEthicsCheck() {
    ModuleState.ethicsChecksComplete = true;
    completeSection('ethics');
    
    // Show special ethics completion message
    const toast = document.createElement('div');
    toast.className = 'completion-toast ethics-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-handshake"></i>
            <span>Ethical commitment recorded! Thank you for choosing responsible learning.</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 4000);
    
    // Auto-navigate to quiz after a delay
    setTimeout(() => {
        navigateToSection('quiz');
    }, 2000);
}

// Quiz Navigation
function setupQuizNavigation() {
    updateQuizProgress();
    updateQuizButtons();
}

function nextQuestion() {
    if (ModuleState.currentQuizQuestion < ModuleState.totalQuizQuestions) {
        // Hide current question
        document.querySelector(`.quiz-question[data-question="${ModuleState.currentQuizQuestion}"]`)
            .classList.remove('active');
        
        // Show next question
        ModuleState.currentQuizQuestion++;
        document.querySelector(`.quiz-question[data-question="${ModuleState.currentQuizQuestion}"]`)
            .classList.add('active');
        
        updateQuizProgress();
        updateQuizButtons();
        
        // Track quiz progress
        trackEvent('quiz_question_answered', {
            module: 1,
            question: ModuleState.currentQuizQuestion - 1,
            answer: ModuleState.quizAnswers[`q${ModuleState.currentQuizQuestion - 1}`]
        });
    }
}

function previousQuestion() {
    if (ModuleState.currentQuizQuestion > 1) {
        // Hide current question
        document.querySelector(`.quiz-question[data-question="${ModuleState.currentQuizQuestion}"]`)
            .classList.remove('active');
        
        // Show previous question
        ModuleState.currentQuizQuestion--;
        document.querySelector(`.quiz-question[data-question="${ModuleState.currentQuizQuestion}"]`)
            .classList.add('active');
        
        updateQuizProgress();
        updateQuizButtons();
    }
}

function updateQuizProgress() {
    const progressFill = document.getElementById('quiz-progress');
    const currentQuestionSpan = document.getElementById('current-question');
    
    if (progressFill) {
        const percentage = (ModuleState.currentQuizQuestion / ModuleState.totalQuizQuestions) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    if (currentQuestionSpan) {
        currentQuestionSpan.textContent = ModuleState.currentQuizQuestion;
    }
}

function updateQuizButtons() {
    const prevBtn = document.getElementById('quiz-prev');
    const nextBtn = document.getElementById('quiz-next');
    const submitBtn = document.getElementById('quiz-submit');
    
    // Previous button
    if (prevBtn) {
        prevBtn.disabled = ModuleState.currentQuizQuestion === 1;
    }
    
    // Next/Submit buttons
    if (ModuleState.currentQuizQuestion === ModuleState.totalQuizQuestions) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'inline-block';
    } else {
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (submitBtn) submitBtn.style.display = 'none';
    }
}

function submitQuiz() {
    // Calculate score
    let correctAnswers = 0;
    
    for (let i = 1; i <= ModuleState.totalQuizQuestions; i++) {
        const userAnswer = ModuleState.quizAnswers[`q${i}`];
        const correctAnswer = QuizAnswers[`q${i}`];
        
        if (userAnswer === correctAnswer) {
            correctAnswers++;
        }
    }
    
    ModuleState.quizScore = (correctAnswers / ModuleState.totalQuizQuestions) * 100;
    
    // Show results
    showQuizResults(correctAnswers);
    
    // Track quiz completion
    trackEvent('quiz_completed', {
        module: 1,
        score: ModuleState.quizScore,
        correctAnswers: correctAnswers,
        totalQuestions: ModuleState.totalQuizQuestions,
        answers: ModuleState.quizAnswers
    });
}

function showQuizResults(correctAnswers) {
    // Hide quiz questions
    document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
    document.querySelector('.quiz-actions').style.display = 'none';
    
    // Show results
    const resultsDiv = document.getElementById('quiz-results');
    const scoreText = document.getElementById('score-text');
    const scoreMessage = document.getElementById('score-message');
    
    resultsDiv.style.display = 'block';
    scoreText.textContent = `${Math.round(ModuleState.quizScore)}%`;
    
    // Customize message based on score
    let message = '';
    let resultClass = '';
    
    if (ModuleState.quizScore >= 80) {
        message = "Excellent work! You have a solid understanding of the material.";
        resultClass = 'excellent';
    } else if (ModuleState.quizScore >= 60) {
        message = "Good job! You understand most concepts. Review the areas you missed.";
        resultClass = 'good';
    } else {
        message = "You're getting there! Review the module content and try again.";
        resultClass = 'needs-improvement';
    }
    
    scoreMessage.textContent = message;
    scoreMessage.className = resultClass;
    
    // Update score circle color
    const scoreCircle = document.querySelector('.score-circle');
    if (ModuleState.quizScore >= 80) {
        scoreCircle.style.borderColor = 'var(--success-color)';
        scoreText.style.color = 'var(--success-color)';
    } else if (ModuleState.quizScore >= 60) {
        scoreCircle.style.borderColor = 'var(--warning-color)';
        scoreText.style.color = 'var(--warning-color)';
    } else {
        scoreCircle.style.borderColor = 'var(--danger-color)';
        scoreText.style.color = 'var(--danger-color)';
    }
    
    // Mark quiz as completed if score is passing
    if (ModuleState.quizScore >= 60) {
        completeSection('quiz');
    }
}

function retakeQuiz() {
    // Reset quiz state
    ModuleState.currentQuizQuestion = 1;
    ModuleState.quizAnswers = {};
    ModuleState.quizScore = 0;
    
    // Clear all radio buttons
    document.querySelectorAll('.quiz-option input').forEach(input => {
        input.checked = false;
    });
    
    // Hide results and show first question
    document.getElementById('quiz-results').style.display = 'none';
    document.querySelector('.quiz-actions').style.display = 'flex';
    
    document.querySelectorAll('.quiz-question').forEach((q, index) => {
        q.style.display = 'block';
        if (index === 0) {
            q.classList.add('active');
        } else {
            q.classList.remove('active');
        }
    });
    
    // Reset progress and buttons
    updateQuizProgress();
    updateQuizButtons();
    
    // Track retake
    trackEvent('quiz_retaken', { module: 1 });
}

function completeModule() {
    // Mark entire module as complete
    const allSections = ['overview', 'safety', 'theory', 'ethics', 'quiz'];
    ModuleState.completedSections = [...new Set([...ModuleState.completedSections, ...allSections])];
    
    // Update progress to 100%
    updateProgressDisplay();
    
    // Show module completion celebration
    showModuleCompletion();
    
    // Save final progress
    saveModuleProgress();
    
    // Track module completion
    trackEvent('module_completed', {
        module: 1,
        quizScore: ModuleState.quizScore,
        timeSpent: Date.now() - (localStorage.getItem('module1StartTime') || Date.now())
    });
}

function showModuleCompletion() {
    const modal = document.createElement('div');
    modal.className = 'completion-modal';
    modal.innerHTML = `
        <div class="modal-content celebration">
            <div class="celebration-header">
                <i class="fas fa-trophy"></i>
                <h2>Congratulations!</h2>
                <p>You've successfully completed Module 1: Getting Started</p>
            </div>
            <div class="celebration-stats">
                <div class="stat-item">
                    <span class="stat-number">${ModuleState.completedSections.length}</span>
                    <span class="stat-label">Sections Completed</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${Math.round(ModuleState.quizScore)}%</span>
                    <span class="stat-label">Quiz Score</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">Module Progress</span>
                </div>
            </div>
            <div class="celebration-message">
                <h3>What You've Accomplished:</h3>
                <ul>
                    <li><i class="fas fa-check"></i> Learned Arduino UNO R4 WiFi fundamentals</li>
                    <li><i class="fas fa-check"></i> Committed to safety practices</li>
                    <li><i class="fas fa-check"></i> Understood ethical considerations</li>
                    <li><i class="fas fa-check"></i> Demonstrated knowledge through quiz</li>
                </ul>
            </div>
            <div class="celebration-actions">
                <button class="btn btn-primary" onclick="goToNextModule()">
                    Continue to Module 2 <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn btn-outline" onclick="closeCelebrateModal()">
                    Stay Here
                </button>
            </div>
        </div>
    `;
    
    // Add celebration styles
    if (!document.querySelector('#celebration-styles')) {
        const styles = document.createElement('style');
        styles.id = 'celebration-styles';
        styles.textContent = `
            .completion-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.5s ease;
            }
            
            .modal-content.celebration {
                background: linear-gradient(135deg, var(--card-bg), #2a2a2a);
                border: 3px solid var(--accent-color);
                border-radius: var(--border-radius);
                max-width: 600px;
                width: 90%;
                padding: 40px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            }
            
            .celebration-header i {
                font-size: 4rem;
                color: var(--accent-color);
                margin-bottom: 20px;
                animation: bounce 2s infinite;
            }
            
            .celebration-header h2 {
                color: var(--primary-color);
                font-size: 2.5rem;
                margin-bottom: 15px;
            }
            
            .celebration-stats {
                display: flex;
                justify-content: space-around;
                margin: 30px 0;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
            }
            
            .celebration-stats .stat-item {
                text-align: center;
            }
            
            .celebration-stats .stat-number {
                display: block;
                font-size: 2rem;
                font-weight: 700;
                color: var(--accent-color);
            }
            
            .celebration-stats .stat-label {
                font-size: 0.9rem;
                color: var(--text-muted);
            }
            
            .celebration-message {
                text-align: left;
                margin: 30px 0;
            }
            
            .celebration-message h3 {
                color: var(--primary-color);
                margin-bottom: 15px;
                text-align: center;
            }
            
            .celebration-message ul {
                list-style: none;
                padding: 0;
            }
            
            .celebration-message li {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
                color: var(--text-color);
            }
            
            .celebration-message li i {
                color: var(--success-color);
            }
            
            .celebration-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
}

function goToNextModule() {
    closeCelebrateModal();
    window.location.href = 'module-2.html';
}

function closeCelebrateModal() {
    const modal = document.querySelector('.completion-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
}

// Progress Management
function updateProgressDisplay() {
    const totalSections = 5;
    const completedCount = ModuleState.completedSections.length;
    const progressPercentage = (completedCount / totalSections) * 100;
    
    // Update circular progress
    const progressCircle = document.querySelector('.progress-circle');
    const progressText = document.querySelector('.progress-text');
    const moduleProgressSpan = document.getElementById('module-progress');
    
    if (progressCircle) {
        const circumference = 2 * Math.PI * 36; // radius = 36
        const offset = circumference - (progressPercentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(progressPercentage)}%`;
    }
    
    if (moduleProgressSpan) {
        moduleProgressSpan.textContent = `${Math.round(progressPercentage)}%`;
    }
    
    // Update checklist items
    ModuleState.completedSections.forEach(sectionId => {
        const checklistItem = document.querySelector(`.checklist-item[data-item="${sectionId}"]`);
        if (checklistItem) {
            checklistItem.classList.add('completed');
            checklistItem.querySelector('i').className = 'fas fa-check-circle';
        }
    });
}

// Data Persistence
function saveModuleProgress() {
    const progressData = {
        module: 1,
        currentSection: ModuleState.currentSection,
        completedSections: ModuleState.completedSections,
        quizAnswers: ModuleState.quizAnswers,
        quizScore: ModuleState.quizScore,
        safetyChecksComplete: ModuleState.safetyChecksComplete,
        ethicsChecksComplete: ModuleState.ethicsChecksComplete,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('module1Progress', JSON.stringify(progressData));
    
    // Also update global progress
    const globalProgress = JSON.parse(localStorage.getItem('arduinoJourneyProgress') || '{}');
    globalProgress.module1 = progressData;
    localStorage.setItem('arduinoJourneyProgress', JSON.stringify(globalProgress));
}

function loadModuleProgress() {
    const saved = localStorage.getItem('module1Progress');
    if (saved) {
        const data = JSON.parse(saved);
        
        ModuleState.currentSection = data.currentSection || 'overview';
        ModuleState.completedSections = data.completedSections || [];
        ModuleState.quizAnswers = data.quizAnswers || {};
        ModuleState.quizScore = data.quizScore || 0;
        ModuleState.safetyChecksComplete = data.safetyChecksComplete || false;
        ModuleState.ethicsChecksComplete = data.ethicsChecksComplete || false;
        
        // Restore quiz answers
        Object.keys(ModuleState.quizAnswers).forEach(questionId => {
            const input = document.querySelector(`input[name="${questionId}"][value="${ModuleState.quizAnswers[questionId]}"]`);
            if (input) {
                input.checked = true;
            }
        });
        
        // Restore safety checklist
        if (ModuleState.safetyChecksComplete) {
            document.querySelectorAll('input[name="safety-check"]').forEach(cb => cb.checked = true);
            const safetyBtn = document.getElementById('safety-complete-btn');
            if (safetyBtn) safetyBtn.disabled = false;
        }
        
        // Restore ethics checklist
        if (ModuleState.ethicsChecksComplete) {
            document.querySelectorAll('input[name="ethics-check"]').forEach(cb => cb.checked = true);
            const ethicsBtn = document.getElementById('ethics-complete-btn');
            if (ethicsBtn) ethicsBtn.disabled = false;
        }
    }
    
    // Set start time if not already set
    if (!localStorage.getItem('module1StartTime')) {
        localStorage.setItem('module1StartTime', Date.now().toString());
    }
}

// Utility function for tracking (reuse from main.js)
function trackEvent(eventName, properties = {}) {
    if (window.ArduinoJourney && window.ArduinoJourney.trackEvent) {
        window.ArduinoJourney.trackEvent(eventName, properties);
    } else {
        console.log('Module Event:', eventName, properties);
    }
}

// Export module functions for external use
window.ModuleFunctions = {
    navigateToSection,
    completeSection,
    completeSafetyCheck,
    completeEthicsCheck,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    retakeQuiz,
    completeModule
};