# 가계부 서비스

Kb IT's your life 5기 전공 E반 1조 스켈레톤 프로젝트

## Index
- [Member](#member)
- [실행 방법](#실행-방법)
- [Screen](#screen)
- [Architecture & Skills](#architecture--skills)
- [Main function](#main-function)
- [프로젝트 구조](#프로젝트-구조)
<br/>

### Member
| [유아영](https://github.com/DevYoung00) | [강상혁](https://github.com/SangHyeok-Kang) |[박제욱](https://github.com/terrydlek) | [이석진](https://github.com/javastudyreview)
| :---: | :---: | :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/93467085?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/104892909?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/103116277?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/140796676?v=4" width="150"/> | 
| Front-End | Front-End | Front-End | Front-End |

<br/>

## 실행 방법

### 1. Node.js 설치

[Node.js 공식 사이트](https://nodejs.org/)에서 다운로드할 수 있습니다.

### 2. 프로젝트 클론

프로젝트를 클론합니다:
```bash
git clone https://github.com/your-repo/account-book-teame1.git
cd account-book-teame1
```
### 3. 종속성 설치
```
npm install
```
### 4. 필수 설치 항목
vue-router, pinia, bootstrap, axios, 

### 5. 개발 서버 실행
```
npm run dev
```

### Screen 
| 거래 관리 |
| :---: |
| <img width="350" alt="거래 관리" src="https://github.com/DevYoung00/kb-ItsYourLife-accountBook-teamE1/assets/93467085/00bcedfa-a2a9-4cc9-b3c6-1044fef3e48c"> |

| 홈 화면 | 회원 통계 |
| :---: | :---: |
| <img width="350" alt="홈화면" src="https://github.com/DevYoung00/kb-ItsYourLife-accountBook-teamE1/assets/93467085/225f2b62-413d-438b-9857-9fea39ce7756"> | <img width="350" alt="통계" src="https://github.com/DevYoung00/kb-ItsYourLife-accountBook-teamE1/assets/93467085/a45835ae-8740-4132-81a0-b3e4f77b77ad"> |

| 로그인 회원가입 | 정보 수정 및 프로필 |
| :---: | :---: |
| <img width="350" alt="로그인" src="https://github.com/DevYoung00/kb-ItsYourLife-accountBook-teamE1/assets/93467085/b8c6d178-c0e9-4163-b9d1-d2567e2291f7"> | <img width="350" alt="프로필" src="https://github.com/DevYoung00/kb-ItsYourLife-accountBook-teamE1/assets/93467085/2546dd75-fb55-47ee-a4cc-4d8f5ad55554"> | 
<br/>

### Architecture & Skills
<img width="800" alt="아키텍쳐" src="https://github.com/DevYoung00/kb-ItsYourLife-accountBook-teamE1/assets/93467085/0befcaa9-7017-465c-881d-6d2f21049bb9">

### Main function
<img width="800" alt="기능" src="https://github.com/DevYoung00/kb-ItsYourLife-accountBook-teamE1/assets/93467085/e5ddea6e-0454-48dc-89ba-8d46bb45af53">


## 프로젝트 구조 
```bash
.
├── db-server
│   ├── transactions.json
│   └── users.json
├── public
│   └── vite.svg
├── src
│   ├── components
│   │   ├── Header.vue
│   │   ├── HomeCard.vue
│   │   ├── LoginForm.vue
│   │   ├── SignupForm.vue
│   │   ├── TransactionOne.vue
│   │   └── TranscationsForm.vue
│   ├── pages
│   │   ├── Home.vue
│   │   ├── Profile.vue
│   │   ├── Setting.vue
│   │   ├── TransactionList.vue
│   │   ├── TransactionsCreate.vue
│   │   ├── login.vue
│   │   └── signup.vue
│   ├── router
│   │   └── index.js
│   ├── stores
│   │   ├── TransactionsStore.js
│   │   ├── UserRegistration.js
│   │   └── UsersStore.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── README.md
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```
