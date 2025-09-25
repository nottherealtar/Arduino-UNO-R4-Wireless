// Module 2: Hardware & Suppliers - JavaScript functionality

// Module state management
const Module2State = {
    currentSection: 'overview',
    completedSections: [],
    selectedSuppliers: [],
    importCalculatorData: {
        itemValue: 0,
        shippingCost: 0,
        exchangeRate: 18.50
    }
};

// South African suppliers database with detailed information
const SA_SUPPLIERS_DETAILED = [
    {
        id: 'rs-components',
        name: 'RS Components SA',
        location: 'Johannesburg, Cape Town',
        province: 'gauteng',
        website: 'https://za.rs-online.com',
        phone: '011 691 9300',
        email: 'sa-sales@rs-components.com',
        rating: 4.8,
        priceRange: 'Premium',
        specialties: ['Official Arduino', 'Industrial Components', 'Same-day delivery'],
        shipping: {
            cost: 'R95 (Free over R600)',
            time: '1-2 days',
            areas: 'Major cities'
        },
        components: {
            'arduino-r4-wifi': { price: 850, stock: 'In Stock', leadTime: '1 day' },
            'breadboard': { price: 75, stock: 'In Stock', leadTime: '1 day' },
            'sensors': { price: 65, stock: 'Limited', leadTime: '2-3 days' }
        },
        pros: ['Official distributor', 'Reliable stock', 'Fast delivery', 'Technical support'],
        cons: ['Higher prices', 'Minimum order fees'],
        description: 'Official Arduino distributor with extensive inventory and professional support.'
    },
    {
        id: 'communica',
        name: 'Communica',
        location: 'Cape Town, Johannesburg',
        province: 'western-cape',
        website: 'https://www.communica.co.za',
        phone: '021 945 1012',
        email: 'sales@communica.co.za',
        rating: 4.5,
        priceRange: 'Mid-range',
        specialties: ['Wide range', 'Good prices', 'PostNet delivery'],
        shipping: {
            cost: 'R65-150',
            time: '2-5 days',
            areas: 'Nationwide via PostNet'
        },
        components: {
            'arduino-r4-wifi': { price: 795, stock: 'In Stock', leadTime: '2 days' },
            'breadboard': { price: 65, stock: 'In Stock', leadTime: '1 day' },
            'sensors': { price: 55, stock: 'In Stock', leadTime: '1-2 days' }
        },
        pros: ['Good pricing', 'Wide component range', 'Helpful staff', 'PostNet delivery'],
        cons: ['Limited Arduino stock', 'Slower shipping'],
        description: 'Well-established supplier with competitive prices and good component variety.'
    },
    {
        id: 'mantech',
        name: 'Mantech Electronics',
        location: 'Cape Town, Durban',
        province: 'western-cape',
        website: 'https://www.mantech.co.za',
        phone: '021 555 7200',
        email: 'info@mantech.co.za',
        rating: 4.2,
        priceRange: 'Budget',
        specialties: ['Arduino clones', 'Budget options', 'Local pickup'],
        shipping: {
            cost: 'R55-110',
            time: '3-7 days',
            areas: 'JHB, CPT, DBN pickup available'
        },
        components: {
            'arduino-r4-wifi': { price: 450, stock: 'Clone version', leadTime: '3 days' },
            'breadboard': { price: 45, stock: 'In Stock', leadTime: '1 day' },
            'sensors': { price: 35, stock: 'In Stock', leadTime: '1-2 days' }
        },
        pros: ['Very affordable', 'Local pickup', 'Good for beginners', 'Clone alternatives'],
        cons: ['Clone quality varies', 'Limited official products'],
        description: 'Budget-friendly option with Arduino clones and basic components.'
    },
    {
        id: 'netram',
        name: 'Netram Technologies',
        location: 'Johannesburg',
        province: 'gauteng',
        website: 'https://www.netram.co.za',
        phone: '011 234 5678',
        email: 'sales@netram.co.za',
        rating: 4.3,
        priceRange: 'Mid-range',
        specialties: ['IoT components', 'Bulk orders', 'Technical consulting'],
        shipping: {
            cost: 'R85-200',
            time: '2-4 days',
            areas: 'Gauteng same-day, nationwide'
        },
        components: {
            'arduino-r4-wifi': { price: 750, stock: 'In Stock', leadTime: '1 day' },
            'breadboard': { price: 60, stock: 'In Stock', leadTime: '1 day' },
            'sensors': { price: 50, stock: 'In Stock', leadTime: '1 day' }
        },
        pros: ['IoT focus', 'Technical support', 'Bulk discounts', 'Same-day Gauteng'],
        cons: ['Smaller inventory', 'Higher shipping outside Gauteng'],
        description: 'IoT-focused supplier with good technical expertise and bulk pricing.'
    },
    {
        id: 'diy-electronics',
        name: 'DIY Electronics',
        location: 'Durban, Port Elizabeth',
        province: 'kzn',
        website: 'https://www.diye.co.za',
        phone: '031 123 4567',
        email: 'hello@diye.co.za',
        rating: 4.0,
        priceRange: 'Budget',
        specialties: ['Maker community', 'DIY kits', 'Educational discounts'],
        shipping: {
            cost: 'R70-120',
            time: '3-6 days',
            areas: 'KZN local, nationwide shipping'
        },
        components: {
            'arduino-r4-wifi': { price: 680, stock: 'In Stock', leadTime: '2 days' },
            'breadboard': { price: 50, stock: 'In Stock', leadTime: '1 day' },
            'sensors': { price: 45, stock: 'In Stock', leadTime: '1-2 days' }
        },
        pros: ['Maker community', 'Educational focus', 'DIY kits', 'Good support'],
        cons: ['Limited premium products', 'Slower shipping'],
        description: 'Community-focused supplier with emphasis on education and maker projects.'
    }
];

// Initialize module functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeModule2();
    setupModule2EventListeners();
    loadModule2Progress();
    updateProgressDisplay();
});

function initializeModule2() {
    console.log('Module 2 initialized');
    
    // Set initial active section based on URL hash or default
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        navigateToSection(hash);
    } else {
        navigateToSection('overview');
    }
    
    // Initialize interactive elements
    populateSuppliersGrid();
    setupImportCalculator();
    setupSupplierFilters();
}

function setupModule2EventListeners() {
    // Navigation pill clicks
    document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            const section = this.dataset.section;
            navigateToSection(section);
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

// Section Navigation (reuse from module.js with Module2State)
function navigateToSection(sectionId, updateHistory = true) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        Module2State.currentSection = sectionId;
        
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
            module: 2, 
            section: sectionId,
            timestamp: new Date().toISOString()
        });
        
        saveModule2Progress();
    }
}

// Section Completion
function completeSection(sectionId) {
    if (!Module2State.completedSections.includes(sectionId)) {
        Module2State.completedSections.push(sectionId);
        
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
        saveModule2Progress();
        
        // Track completion
        trackEvent('module_section_completed', { 
            module: 2, 
            section: sectionId,
            totalCompleted: Module2State.completedSections.length
        });
    }
}

function showCompletionFeedback(sectionId) {
    const messages = {
        overview: "Great! You understand the SA hardware landscape.",
        suppliers: "Excellent! You know the key SA Arduino suppliers.",
        comparison: "Well done! You can now compare suppliers effectively.",
        'import-guide': "Perfect! You understand SA import regulations.",
        tools: "Congratulations! You've mastered the hardware tools."
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
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// Suppliers Grid Population
function populateSuppliersGrid() {
    const grid = document.getElementById('suppliers-grid');
    if (!grid) return;
    
    grid.innerHTML = SA_SUPPLIERS_DETAILED.map(supplier => `
        <div class="supplier-card" data-supplier="${supplier.id}" data-province="${supplier.province}">
            <div class="supplier-header">
                <div class="supplier-info">
                    <h3>${supplier.name}</h3>
                    <div class="supplier-meta">
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${supplier.location}</span>
                        <span class="rating">
                            <i class="fas fa-star"></i> ${supplier.rating}
                        </span>
                        <span class="price-range ${supplier.priceRange.toLowerCase()}">${supplier.priceRange}</span>
                    </div>
                </div>
                <div class="supplier-actions">
                    <button class="btn-select" onclick="toggleSupplierSelection('${supplier.id}')">
                        <i class="fas fa-plus"></i> Select
                    </button>
                </div>
            </div>
            
            <div class="supplier-body">
                <p class="supplier-description">${supplier.description}</p>
                
                <div class="supplier-specialties">
                    ${supplier.specialties.map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
                </div>
                
                <div class="supplier-details">
                    <div class="detail-section">
                        <h4><i class="fas fa-truck"></i> Shipping</h4>
                        <p><strong>Cost:</strong> ${supplier.shipping.cost}</p>
                        <p><strong>Time:</strong> ${supplier.shipping.time}</p>
                        <p><strong>Areas:</strong> ${supplier.shipping.areas}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-microchip"></i> Sample Pricing</h4>
                        <div class="pricing-grid">
                            <div class="price-item">
                                <span>Arduino R4 WiFi:</span>
                                <span class="price">R${supplier.components['arduino-r4-wifi'].price}</span>
                            </div>
                            <div class="price-item">
                                <span>Breadboard:</span>
                                <span class="price">R${supplier.components.breadboard.price}</span>
                            </div>
                            <div class="price-item">
                                <span>Sensors (avg):</span>
                                <span class="price">R${supplier.components.sensors.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="supplier-contact">
                    <a href="${supplier.website}" target="_blank" class="btn btn-outline btn-small">
                        <i class="fas fa-external-link-alt"></i> Visit Website
                    </a>
                    <span class="contact-info">
                        <i class="fas fa-phone"></i> ${supplier.phone}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Supplier Selection for Comparison
function toggleSupplierSelection(supplierId) {
    const supplierCard = document.querySelector(`[data-supplier="${supplierId}"]`);
    const selectBtn = supplierCard.querySelector('.btn-select');
    
    if (Module2State.selectedSuppliers.includes(supplierId)) {
        // Deselect
        Module2State.selectedSuppliers = Module2State.selectedSuppliers.filter(id => id !== supplierId);
        supplierCard.classList.remove('selected');
        selectBtn.innerHTML = '<i class="fas fa-plus"></i> Select';
        selectBtn.classList.remove('selected');
    } else {
        // Select (max 3)
        if (Module2State.selectedSuppliers.length >= 3) {
            showToast('You can compare up to 3 suppliers at once', 'warning');
            return;
        }
        
        Module2State.selectedSuppliers.push(supplierId);
        supplierCard.classList.add('selected');
        selectBtn.innerHTML = '<i class="fas fa-check"></i> Selected';
        selectBtn.classList.add('selected');
    }
    
    updateComparisonPreview();
}

function updateComparisonPreview() {
    const preview = document.getElementById('comparison-preview');
    const compareBtn = document.getElementById('compare-btn');
    
    if (Module2State.selectedSuppliers.length === 0) {
        preview.innerHTML = '<p class="text-muted">Select suppliers above to see comparison</p>';
        compareBtn.disabled = true;
    } else {
        const selectedNames = Module2State.selectedSuppliers.map(id => {
            const supplier = SA_SUPPLIERS_DETAILED.find(s => s.id === id);
            return supplier ? supplier.name : id;
        });
        
        preview.innerHTML = `
            <div class="comparison-preview-list">
                <h4>Selected for comparison:</h4>
                <ul>
                    ${selectedNames.map(name => `<li><i class="fas fa-check"></i> ${name}</li>`).join('')}
                </ul>
            </div>
        `;
        compareBtn.disabled = Module2State.selectedSuppliers.length < 2;
    }
}

function showDetailedComparison() {
    // Navigate to comparison section and populate with selected suppliers
    navigateToSection('comparison');
    populateComparisonTable();
}

function populateComparisonTable() {
    const container = document.getElementById('comparison-container');
    if (Module2State.selectedSuppliers.length < 2) {
        container.innerHTML = `
            <div class="comparison-placeholder">
                <i class="fas fa-balance-scale"></i>
                <h3>Select suppliers to compare</h3>
                <p>Go back to the Suppliers section and select 2-3 suppliers for detailed comparison.</p>
                <button class="btn btn-outline" onclick="navigateToSection('suppliers')">
                    Select Suppliers <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        return;
    }
    
    const selectedSuppliers = Module2State.selectedSuppliers.map(id => 
        SA_SUPPLIERS_DETAILED.find(s => s.id === id)
    ).filter(Boolean);
    
    container.innerHTML = `
        <div class="comparison-table-container">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Criteria</th>
                        ${selectedSuppliers.map(supplier => `<th>${supplier.name}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Overall Rating</strong></td>
                        ${selectedSuppliers.map(supplier => `
                            <td>
                                <div class="rating-display">
                                    <i class="fas fa-star"></i> ${supplier.rating}/5
                                </div>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong>Price Range</strong></td>
                        ${selectedSuppliers.map(supplier => `
                            <td><span class="price-badge ${supplier.priceRange.toLowerCase()}">${supplier.priceRange}</span></td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong>Arduino R4 WiFi</strong></td>
                        ${selectedSuppliers.map(supplier => `
                            <td>
                                <div class="price-cell">
                                    <span class="price">R${supplier.components['arduino-r4-wifi'].price}</span>
                                    <span class="stock">${supplier.components['arduino-r4-wifi'].stock}</span>
                                </div>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong>Shipping Cost</strong></td>
                        ${selectedSuppliers.map(supplier => `<td>${supplier.shipping.cost}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Shipping Time</strong></td>
                        ${selectedSuppliers.map(supplier => `<td>${supplier.shipping.time}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Coverage</strong></td>
                        ${selectedSuppliers.map(supplier => `<td>${supplier.shipping.areas}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Specialties</strong></td>
                        ${selectedSuppliers.map(supplier => `
                            <td>
                                <div class="specialties-list">
                                    ${supplier.specialties.slice(0, 3).map(spec => `<span class="specialty-mini">${spec}</span>`).join('')}
                                </div>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong>Contact</strong></td>
                        ${selectedSuppliers.map(supplier => `
                            <td>
                                <div class="contact-cell">
                                    <a href="${supplier.website}" target="_blank" class="btn btn-outline btn-xs">Website</a>
                                    <span class="phone">${supplier.phone}</span>
                                </div>
                            </td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="comparison-actions">
            <button class="btn btn-outline" onclick="clearComparison()">
                <i class="fas fa-times"></i> Clear Selection
            </button>
            <button class="btn btn-primary" onclick="exportComparison()">
                <i class="fas fa-download"></i> Export Comparison
            </button>
        </div>
    `;
}

function clearComparison() {
    Module2State.selectedSuppliers = [];
    
    // Update supplier cards
    document.querySelectorAll('.supplier-card').forEach(card => {
        card.classList.remove('selected');
        const selectBtn = card.querySelector('.btn-select');
        if (selectBtn) {
            selectBtn.innerHTML = '<i class="fas fa-plus"></i> Select';
            selectBtn.classList.remove('selected');
        }
    });
    
    updateComparisonPreview();
    populateComparisonTable();
    showToast('Comparison cleared', 'info');
}

function exportComparison() {
    const selectedSuppliers = Module2State.selectedSuppliers.map(id => 
        SA_SUPPLIERS_DETAILED.find(s => s.id === id)
    ).filter(Boolean);
    
    const exportData = {
        timestamp: new Date().toISOString(),
        comparison_type: 'SA Arduino Suppliers',
        suppliers: selectedSuppliers.map(supplier => ({
            name: supplier.name,
            rating: supplier.rating,
            price_range: supplier.priceRange,
            arduino_price: supplier.components['arduino-r4-wifi'].price,
            shipping: supplier.shipping,
            contact: {
                website: supplier.website,
                phone: supplier.phone
            }
        }))
    };
    
    // Create downloadable file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arduino-suppliers-comparison-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Comparison exported successfully', 'success');
}

// Import Calculator
function setupImportCalculator() {
    const inputs = ['item-value', 'shipping-cost', 'exchange-rate'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updateImportCalculatorPreview);
        }
    });
}

function updateImportCalculatorPreview() {
    const itemValue = parseFloat(document.getElementById('item-value')?.value || 0);
    const shippingCost = parseFloat(document.getElementById('shipping-cost')?.value || 0);
    const exchangeRate = parseFloat(document.getElementById('exchange-rate')?.value || 18.50);
    
    Module2State.importCalculatorData = { itemValue, shippingCost, exchangeRate };
}

function calculateImportCosts() {
    const { itemValue, shippingCost, exchangeRate } = Module2State.importCalculatorData;
    
    if (itemValue <= 0) {
        showToast('Please enter a valid item value', 'warning');
        return;
    }
    
    // Convert to ZAR
    const itemValueZAR = itemValue * exchangeRate;
    const shippingZAR = shippingCost * exchangeRate;
    const subtotal = itemValueZAR + shippingZAR;
    
    // Calculate duties and taxes
    const dutyThreshold = 500;
    const dutyRate = 0.15; // 15%
    const vatRate = 0.15; // 15%
    
    let dutyAmount = 0;
    if (subtotal > dutyThreshold) {
        dutyAmount = itemValueZAR * dutyRate;
    }
    
    const vatableAmount = itemValueZAR + shippingZAR + dutyAmount;
    const vatAmount = vatableAmount * vatRate;
    
    const totalCost = itemValueZAR + shippingZAR + dutyAmount + vatAmount;
    
    // Display results
    document.getElementById('item-value-zar').textContent = `R${itemValueZAR.toFixed(2)}`;
    document.getElementById('shipping-zar').textContent = `R${shippingZAR.toFixed(2)}`;
    document.getElementById('duty-amount').textContent = `R${dutyAmount.toFixed(2)}`;
    document.getElementById('vat-amount').textContent = `R${vatAmount.toFixed(2)}`;
    document.getElementById('total-cost').textContent = `R${totalCost.toFixed(2)}`;
    
    document.getElementById('import-results').style.display = 'block';
    
    // Track calculation
    trackEvent('import_cost_calculated', {
        module: 2,
        item_value_usd: itemValue,
        total_cost_zar: totalCost,
        exchange_rate: exchangeRate
    });
}

// Filters
function setupSupplierFilters() {
    const provinceFilter = document.getElementById('province-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (provinceFilter) {
        provinceFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const province = document.getElementById('province-filter')?.value;
    const sortBy = document.getElementById('sort-filter')?.value;
    
    const supplierCards = Array.from(document.querySelectorAll('.supplier-card'));
    
    // Filter by province
    supplierCards.forEach(card => {
        const cardProvince = card.dataset.province;
        if (province === 'all' || cardProvince === province) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Sort visible cards
    const visibleCards = supplierCards.filter(card => card.style.display !== 'none');
    const container = document.getElementById('suppliers-grid');
    
    visibleCards.sort((a, b) => {
        const supplierA = SA_SUPPLIERS_DETAILED.find(s => s.id === a.dataset.supplier);
        const supplierB = SA_SUPPLIERS_DETAILED.find(s => s.id === b.dataset.supplier);
        
        if (!supplierA || !supplierB) return 0;
        
        switch (sortBy) {
            case 'rating':
                return supplierB.rating - supplierA.rating;
            case 'price':
                return supplierA.components['arduino-r4-wifi'].price - supplierB.components['arduino-r4-wifi'].price;
            case 'shipping':
                // Simple shipping cost comparison (extract first number)
                const shippingA = parseInt(supplierA.shipping.cost.match(/\d+/)?.[0] || 999);
                const shippingB = parseInt(supplierB.shipping.cost.match(/\d+/)?.[0] || 999);
                return shippingA - shippingB;
            default:
                return supplierA.name.localeCompare(supplierB.name);
        }
    });
    
    // Reorder DOM elements
    visibleCards.forEach(card => container.appendChild(card));
}

function resetFilters() {
    document.getElementById('province-filter').value = 'all';
    document.getElementById('sort-filter').value = 'rating';
    applyFilters();
    showToast('Filters reset', 'info');
}

// Progress Management
function updateProgressDisplay() {
    const totalSections = 5;
    const completedCount = Module2State.completedSections.length;
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
    Module2State.completedSections.forEach(sectionId => {
        const checklistItem = document.querySelector(`.checklist-item[data-item="${sectionId}"]`);
        if (checklistItem) {
            checklistItem.classList.add('completed');
            checklistItem.querySelector('i').className = 'fas fa-check-circle';
        }
    });
}

// Data Persistence
function saveModule2Progress() {
    const progressData = {
        module: 2,
        currentSection: Module2State.currentSection,
        completedSections: Module2State.completedSections,
        selectedSuppliers: Module2State.selectedSuppliers,
        importCalculatorData: Module2State.importCalculatorData,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('module2Progress', JSON.stringify(progressData));
    
    // Also update global progress
    const globalProgress = JSON.parse(localStorage.getItem('arduinoJourneyProgress') || '{}');
    globalProgress.module2 = progressData;
    localStorage.setItem('arduinoJourneyProgress', JSON.stringify(globalProgress));
}

function loadModule2Progress() {
    const saved = localStorage.getItem('module2Progress');
    if (saved) {
        const data = JSON.parse(saved);
        
        Module2State.currentSection = data.currentSection || 'overview';
        Module2State.completedSections = data.completedSections || [];
        Module2State.selectedSuppliers = data.selectedSuppliers || [];
        Module2State.importCalculatorData = data.importCalculatorData || {
            itemValue: 0, shippingCost: 0, exchangeRate: 18.50
        };
        
        // Restore import calculator values
        if (data.importCalculatorData) {
            const { itemValue, shippingCost, exchangeRate } = data.importCalculatorData;
            const itemInput = document.getElementById('item-value');
            const shippingInput = document.getElementById('shipping-cost');
            const rateInput = document.getElementById('exchange-rate');
            
            if (itemInput) itemInput.value = itemValue;
            if (shippingInput) shippingInput.value = shippingCost;
            if (rateInput) rateInput.value = exchangeRate;
        }
    }
    
    // Set start time if not already set
    if (!localStorage.getItem('module2StartTime')) {
        localStorage.setItem('module2StartTime', Date.now().toString());
    }
}

// Utility functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

function trackEvent(eventName, properties = {}) {
    if (window.ArduinoJourney && window.ArduinoJourney.trackEvent) {
        window.ArduinoJourney.trackEvent(eventName, properties);
    } else {
        console.log('Module 2 Event:', eventName, properties);
    }
}

// Export functions for external use
window.Module2Functions = {
    navigateToSection,
    completeSection,
    toggleSupplierSelection,
    calculateImportCosts,
    resetFilters,
    clearComparison,
    exportComparison
};