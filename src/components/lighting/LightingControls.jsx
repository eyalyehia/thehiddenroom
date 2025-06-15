import { useControls, folder } from 'leva';

/**
 * קומפוננט לבקרת התאורה
 * @returns {Object} הגדרות התאורה
 */
const LightingControls = () => {
  return useControls('🌟 בקרת תאורה', {
    'תאורה כללית': folder({
      'עוצמה כללית': { value: 0.3, min: 0, max: 1, step: 0.05 },
      'צבע תאורה כללית': { value: '#8b7a5c' },
    }),
    
    'מנורת השולחן': folder({
      'עוצמת מנורה': { value: 6.5, min: 0, max: 15, step: 0.1 },
      'צבע מנורה': { value: '#f7dc6f' },
      'זווית מנורה': { value: Math.PI / 3.5, min: 0, max: Math.PI / 2, step: 0.01 },
      'רכות קצוות': { value: 0.3, min: 0, max: 1, step: 0.05 },
    }),
    
    'תאורת מחשב': folder({
      'עוצמת מסך': { value: 6.8, min: 0, max: 15, step: 0.1 },
      'צבע מסך': { value: '#e74c3c' },
      'עוצמת מחשב צדדי': { value: 5.8, min: 0, max: 15, step: 0.1 },
      'צבע מחשב צדדי': { value: '#ff6b6b' },
    }),
    
    'תאורת פוסטרים': folder({
      'עוצמת פוסטר שמאל': { value: 14.5, min: 0, max: 25, step: 0.1 },
      'צבע פוסטר שמאל': { value: '#ff8000' },
      'עוצמת פוסטר ימין': { value: 4.5, min: 0, max: 15, step: 0.1 },
      'צבע פוסטר ימין': { value: '#42a5f5' },
    }),
    
    'תאורת אביזרים': folder({
      'עוצמת מקלדת': { value: 4.8, min: 0, max: 10, step: 0.1 },
      'צבע מקלדת': { value: '#ffa502' },
      'עוצמת ג\'ויסטיק': { value: 3.5, min: 0, max: 10, step: 0.1 },
      'צבע ג\'ויסטיק': { value: '#ffb347' },
    }),
    
    'הגדרות כלליות': folder({
      'איכות פיזית': true,
      'סביבת לילה': true,
    }),
  });
};

export default LightingControls; 