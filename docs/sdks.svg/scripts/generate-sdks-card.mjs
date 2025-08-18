import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT = resolve(__dirname, "../assets/statik.title.svg");
const OUTPUT = resolve(__dirname, "../assets/statik.title.svg");

// Create a CSS animation that simulates dragon movement/breathing
function createDragonAnimation() {
  return `
    <style>
      .dragon-animate {
        animation: dragonBreath 3s ease-in-out infinite alternate,
                   dragonFloat 6s ease-in-out infinite;
        transform-origin: center center;
      }
      
      @keyframes dragonBreath {
        0% { transform: scale(1) rotateY(0deg); opacity: 0.9; }
        50% { transform: scale(1.02) rotateY(2deg); opacity: 1; }
        100% { transform: scale(1.01) rotateY(-1deg); opacity: 0.95; }
      }
      
      @keyframes dragonFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-3px) rotate(0.5deg); }
        50% { transform: translateY(-5px) rotate(0deg); }
        75% { transform: translateY(-2px) rotate(-0.5deg); }
      }
      
      .dragon-glow {
        filter: drop-shadow(0 0 10px #ff3168) drop-shadow(0 0 20px #ffd15a);
      }
    </style>
  `;
}

async function fetchDragonImageAsBase64() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/statikfintechllc/dragon-boot/master/Images/dragon.gif');
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/gif;base64,${base64}`;
  } catch (error) {
    console.log('Failed to fetch dragon image, using fallback');
    return 'https://raw.githubusercontent.com/statikfintechllc/dragon-boot/master/Images/dragon.gif';
  }
}

async function updateStatikTitleSVG() {
  try {
    // Read the existing SVG
    const svgContent = await fs.readFile(INPUT, 'utf8');
    
    // Fetch the dragon image as base64
    const dragonImageUrl = await fetchDragonImageAsBase64();
    
    // Replace the external URLs with the base64 version
    let updatedSvg = svgContent
      .replace(
        /href="https:\/\/raw\.githubusercontent\.com\/statikfintechllc\/dragon-boot\/master\/Images\/dragon\.gif"/g,
        `href="${dragonImageUrl}"`
      )
      .replace(
        /xlink:href="https:\/\/raw\.githubusercontent\.com\/statikfintechllc\/dragon-boot\/master\/Images\/dragon\.gif"/g,
        `xlink:href="${dragonImageUrl}"`
      );
    
    // Add CSS animation styles after the opening <svg> tag
    const styleContent = createDragonAnimation();
    updatedSvg = updatedSvg.replace(
      /(<svg[^>]*>)/,
      `$1${styleContent}`
    );
    
    // Add animation classes to the image element containing base64 data
    updatedSvg = updatedSvg.replace(
      /(<image[^>]*preserveAspectRatio="xMidYMid meet"[^>]*>)/g,
      (match) => {
        if (match.includes('class="')) {
            // Add to existing class
            return match.replace(/class="([^"]*)"/, 'class="$1 dragon-breathe dragon-float"');
        } else {
            // Add new class attribute before preserveAspectRatio
            return match.replace('preserveAspectRatio=', 'class="dragon-breathe dragon-float" preserveAspectRatio=');
        }
      }
    );
    
    return updatedSvg;
  } catch (error) {
    console.error('Error updating SVG:', error);
    throw error;
  }
}

(async () => {
  try {
    const updatedSvg = await updateStatikTitleSVG();
    console.log('Generated SVG length:', updatedSvg.length);
    await fs.writeFile(OUTPUT, updatedSvg);
    console.log("✅ statik.title.svg updated with embedded base64 dragon image!");
    console.log('Output file:', OUTPUT);
  } catch (error) {
    console.error('❌ Failed to update SVG:', error);
  }
})();
