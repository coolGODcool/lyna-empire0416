import { Shop } from '../types';

export const MOCK_SHOPS: Shop[] = [
  {
    id: 'shop-1',
    name: 'Aurelia Spa',
    tagline: '帝國級身心療癒，重新定義奢華',
    description: 'Aurelia Spa 結合古希臘療神學與現代生物科技，為您提供最極致的放鬆體驗。在金碧輝煌的寧靜空間中，找回您遺失的元氣。',
    tags: ['按摩', 'SPA', '香氛', '放鬆', '奢華'],
    rating: 4.9,
    reviewCount: 2150,
    distance: '0.8 km',
    popularity: 1280,
    isOfficial: true,
    comments: [
      { id: 'c1', userName: '凱文', userAvatar: 'https://i.pravatar.cc/150?u=kevin', rating: 5, content: '環境真的太奢華了，服務也是一等一！', date: '2024-03-20' },
      { id: 'c2', userName: '艾莉絲', userAvatar: 'https://i.pravatar.cc/150?u=alice', rating: 4, content: '熱石按摩非常舒服，推薦給壓力大的人。', date: '2024-03-18' }
    ],
    videoUrl: '/videos/test1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?q=80&w=2070&auto=format&fit=crop',
    services: [
      {
        id: 's1-1',
        name: '皇家黑金熱石按摩',
        description: '採用喜瑪拉雅火山岩，溫熱深層經絡。',
        price: 3600,
        duration: 90,
        targetAudience: '高壓上班族、追求極致放鬆者'
      },
      {
        id: 's1-2',
        name: '奧瑞莉亞柔膚療程',
        description: '使用金箔精華液，讓肌膚煥發帝國光采。',
        price: 2800,
        duration: 60,
        targetAudience: '注重皮膚保養之女性。'
      }
    ],
    openingHours: [
      { day: '週一至週五', hours: '10:00 - 22:00' },
      { day: '週六、週日', hours: '09:00 - 23:00' }
    ],
    address: '台北市信義區帝國大道 88 號',
    transportation: '捷運象山站 1 號出口步行 5 分鐘',
    notices: ['請提前 15 分鐘到場', '如有皮膚過敏請事先告知', '預約取消需於 24 小時前提出'],
    faqs: [
      { question: '可以指定師傅嗎？', answer: '可以，預約時請在備註欄註明。' },
      { question: '有提供淋浴設施嗎？', answer: '有的，我們提供獨立淋浴間與高級洗沐用品。' }
    ]
  },
  {
    id: 'shop-2',
    name: 'Obsidian Barber',
    tagline: '黑曜石般的俐落，打造紳士風骨',
    description: 'Obsidian Barber 不只是理髮廳，更是男人的社交殿堂。專業極簡的技術，幫您形塑個人魅力。',
    tags: ['理容', '剪髮', '紳士', '熱門', '修容'],
    rating: 4.8,
    reviewCount: 980,
    distance: '1.2 km',
    popularity: 856,
    isOfficial: true,
    comments: [
      { id: 'c3', userName: '馬克', userAvatar: 'https://i.pravatar.cc/150?u=mark', rating: 5, content: '理髮師技術沒話說，熱烤修容必試！', date: '2024-03-15' }
    ],
    videoUrl: '/videos/test1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop',
    services: [
      {
        id: 's2-1',
        name: '經典紳士油頭剪裁',
        description: '專業理髮師打造最穩重的俐落風格。',
        price: 1200,
        duration: 45,
        targetAudience: '商務精英、追求質感男性'
      },
      {
        id: 's2-2',
        name: '黑曜石熱烤修容',
        description: '熱毛巾敷臉搭配傳統直式刮鬍刀，極致順滑。',
        price: 800,
        duration: 30,
        targetAudience: '重視面部整潔的紳士'
      }
    ],
    openingHours: [
      { day: '週二至週日', hours: '11:00 - 21:00' },
      { day: '週一', hours: '店休' }
    ],
    address: '台北市大安區光復南路 101 號',
    transportation: '捷運國父紀念館站 2 號出口步行 3 分鐘',
    notices: ['採預約制，不提供臨時現場候位', '理髮前請先與理髮師充分溝通'],
    faqs: [
      { question: '有提供燙髮服務嗎？', answer: '目前我們專注於剪裁與修容服務，暫無燙髮。' }
    ]
  },
  {
    id: 'shop-3',
    name: 'Midnight Brew',
    tagline: '在午夜的醇香中，沈迷於品味',
    description: 'Midnight Brew 是一家隱身於繁華巷弄的頂級咖啡館。我們精選全球莊園級豆種，只為懂生活的您沖上一杯。',
    tags: ['咖啡', '甜點', '宵夜', '氛圍', '靜謐'],
    rating: 4.7,
    reviewCount: 3200,
    distance: '0.5 km',
    popularity: 2100,
    isOfficial: false,
    comments: [
      { id: 'c4', userName: '露西', userAvatar: 'https://i.pravatar.cc/150?u=lucy', rating: 5, content: '拿鐵的金箔真的很有質感，甜點也很好吃。', date: '2024-03-19' }
    ],
    videoUrl: '/videos/test1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop',
    services: [
      {
        id: 's3-1',
        name: '金箔拉花拿鐵',
        description: '招牌拿鐵搭配 24K 食用金箔裝飾。',
        price: 450,
        duration: 30,
        targetAudience: '咖啡愛好者、打卡達人'
      },
      {
        id: 's3-2',
        name: '主廚特製帝國千層層',
        description: '每層手工烘烤，口感綿密紮實。',
        price: 320,
        duration: 20,
        targetAudience: '甜點狂熱份子'
      }
    ],
    openingHours: [
      { day: '全週', hours: '14:00 - 02:00' }
    ],
    address: '台北市中山區中山北路二段 45 巷 7 號',
    transportation: '捷運中山站 4 號出口步行 8 分鐘',
    notices: ['每人低消一杯飲品', '周末客滿限時 90 分鐘'],
    faqs: [
      { question: '有提供無線網路嗎？', answer: '有的，密碼為 midnight888。' },
      { question: '可以攜帶寵物嗎？', answer: '咖啡廳內需將寵物放置於籠內，室外座位區不限。' }
    ]
  }
];
