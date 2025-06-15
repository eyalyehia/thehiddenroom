import * as THREE from 'three';

/**
 * פונקציה פשוטה להוספת אפקט הדגשה (emissive)
 * @param {THREE.Mesh} obj - The Three.js mesh object to apply the highlight effect to.
 */
export const applyHighlightEffect = (obj) => {
  try {
    if (!obj.userData.origMaterial) {
      if (Array.isArray(obj.material)) {
        obj.userData.origMaterial = obj.material.map(mat => mat.clone());
      } else if (obj.material) {
        obj.userData.origMaterial = obj.material.clone();
      } else {
        return;
      }
    }
    
    const addGlowToMaterial = (material) => {
      if (!material) return;
      
      // צבע בסיס כהה מאוד שעדיין נראה
      material.emissive = new THREE.Color(0x111111);
      material.emissiveIntensity = 2.5;
      
      // גם נשנה את הצבע הבסיסי של החומר לכהה יותר
      if (material.color) {
        material.color.multiplyScalar(0.3); // הכהה את הצבע הבסיסי
      }
      
      // טיפול מיוחד בפוסטר שמאלי (Plane012)
      if (obj.name === "Plane012") {
        material.emissiveIntensity = 3.0;
        material.emissive = new THREE.Color(0x111111);
        if (material.color) material.color.multiplyScalar(0.2);
      }
      
      // טיפול מיוחד באובייקטי טלוויזיה
      if (obj.userData.name === "TV" || obj.name.includes("TV")) {
        material.emissive = new THREE.Color(0x111111);
        material.emissiveIntensity = 3.0;
        if (material.color) material.color.multiplyScalar(0.2);
      }
      
      // טיפול מיוחד לחטיף Cube008
      if (obj.name === "Cube008" || obj.name.includes("Cube008")) {
        material.emissive = new THREE.Color(0x111111);
        material.emissiveIntensity = 3.5;
        if (material.color) material.color.multiplyScalar(0.1);
      }
      
      // טיפול מיוחד לבסיס (ג'ויסטיק)
      if (obj.name === "base" || obj.name.includes("base")) {
        material.emissive = new THREE.Color(0x111111);
        material.emissiveIntensity = 3.5;
        if (material.color) material.color.multiplyScalar(0.1);
      }
      
             // טיפול מיוחד ליומן
       if (obj.name === "Cube300_1" || obj.name === "Cube.300" || 
           obj.name === "Cube300" || obj.name.includes("cube300") ||
           obj.name === "Plane013" || obj.name.includes("diary") || 
           obj.name.includes("notebook") || obj.name.includes("journal") ||
           obj.userData.name === "Diary") {
         material.emissive = new THREE.Color(0x111111);
         material.emissiveIntensity = 3.0;
         if (material.color) material.color.multiplyScalar(0.2);
       }
       
       // טיפול מיוחד לספר עם משקפיים
       if (obj.name === "Book with glasses" || obj.name.includes("book with glasses") ||
           obj.name.toLowerCase().includes("book") || obj.name.toLowerCase().includes("glasses") ||
           obj.userData.name === "Book") {
         material.emissive = new THREE.Color(0x111111);
         material.emissiveIntensity = 3.0;
         if (material.color) material.color.multiplyScalar(0.2);
       }
      
      // טיפול מיוחד לשקית חטיף
      if (obj.userData.name === "TostitosBag" || obj.name === "Cube008" ||
          obj.name.toLowerCase().includes("snack") || obj.name.toLowerCase().includes("bag") ||
          obj.name.toLowerCase().includes("tostitos")) {
        material.emissive = new THREE.Color(0x111111);
        material.emissiveIntensity = 3.0;
        if (material.color) material.color.multiplyScalar(0.2);
      }
      
      // טיפול מיוחד למסך מחשב
      if (obj.userData.name === "ComputerScreen" || 
          obj.name.toLowerCase().includes("computer") || 
          obj.name.toLowerCase().includes("monitor") ||
          obj.name.toLowerCase().includes("screen")) {
        material.emissive = new THREE.Color(0x111111);
        material.emissiveIntensity = 3.0;
        if (material.color) material.color.multiplyScalar(0.2);
      }
    };
    
    if (Array.isArray(obj.material)) {
      obj.material.forEach(addGlowToMaterial);
    } else if (obj.material) {
      addGlowToMaterial(obj.material);
    }
    
    if (!obj.userData.pulseAnimation) {
      let pulseUp = true;
      const minIntensity = 0.6;
      const maxIntensity = 1.5;
      const pulseStep = 0.05;
      
      obj.userData.pulseAnimation = setInterval(() => {
        if (!obj.material) {
          clearInterval(obj.userData.pulseAnimation);
          obj.userData.pulseAnimation = null;
          return;
        }
        
        const updateMaterialIntensity = (mat) => {
          if (!mat || !mat.emissive) return;
          
          if (pulseUp) {
            mat.emissiveIntensity += pulseStep;
            if (mat.emissiveIntensity >= maxIntensity) {
              pulseUp = false;
            }
          } else {
            mat.emissiveIntensity -= pulseStep;
            if (mat.emissiveIntensity <= minIntensity) {
              pulseUp = true;
            }
          }
        };
        
        if (Array.isArray(obj.material)) {
          obj.material.forEach(updateMaterialIntensity);
        } else if (obj.material) {
          updateMaterialIntensity(obj.material);
        }
      }, 50);
    }
  } catch (error) {
    console.error(`שגיאה בהפעלת אפקט על אובייקט ${obj.name}:`, error);
  }
};

/**
 * פונקציה פשוטה להסרת אפקט הדגשה
 * @param {THREE.Mesh} obj - The Three.js mesh object to remove the highlight effect from.
 */
export const removeHighlightEffect = (obj) => {
  try {
    if (obj.userData.origMaterial) {
      if (Array.isArray(obj.material) && Array.isArray(obj.userData.origMaterial)) {
        obj.material.forEach((mat, index) => {
          if (obj.userData.origMaterial[index]) {
            mat.copy(obj.userData.origMaterial[index]);
          }
        });
      } else if (!Array.isArray(obj.material) && !Array.isArray(obj.userData.origMaterial)) {
        obj.material.copy(obj.userData.origMaterial);
      }
      
      obj.userData.origMaterial = null;
    }
    
    if (obj.userData.pulseAnimation) {
      clearInterval(obj.userData.pulseAnimation);
      obj.userData.pulseAnimation = null;
    }
  } catch (error) {
    console.error(`שגיאה בהסרת אפקט מאובייקט ${obj.name}:`, error);
  }
}; 