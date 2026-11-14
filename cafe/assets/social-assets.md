# 공유 이미지와 파비콘

- `carrot-cake-favicon.svg`: 작은 크기에 맞춘 당근케이크 이모지 스타일의 SVG 아이콘. 기존 매장 로고는 유지합니다.
- `og-carrot-cake.jpg`: 1200×630 공유 카드. 밝은 배경의 큰 한글 제목과 당근케이크 연출 이미지.
- 제작: 내장 image_gen. 당근케이크 참조 사진은 기존 `carrot.jpg`이며, 실제 판매 메뉴를 촬영한 사진이 아닙니다. 케이크 메뉴를 새로 추가하거나 판매 여부를 변경하지 않습니다.
- 도메인이 정해지면 `index.html`의 `og:image`와 `twitter:image`를 공개 HTTPS 절대 URL로 바꾸고 `og:url`·canonical을 지정하세요. 로컬 파일은 외부 공유 서비스가 수집할 수 없습니다.

## 이미지 생성 프롬프트

Use case: ads-marketing / compositing. Create a finished Korean cafe Open Graph sharing card, landscape ratio 1200:630 (1.905:1), intended to remain readable at tiny link preview sizes. Input image is a reference for carrot cake appearance only, not documented actual menu. Design: left 54% solid light ivory #F7F3E9, right 46% beautiful close photograph of a generous carrot cake slice with cream cheese frosting and a small carrot-shaped orange-and-green decoration, on ivory plate on light wood, natural daylight. Cake clearly visible. Left has generous 65px safe margins and extremely legible Korean typography, no overlap with photograph. Exact large bold dark green #345744 headline '구선생커피' (very large, approximately 84px at 1200px width). Beneath, in 2 lines, exact dark brown text '커피 한 잔,' then '정다운 시간.' (approximately 44px). Small bottom label '공간 · 커피 · 모임' (24px). Bottom right tiny but readable disclosure '메뉴 연출 이미지'. Minimal polished editorial cafe branding, no prices, no extra text, no address, no claims about carrot cake availability. Clear large typography, avoid decorative scripts, no watermark. Preserve composition ratio.

## 수정 버전
현재 공유 이미지: og-clover-cake.jpg (1200×630). 클로버 모양 초콜릿 장식과 부드러운 한글 엽서체로 수정. 내장 image_gen 사용, 편집 프롬프트는 og-clover-prompt.txt 참조.
