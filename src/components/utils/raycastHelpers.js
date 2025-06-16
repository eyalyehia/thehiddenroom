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
      
      // הגדרות אחידות לכל האלמנטים כמו בטלוויזיה
      material.emissiveIntensity = 3.0;
      material.emissive = new THREE.Color(0x111111);
      if (material.color) material.color.multiplyScalar(0.2);
      
      // הערה: הסרנו את כל הטיפולים המיוחדים והחלנו את אותן ההגדרות על כולם
      // כל האלמנטים יקבלו את אותו אפקט כמו הטלוויזיה
    };
    
    if (Array.isArray(obj.material)) {
      obj.material.forEach(addGlowToMaterial);
    } else if (obj.material) {
      addGlowToMaterial(obj.material);
    }
    // 
    if (!obj.userData.pulseAnimation) {
      // צבעים לאפקט הזוהר - אפור כהה במקום לבן
      const darkColor = new THREE.Color(0x111111); // שחור
      const glowColor = new THREE.Color(0x333333); // אפור כהה שנוטה לשחור
      
      // משתנים לאנימציה - מותאמים לאפקט הטלוויזיה
      let progress = 0;
      const animationSpeed = 0.025; // מהירות האנימציה מעט איטית יותר כמו בטלוויזיה
      const frameInterval = 16; // מרווח זמן בין פריימים במילישניות (60fps כמו בטלוויזיה)
      let direction = 1; // 1 = מתבהר, -1 = מתכהה
      
      // יצירת צבע ביניים לפי התקדמות האנימציה
      const getIntermediateColor = (progress) => {
        // צבע חדש לערבוב
        const color = new THREE.Color();
        
        // ערבוב הצבעים לפי ההתקדמות (0 עד 1)
        color.r = darkColor.r + (glowColor.r - darkColor.r) * progress;
        color.g = darkColor.g + (glowColor.g - darkColor.g) * progress;
        color.b = darkColor.b + (glowColor.b - darkColor.b) * progress;
        
        return color;
      };
      
      obj.userData.pulseAnimation = setInterval(() => {
        if (!obj.material) {
          clearInterval(obj.userData.pulseAnimation);
          obj.userData.pulseAnimation = null;
          return;
        }
        
        // חישוב הצבע הנוכחי לפי ההתקדמות
        const currentColor = getIntermediateColor(progress);
        
        // עדכון הצבע בכל החומרים
        const updateMaterialColor = (mat) => {
          if (!mat || !mat.emissive) return;
          
          // עדכון צבע הזוהר כמו בטלוויזיה
          mat.emissive.copy(currentColor);
          
          // עדכון עוצמת הזוהר לפי ההתקדמות - כמו בטלוויזיה
          mat.emissiveIntensity = 3.0 + progress * 1.0;
        };
        
        // עדכון כל החומרים באובייקט
        if (Array.isArray(obj.material)) {
          obj.material.forEach(updateMaterialColor);
        } else if (obj.material) {
          updateMaterialColor(obj.material);
        }
        
        // עדכון ההתקדמות לפריים הבא
        progress += animationSpeed * direction;
        
        // שינוי כיוון כשמגיעים לקצוות
        if (progress >= 1) {
          progress = 1;
          direction = -1;
        } else if (progress <= 0) {
          progress = 0;
          direction = 1;
        }
      }, frameInterval);
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