// Common functionality for all interactive tools

// Utility functions
const ToolsUtils = {
    // Format currency in South African Rand
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    },

    // Calculate import duties (15% on items over R500)
    calculateDuties: function(subtotal) {
        return subtotal > 500 ? subtotal * 0.15 : 0;
    },

    // Calculate shipping based on weight and value
    calculateShipping: function(weight, value) {
        // Base shipping cost
        let shipping = 0;
        
        if (weight <= 0.5) shipping = 95;      // Under 500g
        else if (weight <= 1) shipping = 120;   // 500g - 1kg
        else if (weight <= 2) shipping = 150;   // 1kg - 2kg
        else shipping = 150 + ((weight - 2) * 25); // Over 2kg
        
        // Add insurance for valuable items
        if (value > 1000) shipping += 50;
        
        return shipping;
    },

    // Show loading state
    showLoading: function(element, text = 'Loading...') {
        element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
        element.disabled = true;
    },

    // Hide loading state
    hideLoading: function(element, originalText) {
        element.innerHTML = originalText;
        element.disabled = false;
    },

    // Show toast notification
    showToast: function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Add styles if not exists
        if (!document.querySelector('#toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--card-bg);
                    color: var(--text-color);
                    padding: 15px 20px;
                    border-radius: var(--border-radius);
                    box-shadow: var(--box-shadow);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 1000;
                    animation: slideIn 0.3s ease;
                    border-left: 4px solid var(--primary-color);
                }
                
                .toast-success { border-left-color: var(--success-color); }
                .toast-error { border-left-color: var(--danger-color); }
                .toast-warning { border-left-color: var(--warning-color); }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                
                @keyframes slideOut {
                    from { transform: translateX(0); }
                    to { transform: translateX(100%); }
                }
            `;
            document.head.appendChild(styles);
        }
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    },

    // Export data as JSON file
    exportJSON: function(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Generate shareable URL
    generateShareableUrl: function(data) {
        const encoded = btoa(JSON.stringify(data));
        return `${window.location.origin}${window.location.pathname}?config=${encoded}`;
    },

    // Load configuration from URL
    loadFromUrl: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const config = urlParams.get('config');
        
        if (config) {
            try {
                return JSON.parse(atob(config));
            } catch (e) {
                console.error('Invalid configuration in URL:', e);
                return null;
            }
        }
        return null;
    },

    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// South African suppliers data
const SA_SUPPLIERS = [
    {
        name: 'Communica',
        website: 'https://www.communica.co.za',
        location: 'Cape Town & Johannesburg',
        specialties: ['Arduino boards', 'Sensors', 'Components'],
        rating: 4.8,
        shipping: 'R60-120',
        icon: '📦'
    },
    {
        name: 'Netram Technologies',
        website: 'https://www.netram.co.za',
        location: 'Johannesburg',
        specialties: ['Electronic components', 'Development boards'],
        rating: 4.6,
        shipping: 'R45-95',
        icon: '🔧'
    },
    {
        name: 'DIY Electronics',
        website: 'https://www.diye.co.za',
        location: 'Cape Town',
        specialties: ['Arduino', 'Raspberry Pi', 'Sensors'],
        rating: 4.7,
        shipping: 'R50-100',
        icon: '🛠️'
    },
    {
        name: 'RS Components',
        website: 'https://za.rs-online.com',
        location: 'National delivery',
        specialties: ['Professional components', 'Industrial grade'],
        rating: 4.5,
        shipping: 'R65-150',
        icon: '🏭'
    },
    {
        name: 'Mantech Electronics',
        website: 'https://www.mantech.co.za',
        location: 'Cape Town & Durban',
        specialties: ['Electronics', 'Prototyping'],
        rating: 4.4,
        shipping: 'R55-110',
        icon: '⚡'
    }
];

// Track tool usage analytics
function trackToolUsage(toolName, action, details = {}) {
    // Mock analytics - in real implementation would send to analytics service
    console.log('Tool Analytics:', {
        tool: toolName,
        action: action,
        details: details,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
}

// Initialize common tool functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to anchor links
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

    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled && this.getAttribute('data-loading') !== 'false') {
                const originalText = this.innerHTML;
                ToolsUtils.showLoading(this);
                
                // Restore after 2 seconds if not manually restored
                setTimeout(() => {
                    if (this.innerHTML.includes('fa-spinner')) {
                        ToolsUtils.hideLoading(this, originalText);
                    }
                }, 2000);
            }
        });
    });

    // Initialize tooltips (if needed)
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - 5}px`;
            tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                document.body.removeChild(tooltip);
            }
        });
    });
});

// Add tooltip styles
if (!document.querySelector('#tooltip-styles')) {
    const styles = document.createElement('style');
    styles.id = 'tooltip-styles';
    styles.textContent = `
        .tooltip {
            position: absolute;
            background: var(--card-bg);
            color: var(--text-color);
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            box-shadow: var(--box-shadow);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: var(--card-bg);
        }
    `;
    document.head.appendChild(styles);
}