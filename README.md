## 기술 스택

- Vue 3 (Composition API)
- TypeScript
- Vite
- SCSS, CSS
- Node.js v22.17.1
- Git / GitHub

## 프로젝트 실행 방법
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 폴더 구조
```
src/
├── api/              # API 통신 로직
├── assets/           # 이미지, 아이콘, 스타일
├── components/       
│   ├── product/     # 상품 관련 컴포넌트 (추가!)
│   ├── sections/    # 섹션 컴포넌트
│   └── ui/          # 공통 UI 컴포넌트
├── composables/     # 재사용 가능한 로직
├── types/           # TypeScript 타입 정의
└── views/           # 페이지 컴포넌트
```

### 컴포넌트 분리 기준

- ProductCard: 상품 단일 정보 표시 (이미지, 가격, 찜하기 등)
- ProductLayout: 재사용 가능한 그리드 레이아웃 (columns, gap 설정)
- ProductListSection: 상품 목록 섹션 래퍼 (스타일 관리)
- ShortcutSection: 카테고리 숏컷 가로 스크롤
- GiftSection: 선물 추천 섹션
- ReviewSection: 리뷰 슬라이드 
- AlertModal: 전역 알림 UI



### 동적 레이아웃 시스템

- 섹션 순서를 배열로 관리 (레이아웃 변경 시 최소 코드 수정)



### 무한 스크롤

- 스크롤 시 자동으로 다음 상품 로딩
- Intersection Observer로 화면 하단 감지 (scroll 이벤트보다 성능 우수)
- 페이지 단위 데이터 로딩으로 초기 로딩 속도 개선



### Alert 상태 관리

Alert는 전역 UI 요소로 분리하여 composable로 상태를 관리했으며,
UI는 기존 아이디어스 화면을 참고해 구현했습니다.



## 스타일링 전략

- SCSS를 사용하여 변수 및 중첩 구조 활용
- 컴포넌트 단위 scoped style 적용
- 전역 변수로 일관된 디자인 시스템 관리



## 과제 범위 및 의도

구조 설계와 확장 가능성에 초점을 맞춰
기획 변경, 섹션 추가/변경 등 실제 서비스 환경의
요구사항에 유연하게 대응 가능하도록 설계했습니다.