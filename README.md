[![Build Status](https://travis-ci.org/hkroh-nonoll/calendar-app.svg?branch=master)](https://travis-ci.org/hkroh-nonoll/calendar-app)
[![Heroku](https://heroku-badge.herokuapp.com/?app=hkroh-calendar-app&style=flat)](https://hkroh-calendar-app.herokuapp.com)

# Calendar App
- 일정을 관리하는 Calendar 웹 어플리케이션 구현

* * *

## 1. 개발 전략
### 1.1. 구현 요건 판단
- 경험했던 프로젝트에서 fullCalendar, tui.calendar 로 구성하던 기능으로 판단

- 진행 목표
  - git issue / milestone / project 활용할 것
  - 레퍼런스 분석 > 구현 요건 개발 > Application 개발

### 1.2. 레퍼런스 분석
- [calendar-reference](https://github.com/hkroh-nonoll/calendar-reference)
- 기존 프로젝트간 사용해 봤던 것을 우선순위로 선정하여 분석
  - `fullCalendar > tui.calendar > vue-fullcallendar > react-big-calendar`

### 1.3. 프레임워크 선정
- 실무에서는 vue 로 주로 사용하였으나, [kakaopay](https://www.kakaopay.com/) 사이트가 react 로 구성된 것으로 확인
  - `react 진행 결정`
- 레퍼런스 분석 기간 동안, react 학습 병행

### 1.4. 일정 할당
- 일정내에 모든 구현은 어려울 것으로 예상
- 후순위 구현 요건 선정
  - 서버 구현, 데이터베이스 사용
    - `프레임워크 state 관리로 선대응 진행`
  - Drag n Drop 구현
- 구분(총 7일)
  - 2일(주말): 레퍼런스 분석, 개발환경(프레임워크) 선택, react 학습
  - 1일: 기본 베이스 구성( UI )
  - 2일(신정): 구현 요건 개발
  - 1일: 디버깅 및 소스 정리
  - 1일: 마무리 확인, 제출

### 1.5. 구현 단계
- 월 표현
  - 기간에 따라 주 변화폭( 높이 )이 생김
  - 주 단위 표현을 고려하면, 전월 / 다음월 일자도 노출이 되어야 함
    - `요일(7일) * 최대주(6) 를 기준으로 42개의 날짜 영역 구성`
- 주 표현
  - 월 표현과 동일한 맥락으로 접근
  - 월과 다른것은 세로(시간) 기준으로 정렬이 되어야 하는 점
    - `시간영역( 00:00 ~ 23:00 ) 구성, 요일(6) * 시간(24) 를 기준으로 144개의 시간 영역 구성`
- 시간 처리 class 구현
  - ExtsDate 구성
    - `js Date 를 확장한다는 의미로 Exts 를 Prefix 로 설정`
    - 월 / 주 표현을 위한 메소드 구현
      - `메소드는 static 으로 구현하여 활용성을 높이려 함`
* * *

## 2. 결과물

### 2.1. 폴더 구조
```bash
├── docs                                            #jsdoc
│
├── git-hooks                                       #git commit message 처리용
│
├── public                                          #public
│
├── src
│   ├── client                                      #client
│   │
│   ├── components                                  #components
│   │
│   ├── container                                   #container
│   │
│   ├── lib                                   
│   │   ├── contants                                #상수 정의
│   │   ├── extensions                              #js 내장기능 확장
│   │   ├── models                                  #component model
│   │   └── utils                                   #utils
│   │
│   ├── pages                                       #pages
│   │
│   ├── shared                                      #shared
│   │
│   ├── index.css 
│   ├── index.js
│   ├── serviceWorker.js
│   └── setupTest.js
│
├── .env
├── .gitignore
├── CHANGELOG.md
├── jsdoc.conf.json
├── LICENSE
├── package.json
├── README.md
└── yarn.lock
```
- 적절한 디렉토리 구조를 찾아보던 중 위 디렉토리 형태를 따름
  - `src/client, src/shared 는 ssr 까지 고려된 구조로 판단함`

* * *

### 2.2. model
- Back-end 데이터 조회 후 component 에 데이터를 주입하는 과정에서 데이터 파싱/정제 과정은 불가피 하다고 생각
- component
  - Back-end 데이터에 의해, props 등이 변경되지 않도록
    - `atomic design`
- model
  - Back-end response 받은 데이터는 component 에 바로 맵핑하지 않는다
  - model 을 통해 해당 component props 에 맞춰 정제되도록 하여 관리하는 것을 목표

### 2.3. JS Doc
- [https://hkroh-nonoll.github.io/calendar-app/](https://hkroh-nonoll.github.io/calendar-app/)

### 2.4. Heroku
- [https://hkroh-calendar-app.herokuapp.com/](https://hkroh-calendar-app.herokuapp.com/)

### 2.5. 실행 방법
- 기본 cra 로 프로젝트 환경 구성

- install
  ```bash
  $ yarn install
  ```
- 실행
  ```bash
  $ yarn run serve
  ```

- **npm run 정의**
  ```bash
  $ yarn run start             #heroku serve
  $ yarn run serve             #cra start 설정 동일
  $ yarn run build             #cra 설정 동일 + docs 실행
  $ yarn run test              #cra 설정 동일
  $ yarn run eject             #cra 설정 동일
  $ yarn run docs              #jsdoc 생성
  $ yarn run dev-env           #git-hooks 설정
  ```
* * *


## 3. 진행간 이슈 / 미비한 사항
### 진행간 이슈
- 학습단계에서의 useCallback
  - 하위 컴포넌트로 useCallback 선언 된것을 전달했을 때, 값이 제대로 갱신이 안되는 경우 확인
  - useCallback 선언시, 디펜던시가 되는 값을 제대로 설정하지 않았던 케이스
  - memoization 기능이 적용되어 있다고 판단되어, 적절한 사용은 좋다고 판단
  - 경우에 따라 난해한 상황이 발생할 수 있어서 신중한 사용이 필요해 보임

### 미비한 사항
- Drag n Drop 기능 미구현: [https://github.com/hkroh-nonoll/calendar-app/issues/15](https://github.com/hkroh-nonoll/calendar-app/issues/15)
- 서버 연동 없음
- store 미사용: useState 로만 처리
- ui component test 코드
