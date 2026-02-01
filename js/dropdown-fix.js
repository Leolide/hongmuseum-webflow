// Mutually exclusive dropdowns - close other dropdowns when one opens
$(document).ready(function() {
  
  // Function to close a specific dropdown
  function closeDropdown($dropdown) {
    var $toggle = $dropdown.find('.w-dropdown-toggle');
    var $list = $dropdown.find('.w-dropdown-list');
    
    $dropdown.removeClass('w--open');
    $toggle.removeClass('w--open');
    $list.removeClass('w--open');
    $toggle.attr('aria-expanded', 'false');
  }
  
  // Function to close all dropdowns except the specified one
  function closeOtherDropdowns($currentDropdown) {
    $('.nav-dropdown.w-dropdown, .nav-dropdown---rp.w-dropdown').each(function() {
      var $dropdown = $(this);
      if (!$dropdown.is($currentDropdown)) {
        closeDropdown($dropdown);
      }
    });
  }
  
  // When Exhibitions dropdown toggle is clicked or hovered
  $('.nav-dropdown.w-dropdown').on('click mouseenter', function(e) {
    var $currentDropdown = $(this);
    // Close Residency Program dropdown
    $('.nav-dropdown---rp.w-dropdown').each(function() {
      closeDropdown($(this));
    });
  });
  
  // When Residency Program dropdown toggle is clicked or hovered
  $('.nav-dropdown---rp.w-dropdown').on('click mouseenter', function(e) {
    var $currentDropdown = $(this);
    // Close Exhibitions dropdown
    $('.nav-dropdown.w-dropdown').each(function() {
      closeDropdown($(this));
    });
  });
});
