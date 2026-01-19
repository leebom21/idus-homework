## 기술 스택

- Vue 3 (Composition API)
- TypeScript
- Vite
- SCSS, CSS
- Node.js v22.17.1
- Git / GitHub


### 컴포넌트 분리 기준

- ProductCard: 상품 단일 정보 표시 
- ProductLayout: 상품 카드 레이아웃
- ProductListSection: 데이터 로딩 및 무한 스크롤 담당


### Alert 상태 관리

Alert는 전역 UI 요소로 분리하여 composable로 상태를 관리했으며,
UI는 기존 아이디어스 화면을 참고해 구현했습니다.


## 스타일링 전략
- SCSS를 사용하여 변수 및 중첩 구조 활용
- 컴포넌트 단위 scoped style 적용
- 색상, 간격, 폰트 크기는 전역 변수로 관리

UI 라이브러리 없이도 일관된 스타일을 유지하도록 설계했습니다.


## 과제 범위 및 의도

본 과제에서는 모든 기능의 완성도보다
구조 설계와 확장 가능성에 초점을 맞췄습니다.

실제 서비스 환경에서 발생할 수 있는
기획 변경, 섹션 위치 변경 및 추가, UI 확장을 고려하여
유연한 구조를 우선적으로 설계했습니다.