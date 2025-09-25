// Hardware Selection Wizard Implementation

// Wizard state
let wizardState = {
    currentStep: 1,
    totalSteps: 5,
    answers: {
        experience: null,
        goals: [],
        budget: null,
        powerSource: [],
        environment: [],
        soldering: null
    }
};

// Component recommendations database
const COMPONENT_RECOMMENDATIONS = {
    // Essential starter components
    essentials: {
        beginner: [
            { id: 'arduino-r4-wifi', name: 'Arduino UNO R4 WiFi', price: 850, priority: 1, reason: 'Official board with WiFi - perfect starting point' },
            { id: 'breadboard-half', name: 'Half-size Breadboard', price: 35, priority: 1, reason: 'Easier to manage for beginners' },
            { id: 'jumper-wires-basic', name: 'Basic Jumper Wire Set', price: 45, priority: 1, reason: 'Essential for connections' },
            { id: 'resistor-kit-basic', name: 'Basic Resistor Kit', price: 65, priority: 1, reason: 'Fundamental component for circuits' },
            { id: 'led-kit-basic', name: 'LED Starter Kit', price: 25, priority: 1, reason: 'Visual feedback for learning' }
        ],
        intermediate: [
            { id: 'arduino-r4-wifi', name: 'Arduino UNO R4 WiFi', price: 850, priority: 1, reason: 'Advanced WiFi capabilities' },
            { id: 'breadboard-full', name: 'Full-size Breadboard', price: 65, priority: 1, reason: 'More space for complex circuits' },
            { id: 'jumper-wires-premium', name: 'Premium Jumper Wire Set', price: 85, priority: 1, reason: 'Better quality, more variety' },
            { id: 'resistor-kit-complete', name: 'Complete Resistor Kit', price: 95, priority: 1, reason: 'Full range of values' },
            { id: 'multimeter', name: 'Digital Multimeter', price: 180, priority: 2, reason: 'Essential for troubleshooting' }
        ],
        advanced: [
            { id: 'arduino-r4-wifi', name: 'Arduino UNO R4 WiFi', price: 850, priority: 1, reason: 'Professional-grade development' },
            { id: 'breadboard-premium', name: 'Premium Breadboard Set', price: 120, priority: 1, reason: 'Professional prototyping' },
            { id: 'wire-kit-professional', name: 'Professional Wire Kit', price: 150, priority: 1, reason: 'Variety of connection options' },
            { id: 'component-kit-pro', name: 'Professional Component Kit', price: 450, priority: 1, reason: 'Comprehensive component library' },
            { id: 'oscilloscope-basic', name: 'Basic Oscilloscope', price: 1200, priority: 3, reason: 'Advanced signal analysis' }
        ]
    },

    // Goal-specific components
    goals: {
        'home-automation': [
            { id: 'relay-module-4ch', name: '4-Channel Relay Module', price: 85, reason: 'Control AC appliances safely' },
            { id: 'temp-humidity-dht22', name: 'DHT22 Temp/Humidity Sensor', price: 120, reason: 'Monitor home environment' },
            { id: 'pir-motion-sensor', name: 'PIR Motion Sensor', price: 45, reason: 'Detect occupancy' },
            { id: 'light-sensor-bh1750', name: 'BH1750 Light Sensor', price: 55, reason: 'Automatic lighting control' }
        ],
        'sensors-monitoring': [
            { id: 'temp-ds18b20', name: 'DS18B20 Temperature Sensor', price: 35, reason: 'Accurate temperature readings' },
            { id: 'humidity-sht30', name: 'SHT30 Humidity Sensor', price: 95, reason: 'Precise humidity monitoring' },
            { id: 'pressure-bmp280', name: 'BMP280 Pressure Sensor', price: 65, reason: 'Atmospheric pressure data' },
            { id: 'sd-card-module', name: 'SD Card Module', price: 45, reason: 'Data logging capability' },
            { id: 'rtc-ds3231', name: 'DS3231 Real-Time Clock', price: 55, reason: 'Accurate timestamps' }
        ],
        'robotics': [
            { id: 'servo-sg90', name: 'SG90 Micro Servo', price: 65, reason: 'Precise movement control' },
            { id: 'motor-driver-l298n', name: 'L298N Motor Driver', price: 45, reason: 'Control DC motors' },
            { id: 'ultrasonic-hc-sr04', name: 'HC-SR04 Ultrasonic Sensor', price: 35, reason: 'Distance measurement' },
            { id: 'gyro-mpu6050', name: 'MPU6050 Gyroscope', price: 75, reason: 'Balance and orientation' },
            { id: 'motor-dc-gear', name: 'DC Gear Motor', price: 85, reason: 'Drive wheels and mechanisms' }
        ],
        'iot-connectivity': [
            { id: 'esp32-cam', name: 'ESP32-CAM Module', price: 185, reason: 'WiFi camera for IoT' },
            { id: 'bluetooth-hc05', name: 'HC-05 Bluetooth Module', price: 95, reason: 'Wireless connectivity' },
            { id: 'nrf24l01', name: 'nRF24L01+ Wireless Module', price: 45, reason: 'Long-range communication' },
            { id: 'oled-display', name: 'OLED Display 0.96"', price: 75, reason: 'Status and data display' }
        ],
        'security': [
            { id: 'pir-motion', name: 'PIR Motion Sensor', price: 45, reason: 'Motion detection' },
            { id: 'door-sensor', name: 'Magnetic Door Sensor', price: 25, reason: 'Entry point monitoring' },
            { id: 'buzzer-alarm', name: 'Alarm Buzzer', price: 35, reason: 'Audio alerts' },
            { id: 'keypad-4x4', name: '4x4 Matrix Keypad', price: 55, reason: 'Access code entry' },
            { id: 'camera-module', name: 'Camera Module', price: 185, reason: 'Visual monitoring' }
        ],
        'learning': [
            { id: 'sensor-kit-educational', name: 'Educational Sensor Kit', price: 250, reason: 'Variety of learning modules' },
            { id: 'breadboard-kit', name: 'Breadboard Learning Kit', price: 120, reason: 'Hands-on circuit building' },
            { id: 'component-tester', name: 'Component Tester', price: 85, reason: 'Learn component characteristics' },
            { id: 'project-book', name: 'Arduino Project Guide', price: 45, reason: 'Structured learning path' }
        ]
    },

    // Power-specific components
    power: {
        'usb-power': [
            { id: 'usb-cable-long', name: 'Long USB Cable', price: 25, reason: 'Flexible positioning' }
        ],
        'battery-power': [
            { id: 'battery-pack-4aa', name: '4xAA Battery Pack', price: 25, reason: 'Portable power source' },
            { id: 'battery-li-ion', name: 'Li-ion Battery Pack', price: 125, reason: 'Rechargeable, long-lasting' },
            { id: 'power-boost', name: 'Power Boost Module', price: 45, reason: 'Stable voltage from batteries' }
        ],
        'wall-power': [
            { id: 'power-adapter-5v', name: '5V 2A Power Adapter', price: 125, reason: 'Reliable mains power' },
            { id: 'power-jack', name: 'DC Power Jack', price: 15, reason: 'Connect external power' }
        ]
    },

    // Environment-specific additions
    environment: {
        'outdoor': [
            { id: 'enclosure-weatherproof', name: 'Weatherproof Enclosure', price: 95, reason: 'Protect from elements' },
            { id: 'cable-waterproof', name: 'Waterproof Cables', price: 55, reason: 'Weather-resistant connections' }
        ]
    },

    // Soldering-specific components
    soldering: {
        'basic-solder': [
            { id: 'soldering-kit', name: 'Basic Soldering Kit', price: 150, reason: 'Essential soldering tools' },
            { id: 'header-pins', name: 'Header Pin Set', price: 35, reason: 'Custom connections' }
        ],
        'advanced-solder': [
            { id: 'soldering-station', name: 'Temperature Controlled Station', price: 450, reason: 'Professional soldering' },
            { id: 'smd-components', name: 'SMD Component Kit', price: 185, reason: 'Surface-mount components' },
            { id: 'pcb-prototyping', name: 'PCB Prototyping Kit', price: 85, reason: 'Custom circuit boards' }
        ]
    }
};

// Initialize wizard
document.addEventListener('DOMContentLoaded', function() {
    initializeWizard();
    trackToolUsage('hardware-wizard', 'page_load');
});

function initializeWizard() {
    setupEventListeners();
    updateWizardDisplay();
    updateProgressIndicator();
}

function setupEventListeners() {
    // Navigation buttons
    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('prev-btn').addEventListener('click', previousStep);

    // Option selection handlers
    setupOptionHandlers();
}

function setupOptionHandlers() {
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            const isMultiSelect = this.classList.contains('multi-select');
            const value = this.getAttribute('data-value');
            const step = getCurrentStepData();

            if (isMultiSelect) {
                toggleMultiSelectOption(this, value, step);
            } else {
                selectSingleOption(this, value, step);
            }

            updateNextButton();
            trackToolUsage('hardware-wizard', 'option_selected', { step: wizardState.currentStep, value });
        });
    });
}

function toggleMultiSelectOption(element, value, step) {
    const isSelected = element.classList.contains('selected');
    
    if (isSelected) {
        element.classList.remove('selected');
        removeFromArray(wizardState.answers[step.property], value);
    } else {
        element.classList.add('selected');
        wizardState.answers[step.property].push(value);
    }
}

function selectSingleOption(element, value, step) {
    // Remove selection from siblings
    element.parentElement.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select this option
    element.classList.add('selected');
    wizardState.answers[step.property] = value;
}

function removeFromArray(array, value) {
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function getCurrentStepData() {
    const stepMap = {
        1: { property: 'experience', required: true },
        2: { property: 'goals', required: true },
        3: { property: 'budget', required: true },
        4: { property: 'preferences', required: false },
        5: { property: 'results', required: false }
    };
    
    return stepMap[wizardState.currentStep];
}

function updateNextButton() {
    const nextBtn = document.getElementById('next-btn');
    const step = getCurrentStepData();
    
    let isValid = false;
    
    switch (wizardState.currentStep) {
        case 1:
            isValid = wizardState.answers.experience !== null;
            break;
        case 2:
            isValid = wizardState.answers.goals.length > 0;
            break;
        case 3:
            isValid = wizardState.answers.budget !== null;
            break;
        case 4:
            // Step 4 has multiple sub-questions, collect all answers
            collectStep4Answers();
            isValid = true; // Step 4 is optional
            break;
        case 5:
            nextBtn.textContent = 'Start Shopping';
            nextBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Start Shopping';
            isValid = true;
            break;
    }
    
    nextBtn.disabled = !isValid;
}

function collectStep4Answers() {
    // Collect power source preferences
    wizardState.answers.powerSource = [];
    document.querySelectorAll('[data-step="4"] .option-card.selected').forEach(card => {
        const value = card.getAttribute('data-value');
        if (['usb-power', 'battery-power', 'wall-power'].includes(value)) {
            wizardState.answers.powerSource.push(value);
        } else if (['indoor', 'outdoor'].includes(value)) {
            wizardState.answers.environment.push(value);
        } else if (['no-solder', 'basic-solder', 'advanced-solder'].includes(value)) {
            wizardState.answers.soldering = value;
        }
    });
}

function nextStep() {
    if (wizardState.currentStep < wizardState.totalSteps) {
        if (wizardState.currentStep === 4) {
            collectStep4Answers();
            generateRecommendations();
        }
        
        wizardState.currentStep++;
        updateWizardDisplay();
        updateProgressIndicator();
        updateNextButton();
        
        trackToolUsage('hardware-wizard', 'step_next', { step: wizardState.currentStep });
    } else {
        // Final step - redirect to cost calculator with recommendations
        const recommendedComponents = generateShoppingList();
        redirectToCostCalculator(recommendedComponents);
    }
}

function previousStep() {
    if (wizardState.currentStep > 1) {
        wizardState.currentStep--;
        updateWizardDisplay();
        updateProgressIndicator();
        updateNextButton();
        
        trackToolUsage('hardware-wizard', 'step_back', { step: wizardState.currentStep });
    }
}

function updateWizardDisplay() {
    // Update step content visibility
    document.querySelectorAll('.wizard-step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const currentContent = document.querySelector(`.wizard-step-content[data-step="${wizardState.currentStep}"]`);
    if (currentContent) {
        currentContent.classList.add('active');
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.style.display = wizardState.currentStep > 1 ? 'block' : 'none';
    
    // Update step indicator
    document.getElementById('step-indicator').textContent = `Step ${wizardState.currentStep} of ${wizardState.totalSteps}`;
}

function updateProgressIndicator() {
    const steps = document.querySelectorAll('.wizard-step');
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < wizardState.currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === wizardState.currentStep) {
            step.classList.add('active');
        }
    });
    
    // Update progress bar
    const progressBar = document.querySelector('.wizard-progress');
    const progressPercentage = ((wizardState.currentStep - 1) / (wizardState.totalSteps - 1)) * 100;
    progressBar.style.setProperty('--progress-width', `${progressPercentage}%`);
}

function generateRecommendations() {
    const recommendations = {
        essential: [],
        goalBased: [],
        powerComponents: [],
        additional: [],
        totalEstimate: 0
    };
    
    // Get essential components based on experience level
    const essentials = COMPONENT_RECOMMENDATIONS.essentials[wizardState.answers.experience] || [];
    recommendations.essential = essentials.filter(comp => comp.priority <= 2);
    
    // Add goal-based components
    wizardState.answers.goals.forEach(goal => {
        if (COMPONENT_RECOMMENDATIONS.goals[goal]) {
            recommendations.goalBased.push(...COMPONENT_RECOMMENDATIONS.goals[goal]);
        }
    });
    
    // Add power components
    wizardState.answers.powerSource.forEach(power => {
        if (COMPONENT_RECOMMENDATIONS.power[power]) {
            recommendations.powerComponents.push(...COMPONENT_RECOMMENDATIONS.power[power]);
        }
    });
    
    // Add environment-specific components
    if (wizardState.answers.environment.includes('outdoor')) {
        recommendations.additional.push(...COMPONENT_RECOMMENDATIONS.environment.outdoor);
    }
    
    // Add soldering components
    if (wizardState.answers.soldering && wizardState.answers.soldering !== 'no-solder') {
        if (COMPONENT_RECOMMENDATIONS.soldering[wizardState.answers.soldering]) {
            recommendations.additional.push(...COMPONENT_RECOMMENDATIONS.soldering[wizardState.answers.soldering]);
        }
    }
    
    // Calculate total estimate
    const allComponents = [
        ...recommendations.essential,
        ...recommendations.goalBased,
        ...recommendations.powerComponents,
        ...recommendations.additional
    ];
    
    recommendations.totalEstimate = allComponents.reduce((sum, comp) => sum + comp.price, 0);
    
    // Filter by budget if needed
    recommendations.budgetFit = checkBudgetFit(recommendations.totalEstimate);
    
    displayRecommendations(recommendations);
}

function checkBudgetFit(totalCost) {
    const budgetRanges = {
        'budget-low': { min: 500, max: 1000 },
        'budget-medium': { min: 1000, max: 2500 },
        'budget-high': { min: 2500, max: 10000 }
    };
    
    const userBudget = budgetRanges[wizardState.answers.budget];
    
    if (totalCost <= userBudget.max) {
        return 'within-budget';
    } else if (totalCost <= userBudget.max * 1.2) {
        return 'slightly-over';
    } else {
        return 'over-budget';
    }
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations-content');
    
    container.innerHTML = `
        <div class="recommendations-summary">
            <div class="summary-card ${recommendations.budgetFit}">
                <div class="summary-header">
                    <h3><i class="fas fa-calculator"></i> Cost Summary</h3>
                    <div class="total-cost">${ToolsUtils.formatCurrency(recommendations.totalEstimate)}</div>
                </div>
                <div class="budget-status">
                    ${getBudgetStatusMessage(recommendations.budgetFit, recommendations.totalEstimate)}
                </div>
            </div>
        </div>
        
        <div class="recommendations-sections">
            ${generateRecommendationSection('Essential Components', recommendations.essential, 'fas fa-star')}
            ${generateRecommendationSection('Project-Specific Components', recommendations.goalBased, 'fas fa-bullseye')}
            ${generateRecommendationSection('Power Components', recommendations.powerComponents, 'fas fa-battery-full')}
            ${recommendations.additional.length > 0 ? generateRecommendationSection('Additional Components', recommendations.additional, 'fas fa-plus') : ''}
        </div>
        
        <div class="recommendations-actions">
            <button class="btn btn-primary" onclick="proceedToCostCalculator()">
                <i class="fas fa-calculator"></i> Calculate Exact Costs
            </button>
            <button class="btn btn-outline" onclick="exportRecommendations()">
                <i class="fas fa-download"></i> Export List
            </button>
            <button class="btn btn-secondary" onclick="restartWizard()">
                <i class="fas fa-redo"></i> Start Over
            </button>
        </div>
    `;
}

function getBudgetStatusMessage(budgetFit, totalCost) {
    const budgetNames = {
        'budget-low': 'Starter Budget (R500-R1,000)',
        'budget-medium': 'Hobbyist Budget (R1,000-R2,500)',
        'budget-high': 'Professional Budget (R2,500+)'
    };
    
    const budgetName = budgetNames[wizardState.answers.budget];
    
    switch (budgetFit) {
        case 'within-budget':
            return `<i class="fas fa-check-circle"></i> Perfect fit for your ${budgetName}`;
        case 'slightly-over':
            return `<i class="fas fa-exclamation-triangle"></i> Slightly over your ${budgetName}. Consider removing optional items.`;
        case 'over-budget':
            return `<i class="fas fa-times-circle"></i> Over your ${budgetName}. We'll help you prioritize essential components.`;
        default:
            return '';
    }
}

function generateRecommendationSection(title, components, icon) {
    if (components.length === 0) return '';
    
    return `
        <div class="recommendation-section">
            <h4><i class="${icon}"></i> ${title}</h4>
            <div class="components-grid">
                ${components.map(comp => `
                    <div class="component-recommendation">
                        <div class="component-header">
                            <h5>${comp.name}</h5>
                            <span class="component-price">${ToolsUtils.formatCurrency(comp.price)}</span>
                        </div>
                        <p class="component-reason">${comp.reason}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateShoppingList() {
    // Generate a structured shopping list for the cost calculator
    const allComponents = [];
    
    // Add essential components
    const essentials = COMPONENT_RECOMMENDATIONS.essentials[wizardState.answers.experience] || [];
    allComponents.push(...essentials.filter(comp => comp.priority <= 2));
    
    // Add goal-based components
    wizardState.answers.goals.forEach(goal => {
        if (COMPONENT_RECOMMENDATIONS.goals[goal]) {
            allComponents.push(...COMPONENT_RECOMMENDATIONS.goals[goal]);
        }
    });
    
    return allComponents;
}

function proceedToCostCalculator() {
    const recommendedComponents = generateShoppingList();
    redirectToCostCalculator(recommendedComponents);
}

function redirectToCostCalculator(components) {
    // Create a configuration object for the cost calculator
    const config = {
        tool: 'cost-calculator',
        source: 'hardware-wizard',
        wizard_answers: wizardState.answers,
        selectedComponents: {},
        timestamp: new Date().toISOString()
    };
    
    // Convert recommendations to cost calculator format
    components.forEach(comp => {
        // Map wizard component IDs to cost calculator component IDs
        const mappedId = mapComponentId(comp.id);
        if (mappedId) {
            config.selectedComponents[mappedId] = {
                id: mappedId,
                name: comp.name,
                price: comp.price,
                quantity: 1,
                fromWizard: true
            };
        }
    });
    
    const shareUrl = ToolsUtils.generateShareableUrl(config);
    window.location.href = shareUrl.replace(window.location.origin + window.location.pathname, '../tools/cost-calculator.html');
    
    trackToolUsage('hardware-wizard', 'redirect_to_calculator', { componentCount: components.length });
}

function mapComponentId(wizardId) {
    // Map wizard component IDs to cost calculator component IDs
    const idMap = {
        'arduino-r4-wifi': 'arduino-r4-wifi',
        'breadboard-half': 'breadboard-full',
        'breadboard-full': 'breadboard-full',
        'jumper-wires-basic': 'jumper-wires',
        'jumper-wires-premium': 'jumper-wires',
        'resistor-kit-basic': 'resistor-kit',
        'resistor-kit-complete': 'resistor-kit',
        'led-kit-basic': 'led-kit',
        'temp-humidity-dht22': 'dht22',
        'pir-motion-sensor': 'pir-motion',
        'ultrasonic-hc-sr04': 'ultrasonic-hc-sr04',
        'servo-sg90': 'servo-sg90',
        'esp32-cam': 'esp32-cam',
        'bluetooth-hc05': 'bluetooth-hc05',
        'nrf24l01': 'nrf24l01'
    };
    
    return idMap[wizardId] || null;
}

function exportRecommendations() {
    const exportData = {
        timestamp: new Date().toISOString(),
        wizard_answers: wizardState.answers,
        recommendations: generateShoppingList(),
        total_estimate: generateShoppingList().reduce((sum, comp) => sum + comp.price, 0)
    };
    
    ToolsUtils.exportJSON(exportData, `arduino-hardware-recommendations-${Date.now()}.json`);
    ToolsUtils.showToast('Recommendations exported successfully!', 'success');
    trackToolUsage('hardware-wizard', 'export', { componentCount: exportData.recommendations.length });
}

function restartWizard() {
    if (confirm('Are you sure you want to start over? All your answers will be lost.')) {
        // Reset state
        wizardState = {
            currentStep: 1,
            totalSteps: 5,
            answers: {
                experience: null,
                goals: [],
                budget: null,
                powerSource: [],
                environment: [],
                soldering: null
            }
        };
        
        // Clear all selections
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Reset display
        updateWizardDisplay();
        updateProgressIndicator();
        updateNextButton();
        
        ToolsUtils.showToast('Wizard reset. Starting fresh!', 'info');
        trackToolUsage('hardware-wizard', 'restart');
    }
}