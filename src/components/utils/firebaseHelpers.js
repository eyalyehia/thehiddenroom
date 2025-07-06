import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase';

// Cache למידע המודל
let cachedModelUrl = null;
let cacheExpiry = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 דקות

/**
 * פונקציה לטעינת URL של המודל מ-Firebase Storage עם cache
 * @returns {Promise<string>} URL של המודל
 */
export const getModelUrl = async () => {
  try {
    // בדיקת cache
    const now = Date.now();
    if (cachedModelUrl && cacheExpiry && now < cacheExpiry) {
      // console.log("משתמש בגרסה מוקשת של המודל");
      return cachedModelUrl;
    }

    const modelRef = ref(storage, 'dor10000.glb');
    const url = await getDownloadURL(modelRef);
    
    // שמירה בcache
    cachedModelUrl = url;
    cacheExpiry = now + CACHE_DURATION;
    
    // console.log("התקבל URL למודל:", url);
    return url;
  } catch (error) {
    // console.error("שגיאה בטעינת המודל:", error);
    throw error;
  }
};

/**
 * פונקציה לניקוי cache במידת הצורך
 */
export const clearModelCache = () => {
  cachedModelUrl = null;
  cacheExpiry = null;
}; 