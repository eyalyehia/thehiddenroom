import * as THREE from 'three';

/**
 * פונקציה לטיפול במקלדת - צביעה בשחור
 * @param {THREE.Object3D} object - האובייקט לבדיקה
 */
export const handleKeyboardColoring = (object) => {
  if (object.isMesh && 
      (object.name === "Cube.041" || 
      object.name === "Keyboard Genius" || 
      object.name.toLowerCase().includes("keyboard"))) {
    // console.log("מצאתי את המקלדת!", object.name);
    
    const blackMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.5,
      metalness: 0.8
    });
    
    if (Array.isArray(object.material)) {
      object.material = Array(object.material.length).fill(blackMaterial);
    } else {
      object.material = blackMaterial;
    }
    
    // console.log("צבעתי את המקלדת בשחור!", object.name);
  }
};

/**
 * פונקציה לטיפול במקלדת בעיבוד הסצנה
 * @param {THREE.Object3D} object - האובייקט לבדיקה
 */
export const handleKeyboardInScene = (object) => {
  if (object.name.includes("Keyboard") || 
      object.name.toLowerCase().includes("keyboard") || 
      object.name.includes("keyboard") ||
      (object.parent && object.parent.name && 
       (object.parent.name.includes("Keyboard") || 
        object.parent.name.toLowerCase().includes("keyboard") ||
        object.parent.name.includes("keyboard")))) {
    
    const kbMaterials = Array.isArray(object.material) ? object.material : [object.material];
    kbMaterials.forEach(mat => {
      if (mat) {
        mat.color = new THREE.Color(0x000000);
        mat.emissive = new THREE.Color(0x000000);
        mat.roughness = 0.3;
        mat.metalness = 0.6;
      }
    });
    // console.log(`צבע מקלדת בשחור: ${object.name}`);
  }
};

/**
 * פונקציה לשיפור מראה החומרים
 * @param {THREE.Object3D} object - האובייקט לעיבוד
 */
export const improveMaterialAppearance = (object) => {
  const materials = Array.isArray(object.material) ? object.material : [object.material];
  materials.forEach(mat => {
    if (mat && (mat.isMeshStandardMaterial || mat.isMeshPhongMaterial)) {
      // דילוג על מקלדת
      if (object.name.includes("Keyboard") || 
          object.name.toLowerCase().includes("keyboard") ||
          object.name.includes("keyboard") ||
          (object.parent && object.parent.name && 
           (object.parent.name.includes("Keyboard") || 
            object.parent.name.toLowerCase().includes("keyboard") ||
            object.parent.name.includes("keyboard")))) {
        return;
      }
      
      mat.roughness = 0.3;
      mat.metalness = 0.1;
      mat.envMapIntensity = 1.5;

      if (object.name.includes("Poster") || object.name.includes("poster") || object.name.includes("Frame")) {
        mat.roughness = 0.08;
        mat.metalness = 0.02;
        mat.envMapIntensity = 3.5;

        if (mat.color) {
          mat.color.multiplyScalar(3.2);
        }

        if (object.name.includes("Once") || object.name.includes("Hollywood")) {
          mat.emissive = new THREE.Color("#ff5500");
          mat.emissiveIntensity = 1.2;
        }
      }
    }
  });
};

/**
 * פונקציה לקביעת סוג האובייקט האינטראקטיבי
 * @param {THREE.Object3D} object - האובייקט לבדיקה
 * @returns {Object} מידע על האובייקט
 */
export const getInteractiveObjectInfo = (object) => {
  let key = "";
  let description = "";

  // בדיקה לפי שם האובייקט
  const objectName = object.name.toLowerCase();
  const parentName = object.parent ? object.parent.name.toLowerCase() : "";

  if (object.name === "Poster" || object.name.includes("Poster") || object.name === "Plane012") {
    key = "Poster";
    description = "פוסטר";
  } else if (object.name === "TV" || object.name === "TV_1" || object.name === "TV_2" || 
             object.name.includes("TV") || object.name === "Plane002_1") {
    key = "TV";
    description = "טלויזיה";
  } else if (object.name === "Cube008" || objectName.includes("cube008") || 
             objectName.includes("snack") || objectName.includes("bag") ||
             objectName.includes("tostitos")) {
    key = "TostitosBag";
    description = "שקית חטיף";
  } else if (object.name === "base" || objectName.includes("base") || 
             objectName.includes("gamepad") || objectName.includes("controller")) {
    key = "Gamepad";
    description = "ג'ויסטיק";
  } else if (object.name === "Cube300_1" || object.name === "Cube.300" || 
             object.name === "Cube300" || objectName.includes("cube300") ||
             object.name === "Plane013" || objectName.includes("diary") || 
             objectName.includes("notebook") || objectName.includes("journal")) {
    key = "Diary";
    description = "יומן / פנקס על השולחן";
  } else if (object.name === "Book with glasses" || objectName.includes("book with glasses") ||
             objectName.includes("book") || objectName.includes("glasses")) {
    key = "Book";
    description = "ספר עם משקפיים";
  } else if (objectName.includes("computer") || objectName.includes("monitor") || 
             objectName.includes("screen")) {
    key = "ComputerScreen";
    description = "מסך מחשב";
  } else {
    // ברירת מחדל לאובייקטים שלא זוהו
    key = object.name || "Unknown";
    description = "אובייקט לא מזוהה";
  }

  return { key, description };
}; 