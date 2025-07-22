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
    
    // בדיקה אם זה אלמנט שצריך הדגשה מיוחדת (טובלרון או יומן)
    const isSpecialElement = obj.userData.name === "Toblerone" || obj.userData.name === "Diary" || 
                            obj.name.includes("toblerone") || obj.name.includes("טובלרון") ||
                            obj.name.includes("diary") || obj.name.includes("notebook") || 
                            obj.name.includes("journal") || obj.name === "Cube300_1" || 
                            obj.name === "Cube.300" || obj.name === "Cube300" || obj.name === "Plane013";
    
    const addGlowToMaterial = (material) => {
      if (!material) return;
      
      // הגדרות מעודכנות עם הצבע החדש #1D1C1A
      if (isSpecialElement) {
        // הגדרות חזקות יותר לטובלרון ויומן
        material.emissiveIntensity = 3.5;
        material.emissive = new THREE.Color(0x1D1C1A);
        
        // הבהרה חזקה יותר של הצבע הבסיסי
        if (material.color) {
          material.color.multiplyScalar(1.8);
        }
        
        material.opacity = 1.0; // שקיפות מלאה להדגשה טובה יותר
      } else {
        // הגדרות רגילות לשאר האלמנטים
        material.emissiveIntensity = 2.0;
        material.emissive = new THREE.Color(0x1D1C1A);
        
        // שמירה על הנראות של האלמנט - לא נכהה יותר מדי
        if (material.color) {
          material.color.multiplyScalar(1.2); // מבהיר קלות במקום להכהות
        }
        
        material.opacity = 0.9;
      }
      
      // הוספת שקיפות חלקית לבהבוב יותר חלק
      if (material.transparent === undefined) {
        material.transparent = true;
      }
    };
    
    if (Array.isArray(obj.material)) {
      obj.material.forEach(addGlowToMaterial);
    } else if (obj.material) {
      addGlowToMaterial(obj.material);
    }
    
    if (!obj.userData.pulseAnimation) {
      // צבעים לאפקט הזוהר - צבע #1D1C1A
      const darkColor = new THREE.Color(0x1D1C1A); // הצבע הבסיסי
      const glowColor = isSpecialElement ? 
        new THREE.Color(0x5A5248) : // צבע בהיר יותר לטובלרון ויומן
        new THREE.Color(0x3A3834); // גרסה מבהירה של הצבע לבהבוב רגיל
      
      // משתנים לאנימציה - מהירות מותאמת לפי סוג האלמנט
      let progress = 0;
      const animationSpeed = isSpecialElement ? 0.015 : 0.008; // מהירות מוגברת לאלמנטים מיוחדים
      const frameInterval = isSpecialElement ? 24 : 32; // פריימים מהירים יותר לאלמנטים מיוחדים
      let direction = 1; // 1 = מתבהר, -1 = מתכהה
      
      // רמות opacity לבהבוב חלק יותר - חזק יותר לאלמנטים מיוחדים
      let opacityProgress = 0;
      const minOpacity = isSpecialElement ? 0.8 : 0.7;
      const maxOpacity = 1.0;
      
      // יצירת צבע ביניים לפי התקדמות האנימציה
      const getIntermediateColor = (progress) => {
        const color = new THREE.Color();
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
        
        // חישוב opacity נוכחי
        const currentOpacity = minOpacity + (maxOpacity - minOpacity) * (0.5 + Math.sin(opacityProgress) * 0.5);
        
        // עדכון הצבע בכל החומרים
        const updateMaterialColor = (mat) => {
          if (!mat || !mat.emissive) return;
          
          // עדכון צבע הזוהר
          mat.emissive.copy(currentColor);
          
          // עדכון עוצמת הזוהר לפי ההתקדמות - חזק יותר לאלמנטים מיוחדים
          if (isSpecialElement) {
            mat.emissiveIntensity = 3.5 + progress * 1.5; // עוצמה גבוהה יותר
          } else {
            mat.emissiveIntensity = 2.0 + progress * 0.8;
          }
          
          // עדכון opacity לבהבוב חלק יותר
          mat.opacity = currentOpacity;
        };
        
        // עדכון כל החומרים באובייקט
        if (Array.isArray(obj.material)) {
          obj.material.forEach(updateMaterialColor);
        } else if (obj.material) {
          updateMaterialColor(obj.material);
        }
        
        // עדכון ההתקדמות לפריים הבא
        progress += animationSpeed * direction;
        opacityProgress += animationSpeed * 2; // קצת יותר מהיר ל-opacity
        
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
    // console.error(`שגיאה בהפעלת אפקט על אובייקט ${obj.name}:`, error);
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
    // console.error `שגיאה בהסרת אפקט מאובייקט ${obj.name}:`, error);
  }
};