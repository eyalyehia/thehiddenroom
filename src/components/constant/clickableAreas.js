export const LOGO_CLICKABLE_AREAS_PAGE1 = {
  1: [
    { x: -0.1, y: 0.3, width: 0.3, height:0.4 },
  ],
  2: [
    { x: 0.1, y:0, width: 0.5, height: 0.4 },
  ],
  3: [
    { x: 0.3, y: 0.3, width: 0.4, height: 0.5 }
  ],
  4: [
    { x: 0.5, y: 0.4, width: 0.3, height: 0.4 },
  ],
  5: [
    { x: -0.15, y: 0.17, width: 0.6, height: 0.7 }
  ],
  6: [
    { x: 0.3, y: 0.26, width: 0.4, height: 0.4 }
  
  ],
  7: [
    
    { x: 0, y: 0, width: 1, height: 0.7 }
  ],
  8: [
   
    { x: -0.1, y: 0.27, width: 0.38, height: 0.5 }
  
  ],
  9: [
    
    { x: 0.25, y: 0, width: 0.5, height: 0.6 }
  ],
  10: [
    { x: -0.13, y: 0.57, width: 1.2, height: 0.2 }
  ],
  11: [
    { x: -0.10, y: 0.5, width: 0.35, height: 0.35 }
  ],
  12: [
    { x: -0.25, y: 0.2, width: 0.45, height: 0.68 }
  ],
  13: [
    { x: 0.07, y: 0.15, width: 1, height: 0.6}
  ],
  14: [
    { x: 0.1, y: 0.20, width: 0.80, height: 0.6 }
  ],
  15: [
    { x: -0.05, y: 0.35, width: 0.6, height: 0.35 }
  ]
};

export const LOGO_CLICKABLE_AREAS_PAGE2 = {
  1: [
    { x: 0.1, y: 0.2, width: 0.5, height: 0.6 }
  ],
  2: [
    { x: 0.1, y: 0.1, width: 0.8, height: 0.4 },
    { x: 0.3, y: 0.6, width: 0.4, height: 0.3 }
  ],
  3: [
    { x: 0.05, y: 0.05, width: 0.9, height: 0.9 }
  ],
  4: [
    { x: 0.25, y: 0.1, width: 0.5, height: 0.4 },
    { x: 0.25, y: 0.5, width: 0.5, height: 0.4 }
  ],
  5: [
    { x: 0.2, y: 0.3, width: 0.6, height: 0.4 }
  ],
  6: [
    { x: 0.05, y: 0.2, width: 0.4, height: 0.6 },
    { x: 0.55, y: 0.2, width: 0.4, height: 0.6 }
  ],
  7: [
    { x: 0.1, y: 0.25, width: 0.8, height: 0.5 }
  ],
  8: [
    { x: 0.05, y: 0.05, width: 0.9, height: 0.35 },
    { x: 0.2, y: 0.6, width: 0.6, height: 0.35 }
  ],
  9: [
    { x: 0.15, y: 0.15, width: 0.7, height: 0.7 }
  ],
  10: [
    { x: 0.05, y: 0.05, width: 0.9, height: 0.25 },
    { x: 0.1, y: 0.35, width: 0.8, height: 0.3 },
    { x: 0.05, y: 0.7, width: 0.9, height: 0.25 }
  ],
  11: [
    { x: 0.25, y: 0.25, width: 0.5, height: 0.5 }
  ],
  12: [
    { x: 0.05, y: 0.15, width: 0.45, height: 0.7 },
    { x: 0.5, y: 0.15, width: 0.45, height: 0.7 }
  ],
  13: [
    { x: 0.1, y: 0.1, width: 0.8, height: 0.8 }
  ],
  14: [
    { x: 0.15, y: 0.05, width: 0.7, height: 0.3 },
    { x: 0.25, y: 0.4, width: 0.5, height: 0.2 },
    { x: 0.15, y: 0.65, width: 0.7, height: 0.3 }
  ],
  15: [
    { x: 0.2, y: 0.2, width: 0.6, height: 0.6 }
  ]
};

export const LOGO_CLICKABLE_AREAS = LOGO_CLICKABLE_AREAS_PAGE1;

export const isPointInClickableArea = (logoId, x, y, imageWidth, imageHeight, page = 1) => {
  const areas = page === 2 ? LOGO_CLICKABLE_AREAS_PAGE2[logoId] : LOGO_CLICKABLE_AREAS_PAGE1[logoId];
  if (!areas) return true;
  
  const relativeX = x / imageWidth;
  const relativeY = y / imageHeight;
  
  return areas.some(area => {
    return relativeX >= area.x && 
           relativeX <= area.x + area.width &&
           relativeY >= area.y && 
           relativeY <= area.y + area.height;
  });
};

export const getClickableAreas = (logoId, page = 1) => {
  return page === 2 ? (LOGO_CLICKABLE_AREAS_PAGE2[logoId] || []) : (LOGO_CLICKABLE_AREAS_PAGE1[logoId] || []);
}; 