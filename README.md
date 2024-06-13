# Account Book Team E1

이 프로젝트는 가계부 거래를 관리하는 Vue.js 애플리케이션입니다.

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
vue-router, pinia, bootstrap, axios

### 5. 개발 서버 실행
```
npm run dev
```

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