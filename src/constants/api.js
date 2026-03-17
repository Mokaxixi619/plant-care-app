// API 配置
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  IDENTIFY: '/identify',
  CHAT: '/chat',
};

// MiniMax API（前端直接调用）
export const MINIMAX_CONFIG = {
  API_KEY: 'sk-api-JTXDOFxXQIrcd5b6ceTZ4HLHGWYGUvMqs5zrLuM0JqmdhjR5njwEKFHUDuACQ76AL9WTdGgAd0vRr20a0X5LPcbfpMVyVCTjDdOud5cu_q3UOJfH-AVPiQ0',
  URL: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
  MODEL: 'abab6.5s-chat',
};

// 模拟识别结果（兜底）
export const DEMO_PLANTS = [
  {
    name: '绿萝',
    scientific: 'Epipremnum aureum',
    confidence: 0.95,
    care: {
      water: '每周1-2次，保持土壤湿润',
      light: '喜阴，避免直射阳光',
      temp: '15-30°C',
      humidity: '60%以上',
      soil: '疏松透气',
      tips: ['黄叶多因过度浇水', '可水培', '净化空气']
    }
  },
  {
    name: '吊兰',
    scientific: 'Chlorophytum comosum', 
    confidence: 0.92,
    care: {
      water: '每周1次，见干见湿',
      light: '散光或半阴',
      temp: '15-25°C',
      humidity: '50-60%',
      soil: '腐叶土',
      tips: ['吸收甲醛', '耐旱', '易繁殖']
    }
  },
  {
    name: '多肉植物',
    scientific: 'Echeveria',
    confidence: 0.89,
    care: {
      water: '每10-15天1次',
      light: '充足阳光',
      temp: '15-25°C',
      humidity: '40%',
      soil: '颗粒土',
      tips: ['宁干勿湿', '需要光照', '夏季休眠']
    }
  },
  {
    name: '君子兰',
    scientific: 'Clivia miniata',
    confidence: 0.87,
    care: {
      water: '每周1-2次',
      light: '散光',
      temp: '15-25°C',
      humidity: '60%',
      soil: '腐叶土',
      tips: ['开花需要温差', '夏季休眠', '每年换盆']
    }
  },
  {
    name: '虎皮兰',
    scientific: 'Sansevieria trifasciata',
    confidence: 0.85,
    care: {
      water: '每2周1次',
      light: '适应强光或阴暗',
      temp: '15-30°C',
      humidity: '40%',
      soil: '沙质土',
      tips: ['耐旱', '净化空气', '易养护']
    }
  }
];
