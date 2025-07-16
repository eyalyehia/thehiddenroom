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
    { x: 0.1, y: 0.17, width: 0.5, height: 0.6 }
  ],
  2: [
    { x: 0.70, y: 0.2, width: 0.15, height: 0.80 }
  ],
  3: [
    { x: -0.10, y: 0.15, width: 1.15, height: 0.5 }
  ],
  4: [
    { x: 0.60, y: 0.1, width: 0.40, height: 0.80 },
  ],
  5: [
    { x: 0, y: 0.35, width: 0.35, height: 0.35 }
  ],
  6: [
    { x: -0.25, y: -0.10, width: 1.30, height: 0.6 }
  ],
  7: [
    { x: 0, y: 0.4, width: 0.9, height: 0.25 }
  ],
  8: [
    { x: 0.05, y: 0.05, width: 0.9, height: 0.70 },
  ],
  9: [
    { x: 0, y: 0.15, width: 0.35, height: 0.7 }
  ],
  10: [
    { x: 0.05, y: 0.35, width: 0.95, height: 0.25 },
   
  ],
  11: [
    { x: 0.25, y: 0.25, width: 0.5, height: 0.5 }
  ],
  12: [
    { x: -0.2, y: 0.15, width: 0.50, height: 0.55 },
    
  ],
  13: [
    { x: 0.55, y: 0.1, width: 0.32, height: 0.8 }
  ],
  14: [
    { x: 0.50, y: 0.20, width: 0.55, height: 0.3 },
  ],
  15: [
    { x: 0.05, y: 0.2, width: 0.6, height: 0.6 }
  ]
};

export const POSTER_CLICKABLE_AREAS_PAGE1 = {
  1: [
    { x: 0.33, y: 0.4, width: 0.35, height: 0.22 }
  ],
  2: [
    { x: 0.45, y: 0.30, width: 0.30, height: 0.25 }
  ],
  3: [
    { x: 0.3, y: 0.10, width: 0.38, height: 0.15 }
  ],
  4: [
    { x: 0.38, y: 0, width: 0.3, height: 0.25 }
  ],
  5: [
    { x: 0.05, y: 0.6, width: 0.35, height: 0.25 }
  ],
  6: [
    { x: 0.3, y: 0.85, width: 0.4, height: 0.15 }
  ],
  7: [
    { x: 0.02, y: 0.6, width: 0.4, height: 0.2 }
  ],
  8: [
    { x: 0.25, y: 0.4, width: 0.5, height: 0.25 }
  ]
};

export const POSTER_CLICKABLE_AREAS_PAGE2 = {
  9: [
    { x: 0.50, y: 0.01, width: 0.5, height: 0.10 }
  ],
  10: [
    { x: 0.2, y: 0.1, width: 0.4, height: 0.35 }
  ],
  11: [
    { x: 0.70, y: 0.15, width: 0.25, height: 0.25 }
  ],
  12: [
    { x: 0.02, y: 0.6, width: 0.3, height: 0.2 }
  ],
  13: [
    { x: 0.62, y: 0.22, width: 0.3, height: 0.2 }
  ],
  14: [
    { x: 0.35, y: 0.58, width: 0.35, height: 0.12 }
  ],
  15: [
    { x: 0.35, y: 0.50, width: 0.32, height: 0.25 }
  ],
  16: [
    { x: 0, y: 0.39, width: 0.5, height: 0.20 }
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
      { x: 0.5, y: 0.2, width: 0.25, height: 0.50 }
    ],
    2: [
      { x: 0.45, y: 0.50, width: 0.55, height: 0.4 }
    ],
    3: [
      { x: 0.38, y: 0.50, width: 0.3, height: 0.60 }
    ],
    4: [
      { x: 0.40, y: 0.05, width: 0.35, height: 0.60 }
    ]
  },
  game2: {
    1: [
      { x: 0.15, y: 0.20, width: 0.45, height: 0.55 }
    ],
    2: [
      { x: 0.35, y: 0.05, width: 0.35, height: 0.55 }
    ],
    3: [
      { x: 0.29, y: 0.30, width: 0.45, height: 0.65 }
    ],
    4: [
      { x: 0.3, y: 0.3, width: 0.36, height: 0.6 }
    ]
  },
  game3: {
    1: [
      { x: 0.38, y: 0.1, width: 0.35, height: 0.55 }
    ],
    2: [
      { x: 0.25, y: 0.05, width: 0.4, height: 0.60 }
    ],
    3: [
      { x: 0.38, y: 0.6, width: 0.3, height: 0.4 }
    ],
    4: [
      { x: 0.1, y: 0.22, width: 0.35, height: 0.35 }
    ]
  },
  game4: {
    1: [
      { x: 0.45, y: 0.42, width: 0.25, height: 0.4 }
    ],
    2: [
      { x: 0.4, y: 0.15, width: 0.20, height: 0.65 }
    ],
    3: [
      { x: 0.05, y: 0.02, width: 0.15, height: 0.65 }
    ],
    4: [
      { x: 0.50, y: 0.35, width: 0.35, height: 0.65 }
    ]
  },
  game5: {
    1: [
      { x: 0.35, y: 0.25, width: 0.35, height: 0.4 }
    ],
    2: [
      { x: 0.4, y: 0.3, width: 0.3, height: 0.35 }
    ],
    3: [
      { x: 0.45, y: 0.25, width: 0.3, height: 0.4 }
    ],
    4: [
      { x: 0.35, y: 0.3, width: 0.35, height: 0.35 }
    ]
  },
  game6: {
    1: [
      { x: 0.35, y: 0.25, width: 0.35, height: 0.4 }
    ],
    2: [
      { x: 0.4, y: 0.3, width: 0.3, height: 0.35 }
    ],
    3: [
      { x: 0.45, y: 0.25, width: 0.3, height: 0.4 }
    ],
    4: [
      { x: 0.35, y: 0.3, width: 0.35, height: 0.35 }
    ]
  },
  game7: {
    1: [
      { x: 0.35, y: 0.25, width: 0.35, height: 0.4 }
    ],
    2: [
      { x: 0.4, y: 0.3, width: 0.3, height: 0.35 }
    ],
    3: [
      { x: 0.45, y: 0.25, width: 0.3, height: 0.4 }
    ],
    4: [
      { x: 0.35, y: 0.3, width: 0.35, height: 0.35 }
    ]
  },
  game8: {
    1: [
      { x: 0.35, y: 0.25, width: 0.35, height: 0.4 }
    ],
    2: [
      { x: 0.4, y: 0.3, width: 0.3, height: 0.35 }
    ],
    3: [
      { x: 0.45, y: 0.25, width: 0.3, height: 0.4 }
    ],
    4: [
      { x: 0.35, y: 0.3, width: 0.35, height: 0.35 }
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
    { x: 0.25, y: 0.15, width: 0.5, height: 0.6 }
  ],
  2: [
    { x: 0.3, y: 0.2, width: 0.4, height: 0.5 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.3, height: 0.6 }
  ],
  4: [
    { x: 0.35, y: 0.25, width: 0.35, height: 0.45 }
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
    { x: 0.35, y: 0.25, width: 0.213, height: 0.19 }
  ],
  2: [
    { x: 0.3, y: 0.2, width: 0.875, height: 0.336 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.358, height: 0.241 }
  ],
  4: [
    { x: 0.35, y: 0.25, width: 0.464, height: 0.327 }
  ]
};

export const TV_MOVE3_CLICKABLE_AREAS = {
  1: [
    { x: 0.35, y: 0.25, width: 0.282, height: 0.381 }
  ],
  2: [
    { x: 0.3, y: 0.2, width: 0.362, height: 1.045 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.394, height: 0.04 }
  ],
  4: [
    { x: 0.35, y: 0.25, width: 0.435, height: 0.418 }
  ]
};

export const TV_MOVE4_CLICKABLE_AREAS = {
  1: [
    { x: 0.35, y: 0.25, width: 0.183, height: 0.126 }
  ],
  2: [
    { x: 0.3, y: 0.2, width: 0.325, height: 0.459 }
  ],
  3: [
    { x: 0.4, y: 0.15, width: 0.244, height: 0.212 }
  ],
  4: [
    { x: 0.35, y: 0.25, width: 0.311, height: 0.356 }
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
    { x: 0.35, y: 0.25, width: 0.487, height: 0.486 }
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