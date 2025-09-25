// South African Cost Calculator Implementation

// Component database with SA market prices (in ZAR)
const COMPONENT_DATABASE = {
    essentials: [
        {
            id: 'arduino-r4-wifi',
            name: 'Arduino UNO R4 WiFi',
            description: 'Official Arduino board with WiFi connectivity',
            price: 850,
            weight: 0.025,
            specs: {
                'MCU': 'Renesas RA4M1',
                'WiFi': 'ESP32-S3',
                'Flash': '256KB',
                'RAM': '32KB'
            },
            suppliers: ['communica', 'netram', 'rs-components']
        },
        {
            id: 'breadboard-full',
            name: 'Full-size Breadboard',
            description: '830 tie-point solderless breadboard',
            price: 65,
            weight: 0.08,
            specs: {
                'Points': '830',
                'Size': '165x55mm',
                'Material': 'ABS'
            },
            suppliers: ['diy-electronics', 'mantech', 'communica']
        },
        {
            id: 'jumper-wires',
            name: 'Jumper Wire Set (120pcs)',
            description: 'Male-to-male, male-to-female, female-to-female',
            price: 85,
            weight: 0.15,
            specs: {
                'Length': '20cm',
                'Quantity': '120 pieces',
                'Types': 'M-M, M-F, F-F'
            },
            suppliers: ['communica', 'diy-electronics', 'netram']
        },
        {
            id: 'resistor-kit',
            name: 'Resistor Kit (600pcs)',
            description: 'Common values from 10Ω to 1MΩ',
            price: 95,
            weight: 0.12,
            specs: {
                'Values': '30 different',
                'Quantity': '600 pieces',
                'Tolerance': '±5%'
            },
            suppliers: ['mantech', 'netram', 'rs-components']
        },
        {
            id: 'led-kit',
            name: 'LED Assortment Kit',
            description: 'Various colors and sizes',
            price: 45,
            weight: 0.05,
            specs: {
                'Colors': '5 different',
                'Sizes': '3mm, 5mm',
                'Quantity': '100 pieces'
            },
            suppliers: ['diy-electronics', 'communica', 'mantech']
        }
    ],
    sensors: [
        {
            id: 'dht22',
            name: 'DHT22 Temperature/Humidity Sensor',
            description: 'High accuracy digital sensor',
            price: 120,
            weight: 0.01,
            specs: {
                'Temperature': '-40 to 80°C',
                'Humidity': '0-100% RH',
                'Accuracy': '±0.5°C'
            },
            suppliers: ['communica', 'netram', 'diy-electronics']
        },
        {
            id: 'ultrasonic-hc-sr04',
            name: 'HC-SR04 Ultrasonic Sensor',
            description: 'Distance measurement sensor',
            price: 35,
            weight: 0.008,
            specs: {
                'Range': '2cm - 400cm',
                'Accuracy': '3mm',
                'Frequency': '40KHz'
            },
            suppliers: ['diy-electronics', 'mantech', 'communica']
        },
        {
            id: 'pir-motion',
            name: 'PIR Motion Sensor',
            description: 'Passive infrared motion detector',
            price: 45,
            weight: 0.015,
            specs: {
                'Range': '3-7 meters',
                'Angle': '120°',
                'Voltage': '5V'
            },
            suppliers: ['netram', 'communica', 'rs-components']
        },
        {
            id: 'light-sensor',
            name: 'BH1750 Light Sensor',
            description: 'Digital ambient light sensor',
            price: 55,
            weight: 0.005,
            specs: {
                'Range': '1-65535 lux',
                'Interface': 'I2C',
                'Resolution': '16-bit'
            },
            suppliers: ['communica', 'netram', 'diy-electronics']
        },
        {
            id: 'accelerometer',
            name: 'MPU6050 Accelerometer/Gyroscope',
            description: '6-axis motion tracking device',
            price: 75,
            weight: 0.003,
            specs: {
                'Axes': '6 (3 accel, 3 gyro)',
                'Interface': 'I2C',
                'Range': '±16g, ±2000°/s'
            },
            suppliers: ['netram', 'rs-components', 'communica']
        }
    ],
    actuators: [
        {
            id: 'servo-sg90',
            name: 'SG90 Micro Servo Motor',
            description: 'Small servo for precise control',
            price: 65,
            weight: 0.009,
            specs: {
                'Torque': '1.8kg·cm',
                'Speed': '0.1s/60°',
                'Rotation': '180°'
            },
            suppliers: ['diy-electronics', 'communica', 'mantech']
        },
        {
            id: 'dc-motor',
            name: 'DC Gear Motor 6V',
            description: 'Small DC motor with gearbox',
            price: 85,
            weight: 0.045,
            specs: {
                'Voltage': '3-6V',
                'RPM': '200',
                'Torque': '800g·cm'
            },
            suppliers: ['mantech', 'netram', 'communica']
        },
        {
            id: 'buzzer',
            name: 'Active Buzzer 5V',
            description: 'Sound generator',
            price: 15,
            weight: 0.003,
            specs: {
                'Voltage': '5V',
                'Current': '30mA',
                'Frequency': '2300Hz ±300Hz'
            },
            suppliers: ['diy-electronics', 'communica', 'mantech']
        },
        {
            id: 'relay-module',
            name: '1-Channel Relay Module 5V',
            description: 'Switch high-power devices',
            price: 35,
            weight: 0.018,
            specs: {
                'Voltage': '5V',
                'Contact': '10A 250VAC',
                'Isolation': 'Optocoupler'
            },
            suppliers: ['netram', 'rs-components', 'communica']
        }
    ],
    connectivity: [
        {
            id: 'esp32-cam',
            name: 'ESP32-CAM Module',
            description: 'WiFi camera module',
            price: 185,
            weight: 0.01,
            specs: {
                'Camera': '2MP OV2640',
                'WiFi': '802.11 b/g/n',
                'Bluetooth': 'v4.2'
            },
            suppliers: ['communica', 'netram', 'diy-electronics']
        },
        {
            id: 'bluetooth-hc05',
            name: 'HC-05 Bluetooth Module',
            description: 'Serial Bluetooth communication',
            price: 95,
            weight: 0.008,
            specs: {
                'Range': '10 meters',
                'Voltage': '3.3-5V',
                'Baud Rate': '9600-1382400'
            },
            suppliers: ['diy-electronics', 'communica', 'netram']
        },
        {
            id: 'nrf24l01',
            name: 'nRF24L01+ Wireless Module',
            description: '2.4GHz wireless transceiver',
            price: 45,
            weight: 0.003,
            specs: {
                'Frequency': '2.4GHz',
                'Range': '100m',
                'Data Rate': '2Mbps'
            },
            suppliers: ['netram', 'communica', 'mantech']
        }
    ],
    power: [
        {
            id: 'power-supply-5v',
            name: '5V 2A Power Supply',
            description: 'Wall adapter with DC jack',
            price: 125,
            weight: 0.15,
            specs: {
                'Output': '5V 2A',
                'Input': '100-240VAC',
                'Connector': 'DC 2.1mm'
            },
            suppliers: ['communica', 'rs-components', 'netram']
        },
        {
            id: 'battery-pack-4aa',
            name: '4xAA Battery Holder',
            description: 'Battery pack with switch',
            price: 25,
            weight: 0.035,
            specs: {
                'Batteries': '4 x AA',
                'Output': '6V',
                'Switch': 'On/Off'
            },
            suppliers: ['diy-electronics', 'mantech', 'communica']
        },
        {
            id: 'voltage-regulator',
            name: 'LM2596 Step-down Module',
            description: 'Adjustable voltage regulator',
            price: 35,
            weight: 0.015,
            specs: {
                'Input': '4-40V',
                'Output': '1.25-37V',
                'Current': '3A max'
            },
            suppliers: ['netram', 'communica', 'diy-electronics']
        },
        {
            id: 'capacitor-kit',
            name: 'Electrolytic Capacitor Kit',
            description: 'Various values for power filtering',
            price: 65,
            weight: 0.08,
            specs: {
                'Values': '1µF to 1000µF',
                'Voltage': '16V-50V',
                'Quantity': '120 pieces'
            },
            suppliers: ['mantech', 'rs-components', 'netram']
        }
    ]
};

// Calculator state
let calculatorState = {
    selectedComponents: {},
    currentCategory: 'essentials',
    totals: {
        subtotal: 0,
        shipping: 0,
        duties: 0,
        total: 0,
        weight: 0
    }
};

// Initialize cost calculator
document.addEventListener('DOMContentLoaded', function() {
    initializeCostCalculator();
    trackToolUsage('cost-calculator', 'page_load');
});

function initializeCostCalculator() {
    // Load saved state or URL config
    const urlConfig = ToolsUtils.loadFromUrl();
    if (urlConfig && urlConfig.tool === 'cost-calculator') {
        calculatorState.selectedComponents = urlConfig.selectedComponents || {};
    } else {
        loadSavedState();
    }

    // Setup event listeners
    setupEventListeners();
    
    // Initialize display
    displayComponents(calculatorState.currentCategory);
    updateTotals();
    updateSelectedComponents();
    updateSupplierRecommendations();
}

function setupEventListeners() {
    // Category tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            switchCategory(category);
        });
    });

    // Action buttons
    document.getElementById('export-btn').addEventListener('click', exportShoppingList);
    document.getElementById('share-btn').addEventListener('click', shareConfiguration);
    document.getElementById('reset-btn').addEventListener('click', resetCalculator);
}

function switchCategory(category) {
    calculatorState.currentCategory = category;
    
    // Update tab appearance
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Display components for this category
    displayComponents(category);
    
    trackToolUsage('cost-calculator', 'category_switch', { category });
}

function displayComponents(category) {
    const grid = document.getElementById('component-grid');
    const components = COMPONENT_DATABASE[category] || [];
    
    grid.innerHTML = components.map(component => {
        const isSelected = calculatorState.selectedComponents[component.id];
        const quantity = isSelected ? isSelected.quantity : 0;
        
        return `
            <div class="component-card ${isSelected ? 'selected' : ''}" 
                 data-component="${component.id}">
                <div class="component-header">
                    <div class="component-info">
                        <h4>${component.name}</h4>
                        <p>${component.description}</p>
                    </div>
                    <div class="component-price">${ToolsUtils.formatCurrency(component.price)}</div>
                </div>
                
                <div class="component-specs">
                    ${Object.entries(component.specs).map(([key, value]) => 
                        `<div class="spec-item">
                            <span>${key}:</span>
                            <span>${value}</span>
                        </div>`
                    ).join('')}
                </div>
                
                <div class="quantity-controls">
                    <button class="qty-btn" data-action="decrease">−</button>
                    <span class="qty-display">${quantity}</span>
                    <button class="qty-btn" data-action="increase">+</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    grid.querySelectorAll('.component-card').forEach(card => {
        const componentId = card.getAttribute('data-component');
        
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('qty-btn')) {
                toggleComponent(componentId);
            }
        });
        
        // Quantity control handlers
        card.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const action = this.getAttribute('data-action');
                updateQuantity(componentId, action);
            });
        });
    });
}

function toggleComponent(componentId) {
    if (calculatorState.selectedComponents[componentId]) {
        // Remove component
        delete calculatorState.selectedComponents[componentId];
    } else {
        // Add component with quantity 1
        const component = findComponent(componentId);
        if (component) {
            calculatorState.selectedComponents[componentId] = {
                ...component,
                quantity: 1
            };
        }
    }
    
    updateDisplay();
    saveState();
    trackToolUsage('cost-calculator', 'component_toggle', { componentId });
}

function updateQuantity(componentId, action) {
    const selected = calculatorState.selectedComponents[componentId];
    if (!selected) return;
    
    if (action === 'increase') {
        selected.quantity = Math.min(selected.quantity + 1, 99);
    } else if (action === 'decrease') {
        selected.quantity = Math.max(selected.quantity - 1, 1);
        if (selected.quantity === 0) {
            delete calculatorState.selectedComponents[componentId];
        }
    }
    
    updateDisplay();
    saveState();
    trackToolUsage('cost-calculator', 'quantity_change', { componentId, action });
}

function findComponent(componentId) {
    for (const category of Object.values(COMPONENT_DATABASE)) {
        const component = category.find(c => c.id === componentId);
        if (component) return component;
    }
    return null;
}

function updateDisplay() {
    // Update component cards
    displayComponents(calculatorState.currentCategory);
    
    // Update totals and other sections
    updateTotals();
    updateSelectedComponents();
    updateSupplierRecommendations();
    updateActionButtons();
}

function updateTotals() {
    const selected = Object.values(calculatorState.selectedComponents);
    
    // Calculate subtotal and weight
    let subtotal = 0;
    let weight = 0;
    
    selected.forEach(item => {
        subtotal += item.price * item.quantity;
        weight += item.weight * item.quantity;
    });
    
    // Calculate shipping and duties
    const shipping = ToolsUtils.calculateShipping(weight, subtotal);
    const duties = ToolsUtils.calculateDuties(subtotal);
    const total = subtotal + shipping + duties;
    
    // Update state
    calculatorState.totals = { subtotal, shipping, duties, total, weight };
    
    // Update display
    document.getElementById('subtotal').textContent = ToolsUtils.formatCurrency(subtotal);
    document.getElementById('shipping').textContent = ToolsUtils.formatCurrency(shipping);
    document.getElementById('duties').textContent = ToolsUtils.formatCurrency(duties);
    document.getElementById('total').textContent = ToolsUtils.formatCurrency(total);
    
    // Update budget level
    updateBudgetLevel(total);
}

function updateBudgetLevel(total) {
    const budgetLevel = document.getElementById('budget-level');
    let level, message, icon;
    
    if (total < 500) {
        level = 'beginner';
        message = 'Beginner Budget - Great for getting started!';
        icon = 'fa-seedling';
    } else if (total < 1500) {
        level = 'intermediate';
        message = 'Intermediate Budget - Good component selection';
        icon = 'fa-cogs';
    } else {
        level = 'advanced';
        message = 'Advanced Budget - Professional setup';
        icon = 'fa-rocket';
    }
    
    budgetLevel.className = `budget-level ${level}`;
    budgetLevel.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
}

function updateSelectedComponents() {
    const container = document.getElementById('selected-list');
    const selected = Object.values(calculatorState.selectedComponents);
    
    if (selected.length === 0) {
        container.innerHTML = '<p class="empty-cart">No components selected yet. Choose from the categories above.</p>';
        return;
    }
    
    container.innerHTML = selected.map(item => `
        <div class="selected-item">
            <div class="selected-item-info">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity} × ${ToolsUtils.formatCurrency(item.price)}</p>
            </div>
            <div class="selected-item-controls">
                <span class="selected-item-price">
                    ${ToolsUtils.formatCurrency(item.price * item.quantity)}
                </span>
                <button class="remove-btn" data-component="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Add remove handlers
    container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const componentId = this.getAttribute('data-component');
            delete calculatorState.selectedComponents[componentId];
            updateDisplay();
            saveState();
            trackToolUsage('cost-calculator', 'component_remove', { componentId });
        });
    });
}

function updateSupplierRecommendations() {
    const container = document.getElementById('supplier-list');
    const selected = Object.values(calculatorState.selectedComponents);
    
    if (selected.length === 0) {
        container.innerHTML = '<p>Add components to see supplier recommendations</p>';
        return;
    }
    
    // Get suppliers that have the most selected components
    const supplierCounts = {};
    selected.forEach(item => {
        item.suppliers.forEach(supplierId => {
            supplierCounts[supplierId] = (supplierCounts[supplierId] || 0) + 1;
        });
    });
    
    // Sort suppliers by relevance
    const sortedSuppliers = Object.entries(supplierCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([supplierId]) => SA_SUPPLIERS.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === supplierId))
        .filter(supplier => supplier); // Filter out undefined suppliers
    
    container.innerHTML = sortedSuppliers.map(supplier => `
        <div class="supplier-item">
            <div class="supplier-icon">${supplier.icon}</div>
            <div class="supplier-info">
                <h4>${supplier.name}</h4>
                <p>${supplier.location} • ${supplier.shipping}</p>
            </div>
        </div>
    `).join('');
}

function updateActionButtons() {
    const hasComponents = Object.keys(calculatorState.selectedComponents).length > 0;
    
    document.getElementById('export-btn').disabled = !hasComponents;
    document.getElementById('share-btn').disabled = !hasComponents;
}

function exportShoppingList() {
    const selected = Object.values(calculatorState.selectedComponents);
    const exportData = {
        timestamp: new Date().toISOString(),
        totals: calculatorState.totals,
        components: selected.map(item => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
            suppliers: item.suppliers
        })),
        suppliers: SA_SUPPLIERS.filter(supplier => 
            selected.some(item => 
                item.suppliers.includes(supplier.name.toLowerCase().replace(/\s+/g, '-'))
            )
        )
    };
    
    ToolsUtils.exportJSON(exportData, `arduino-shopping-list-${Date.now()}.json`);
    ToolsUtils.showToast('Shopping list exported successfully!', 'success');
    trackToolUsage('cost-calculator', 'export', { componentCount: selected.length });
}

function shareConfiguration() {
    const shareData = {
        tool: 'cost-calculator',
        selectedComponents: calculatorState.selectedComponents,
        timestamp: new Date().toISOString()
    };
    
    const shareUrl = ToolsUtils.generateShareableUrl(shareData);
    
    if (navigator.share) {
        navigator.share({
            title: 'Arduino UNO R4 WiFi Cost Calculator Configuration',
            text: `Check out my Arduino project configuration - Total: ${ToolsUtils.formatCurrency(calculatorState.totals.total)}`,
            url: shareUrl
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            ToolsUtils.showToast('Configuration URL copied to clipboard!', 'success');
        });
    }
    
    trackToolUsage('cost-calculator', 'share', { total: calculatorState.totals.total });
}

function resetCalculator() {
    if (confirm('Are you sure you want to clear all selected components?')) {
        calculatorState.selectedComponents = {};
        updateDisplay();
        saveState();
        ToolsUtils.showToast('Calculator reset successfully', 'info');
        trackToolUsage('cost-calculator', 'reset');
    }
}

function saveState() {
    localStorage.setItem('arduino-cost-calculator', JSON.stringify(calculatorState));
}

function loadSavedState() {
    const saved = localStorage.getItem('arduino-cost-calculator');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            calculatorState.selectedComponents = state.selectedComponents || {};
        } catch (e) {
            console.error('Error loading saved state:', e);
        }
    }
}