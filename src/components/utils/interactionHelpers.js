import { applyHighlightEffect, removeHighlightEffect } from './raycastHelpers';

/**
 * פונקציה לטיפול בהעברת עכבר מעל אובייקט
 * @param {Event} e - אירוע העכבר
 * @param {Function} setHovered - פונקציה לעדכון מצב ההובר
 * @param {Object} interactiveObjects - אובייקטים אינטראקטיביים
 */
export const handlePointerOver = (e, setHovered, interactiveObjects) => {
  e.stopPropagation();
  const obj = e.object;
  
  // Debug - נראה איזה אובייקט נלחץ
  console.log('Pointer over object:', {
    name: obj.name,
    userData: obj.userData,
    parentName: obj.parent?.name,
    parentUserData: obj.parent?.userData
  });
  
  if (obj && (obj.userData.isInteractive || (obj.parent && obj.parent.userData && obj.parent.userData.isInteractive))) {
    const interactiveObj = obj.userData.isInteractive ? obj : obj.parent;
    
    // סינון אובייקטים שלא רצויים - לא נטפל ב-Plane002_1 כאינטראקטיבי
    if (obj.name === 'Plane002_1' || interactiveObj.name === 'Plane002_1') {
      return;
    }
    
    setHovered(interactiveObj.userData.name);
    
    // בדיקה מדויקת יותר לטלוויזיה - רק אם השם הוא בדיוק "TV"
    // ולא Plane002_1 או שמות אחרים
    const isTVObject = interactiveObj.userData.name === "TV";
    
    if (isTVObject) {
      Object.keys(interactiveObjects.current).forEach(key => {
        const tvObj = interactiveObjects.current[key];
        if (tvObj.userData.name === "TV") {
          applyHighlightEffect(tvObj);
        }
      });
    } else {
      applyHighlightEffect(interactiveObj);
    }
    
    document.body.style.cursor = 'pointer';
  }
};

/**
 * פונקציה לטיפול בהסרת עכבר מעל אובייקט
 * @param {Event} e - אירוע העכבר
 * @param {Function} setHovered - פונקציה לעדכון מצב ההובר
 * @param {Object} interactiveObjects - אובייקטים אינטראקטיביים
 */
export const handlePointerOut = (e, setHovered, interactiveObjects) => {
  e.stopPropagation();
  const obj = e.object;
  
  if (obj && (obj.userData.isInteractive || (obj.parent && obj.parent.userData && obj.parent.userData.isInteractive))) {
    const interactiveObj = obj.userData.isInteractive ? obj : obj.parent;
    
    // סינון אובייקטים שלא רצויים - לא נטפל ב-Plane002_1 כאינטראקטיבי
    if (obj.name === 'Plane002_1' || interactiveObj.name === 'Plane002_1') {
      return;
    }
    
    setHovered(null);
    
    // בדיקה מדויקת יותר לטלוויזיה - רק אם השם הוא בדיוק "TV"
    const isTVObject = interactiveObj.userData.name === "TV";
    
    if (isTVObject) {
      Object.keys(interactiveObjects.current).forEach(key => {
        const tvObj = interactiveObjects.current[key];
        if (tvObj.userData.name === "TV") {
          removeHighlightEffect(tvObj);
        }
      });
    } else {
      removeHighlightEffect(interactiveObj);
    }
    
    document.body.style.cursor = 'auto';
  }
};

/**
 * פונקציה לטיפול בלחיצה על אובייקט
 * @param {Event} e - אירוע הלחיצה
 */
export const handleClick = (e) => {
  e.stopPropagation();
  const obj = e.object;
  
  if (obj && obj.userData.isInteractive) {
    // סינון אובייקטים שלא רצויים - לא נטפל ב-Plane002_1 כאינטראקטיבי
    if (obj.name === 'Plane002_1') {
      return;
    }
    
    const name = obj.userData.name;
    
    if (name === "Poster" || obj.name === "Plane012" || obj.name === "Plane014" ||
        obj.name.toLowerCase().includes("poster") || 
        obj.name.toLowerCase().includes("frame") ||
        obj.name.toLowerCase().includes("picture")) {
      window.location.href = '/poster';
      return;
    }

    if (name === "Diary" || obj.name === "Cube300_1" || obj.name === "Cube.300" || 
        obj.name === "Cube300" || obj.name === "Plane013" || 
        obj.name.includes("diary") || obj.name.includes("notebook") || 
        obj.name.includes("journal")) {
      window.location.href = '/notebook';
      return;
    }

    if (name === "Toblerone" || 
        (obj.name === "Cube" && !obj.name.toLowerCase().includes("wall") && 
         !obj.name.toLowerCase().includes("window") && !obj.name.toLowerCase().includes("frame")) || 
        obj.name.includes("toblerone") || obj.name.includes("טובלרון")) {
      window.location.href = '/logo';
      return;
    }

    // בדיקה מדויקת יותר לטלוויזיה - הסרנו את הבדיקות המיותרות
    if (name === "TV") {
      window.location.href = '/tv';
      return;
    }

    if (name === "ComputerScreen") {
      window.location.href = '/computer';
      return;
    }

    if (name === "Book" || obj.name === "Book with glasses" || 
        obj.name.includes("book with glasses") || obj.name.includes("book") || 
        obj.name.includes("glasses")) {
      alert(`📚 ספר עם משקפיים\n\nזהו ספר מיוחד שאני אוהב לקרוא בו.\nהמשקפיים מסמלים את החכמה והידע שאני רוכש מהקריאה.\n\n"הידע הוא הכוח הגדול ביותר שיש לאדם."`);
      return;
    }

    const meshInfo = {
      name: obj.name,
      type: obj.type,
      geometry: obj.geometry ? obj.geometry.type : "אין מידע",
      materialType: obj.material ? (Array.isArray(obj.material) ? obj.material.map(m => m.type).join(', ') : obj.material.type) : "אין מידע"
    };

    alert(`מידע על ${obj.userData.description}:\nשם האובייקט: ${meshInfo.name}\nסוג: ${meshInfo.type}\nגיאומטריה: ${meshInfo.geometry}\nחומר: ${meshInfo.materialType}`);
  }
};