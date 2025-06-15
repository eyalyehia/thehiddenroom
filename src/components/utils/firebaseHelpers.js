import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase';

/**
 * פונקציה לטעינת URL של המודל מ-Firebase Storage
 * @returns {Promise<string>} URL של המודל
 */
export const getModelUrl = async () => {
  try {
    const modelRef = ref(storage, 'dor1000.glb');
    const url = await getDownloadURL(modelRef);
    console.log("התקבל URL למודל:", url);
    return url;
  } catch (error) {
    console.error("שגיאה בטעינת המודל:", error);
    throw error;
  }
}; 