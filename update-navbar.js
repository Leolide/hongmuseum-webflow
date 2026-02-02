#!/usr/bin/env node

/**
 * Script to update HTML files to use the reusable navbar loader
 * Run with: node update-navbar.js
 */

const fs = require('fs');
const path = require('path');

// List of HTML files to update (exclude navbar-example.html, components/, and utility files)
const htmlFiles = [
  'home-en.html',
  'index.html',
  'about-en.html',
  'about.html',
  'guide-en.html',
  'guide.html',
  'digestive-ethics-en.html',
  'digestive-ethics-cn.html',
  'mama-en.html',
  'mama-cn.html',
  'the-currents-we-carry-en.html',
  'the-currents-we-carry-cn.html',
  'eleven-kinds-of-beds-en.html',
  'eleven-kinds-of-beds-cn.html',
  'the-forebears-are-born-en.html',
  'the-forebears-are-born-cn.html',
  'situated-resonance-en.html',
  'situated-resonance-cn.html',
  'the-plan-of-going-home-residency-program.html',
  'zou-gui-ji-hua.html',
  'join-en.html',
  'join.html'
];

// Function to find and extract the navbar section
function findNavbarBounds(content) {
  const lines = content.split('\n');
  let startLine = -1;
  let endLine = -1;
  let hasWrapper = false;
  let wrapperStartLine = -1;
  
  // Find the navbar start
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for wrapper div
    if (line.includes('class="navbar-logo-center"') && !line.includes('navbar-logo-center-container')) {
      hasWrapper = true;
      wrapperStartLine = i;
    }
    
    // Find the main navbar div
    if (line.includes('navbar-logo-center-container') && line.includes('w-nav')) {
      startLine = hasWrapper ? wrapperStartLine : i;
      break;
    }
  }
  
  if (startLine === -1) {
    return null;
  }
  
  // Find the navbar end by counting div levels
  let divLevel = 0;
  let foundNavbar = false;
  
  for (let i = startLine; i < lines.length; i++) {
    const line = lines[i];
    
    // Count opening divs
    const openDivs = (line.match(/<div/g) || []).length;
    // Count closing divs  
    const closeDivs = (line.match(/<\/div>/g) || []).length;
    
    if (line.includes('navbar-logo-center-container') || (hasWrapper && i === wrapperStartLine)) {
      foundNavbar = true;
    }
    
    if (foundNavbar) {
      divLevel += openDivs;
      divLevel -= closeDivs;
      
      if (divLevel <= 0) {
        endLine = i;
        break;
      }
    }
  }
  
  return { startLine, endLine, hasWrapper };
}

// Function to update a single HTML file
function updateHtmlFile(filename) {
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`  ⚠️  File not found: ${filename}`);
    return false;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  
  // Find navbar bounds
  const bounds = findNavbarBounds(content);
  
  if (!bounds) {
    console.log(`  ⚠️  No navbar found in: ${filename}`);
    return false;
  }
  
  const { startLine, endLine, hasWrapper } = bounds;
  
  // Create the replacement - navbar container placeholder
  const navbarPlaceholder = '  <!-- Navbar loaded dynamically -->\n  <div id="navbar-container"></div>';
  
  // Remove old navbar and insert placeholder
  const newLines = [
    ...lines.slice(0, startLine),
    navbarPlaceholder,
    ...lines.slice(endLine + 1)
  ];
  
  let newContent = newLines.join('\n');
  
  // Check if navbar-loader.js is already included
  if (!newContent.includes('navbar-loader.js')) {
    // Add the navbar loader script before closing </body> tag
    const navbarScript = `
  <!-- Navbar Loader -->
  <script src="js/navbar-loader.js"></script>
  <script>autoDetectAndInitNavbar();</script>
`;
    newContent = newContent.replace('</body>', navbarScript + '</body>');
  }
  
  // Write the updated content
  fs.writeFileSync(filepath, newContent, 'utf8');
  console.log(`  ✅ Updated: ${filename} (navbar lines ${startLine + 1}-${endLine + 1})`);
  return true;
}

// Main execution
console.log('🔄 Updating HTML files to use navbar loader...\n');

let successCount = 0;
let failCount = 0;

for (const file of htmlFiles) {
  if (updateHtmlFile(file)) {
    successCount++;
  } else {
    failCount++;
  }
}

console.log(`\n✨ Done! Updated ${successCount} files, ${failCount} skipped/failed.`);
console.log('\nRemember: The navbar is now dynamically loaded via js/navbar-loader.js');
console.log('To update the navbar content, edit js/navbar-loader.js (or .ts source)');
