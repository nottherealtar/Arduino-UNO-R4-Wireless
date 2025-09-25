// SA Supplier Finder Implementation

// Extended supplier database
const SUPPLIERS_DATABASE = [
    {
        id: 'communica',
        name: 'Communica',
        type: 'both',
        description: 'Leading electronics retailer with comprehensive Arduino selection',
        website: 'https://www.communica.co.za',
        email: 'info@communica.co.za',
        phone: '+27 21 555 1234',
        locations: [
            {
                city: 'cape-town',
                address: '123 Long Street, Cape Town, 8001',
                coordinates: [-33.9249, 18.4241]
            },
            {
                city: 'johannesburg', 
                address: '456 Commissioner Street, Johannesburg, 2001',
                coordinates: [-26.2041, 28.0473]
            }
        ],
        specialties: ['arduino', 'sensors', 'components', 'kits'],
        rating: 4.8,
        reviewCount: 324,
        priceRange: 'mid',
        shipping: {
            freeThreshold: 500,
            cost: 60,
            areas: 'nationwide'
        },
        stock: {
            arduino: 'excellent',
            sensors: 'good',
            components: 'excellent'
        },
        features: ['Online ordering', 'Same-day collection', 'Technical support', 'Bulk discounts']
    },
    {
        id: 'netram',
        name: 'Netram Technologies',
        type: 'both',
        description: 'Professional electronics supplier focusing on development boards',
        website: 'https://www.netram.co.za',
        email: 'sales@netram.co.za',
        phone: '+27 11 555 5678',
        locations: [
            {
                city: 'johannesburg',
                address: '789 Pritchard Street, Johannesburg, 2001',
                coordinates: [-26.2041, 28.0473]
            }
        ],
        specialties: ['arduino', 'components', 'tools', 'robotics'],
        rating: 4.6,
        reviewCount: 198,
        priceRange: 'mid',
        shipping: {
            freeThreshold: 300,
            cost: 45,
            areas: 'nationwide'
        },
        stock: {
            arduino: 'good',
            sensors: 'excellent',
            components: 'good'
        },
        features: ['Technical consultation', 'Custom solutions', 'Educational discounts']
    },
    {
        id: 'diy-electronics',
        name: 'DIY Electronics',
        type: 'physical',
        description: 'Maker-focused store with hands-on workshops and support',
        website: 'https://www.diye.co.za',
        email: 'hello@diye.co.za',
        phone: '+27 21 555 9012',
        locations: [
            {
                city: 'cape-town',
                address: '321 Kloof Street, Cape Town, 8001',
                coordinates: [-33.9249, 18.4241]
            }
        ],
        specialties: ['arduino', 'kits', 'sensors', 'robotics'],
        rating: 4.7,
        reviewCount: 156,
        priceRange: 'budget',
        shipping: {
            freeThreshold: 400,
            cost: 50,
            areas: 'western-cape'
        },
        stock: {
            arduino: 'good',
            sensors: 'good',
            components: 'fair'
        },
        features: ['Workshops', 'Maker space', 'Student discounts', 'Local community']
    },
    {
        id: 'rs-components',
        name: 'RS Components South Africa',
        type: 'online',
        description: 'International supplier with professional-grade components',
        website: 'https://za.rs-online.com',
        email: 'info@rs-components.co.za',
        phone: '+27 11 555 3456',
        locations: [
            {
                city: 'online',
                address: 'Online Only - Nationwide Delivery',
                coordinates: null
            }
        ],
        specialties: ['components', 'tools', 'arduino', 'sensors'],
        rating: 4.5,
        reviewCount: 892,
        priceRange: 'premium',
        shipping: {
            freeThreshold: 750,
            cost: 65,
            areas: 'nationwide'
        },
        stock: {
            arduino: 'excellent',
            sensors: 'excellent',
            components: 'excellent'
        },
        features: ['Next-day delivery', 'Technical datasheets', 'CAD models', 'Volume pricing']
    },
    {
        id: 'mantech',
        name: 'Mantech Electronics',
        type: 'both',
        description: 'Electronics hobbyist store with wide component selection',
        website: 'https://www.mantech.co.za',
        email: 'info@mantech.co.za',
        phone: '+27 31 555 7890',
        locations: [
            {
                city: 'durban',
                address: '654 West Street, Durban, 4001',
                coordinates: [-29.8587, 31.0218]
            },
            {
                city: 'cape-town',
                address: '987 Main Road, Observatory, 7925',
                coordinates: [-33.9249, 18.4241]
            }
        ],
        specialties: ['components', 'arduino', 'tools', 'kits'],
        rating: 4.4,
        reviewCount: 267,
        priceRange: 'budget',
        shipping: {
            freeThreshold: 350,
            cost: 55,
            areas: 'nationwide'
        },
        stock: {
            arduino: 'fair',
            sensors: 'good',
            components: 'excellent'
        },
        features: ['Friendly service', 'Component testing', 'Repair services']
    },
    {
        id: 'micro-robotics',
        name: 'Micro Robotics',
        type: 'online',
        description: 'Robotics specialist with Arduino and automation focus',
        website: 'https://www.microrobotics.co.za',
        email: 'support@microrobotics.co.za',
        phone: '+27 21 555 2468',
        locations: [
            {
                city: 'online',
                address: 'Online Store - Cape Town Based',
                coordinates: null
            }
        ],
        specialties: ['robotics', 'arduino', 'sensors', 'kits'],
        rating: 4.9,
        reviewCount: 145,
        priceRange: 'mid',
        shipping: {
            freeThreshold: 500,
            cost: 70,
            areas: 'nationwide'
        },
        stock: {
            arduino: 'excellent',
            sensors: 'excellent',
            components: 'good'
        },
        features: ['Robotics kits', 'Educational resources', 'Video tutorials', 'Competition support']
    },
    {
        id: 'electronics-123',
        name: 'Electronics 123',
        type: 'physical',
        description: 'Local electronics store with competitive pricing',
        website: null,
        email: 'info@electronics123.co.za',
        phone: '+27 12 555 1357',
        locations: [
            {
                city: 'pretoria',
                address: '147 Church Street, Pretoria, 0002',
                coordinates: [-25.7479, 28.2293]
            }
        ],
        specialties: ['components', 'arduino', 'tools'],
        rating: 4.2,
        reviewCount: 89,
        priceRange: 'budget',
        shipping: {
            freeThreshold: 0,
            cost: 40,
            areas: 'gauteng'
        },
        stock: {
            arduino: 'fair',
            sensors: 'fair',
            components: 'good'
        },
        features: ['Cash discounts', 'Local pickup', 'Bulk pricing']
    },
    {
        id: 'circuitry',
        name: 'Circuitry',
        type: 'online',
        description: 'Modern online electronics retailer with fast delivery',
        website: 'https://www.circuitry.co.za',
        email: 'hello@circuitry.co.za',
        phone: '+27 87 555 9999',
        locations: [
            {
                city: 'online',
                address: 'Online Only - Fast Nationwide Delivery',
                coordinates: null
            }
        ],
        specialties: ['arduino', 'sensors', 'kits', 'components'],
        rating: 4.6,
        reviewCount: 223,
        priceRange: 'mid',
        shipping: {
            freeThreshold: 400,
            cost: 50,
            areas: 'nationwide'
        },
        stock: {
            arduino: 'good',
            sensors: 'excellent',
            components: 'good'
        },
        features: ['Next-day delivery', 'Modern website', 'Mobile app', 'Live chat support']
    }
];

// Finder state
let finderState = {
    currentView: 'grid',
    searchQuery: '',
    filters: {
        location: '',
        specialty: '',
        rating: ''
    },
    selectedSuppliers: []
};

// Initialize supplier finder
document.addEventListener('DOMContentLoaded', function() {
    initializeSupplierFinder();
    trackToolUsage('supplier-finder', 'page_load');
});

function initializeSupplierFinder() {
    setupEventListeners();
    displaySuppliers(SUPPLIERS_DATABASE);
    updateResultsCount(SUPPLIERS_DATABASE.length);
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('search-input').addEventListener('input', ToolsUtils.debounce(performSearch, 300));
    document.getElementById('search-btn').addEventListener('click', performSearch);
    
    // Filter functionality
    document.getElementById('location-filter').addEventListener('change', applyFilters);
    document.getElementById('specialty-filter').addEventListener('change', applyFilters);
    document.getElementById('rating-filter').addEventListener('change', applyFilters);
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
    
    // View switching
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchView(this.getAttribute('data-view'));
        });
    });
    
    // Action buttons
    document.getElementById('export-suppliers').addEventListener('click', exportSuppliers);
    document.getElementById('compare-suppliers').addEventListener('click', compareSuppliers);
    document.getElementById('get-directions').addEventListener('click', getDirections);
    
    // Enter key support for search
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    finderState.searchQuery = query;
    
    const filteredSuppliers = filterSuppliers();
    displaySuppliers(filteredSuppliers);
    updateResultsCount(filteredSuppliers.length);
    
    trackToolUsage('supplier-finder', 'search', { query: query });
}

function applyFilters() {
    finderState.filters = {
        location: document.getElementById('location-filter').value,
        specialty: document.getElementById('specialty-filter').value,
        rating: document.getElementById('rating-filter').value
    };
    
    const filteredSuppliers = filterSuppliers();
    displaySuppliers(filteredSuppliers);
    updateResultsCount(filteredSuppliers.length);
    
    trackToolUsage('supplier-finder', 'filter_applied', finderState.filters);
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('location-filter').value = '';
    document.getElementById('specialty-filter').value = '';
    document.getElementById('rating-filter').value = '';
    
    finderState.searchQuery = '';
    finderState.filters = { location: '', specialty: '', rating: '' };
    
    displaySuppliers(SUPPLIERS_DATABASE);
    updateResultsCount(SUPPLIERS_DATABASE.length);
    
    ToolsUtils.showToast('Filters cleared', 'info');
    trackToolUsage('supplier-finder', 'filters_cleared');
}

function filterSuppliers() {
    return SUPPLIERS_DATABASE.filter(supplier => {
        // Search query filter
        if (finderState.searchQuery) {
            const searchableText = [
                supplier.name,
                supplier.description,
                ...supplier.specialties,
                ...supplier.locations.map(loc => getCityName(loc.city))
            ].join(' ').toLowerCase();
            
            if (!searchableText.includes(finderState.searchQuery)) {
                return false;
            }
        }
        
        // Location filter
        if (finderState.filters.location) {
            const hasLocation = supplier.locations.some(loc => 
                loc.city === finderState.filters.location
            );
            if (!hasLocation) return false;
        }
        
        // Specialty filter
        if (finderState.filters.specialty) {
            if (!supplier.specialties.includes(finderState.filters.specialty)) {
                return false;
            }
        }
        
        // Rating filter
        if (finderState.filters.rating) {
            const minRating = parseFloat(finderState.filters.rating);
            if (supplier.rating < minRating) {
                return false;
            }
        }
        
        return true;
    });
}

function displaySuppliers(suppliers) {
    const container = document.getElementById('suppliers-container');
    
    if (suppliers.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No suppliers found</h3>
                <p>Try adjusting your search criteria or clearing filters</p>
                <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }
    
    const viewClass = finderState.currentView === 'list' ? 'suppliers-list' : 'suppliers-grid';
    container.className = viewClass;
    
    container.innerHTML = suppliers.map(supplier => {
        return finderState.currentView === 'list' ? 
            generateSupplierListItem(supplier) : 
            generateSupplierCard(supplier);
    }).join('');
    
    // Add event listeners to supplier cards
    setupSupplierCardEvents();
}

function generateSupplierCard(supplier) {
    const primaryLocation = supplier.locations[0];
    const locationText = primaryLocation.city === 'online' ? 
        'Online Only' : 
        `${getCityName(primaryLocation.city)}${supplier.locations.length > 1 ? ` +${supplier.locations.length - 1}` : ''}`;
    
    return `
        <div class="supplier-card" data-supplier-id="${supplier.id}">
            <div class="supplier-header">
                <div class="supplier-basic">
                    <h3>${supplier.name}</h3>
                    <div class="supplier-type ${supplier.type}">
                        <i class="fas fa-${getTypeIcon(supplier.type)}"></i>
                        ${getTypeLabel(supplier.type)}
                    </div>
                </div>
                <div class="supplier-rating">
                    <div class="stars">
                        ${generateStars(supplier.rating)}
                    </div>
                    <span class="rating-text">${supplier.rating} (${supplier.reviewCount})</span>
                </div>
            </div>
            
            <p class="supplier-description">${supplier.description}</p>
            
            <div class="supplier-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${locationText}</span>
            </div>
            
            <div class="supplier-specialties">
                ${supplier.specialties.slice(0, 3).map(specialty => 
                    `<span class="specialty-tag">${getSpecialtyLabel(specialty)}</span>`
                ).join('')}
                ${supplier.specialties.length > 3 ? `<span class="specialty-more">+${supplier.specialties.length - 3}</span>` : ''}
            </div>
            
            <div class="supplier-highlights">
                <div class="highlight-item">
                    <i class="fas fa-shipping-fast"></i>
                    <span>Free shipping over ${ToolsUtils.formatCurrency(supplier.shipping.freeThreshold)}</span>
                </div>
                <div class="highlight-item price-range ${supplier.priceRange}">
                    <i class="fas fa-tag"></i>
                    <span>${getPriceRangeLabel(supplier.priceRange)} pricing</span>
                </div>
            </div>
            
            <div class="supplier-actions">
                <button class="btn btn-primary" onclick="viewSupplierDetails('${supplier.id}')">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
                <button class="btn btn-outline" onclick="toggleSupplierSelection('${supplier.id}')">
                    <i class="fas fa-check"></i> Select
                </button>
                ${supplier.website ? `
                    <a href="${supplier.website}" target="_blank" class="btn btn-secondary">
                        <i class="fas fa-external-link-alt"></i> Visit Website
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

function generateSupplierListItem(supplier) {
    const primaryLocation = supplier.locations[0];
    const locationText = primaryLocation.city === 'online' ? 
        'Online Only' : 
        getCityName(primaryLocation.city);
    
    return `
        <div class="supplier-list-item" data-supplier-id="${supplier.id}">
            <div class="supplier-list-main">
                <div class="supplier-list-header">
                    <h3>${supplier.name}</h3>
                    <div class="supplier-rating">
                        ${generateStars(supplier.rating)}
                        <span>${supplier.rating}</span>
                    </div>
                </div>
                <p class="supplier-description">${supplier.description}</p>
                <div class="supplier-list-details">
                    <span class="location"><i class="fas fa-map-marker-alt"></i> ${locationText}</span>
                    <span class="type ${supplier.type}"><i class="fas fa-${getTypeIcon(supplier.type)}"></i> ${getTypeLabel(supplier.type)}</span>
                    <span class="price-range ${supplier.priceRange}"><i class="fas fa-tag"></i> ${getPriceRangeLabel(supplier.priceRange)}</span>
                </div>
            </div>
            <div class="supplier-list-actions">
                <button class="btn btn-primary" onclick="viewSupplierDetails('${supplier.id}')">Details</button>
                <button class="btn btn-outline" onclick="toggleSupplierSelection('${supplier.id}')">Select</button>
            </div>
        </div>
    `;
}

function setupSupplierCardEvents() {
    document.querySelectorAll('.supplier-card, .supplier-list-item').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
            
            const supplierId = this.getAttribute('data-supplier-id');
            viewSupplierDetails(supplierId);
        });
    });
}

function switchView(view) {
    finderState.currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Show/hide appropriate content
    const suppliersContainer = document.getElementById('suppliers-container');
    const mapContainer = document.getElementById('map-container');
    
    if (view === 'map') {
        suppliersContainer.style.display = 'none';
        mapContainer.style.display = 'block';
    } else {
        suppliersContainer.style.display = 'block';
        mapContainer.style.display = 'none';
        
        // Re-display suppliers with new view
        const filteredSuppliers = filterSuppliers();
        displaySuppliers(filteredSuppliers);
    }
    
    trackToolUsage('supplier-finder', 'view_changed', { view });
}

function updateResultsCount(count) {
    const countElement = document.getElementById('results-count');
    countElement.textContent = `${count} supplier${count !== 1 ? 's' : ''} found`;
}

// Helper functions
function getCityName(cityCode) {
    const cityNames = {
        'cape-town': 'Cape Town',
        'johannesburg': 'Johannesburg',
        'durban': 'Durban',
        'pretoria': 'Pretoria',
        'port-elizabeth': 'Port Elizabeth',
        'bloemfontein': 'Bloemfontein',
        'online': 'Online'
    };
    return cityNames[cityCode] || cityCode;
}

function getTypeIcon(type) {
    const icons = {
        'physical': 'store',
        'online': 'globe',
        'both': 'store-alt'
    };
    return icons[type] || 'store';
}

function getTypeLabel(type) {
    const labels = {
        'physical': 'Physical Store',
        'online': 'Online Only',
        'both': 'Physical & Online'
    };
    return labels[type] || type;
}

function getSpecialtyLabel(specialty) {
    const labels = {
        'arduino': 'Arduino',
        'sensors': 'Sensors',
        'components': 'Components',
        'tools': 'Tools',
        'kits': 'Kits',
        'robotics': 'Robotics'
    };
    return labels[specialty] || specialty;
}

function getPriceRangeLabel(range) {
    const labels = {
        'budget': 'Budget',
        'mid': 'Competitive',
        'premium': 'Premium'
    };
    return labels[range] || range;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

// Action functions
function viewSupplierDetails(supplierId) {
    const supplier = SUPPLIERS_DATABASE.find(s => s.id === supplierId);
    if (!supplier) return;
    
    // Create detailed modal
    const modal = document.createElement('div');
    modal.className = 'recommendation-modal';
    modal.innerHTML = generateSupplierDetailsModal(supplier);
    document.body.appendChild(modal);
    
    trackToolUsage('supplier-finder', 'supplier_details_viewed', { supplierId });
}

function generateSupplierDetailsModal(supplier) {
    return `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-store"></i> ${supplier.name}</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="supplier-details">
                    <div class="supplier-overview">
                        <div class="rating-section">
                            <div class="stars">${generateStars(supplier.rating)}</div>
                            <span class="rating-text">${supplier.rating} out of 5 (${supplier.reviewCount} reviews)</span>
                        </div>
                        <p class="description">${supplier.description}</p>
                    </div>
                    
                    <div class="contact-info">
                        <h4><i class="fas fa-address-book"></i> Contact Information</h4>
                        ${supplier.website ? `<p><i class="fas fa-globe"></i> <a href="${supplier.website}" target="_blank">${supplier.website}</a></p>` : ''}
                        <p><i class="fas fa-envelope"></i> ${supplier.email}</p>
                        <p><i class="fas fa-phone"></i> ${supplier.phone}</p>
                    </div>
                    
                    <div class="locations-info">
                        <h4><i class="fas fa-map-marker-alt"></i> Locations</h4>
                        ${supplier.locations.map(loc => `
                            <div class="location-item">
                                <strong>${getCityName(loc.city)}</strong>
                                <p>${loc.address}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="specialties-info">
                        <h4><i class="fas fa-tags"></i> Specialties</h4>
                        <div class="specialty-tags">
                            ${supplier.specialties.map(s => `<span class="specialty-tag">${getSpecialtyLabel(s)}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="features-info">
                        <h4><i class="fas fa-star"></i> Features</h4>
                        <ul>
                            ${supplier.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="shipping-info">
                        <h4><i class="fas fa-shipping-fast"></i> Shipping</h4>
                        <p>Free shipping on orders over ${ToolsUtils.formatCurrency(supplier.shipping.freeThreshold)}</p>
                        <p>Standard shipping: ${ToolsUtils.formatCurrency(supplier.shipping.cost)}</p>
                        <p>Delivery areas: ${supplier.shipping.areas}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                ${supplier.website ? `
                    <a href="${supplier.website}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Visit Website
                    </a>
                ` : ''}
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
}

function toggleSupplierSelection(supplierId) {
    const index = finderState.selectedSuppliers.indexOf(supplierId);
    
    if (index > -1) {
        finderState.selectedSuppliers.splice(index, 1);
        ToolsUtils.showToast('Supplier removed from selection', 'info');
    } else {
        finderState.selectedSuppliers.push(supplierId);
        ToolsUtils.showToast('Supplier added to selection', 'success');
    }
    
    // Update UI to show selection state
    updateSelectionUI();
    trackToolUsage('supplier-finder', 'supplier_selected', { supplierId, selected: index === -1 });
}

function updateSelectionUI() {
    // Update button states and counters
    const compareBtn = document.getElementById('compare-suppliers');
    const selectedCount = finderState.selectedSuppliers.length;
    
    compareBtn.disabled = selectedCount < 2;
    compareBtn.innerHTML = `<i class="fas fa-balance-scale"></i> Compare Selected (${selectedCount})`;
    
    // Update supplier card selection states
    document.querySelectorAll('.supplier-card, .supplier-list-item').forEach(card => {
        const supplierId = card.getAttribute('data-supplier-id');
        const isSelected = finderState.selectedSuppliers.includes(supplierId);
        
        card.classList.toggle('selected', isSelected);
    });
}

function exportSuppliers() {
    const filteredSuppliers = filterSuppliers();
    const exportData = {
        timestamp: new Date().toISOString(),
        search_criteria: {
            query: finderState.searchQuery,
            filters: finderState.filters
        },
        suppliers: filteredSuppliers.map(supplier => ({
            name: supplier.name,
            description: supplier.description,
            website: supplier.website,
            email: supplier.email,
            phone: supplier.phone,
            locations: supplier.locations,
            specialties: supplier.specialties,
            rating: supplier.rating,
            priceRange: supplier.priceRange,
            shipping: supplier.shipping
        }))
    };
    
    ToolsUtils.exportJSON(exportData, `sa-arduino-suppliers-${Date.now()}.json`);
    ToolsUtils.showToast('Supplier list exported successfully!', 'success');
    trackToolUsage('supplier-finder', 'export', { supplierCount: filteredSuppliers.length });
}

function compareSuppliers() {
    if (finderState.selectedSuppliers.length < 2) {
        ToolsUtils.showToast('Please select at least 2 suppliers to compare', 'warning');
        return;
    }
    
    const selectedSupplierData = finderState.selectedSuppliers.map(id => 
        SUPPLIERS_DATABASE.find(s => s.id === id)
    );
    
    // Create comparison modal
    const modal = document.createElement('div');
    modal.className = 'recommendation-modal';
    modal.innerHTML = generateComparisonModal(selectedSupplierData);
    document.body.appendChild(modal);
    
    trackToolUsage('supplier-finder', 'suppliers_compared', { 
        supplierIds: finderState.selectedSuppliers 
    });
}

function generateComparisonModal(suppliers) {
    return `
        <div class="modal-content large-modal">
            <div class="modal-header">
                <h3><i class="fas fa-balance-scale"></i> Supplier Comparison</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                ${suppliers.map(s => `<th>${s.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Rating</strong></td>
                                ${suppliers.map(s => `<td>${generateStars(s.rating)} ${s.rating}</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Type</strong></td>
                                ${suppliers.map(s => `<td>${getTypeLabel(s.type)}</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Price Range</strong></td>
                                ${suppliers.map(s => `<td class="${s.priceRange}">${getPriceRangeLabel(s.priceRange)}</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Free Shipping</strong></td>
                                ${suppliers.map(s => `<td>${ToolsUtils.formatCurrency(s.shipping.freeThreshold)}+</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Locations</strong></td>
                                ${suppliers.map(s => `<td>${s.locations.length} location${s.locations.length !== 1 ? 's' : ''}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal()">Close Comparison</button>
            </div>
        </div>
    `;
}

function getDirections() {
    if (finderState.selectedSuppliers.length === 0) {
        ToolsUtils.showToast('Please select suppliers to get directions', 'warning');
        return;
    }
    
    ToolsUtils.showToast('Directions feature would integrate with Google Maps or similar service', 'info');
    trackToolUsage('supplier-finder', 'directions_requested', { 
        supplierCount: finderState.selectedSuppliers.length 
    });
}