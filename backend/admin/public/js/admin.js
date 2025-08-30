/* Dance Website Admin Panel - Interactive Features */
/* Theme switching, sidebar management, and enhanced UX */

(function() {
  'use strict';

  // ============================================
  // THEME MANAGEMENT
  // ============================================

  class ThemeManager {
    constructor() {
      this.currentTheme = localStorage.getItem('admin-theme') || 'light';
      this.init();
    }

    init() {
      // Apply saved theme
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      
      // Create theme toggle button
      this.createThemeToggle();
      
      // Listen for system theme changes
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!localStorage.getItem('admin-theme')) {
            this.setTheme(e.matches ? 'dark' : 'light');
          }
        });
      }
    }

    createThemeToggle() {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'admin-theme-toggle';
      toggleBtn.innerHTML = this.currentTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
      toggleBtn.setAttribute('aria-label', 'Toggle theme');
      toggleBtn.addEventListener('click', () => this.toggleTheme());
      
      document.body.appendChild(toggleBtn);
    }

    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    }

    setTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('admin-theme', theme);
      
      // Update toggle button icon
      const toggleBtn = document.querySelector('.admin-theme-toggle i');
      if (toggleBtn) {
        toggleBtn.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      
      // Dispatch theme change event
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
  }

  // ============================================
  // SIDEBAR MANAGEMENT
  // ============================================

  class SidebarManager {
    constructor() {
      this.sidebar = document.querySelector('.sidebar');
      this.isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
      this.isMobile = window.innerWidth <= 768;
      this.init();
    }

    init() {
      this.createMobileToggle();
      this.createCollapseToggle();
      this.setupEventListeners();
      
      // Apply saved state
      if (this.isCollapsed && !this.isMobile) {
        this.collapseSidebar(false);
      }
      
      // Handle window resize
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    createMobileToggle() {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'sidebar-mobile-toggle';
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      toggleBtn.setAttribute('aria-label', 'Toggle sidebar');
      toggleBtn.addEventListener('click', () => this.toggleMobileSidebar());
      
      document.body.appendChild(toggleBtn);
    }

    createCollapseToggle() {
      if (!this.sidebar) return;
      
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'sidebar-collapse-toggle';
      toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      toggleBtn.setAttribute('aria-label', 'Collapse sidebar');
      toggleBtn.addEventListener('click', () => this.toggleCollapse());
      
      this.sidebar.appendChild(toggleBtn);
    }

    setupEventListeners() {
      // Mobile overlay
      const overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.addEventListener('click', () => this.closeMobileSidebar());
      document.body.appendChild(overlay);

      // User profile dropdown
      const userToggle = document.querySelector('.user-profile-toggle');
      if (userToggle) {
        userToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleUserDropdown();
        });
      }

      // Close user dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-profile')) {
          this.closeUserDropdown();
        }
      });

      // Navigation submenu toggles
      document.querySelectorAll('.nav-link[data-submenu]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleSubmenu(link);
        });
      });
    }

    toggleMobileSidebar() {
      if (!this.sidebar) return;
      
      const overlay = document.querySelector('.sidebar-overlay');
      const isOpen = this.sidebar.classList.contains('show');
      
      if (isOpen) {
        this.closeMobileSidebar();
      } else {
        this.sidebar.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    }

    closeMobileSidebar() {
      if (!this.sidebar) return;
      
      const overlay = document.querySelector('.sidebar-overlay');
      this.sidebar.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    toggleCollapse() {
      if (this.isMobile) return;
      
      this.isCollapsed = !this.isCollapsed;
      this.collapseSidebar(true);
    }

    collapseSidebar(animate = true) {
      if (!this.sidebar) return;
      
      const mainContent = document.querySelector('.admin-main');
      
      if (this.isCollapsed) {
        this.sidebar.classList.add('collapsed');
        if (mainContent) {
          mainContent.style.marginLeft = '80px';
          mainContent.style.width = 'calc(100% - 80px)';
        }
      } else {
        this.sidebar.classList.remove('collapsed');
        if (mainContent) {
          mainContent.style.marginLeft = '280px';
          mainContent.style.width = 'calc(100% - 280px)';
        }
      }
      
      localStorage.setItem('sidebar-collapsed', this.isCollapsed.toString());
    }

    toggleUserDropdown() {
      const userProfile = document.querySelector('.user-profile');
      if (userProfile) {
        userProfile.classList.toggle('expanded');
      }
    }

    closeUserDropdown() {
      const userProfile = document.querySelector('.user-profile');
      if (userProfile) {
        userProfile.classList.remove('expanded');
      }
    }

    toggleSubmenu(link) {
      const submenuId = link.getAttribute('data-submenu');
      const submenu = document.getElementById(submenuId);
      const navItem = link.closest('.nav-item');
      
      if (submenu && navItem) {
        const isExpanded = navItem.classList.contains('expanded');
        
        // Close all other submenus
        document.querySelectorAll('.nav-item.expanded').forEach(item => {
          if (item !== navItem) {
            item.classList.remove('expanded');
            const otherSubmenu = item.querySelector('.nav-submenu');
            if (otherSubmenu) {
              otherSubmenu.classList.remove('show');
            }
          }
        });
        
        // Toggle current submenu
        if (isExpanded) {
          navItem.classList.remove('expanded');
          submenu.classList.remove('show');
        } else {
          navItem.classList.add('expanded');
          submenu.classList.add('show');
        }
      }
    }

    handleResize() {
      const newIsMobile = window.innerWidth <= 768;
      
      if (newIsMobile !== this.isMobile) {
        this.isMobile = newIsMobile;
        
        if (this.isMobile) {
          this.closeMobileSidebar();
          // Reset collapse state for mobile
          if (this.sidebar) {
            this.sidebar.classList.remove('collapsed');
          }
        } else {
          // Restore collapsed state for desktop
          if (this.isCollapsed) {
            this.collapseSidebar(false);
          }
        }
      }
    }
  }

  // ============================================
  // TABLE ENHANCEMENTS
  // ============================================

  class TableManager {
    constructor() {
      this.init();
    }

    init() {
      this.setupDataTables();
      this.setupBulkActions();
      this.setupTableSearch();
      this.setupSorting();
    }

    setupDataTables() {
      // Enhanced DataTables initialization
      if (typeof $.fn.DataTable !== 'undefined') {
        $('.data-table').each(function() {
          $(this).DataTable({
            responsive: true,
            pageLength: 25,
            order: [[0, 'desc']],
            language: {
              search: '',
              searchPlaceholder: 'Search records...',
              lengthMenu: 'Show _MENU_ entries',
              info: 'Showing _START_ to _END_ of _TOTAL_ entries',
              infoEmpty: 'No entries available',
              infoFiltered: '(filtered from _MAX_ total entries)',
              paginate: {
                first: '<i class="fas fa-angle-double-left"></i>',
                last: '<i class="fas fa-angle-double-right"></i>',
                next: '<i class="fas fa-angle-right"></i>',
                previous: '<i class="fas fa-angle-left"></i>'
              }
            },
            columnDefs: [
              {
                targets: 'no-sort',
                orderable: false
              }
            ],
            drawCallback: function() {
              // Re-attach event listeners after table redraw
              window.adminTableManager.setupRowSelection();
            }
          });
        });
      }
    }

    setupBulkActions() {
      // Master checkbox for select all
      const masterCheckbox = document.querySelector('#master-checkbox');
      if (masterCheckbox) {
        masterCheckbox.addEventListener('change', (e) => {
          const checkboxes = document.querySelectorAll('.table-checkbox');
          checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
            this.toggleRowSelection(checkbox.closest('tr'), checkbox.checked);
          });
          this.updateBulkActions();
        });
      }

      // Individual row checkboxes
      this.setupRowSelection();
    }

    setupRowSelection() {
      document.querySelectorAll('.table-checkbox:not(#master-checkbox)').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const row = e.target.closest('tr');
          this.toggleRowSelection(row, e.target.checked);
          this.updateBulkActions();
          this.updateMasterCheckbox();
        });
      });
    }

    toggleRowSelection(row, selected) {
      if (row) {
        row.classList.toggle('selected', selected);
      }
    }

    updateBulkActions() {
      const selectedCount = document.querySelectorAll('.table-checkbox:not(#master-checkbox):checked').length;
      const bulkActions = document.querySelector('.admin-bulk-actions');
      const selectionText = document.querySelector('.admin-bulk-selection');
      
      if (bulkActions) {
        if (selectedCount > 0) {
          bulkActions.style.display = 'flex';
          if (selectionText) {
            selectionText.textContent = `${selectedCount} item${selectedCount > 1 ? 's' : ''} selected`;
          }
        } else {
          bulkActions.style.display = 'none';
        }
      }
    }

    updateMasterCheckbox() {
      const masterCheckbox = document.querySelector('#master-checkbox');
      const checkboxes = document.querySelectorAll('.table-checkbox:not(#master-checkbox)');
      const checkedCount = document.querySelectorAll('.table-checkbox:not(#master-checkbox):checked').length;
      
      if (masterCheckbox && checkboxes.length > 0) {
        if (checkedCount === 0) {
          masterCheckbox.checked = false;
          masterCheckbox.indeterminate = false;
        } else if (checkedCount === checkboxes.length) {
          masterCheckbox.checked = true;
          masterCheckbox.indeterminate = false;
        } else {
          masterCheckbox.checked = false;
          masterCheckbox.indeterminate = true;
        }
      }
    }

    setupTableSearch() {
      const searchInputs = document.querySelectorAll('.admin-table-search input');
      searchInputs.forEach(input => {
        let searchTimeout;
        input.addEventListener('input', (e) => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            this.performSearch(e.target.value, e.target.closest('.admin-table-wrapper'));
          }, 300);
        });
      });
    }

    performSearch(query, tableWrapper) {
      if (!tableWrapper) return;
      
      const table = tableWrapper.querySelector('.admin-data-table');
      const rows = table.querySelectorAll('tbody tr');
      
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(query.toLowerCase());
        row.style.display = matches ? '' : 'none';
      });
    }

    setupSorting() {
      document.querySelectorAll('.admin-data-table thead th.sortable').forEach(header => {
        header.addEventListener('click', () => {
          this.sortTable(header);
        });
      });
    }

    sortTable(header) {
      const table = header.closest('table');
      const tbody = table.querySelector('tbody');
      const columnIndex = Array.from(header.parentNode.children).indexOf(header);
      const isAscending = !header.classList.contains('sorted-asc');
      
      // Remove sorting classes from all headers
      header.parentNode.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
      });
      
      // Add sorting class to current header
      header.classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');
      
      // Sort rows
      const rows = Array.from(tbody.querySelectorAll('tr'));
      rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();
        
        const result = this.compareValues(aValue, bValue);
        return isAscending ? result : -result;
      });
      
      // Reorder DOM
      rows.forEach(row => tbody.appendChild(row));
    }

    compareValues(a, b) {
      // Try to parse as numbers first
      const numA = parseFloat(a.replace(/[^0-9.-]/g, ''));
      const numB = parseFloat(b.replace(/[^0-9.-]/g, ''));
      
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      
      // Try to parse as dates
      const dateA = new Date(a);
      const dateB = new Date(b);
      
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        return dateA - dateB;
      }
      
      // Default to string comparison
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    }
  }

  // ============================================
  // FORM ENHANCEMENTS
  // ============================================

  class FormManager {
    constructor() {
      this.init();
    }

    init() {
      this.setupFormValidation();
      this.setupFileUploads();
      this.setupFormSteps();
      this.setupModalForms();
    }

    setupFormValidation() {
      document.querySelectorAll('.admin-form').forEach(form => {
        form.addEventListener('submit', (e) => {
          if (!this.validateForm(form)) {
            e.preventDefault();
          }
        });

        // Real-time validation
        form.querySelectorAll('.admin-form-input, .admin-form-select, .admin-form-textarea').forEach(input => {
          input.addEventListener('blur', () => this.validateField(input));
          input.addEventListener('input', () => this.clearFieldError(input));
        });
      });
    }

    validateForm(form) {
      let isValid = true;
      const inputs = form.querySelectorAll('.admin-form-input[required], .admin-form-select[required], .admin-form-textarea[required]');
      
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
      
      return isValid;
    }

    validateField(input) {
      const formGroup = input.closest('.admin-form-group');
      const value = input.value.trim();
      let isValid = true;
      let errorMessage = '';
      
      // Clear previous errors
      this.clearFieldError(input);
      
      // Required validation
      if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
      }
      
      // Email validation
      if (input.type === 'email' && value && !this.isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      
      // Password validation
      if (input.type === 'password' && value && value.length < 8) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters long';
      }
      
      // Custom validation patterns
      const pattern = input.getAttribute('data-pattern');
      if (pattern && value && !new RegExp(pattern).test(value)) {
        isValid = false;
        errorMessage = input.getAttribute('data-pattern-message') || 'Invalid format';
      }
      
      // Show error or success
      if (!isValid) {
        this.showFieldError(input, errorMessage);
      } else if (value) {
        this.showFieldSuccess(input);
      }
      
      return isValid;
    }

    showFieldError(input, message) {
      const formGroup = input.closest('.admin-form-group');
      formGroup.classList.add('has-error');
      formGroup.classList.remove('has-success');
      
      let errorEl = formGroup.querySelector('.admin-form-error');
      if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'admin-form-error';
        input.parentNode.appendChild(errorEl);
      }
      
      errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    }

    showFieldSuccess(input) {
      const formGroup = input.closest('.admin-form-group');
      formGroup.classList.add('has-success');
      formGroup.classList.remove('has-error');
      
      // Remove error message
      const errorEl = formGroup.querySelector('.admin-form-error');
      if (errorEl) {
        errorEl.remove();
      }
    }

    clearFieldError(input) {
      const formGroup = input.closest('.admin-form-group');
      formGroup.classList.remove('has-error', 'has-success');
      
      const errorEl = formGroup.querySelector('.admin-form-error');
      if (errorEl) {
        errorEl.remove();
      }
    }

    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    setupFileUploads() {
      document.querySelectorAll('.admin-file-upload').forEach(upload => {
        const input = upload.querySelector('input[type="file"]');
        
        upload.addEventListener('dragover', (e) => {
          e.preventDefault();
          upload.classList.add('dragover');
        });
        
        upload.addEventListener('dragleave', () => {
          upload.classList.remove('dragover');
        });
        
        upload.addEventListener('drop', (e) => {
          e.preventDefault();
          upload.classList.remove('dragover');
          
          if (input) {
            input.files = e.dataTransfer.files;
            this.handleFileSelection(input);
          }
        });
        
        if (input) {
          input.addEventListener('change', () => this.handleFileSelection(input));
        }
      });
    }

    handleFileSelection(input) {
      const upload = input.closest('.admin-file-upload');
      const files = Array.from(input.files);
      
      if (files.length > 0) {
        const fileNames = files.map(file => file.name).join(', ');
        const textEl = upload.querySelector('.admin-file-upload-text');
        if (textEl) {
          textEl.textContent = `Selected: ${fileNames}`;
        }
        upload.classList.add('has-files');
      }
    }

    setupFormSteps() {
      const stepForms = document.querySelectorAll('.admin-form-steps');
      stepForms.forEach(stepContainer => {
        const steps = stepContainer.querySelectorAll('.admin-form-step');
        const currentStep = parseInt(stepContainer.getAttribute('data-current-step') || '1');
        
        this.updateStepDisplay(steps, currentStep);
      });
    }

    updateStepDisplay(steps, currentStep) {
      steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
          step.classList.add('completed');
        } else if (stepNumber === currentStep) {
          step.classList.add('active');
        }
      });
    }

    setupModalForms() {
      // Modal trigger buttons
      document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const modalId = trigger.getAttribute('data-modal');
          this.openModal(modalId);
        });
      });

      // Modal close buttons
      document.querySelectorAll('.admin-modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
          this.closeModal(closeBtn.closest('.admin-modal'));
        });
      });

      // Close modal on overlay click
      document.querySelectorAll('.admin-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closeModal(modal);
          }
        });
      });

      // Close modal on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const openModal = document.querySelector('.admin-modal.show');
          if (openModal) {
            this.closeModal(openModal);
          }
        }
      });
    }

    openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
          const firstInput = modal.querySelector('.admin-form-input, .admin-form-select, .admin-form-textarea');
          if (firstInput) {
            firstInput.focus();
          }
        }, 150);
      }
    }

    closeModal(modal) {
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    }
  }

  // ============================================
  // LOADING STATES
  // ============================================

  class LoadingManager {
    static showButtonLoading(button) {
      const originalText = button.innerHTML;
      button.setAttribute('data-original-text', originalText);
      button.innerHTML = '<span class="admin-loading"></span> Loading...';
      button.disabled = true;
    }

    static hideButtonLoading(button) {
      const originalText = button.getAttribute('data-original-text');
      if (originalText) {
        button.innerHTML = originalText;
        button.removeAttribute('data-original-text');
      }
      button.disabled = false;
    }

    static showTableLoading(table) {
      const tbody = table.querySelector('tbody');
      const colCount = table.querySelectorAll('thead th').length;
      
      tbody.innerHTML = `
        <tr>
          <td colspan="${colCount}" class="text-center py-5">
            <div class="admin-loading"></div>
            <div class="mt-3 text-muted">Loading data...</div>
          </td>
        </tr>
      `;
    }
  }

  // ============================================
  // NOTIFICATIONS
  // ============================================

  class NotificationManager {
    static show(message, type = 'info', duration = 5000) {
      const notification = document.createElement('div');
      notification.className = `admin-alert admin-alert-${type}`;
      notification.innerHTML = `
        <i class="fas fa-${this.getIcon(type)}"></i>
        <span>${message}</span>
        <button class="btn-close ms-auto" onclick="this.parentNode.remove()"></button>
      `;
      
      // Insert at top of main content
      const mainContent = document.querySelector('.admin-content');
      if (mainContent) {
        mainContent.insertBefore(notification, mainContent.firstChild);
      }
      
      // Auto-remove after duration
      if (duration > 0) {
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, duration);
      }
      
      return notification;
    }

    static getIcon(type) {
      const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
      };
      return icons[type] || 'info-circle';
    }
  }

  // ============================================
  // UTILITIES
  // ============================================

  class AdminUtils {
    static formatNumber(num) {
      return new Intl.NumberFormat().format(num);
    }

    static formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    }

    static formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date));
    }

    static debounce(func, wait) {
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

    static async fetchAPI(url, options = {}) {
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('API request failed:', error);
        NotificationManager.show('Network error occurred', 'error');
        throw error;
      }
    }
  }

  // ============================================
  // CONFIRM DIALOGS
  // ============================================

  function enhancedConfirm(message, options = {}) {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.className = 'admin-modal show';
      modal.innerHTML = `
        <div class="admin-modal-content" style="max-width: 400px;">
          <div class="admin-modal-header">
            <h5 class="admin-modal-title">
              <i class="fas fa-${options.icon || 'question-circle'} text-${options.type || 'primary'}"></i>
              ${options.title || 'Confirm Action'}
            </h5>
          </div>
          <div class="admin-modal-body">
            <p class="mb-0">${message}</p>
          </div>
          <div class="admin-modal-footer">
            <button class="admin-btn admin-btn-secondary" data-action="cancel">
              <i class="fas fa-times"></i> Cancel
            </button>
            <button class="admin-btn admin-btn-${options.type || 'primary'}" data-action="confirm">
              <i class="fas fa-check"></i> ${options.confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      modal.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        if (action === 'confirm') {
          resolve(true);
          modal.remove();
          document.body.style.overflow = '';
        } else if (action === 'cancel' || e.target === modal) {
          resolve(false);
          modal.remove();
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    window.adminTheme = new ThemeManager();
    window.adminSidebar = new SidebarManager();
    window.adminTableManager = new TableManager();
    window.adminFormManager = new FormManager();
    
    // Make utilities globally available
    window.AdminUtils = AdminUtils;
    window.NotificationManager = NotificationManager;
    window.LoadingManager = LoadingManager;
    window.enhancedConfirm = enhancedConfirm;
    
    // Enhanced logout function
    window.logout = async function() {
      const confirmed = await enhancedConfirm(
        'Are you sure you want to logout?',
        { 
          title: 'Logout Confirmation',
          type: 'warning',
          icon: 'sign-out-alt',
          confirmText: 'Logout'
        }
      );
      
      if (confirmed) {
        try {
          await fetch('/admin/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          window.location.href = '/admin/login';
        } catch (error) {
          NotificationManager.show('Logout failed', 'error');
        }
      }
    };
    
    // Enhanced confirm delete function
    window.confirmDelete = async function(name, url) {
      const confirmed = await enhancedConfirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`,
        { 
          title: 'Delete Confirmation',
          type: 'danger',
          icon: 'trash-alt',
          confirmText: 'Delete'
        }
      );
      
      if (confirmed) {
        try {
          const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          });
          
          const data = await response.json();
          
          if (data.success) {
            NotificationManager.show('Item deleted successfully', 'success');
            setTimeout(() => location.reload(), 1000);
          } else {
            NotificationManager.show('Error: ' + (data.error || 'Delete failed'), 'error');
          }
        } catch (error) {
          NotificationManager.show('Network error occurred', 'error');
        }
      }
    };
    
    // Auto-hide alerts
    setTimeout(() => {
      document.querySelectorAll('.alert').forEach(alert => {
        if (!alert.querySelector('.btn-close')) {
          alert.style.opacity = '0';
          setTimeout(() => alert.remove(), 300);
        }
      });
    }, 5000);
    
    // Initialize tooltips and popovers if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
      // Initialize Bootstrap tooltips
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new bootstrap.Tooltip(el);
      });
      
      // Initialize Bootstrap popovers
      document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
        new bootstrap.Popover(el);
      });
    }
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    console.log('🎨 Dance Website Admin Panel - Enhanced styling loaded');
  });

  // ============================================
  // EXPORT FOR MODULES
  // ============================================

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      ThemeManager,
      SidebarManager,
      TableManager,
      FormManager,
      LoadingManager,
      NotificationManager,
      AdminUtils
    };
  }

})();
