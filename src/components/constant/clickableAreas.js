// מדד אזורים לחיצים לכל תמונת לוגו
// הקואורדינטות הן יחסיות לגודל התמונה (0-1)
// כל אזור מוגדר על ידי x, y, width, height (בין 0 ל-1)

// אזורים לחיצים עבור העמוד הראשון
export const LOGO_CLICKABLE_AREAS_PAGE1 = {
  1: [
    // אזור מרכזי של הלוגו
    { x: -0.1, y: 0.3, width: 0.3, height:0.4 },
    // אזור נוסף למטה
    // { x: 0.5, y: 0.7, width: 0.4, height: 0.2 }
  ],
  2: [
    // אזור בצד שמאל
    { x: 0.1, y:-0.1, width: 0.5, height: 0.4 },
    // אזור בצד ימין
    // { x: 0.5, y: 0.3, width: 0.4, height: 0.4 }
  ],
  3: [
    // אזור מלא כמעט
    { x: 0.1, y: 0.1, width: 0.8, height: 0.8 }
  ],
  4: [
    // אזור עליון
    { x: 0.2, y: 0.5, width: 0.6, height: 0.4 },
    // אזור תחתון
    // { x: 0.2, y: 0.5, width: 0.6, height: 0.4 }
  ],
  5: [
    // אזור מרכזי קטן יותר
    { x: 0.25, y: 0.25, width: 0.5, height: 0.5 }
  ],
  6: [
    // אזור משמאל למעלה
    { x: 0.1, y: 0.1, width: 0.4, height: 0.4 },
    // אזור מימין למטה
    { x: 0.5, y: 0.5, width: 0.4, height: 0.4 }
  ],
  7: [
    // אזור מרכזי רחב
    { x: 0.15, y: 0.3, width: 0.7, height: 0.4 }
  ],
  8: [
    // אזור עליון רחב
    { x: 0.1, y: 0.1, width: 0.8, height: 0.3 },
    // אזור תחתון צר
    { x: 0.3, y: 0.6, width: 0.4, height: 0.3 }
  ],
  9: [
    // אזור מרכזי
    { x: 0.2, y: 0.2, width: 0.6, height: 0.6 }
  ],
  10: [
    // שלושה אזורים אופקיים
    { x: 0.1, y: 0.1, width: 0.8, height: 0.2 },
    { x: 0.1, y: 0.4, width: 0.8, height: 0.2 },
    { x: 0.1, y: 0.7, width: 0.8, height: 0.2 }
  ],
  11: [
    // אזור מרכזי
    { x: 0.2, y: 0.2, width: 0.6, height: 0.6 }
  ],
  12: [
    // אזור שמאל
    { x: 0.1, y: 0.2, width: 0.4, height: 0.6 },
    // אזור ימין
    { x: 0.5, y: 0.2, width: 0.4, height: 0.6 }
  ],
  13: [
    // אזור מרכזי גדול
    { x: 0.15, y: 0.15, width: 0.7, height: 0.7 }
  ],
  14: [
    // אזור עליון
    { x: 0.2, y: 0.1, width: 0.6, height: 0.3 },
    // אזור אמצעי
    { x: 0.3, y: 0.4, width: 0.4, height: 0.2 },
    // אזור תחתון
    { x: 0.2, y: 0.6, width: 0.6, height: 0.3 }
  ],
  15: [
    // אזור מרכזי
    { x: 0.2, y: 0.2, width: 0.6, height: 0.6 }
  ]
};

// אזורים לחיצים עבור העמוד השני
export const LOGO_CLICKABLE_AREAS_PAGE2 = {
  1: [
    // אזור מרכזי מותאם לתמונת העמוד השני
    { x: 0.1, y: 0.2, width: 0.5, height: 0.6 }
  ],
  2: [
    // אזור עליון גדול
    { x: 0.1, y: 0.1, width: 0.8, height: 0.4 },
    // אזור תחתון קטן
    { x: 0.3, y: 0.6, width: 0.4, height: 0.3 }
  ],
  3: [
    // אזור מלא כמעט
    { x: 0.05, y: 0.05, width: 0.9, height: 0.9 }
  ],
  4: [
    // אזור מרכזי עליון
    { x: 0.25, y: 0.1, width: 0.5, height: 0.4 },
    // אזור מרכזי תחתון
    { x: 0.25, y: 0.5, width: 0.5, height: 0.4 }
  ],
  5: [
    // אזור מרכזי
    { x: 0.2, y: 0.3, width: 0.6, height: 0.4 }
  ],
  6: [
    // אזור שמאל
    { x: 0.05, y: 0.2, width: 0.4, height: 0.6 },
    // אזור ימין
    { x: 0.55, y: 0.2, width: 0.4, height: 0.6 }
  ],
  7: [
    // אזור מרכזי רחב יותר
    { x: 0.1, y: 0.25, width: 0.8, height: 0.5 }
  ],
  8: [
    // אזור עליון רחב
    { x: 0.05, y: 0.05, width: 0.9, height: 0.35 },
    // אזור תחתון
    { x: 0.2, y: 0.6, width: 0.6, height: 0.35 }
  ],
  9: [
    // אזור מרכזי גדול
    { x: 0.15, y: 0.15, width: 0.7, height: 0.7 }
  ],
  10: [
    // שלושה אזורים אופקיים מותאמים
    { x: 0.05, y: 0.05, width: 0.9, height: 0.25 },
    { x: 0.1, y: 0.35, width: 0.8, height: 0.3 },
    { x: 0.05, y: 0.7, width: 0.9, height: 0.25 }
  ],
  11: [
    // אזור מרכזי
    { x: 0.25, y: 0.25, width: 0.5, height: 0.5 }
  ],
  12: [
    // אזור שמאל מורחב
    { x: 0.05, y: 0.15, width: 0.45, height: 0.7 },
    // אזור ימין מורחב
    { x: 0.5, y: 0.15, width: 0.45, height: 0.7 }
  ],
  13: [
    // אזור מרכזי גדול מאוד
    { x: 0.1, y: 0.1, width: 0.8, height: 0.8 }
  ],
  14: [
    // אזור עליון
    { x: 0.15, y: 0.05, width: 0.7, height: 0.3 },
    // אזור אמצעי
    { x: 0.25, y: 0.4, width: 0.5, height: 0.2 },
    // אזור תחתון
    { x: 0.15, y: 0.65, width: 0.7, height: 0.3 }
  ],
  15: [
    // אזור מרכזי
    { x: 0.2, y: 0.2, width: 0.6, height: 0.6 }
  ]
};

// תאימות לאחור - LOGO_CLICKABLE_AREAS מצביע על העמוד הראשון
export const LOGO_CLICKABLE_AREAS = LOGO_CLICKABLE_AREAS_PAGE1;

// פונקציה לבדיקה אם נקודה נמצאת בתוך אזור לחיץ
export const isPointInClickableArea = (logoId, x, y, imageWidth, imageHeight, page = 1) => {
  const areas = page === 2 ? LOGO_CLICKABLE_AREAS_PAGE2[logoId] : LOGO_CLICKABLE_AREAS_PAGE1[logoId];
  if (!areas) return true; // אם אין הגדרה, כל התמונה לחיצה
  
  // המרת קואורדינטות פיקסלים לקואורדינטות יחסיות
  const relativeX = x / imageWidth;
  const relativeY = y / imageHeight;
  
  // בדיקה אם הנקודה נמצאת באחד מהאזורים הלחיצים
  return areas.some(area => {
    return relativeX >= area.x && 
           relativeX <= area.x + area.width &&
           relativeY >= area.y && 
           relativeY <= area.y + area.height;
  });
};

// פונקציה לקבלת האזורים הלחיצים של לוגו
export const getClickableAreas = (logoId, page = 1) => {
  return page === 2 ? (LOGO_CLICKABLE_AREAS_PAGE2[logoId] || []) : (LOGO_CLICKABLE_AREAS_PAGE1[logoId] || []);
}; 