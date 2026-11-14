(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const c = window.CAFE;

  /* ---------- 1. 설정 데이터 반영 ---------- */
  if (c) {
    const setText = (sel, v) => { if (v != null) $$(sel).forEach(el => { el.textContent = v; }); };
    setText('[data-address]', c.address);
    setText('[data-hours]', c.businessHours);
    setText('[data-closed]', c.weeklyClosedDay);
    setText('[data-group]', c.groupCapacity);
    setText('[data-parking]', c.parkingCapacity);
    setText('[data-min-order]', c.minimumOrder);
    setText('[data-phone-text]', c.phone);
    setText('[data-hero-disclosure]', c.heroDisclosure);
    if (c.headline) { setText('[data-headline-1]', c.headline[0]); setText('[data-headline-2]', c.headline[1]); }

    const tel = 'tel:' + String(c.phone).replace(/\D/g, '');
    $$('[data-phone]').forEach(a => { a.href = tel; });

    const q = encodeURIComponent(c.address);
    $$('.map-link[data-map="naver"]').forEach(a => { a.href = 'https://map.naver.com/p/search/' + q; });
    $$('.map-link[data-map="kakao"]').forEach(a => { a.href = 'https://map.kakao.com/?q=' + q; });

    if (c.heroImage) { const h = $('.hero-frame img'); if (h && h.getAttribute('src') !== c.heroImage) h.src = c.heroImage; }

    if (Array.isArray(c.menus)) renderMenus(c.menus);

    // 카카오톡: 실제 채널 URL과 활성화 설정이 모두 있을 때만 링크 생성
    if (c.kakaoEnabled && typeof c.kakaoChannelUrl === 'string' && /^https:\/\/(pf|qr)\.kakao\.com\//.test(c.kakaoChannelUrl)) {
      const a = document.createElement('a');
      a.href = c.kakaoChannelUrl; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = `카카오톡 ‘${c.kakaoChannelName}’로 문의하기 (새 창)`;
      const k = $('#kakao'); k.replaceChildren(k.querySelector('svg') || '', a);
    }
  }

  function won(n) { return typeof n === 'number' ? n.toLocaleString('ko-KR') + '원' : null; }

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function renderMenus(menus) {
    const groups = { coffee: $('#menu-coffee'), drink: $('#menu-coffee'), dessert: $('#menu-dessert') };
    const placeholder = $('#menu-dessert .photo-placeholder');
    const placeholderHTML = placeholder ? placeholder.outerHTML : '<div class="photo-placeholder"><span>사진 준비 중</span></div>';
    Object.values(groups).forEach(g => g && g.replaceChildren());

    menus.forEach(m => {
      const grid = groups[m.category] || groups.dessert;
      if (!grid) return;
      const card = el('article', 'menu-card');
      const fig = el('figure', 'menu-photo');
      if (m.image) {
        const img = new Image(640, 640);
        img.src = m.image; img.loading = 'lazy'; img.decoding = 'async';
        img.alt = m.alt ? m.alt : m.hotPrice != null ? `따뜻한 ${m.name}와 아이스 ${m.name}${m.imageDisclosure ? ' ' + m.imageDisclosure : ' 사진'}` : `${m.name}${m.imageDisclosure ? ' ' + m.imageDisclosure : ' 사진'}`;
        fig.append(img);
        if (m.imageDisclosure) fig.append(el('span', 'img-tag', m.imageDisclosure));
      } else {
        fig.classList.add('is-empty');
        fig.insertAdjacentHTML('beforeend', placeholderHTML);
      }

      const info = el('div', 'menu-info');
      const row = el('div', 'menu-row');
      const isDrink = m.hotPrice != null || m.icePrice != null;
      const amount = isDrink ? (m.hotPrice ?? m.icePrice) : m.price;
      const priceText = won(amount);
      const price = el('p', 'price' + (priceText ? '' : ' ask'), priceText || '가격 문의');
      row.append(el('h4', null, m.name), price);
      info.append(row);
      if (m.desc) info.append(el('p', 'desc', m.desc));

      if (isDrink) {
        const temp = el('p', 'temp');
        if (m.hotPrice != null && m.icePrice != null && m.hotPrice !== m.icePrice) {
          temp.append(el('span', 't-hot', 'HOT'), won(m.hotPrice) + ' ', el('span', 't-ice', 'ICE'), won(m.icePrice));
          price.textContent = won(Math.min(m.hotPrice, m.icePrice)) + '~';
        } else {
          temp.append(el('span', 't-hot', 'HOT'), el('span', 't-ice', 'ICE'), '동일 가격');
        }
        info.append(temp);
      }
      card.append(fig, info);
      grid.append(card);
    });
  }

  /* ---------- 2. 이미지 실패 시 대체 ---------- */
  function onImgError(img) {
    const box = img.closest('figure') || img.parentElement;
    img.hidden = true;
    if (box.querySelector('.image-fallback')) return;
    const p = el('p', 'photo-placeholder image-fallback', (img.alt || '이미지') + ' — 이미지를 불러오지 못했습니다');
    p.style.height = '100%'; p.style.padding = '16px'; p.style.textAlign = 'center';
    box.append(p);
  }
  $$('img').forEach(img => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) onImgError(img);
    else img.addEventListener('error', () => onImgError(img), { once: true });
  });

  /* ---------- 3. 내비게이션 ---------- */
  const toggle = $('.nav-toggle');
  const nav = $('#navigation');
  const setNav = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    nav.classList.toggle('open', open);
  };
  toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); toggle.focus(); } });
  document.addEventListener('click', e => { if (nav.classList.contains('open') && !e.target.closest('.header')) setNav(false); });

  const header = $('.header');
  const mobileBar = $('.mobile-bar');
  const hero = $('.hero');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    if (mobileBar && hero) mobileBar.classList.toggle('show', y > hero.offsetHeight * 0.55);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 현재 보고 있는 섹션을 메뉴에 표시
  if ('IntersectionObserver' in window) {
    const links = new Map($$('.nav a[href^="#"]').map(a => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
        const a = links.get(en.target.id);
        if (a) { a.classList.add('active'); a.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- 4. 주소 복사 ---------- */
  const copyBtn = $('#copy-address');
  const status = $('#copy-status');
  const address = c ? c.address : $('[data-address]').textContent.trim();
  copyBtn.addEventListener('click', async () => {
    status.replaceChildren();
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(address);
      status.textContent = '주소를 복사했습니다.';
      copyBtn.textContent = '복사됨 ✓';
      setTimeout(() => { copyBtn.textContent = '주소 복사'; }, 2200);
    } catch {
      status.append('자동 복사가 되지 않았습니다. 아래 주소를 길게 누르거나 선택해 복사해 주세요.');
      const input = document.createElement('input');
      input.readOnly = true; input.value = address; input.setAttribute('aria-label', '복사할 매장 주소');
      status.append(input); input.focus(); input.select();
    }
  });

  /* ---------- 4-1. 전화 문의 → 번호 안내창 ----------
     모든 기기에서 전화 링크를 누르면 번호를 크게 보여 주는 안내창을 먼저 띄웁니다.
     실제 전화는 안내창의 '전화 걸기' 버튼으로 겁니다. (JavaScript가 꺼져 있으면 바로 전화 연결) */
  const phoneDialog = $('#phone-dialog');
  if (phoneDialog && typeof phoneDialog.showModal === 'function') {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-phone]');
      if (!a || phoneDialog.contains(a) || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      setNav(false);
      $('#pd-status').textContent = '';
      // 버튼별 제목·안내 문구 (예: 단체모임 문의)
      $('#phone-dialog-title').textContent = a.dataset.phoneLabel || '구선생커피 전화 문의';
      const note = $('#pd-note');
      note.textContent = a.dataset.phoneNote || '';
      note.hidden = !a.dataset.phoneNote;
      phoneDialog.showModal();
      $('#pd-copy').focus();
    });
    phoneDialog.addEventListener('click', e => { if (e.target === phoneDialog) phoneDialog.close(); }); // 바깥 영역 클릭 시 닫기
    $('#pd-copy').addEventListener('click', async () => {
      const s = $('#pd-status');
      const num = c ? c.phone : '031-782-7878';
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error();
        await navigator.clipboard.writeText(num);
        s.textContent = '전화번호를 복사했습니다.';
      } catch {
        s.textContent = '자동 복사가 되지 않았습니다. 위 번호를 선택해 복사해 주세요.';
        const r = document.createRange(); r.selectNodeContents($('.pd-number a'));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      }
    });
  }

  /* ---------- 5. 영업 상태 (한국 시간 기준) ---------- */
  try {
    if (c && c.openTime && c.closeTime) {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      const get = t => parts.find(p => p.type === t).value;
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      const now = +get('hour') * 60 + +get('minute');
      const toMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
      const open = toMin(c.openTime), close = toMin(c.closeTime);
      const closedDays = c.closedWeekdays || [];
      const names = ['일', '월', '화', '수', '목', '금', '토'];
      const nextOpenDay = from => { for (let i = 1; i <= 7; i++) { const d = (from + i) % 7; if (!closedDays.includes(d)) return i === 1 ? '내일' : names[d] + '요일'; } return ''; };

      let text, isOpen = false;
      if (closedDays.includes(day)) text = `오늘은 정기휴무 · ${nextOpenDay(day)} ${c.openTime} 오픈`;
      else if (now < open) text = `오픈 준비 중 · 오늘 ${c.openTime} 오픈`;
      else if (now < close) { text = `지금 영업 중 · ${c.closeTime}까지`; isOpen = true; }
      else text = `영업 종료 · ${nextOpenDay(day)} ${c.openTime} 오픈`;

      const pill = $('#open-status');
      pill.querySelector('.status-text').textContent = text;
      pill.classList.toggle('open', isOpen);
      pill.hidden = false;

      const week = $$('#week li'); // 월~일 순서
      const idx = (day + 6) % 7;
      if (week[idx]) { week[idx].classList.add('today'); week[idx].setAttribute('aria-current', 'date'); }
      week.forEach((li, i) => { const d = (i + 1) % 7; li.setAttribute('aria-label', names[d] + '요일 ' + (closedDays.includes(d) ? '휴무' : '영업')); });
    }
  } catch { /* 표시 실패 시 정적 시간표만 제공 */ }

  /* ---------- 6. 스크롤 등장 효과 ---------- */
  const reveals = $$('.reveal');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach(r => r.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const sibs = [...en.target.parentElement.children].filter(n => n.classList.contains('reveal'));
      const i = Math.max(0, sibs.indexOf(en.target));
      en.target.style.transitionDelay = Math.min(i, 4) * 90 + 'ms';
      en.target.classList.add('in');
      io.unobserve(en.target);
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(r => io.observe(r));
  }
  window.__cafeReady = true;
})();
