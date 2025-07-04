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
  
  if (obj && (obj.userData.isInteractive || (obj.parent && obj.parent.userData && obj.parent.userData.isInteractive))) {
    const interactiveObj = obj.userData.isInteractive ? obj : obj.parent;
    setHovered(interactiveObj.userData.name);
    
    const isTVObject = interactiveObj.userData.name === "TV" || 
                      interactiveObj.name.includes("TV") || 
                      interactiveObj.name === "TV_2" || 
                      interactiveObj.name === "TV_1" ||
                      interactiveObj.name === "Plane002_1";
    
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
    
    setHovered(null);
    
    const isTVObject = interactiveObj.userData.name === "TV" || 
                      interactiveObj.name.includes("TV") || 
                      interactiveObj.name === "TV_2" || 
                      interactiveObj.name === "TV_1" ||
                      interactiveObj.name === "Plane002_1";
    
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

    if (name === "TostitosBag" || obj.name === "Cube008" || 
        obj.name.includes("cube008") || obj.name.includes("snack") || 
        obj.name.includes("bag") || obj.name.includes("tostitos")) {
      window.location.href = '/logo';
      return;
    }

    if (name === "ComputerScreen" || obj.name.toLowerCase().includes("computer") || 
        obj.name.toLowerCase().includes("monitor") || obj.name.toLowerCase().includes("screen")) {
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