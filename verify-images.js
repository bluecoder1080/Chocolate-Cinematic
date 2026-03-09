/**
 * Image Setup Verification Script
 * 
 * This script verifies that all required image frames are present
 * in the "All THe Images" folder.
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FRAMES = 200;
const FLAVORS = [
  { name: 'Dark Chocolate', folder: 'Dark-Chocolate' },
  { name: 'Lemon White Chocolate', folder: 'Lemon-jpg' },
  { name: 'Strawberry Chocolate', folder: 'Strawberry' }
];

console.log('\n🍫 Chocolate Cinematic - Image Verification\n');
console.log('='.repeat(50));

let allValid = true;

FLAVORS.forEach(flavor => {
  const folderPath = path.join(__dirname, 'All THe Images', flavor.folder);
  
  console.log(`\n📁 Checking: ${flavor.name}`);
  console.log(`   Path: ${folderPath}`);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`   ❌ Folder not found!`);
    allValid = false;
    return;
  }
  
  let missingFrames = [];
  let foundFrames = 0;
  
  for (let i = 1; i <= REQUIRED_FRAMES; i++) {
    const frameNumber = String(i).padStart(3, '0');
    const framePath = path.join(folderPath, `ezgif-frame-${frameNumber}.jpg`);
    
    if (fs.existsSync(framePath)) {
      foundFrames++;
    } else {
      if (missingFrames.length < 5) {
        missingFrames.push(`ezgif-frame-${frameNumber}.jpg`);
      }
    }
  }
  
  if (foundFrames === REQUIRED_FRAMES) {
    console.log(`   ✅ All ${REQUIRED_FRAMES} frames found!`);
  } else {
    console.log(`   ⚠️  Found ${foundFrames}/${REQUIRED_FRAMES} frames`);
    if (missingFrames.length > 0) {
      console.log(`   Missing frames: ${missingFrames.join(', ')}${missingFrames.length < foundFrames ? '...' : ''}`);
    }
    allValid = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allValid) {
  console.log('\n✨ Success! All images are ready.');
  console.log('   You can now run: npm run dev\n');
} else {
  console.log('\n⚠️  Some images are missing.');
  console.log('   Please check the "All THe Images" folder.\n');
}
