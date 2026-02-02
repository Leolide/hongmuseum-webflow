// Mutually exclusive dropdowns - close other dropdowns when one opens
// Works on both desktop (hover) and mobile/tablet (click)
$(document).ready(function() {
  
  // Detect if we're on a touch device or narrow screen (tablet/mobile)
  function isMobileOrTablet() {
    return window.innerWidth <= 991 || 'ontouchstart' in window;
  }
  
  // Function to close a specific dropdown
  function closeDropdown($dropdown) {
    var $toggle = $dropdown.find('.w-dropdown-toggle');
    var $list = $dropdown.find('.w-dropdown-list');
    
    $dropdown.removeClass('w--open');
    $toggle.removeClass('w--open');
    $list.removeClass('w--open');
    $toggle.attr('aria-expanded', 'false');
  }
  
  // Function to close all dropdowns
  function closeAllDropdowns() {
    $('.nav-dropdown.w-dropdown, .nav-dropdown---rp.w-dropdown').each(function() {
      closeDropdown($(this));
    });
  }
  
  // When Exhibitions dropdown toggle is clicked
  $('.nav-dropdown.w-dropdown .w-dropdown-toggle').on('click', function(e) {
    if (isMobileOrTablet()) {
      // Close Residency Program dropdown
      $('.nav-dropdown---rp.w-dropdown').each(function() {
        closeDropdown($(this));
      });
    }
  });
  
  // When Residency Program dropdown toggle is clicked  
  $('.nav-dropdown---rp.w-dropdown .w-dropdown-toggle').on('click', function(e) {
    if (isMobileOrTablet()) {
      // Close Exhibitions dropdown
      $('.nav-dropdown.w-dropdown').each(function() {
        closeDropdown($(this));
      });
    }
  });
  
  // Desktop hover behavior - close other on hover
  if (!isMobileOrTablet()) {
    $('.nav-dropdown.w-dropdown').on('mouseenter', function(e) {
      $('.nav-dropdown---rp.w-dropdown').each(function() {
        closeDropdown($(this));
      });
    });
    
    $('.nav-dropdown---rp.w-dropdown').on('mouseenter', function(e) {
      $('.nav-dropdown.w-dropdown').each(function() {
        closeDropdown($(this));
      });
    });
  }
  
  // Close dropdowns when clicking outside on mobile
  $(document).on('click', function(e) {
    if (isMobileOrTablet()) {
      var $target = $(e.target);
      if (!$target.closest('.nav-dropdown, .nav-dropdown---rp').length) {
        // Clicked outside dropdowns, close them
        closeAllDropdowns();
      }
    }
  });
  
  // Handle window resize
  $(window).on('resize', function() {
    // Close all dropdowns on resize to reset state
    closeAllDropdowns();
  });
});
