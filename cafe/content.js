// 운영 정보 수정은 이 파일에서 합니다. 공개 전 확인 항목은 README.md를 참조하세요.
// index.html에도 같은 정보가 정적으로 들어 있으므로(JavaScript가 꺼진 경우 대비), 바꿀 때는 함께 맞춰 주세요.
window.CAFE = {
  brandName: '구선생커피',
  address: '경기 광주시 머루숯길 61',
  phone: '031-782-7878',
  businessHours: '화요일–일요일 07:00–23:00',
  openTime: '07:00', closeTime: '23:00',
  weeklyClosedDay: '월요일',
  closedWeekdays: [1], // 0=일, 1=월 … 6=토
  parkingCapacity: 6,
  groupCapacity: 20,
  minimumOrder: '1인 1메뉴',
  headline: ['마주 앉으면 반갑고,', '머물수록 정다운 곳.'],

  // 카카오톡: 채널 개설 후 URL(https://pf.kakao.com/... 또는 https://qr.kakao.com/...)을 넣고 kakaoEnabled를 true로.
  kakaoChannelName: '구선생카페',
  kakaoChannelUrl: null,
  kakaoEnabled: false,

  heroImage: 'assets/hero.jpg',
  heroDisclosure: '분위기 연출 이미지 · 실제 매장과 다를 수 있습니다',

  // price: 디저트 단일 가격 / hotPrice·icePrice: 음료. null이면 '가격 문의'로 표시됩니다.
  // image가 null이면 '사진 준비 중' 그림이 표시됩니다. imageDisclosure는 사진 위 라벨입니다(실제 사진이면 null).
  menus: [
    { name: '아메리카노', hotPrice: 2801, icePrice: 2801, category: 'coffee', desc: '부드러운 맛과 은은한 산미', image: 'assets/americano.jpg', imageDisclosure: '메뉴 연출 이미지' },
    { name: '카페라떼', hotPrice: 3301, icePrice: 3301, category: 'coffee', desc: '우유와 어우러진 고소한 한 잔', image: 'assets/latte.jpg', imageDisclosure: '메뉴 연출 이미지' },
    { name: '바닐라라떼', hotPrice: 3801, icePrice: 3801, category: 'coffee', desc: '달콤한 바닐라 향의 라떼', image: 'assets/vanilla.jpg', imageDisclosure: '메뉴 연출 이미지' },
    // 녹차라떼 사진: Unsplash 무료 라이선스, Alana Harris 촬영 (unsplash.com/photos/C63YZ33DdvY). 실제 매장 메뉴 사진 아님.
    { name: '녹차라떼', hotPrice: 3900, icePrice: 3900, category: 'drink', desc: '쌉싸름한 녹차와 우유의 조화', image: 'assets/greentea.jpg', imageDisclosure: '메뉴 연출 이미지', alt: '라떼아트를 올린 녹차라떼 메뉴 연출 이미지' },
    { name: '치즈케이크', price: 5000, category: 'dessert', desc: '커피 곁에 두기 좋은 한 조각', image: 'assets/cheesecake.jpg', imageDisclosure: '메뉴 연출 이미지' },
    { name: '단팥빵', price: 2500, category: 'dessert', desc: '달콤한 단팥이 든 빵', image: 'assets/redbean.jpg', imageDisclosure: '메뉴 연출 이미지' },
    // 티라미수 사진: Unsplash 무료 라이선스, Aleksandra Tanasiienko 촬영 (unsplash.com/photos/xPBUzVMKKTw). 실제 매장 메뉴 사진 아님.
    { name: '티라미수', price: 5500, category: 'dessert', desc: '코코아 향이 은은한 한 조각', image: 'assets/tiramisu.jpg', imageDisclosure: '메뉴 연출 이미지' }
  ]
};
