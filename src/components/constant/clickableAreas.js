export const LOGO_CLICKABLE_AREAS_PAGE1 = {
  1: [
    { x: -0.03, y: 0.40, width: 0.2, height:0.2 },
  ],
  2: [
    { x: 0.28, y:0.05, width: 0.23, height: 0.23 },
  ],
  3: [
    { x: 0.42, y: 0.3, width: 0.29, height: 0.40 }
  ],
  4: [
    { x: 0.58, y: 0.43, width: 0.17, height: 0.23 },
  ],
  5: [
    { x: -0.02, y: 0.26, width: 0.52, height: 0.53 }
  ],
  6: [
    { x: 0.32, y: 0.37, width: 0.35, height: 0.18 },
  
  ],
  7: [
    
    { x: 0.1, y: 0, width: 0.8, height: 0.7 }
  ],
  8: [
   
    { x: -0.03, y: 0.32, width: 0.3, height: 0.4 }
  
  ],
  9: [
    
    { x: 0.35, y: 0.15, width: 0.28, height: 0.43 }
  ],
  10: [
    { x: 0.06, y: 0.57, width: 0.90, height: 0.17 }
  ],
  11: [
    { x: 0.1, y: 0.52, width: 0.15, height: 0.23 }
  ],
  12: [
    { x: -0.05, y: 0.32, width: 0.26, height: 0.35 }
  ],
  13: [
    { x: 0.30, y: 0.15, width: 0.71, height: 0.55}
  ],
  14: [
    { x: 0.21, y: 0.20, width: 0.5, height: 0.53 }
  ],
  15: [
    { x: 0.05, y: 0.4, width: 0.3, height: 0.15 }
  ]
};

export const LOGO_CLICKABLE_AREAS_PAGE2 = {
  1: [
    { x: 0, y: 0.15, width: 0.2, height: 0.26 }
  ],
  2: [
    { x: 0.70, y: 0.2, width: 0.15, height: 0.80 }
  ],
  3: [
    { x: -0.04, y: 0.15, width: 1.05, height: 0.37 }
  ],
  4: [
    { x: 0.65, y: 0.19, width: 0.25, height: 0.55 },
  ],
  5: [
    { x: 0.18, y: 0.37, width: 0.12, height: 0.27 }
  ],
  6: [
    { x: -0.02, y: 0.09, width: 1.03, height: 0.5 }
  ],
  7: [
    { x: 0.09, y: 0.53, width: 0.6, height: 0.15 }
  ],
  8: [
    { x: 0.05, y: 0, width: 0.9, height: 0.60 },
  ],
  9: [
    { x: 0, y: 0.22, width: 0.32, height: 0.55 }
  ],
  10: [
    { x: -0.02, y: 0.35, width: 0.15, height: 0.25 },
   
  ],
  11: [
    { x: 0.39, y: 0, width: 0.22, height: 0.5 }
  ],
  12: [
    { x: -0.03, y: 0.38, width: 0.28, height: 0.22 },
    
  ],
  13: [
    { x: 0.58, y: 0.16, width: 0.2, height: 0.55 }
  ],
  14: [
    { x: 0.62, y: 0.20, width: 0.42, height: 0.31 },
  ],
  15: [
    { x: 0, y: 0.49, width: 0.15, height: 0.32 }
  ]
};

export const POSTER_CLICKABLE_AREAS_PAGE1 = {
  1: [
    { x: 0.46, y: 0.45, width: 0.07, height: 0.07 }
  ],
  2: [
    { x: 0.57, y: 0.35, width: 0.15, height: 0.07 }
  ],
  3: [
    { x: 0.47, y: 0.12, width: 0.07, height: 0.12 }
  ],
  4: [
    { x: 0.45, y: 0.05, width: 0.15, height: 0.1 }
  ],
  5: [
    { x: 0, y: 0.7, width: 0.1, height: 0.1 }
  ],
  6: [
    { x: 0.37, y: 0.95, width: 0.25, height: 0.02 }
  ],
  7: [
    { x: 0, y: 0.70, width: 0.10, height: 0.10}
  ],
  8: [
    { x: 0.45, y: 0.53, width: 0.18, height: 0.05 }
  ]
};

export const POSTER_CLICKABLE_AREAS_PAGE2 = {
  9: [
    { x: 0.72, y: 0.01, width: 0.18, height: 0.06 }
  ],
  10: [
    { x: 0.29, y: 0.29, width: 0.1, height: 0.1 }
  ],
  11: [
    { x: 0.70, y: 0.25, width: 0.1, height: 0.10 }
  ],
  12: [
    { x: 0, y: 0.75, width: 0.06, height: 0.07 }
  ],
  13: [
    { x: 0.77, y: 0.28, width: 0.07, height: 0.05 }
  ],
  14: [
    { x: 0.42, y: 0.60, width: 0.1, height: 0.05 }
  ],
  15: [
    { x: 0.40, y: 0.57, width: 0.15, height: 0.11 }
  ],
  16: [
    { x: 0.05, y: 0.35, width: 0.15, height: 0.12 }
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

export const COMPUTER_GAME_CLICKABLE_AREAS = {
  game1: {
    1: [
      { x: 0.59, y: 0.31, width: 0.02, height: 0.06 }
    ],
    2: [
      { x: 0.71, y: 0.88, width: 0.05, height: 0.08 }
    ],
    3: [
      { x: 0.51, y: 0.73, width: 0.02, height: 0.03 }
    ],
    4: [
      { x: 0.605, y: 0.335, width: 0.02, height: 0.05 }
    ]
  },
  game2: {
    1: [
      { x: 0.51, y: 0.32, width: 0.02, height: 0.05 }
    ],
    2: [
      { x: 0.52, y: 0.355, width: 0.02, height: 0.03 }
    ],
    3: [
      { x: 0.48, y: 0.53, width: 0.02, height: 0.05 }
    ],
    4: [
      { x: 0.48, y: 0.43, width: 0.02, height: 0.04 }
    ]
  },
  game3: {
    1: [
      { x: 0.56, y: 0.355, width: 0.02, height: 0.05 }
    ],
    2: [
      { x: 0.47, y: 0.28, width: 0.05, height: 0.05 }
    ],
    3: [
      { x: 0.49, y: 0.855, width: 0.02, height: 0.03 }
    ],
    4: [
      { x: 0.18, y: 0.35, width: 0.06, height: 0.03}
    ]
  },
  game4: {
    1: [
      { x: 0.585, y: 0.575, width: 0.03, height: 0.04 }
    ],
    2: [
      { x: 0.45, y: 0.33, width: 0.02, height: 0.04 }
    ],
    3: [
      { x: 0.10, y: 0.175, width: 0.1, height: 0.1 }
    ],
    4: [
      { x: 0.62, y: 0.43, width: 0.03, height: 0.08 }
    ]
  },
  game5: {
    1: [
      { x: 0.51, y: 0.38, width: 0.02, height: 0.069 }
    ],
    2: [
      { x: 0.539, y: 0.595, width: 0.01, height: 0.03 }
    ],
    3: [
      { x: 0.69, y: 0.251, width: 0.03, height: 0.05 }
    ],
    4: [
      { x: 0.48, y: 0.5, width: 0.04, height: 0.06 }
    ]
  },
  game6: {
    1: [
      { x: 0.52, y: 0.75, width: 0.03, height: 0.04 }
    ],
    2: [
      { x: 0.2, y: 0.44, width: 0.05, height: 0.055 }
    ],
    3: [
      { x: 0.55, y: 0.43, width: 0.06, height: 0.04}
    ],
    4: [
      { x: 0.57, y: 0.35, width: 0.03, height: 0.06 }
    ]
  },
  game7: {
    1: [
      { x: 0.24, y: 0.58, width: 0.03, height: 0.04 }
    ],
    2: [
      { x: 0.48, y: 0.375, width: 0.02, height: 0.04 }
    ],
    3: [
      { x: 0.31, y: 0.49, width: 0.03, height: 0.04 }
    ],
    4: [
      { x: 0.4, y: 0.27, width: 0.03, height: 0.125 }
    ]
  },
  game8: {
    1: [
      { x: 0.04, y: 0.425, width: 0.04, height: 0.1 }
    ],
    2: [
      { x: 0.64, y: 0.67, width: 0.04, height: 0.045 }
    ],
    3: [
      { x: 0.31, y: 0.315, width: 0.03, height: 0.05 }
    ],
    4: [
      { x: 0.599, y: 0.32, width: 0.02, height: 0.045 }
    ]
  }
};

export const isPointInComputerGameArea = (gameId, imageId, x, y, imageWidth, imageHeight) => {
  const areas = COMPUTER_GAME_CLICKABLE_AREAS[gameId]?.[imageId];
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

export const getComputerGameClickableAreas = (gameId, imageId) => {
  return COMPUTER_GAME_CLICKABLE_AREAS[gameId]?.[imageId] || [];
}; 

export const TV_MOVE1_CLICKABLE_AREAS = {
  1: [
    { x: 0.915, y: 0.19, width: 0.03, height: 0.06 }
  ],
  2: [
    { x: 0.12, y: 0.35, width: 0.08, height: 0.05 }
  ],
  3: [
    { x: 0.01, y: 0.355, width: 0.025, height: 0.045 }
  ],
  4: [
    { x: 0.069, y: 0.33, width: 0.03, height: 0.09 }
  ]
};

export const isPointInTvMove1Area = (imageId, x, y, imageWidth, imageHeight) => {
  const areas = TV_MOVE1_CLICKABLE_AREAS[imageId];
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

export const getTvMove1ClickableAreas = (imageId) => {
  return TV_MOVE1_CLICKABLE_AREAS[imageId] || [];
}; 

export const TV_MOVE2_CLICKABLE_AREAS = {
  1: [
    { x: 0.82, y: 0.607, width: 0.04, height: 0.02 }
  ],
  2: [
    { x: 0.29, y: 0.17, width: 0.09, height: 0.05 }
  ],
  3: [
    { x: 0.49, y: 0.415, width: 0.03, height: 0.03 }
  ],
  4: [
    { x: 0.465, y: 0.24, width: 0.03, height: 0.04 }
  ]
};

export const TV_MOVE3_CLICKABLE_AREAS = {
  1: [
    { x: 0.35, y: 0.25, width: 0.282, height: 0.381 }
  ],
  2: [
    { x: 0.42, y: 0.21, width: 0.025, height: 0.04 }
  ],
  3: [
    { x: 0.37, y: 0.234, width: 0.06, height: 0.022 }
  ],
  4: [
    { x: 0.865, y: 0.185, width: 0.03, height: 0.06 }
  ]
};

export const TV_MOVE4_CLICKABLE_AREAS = {
  1: [
    { x: 0.90, y: 0.74, width: 0.03, height: 0.02 }
  ],
  2: [
    { x: 0.87, y: 0.415, width: 0.02, height: 0.03 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.244, height: 0.212 }
  ],
  4: [
    { x: 0.70, y: 0.58, width: 0.03, height: 0.06 }
  ]
};

export const isPointInTvMove2Area = (imageId, x, y, imageWidth, imageHeight) => {
  const areas = TV_MOVE2_CLICKABLE_AREAS[imageId];
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

export const getTvMove2ClickableAreas = (imageId) => {
  return TV_MOVE2_CLICKABLE_AREAS[imageId] || [];
};

export const isPointInTvMove3Area = (imageId, x, y, imageWidth, imageHeight) => {
  const areas = TV_MOVE3_CLICKABLE_AREAS[imageId];
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

export const getTvMove3ClickableAreas = (imageId) => {
  return TV_MOVE3_CLICKABLE_AREAS[imageId] || [];
};

export const isPointInTvMove4Area = (imageId, x, y, imageWidth, imageHeight) => {
  const areas = TV_MOVE4_CLICKABLE_AREAS[imageId];
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

export const getTvMove4ClickableAreas = (imageId) => {
  return TV_MOVE4_CLICKABLE_AREAS[imageId] || [];
}; 

export const TV_MOVE5_CLICKABLE_AREAS = {
  1: [
    { x: 0.35, y: 0.25, width: 0.03, height: 0.03 }
  ],
  2: [
    { x: 0.3, y: 0.2, width: 0.505, height: 0.240 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.281, height: 0.210 }
  ],
  4: [
    { x: 0.35, y: 0.25, width: 0.664, height: 0.131 }
  ]
};

export const TV_MOVE6_CLICKABLE_AREAS = {
  1: [
    { x: 0.35, y: 0.25, width: 0.259, height: 0.344 }
  ],
  2: [
    { x: 0.3, y: 0.2, width: 0.350, height: 0.177 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.590, height: 0.891 }
  ],
  4: [
    { x: 0.35, y: 0.25, width: 0.657, height: 0.640 }
  ]
};

export const TV_MOVE7_CLICKABLE_AREAS = {
  1: [
    { x: 0.35, y: 0.25, width: 0.198, height: 0.209 }
  ],
  2: [
    { x: 0.3, y: 0.2, width: 0.331, height: 0.621 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.415, height: 0.328 }
  ],
  4: [
    { x: 0.35, y: 0.25, width: 0.214, height: 0.457 }
  ]
};

export const TV_MOVE8_CLICKABLE_AREAS = {
  1: [
    { x: 0.35, y: 0.25, width: 0.312, height: 0.169 }
  ],
  2: [
    { x: 0.3, y: 0.2, width: 0.175, height: 0.222 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.132, height: 0.089 }
  ],
  4: [
    { x: 0.35, y: 0.25, width: 0.432, height: 0.254 }
  ]
};

export const isPointInTvMove5Area = (imageId, x, y, imageWidth, imageHeight) => {
  const areas = TV_MOVE5_CLICKABLE_AREAS[imageId];
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

export const getTvMove5ClickableAreas = (imageId) => {
  return TV_MOVE5_CLICKABLE_AREAS[imageId] || [];
};

export const isPointInTvMove6Area = (imageId, x, y, imageWidth, imageHeight) => {
  const areas = TV_MOVE6_CLICKABLE_AREAS[imageId];
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

export const getTvMove6ClickableAreas = (imageId) => {
  return TV_MOVE6_CLICKABLE_AREAS[imageId] || [];
};

export const isPointInTvMove7Area = (imageId, x, y, imageWidth, imageHeight) => {
  const areas = TV_MOVE7_CLICKABLE_AREAS[imageId];
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

export const getTvMove7ClickableAreas = (imageId) => {
  return TV_MOVE7_CLICKABLE_AREAS[imageId] || [];
};

export const isPointInTvMove8Area = (imageId, x, y, imageWidth, imageHeight) => {
  const areas = TV_MOVE8_CLICKABLE_AREAS[imageId];
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

export const getTvMove8ClickableAreas = (imageId) => {
  return TV_MOVE8_CLICKABLE_AREAS[imageId] || [];
}; 