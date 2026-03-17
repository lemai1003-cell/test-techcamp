# 🏗️ Kiến Trúc Hệ Thống

## Sơ Đồ Tổng Quan

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Browser)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  index.html + script.js + style.css                      │   │
│  │  - Google Sign-In                                        │   │
│  │  - 20 Câu Hỏi Trắc Nghiệm                               │   │
│  │  - Tính Điểm Tự Động                                    │   │
│  │  - Gửi Dữ Liệu                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓↑
                    (HTTP Requests/Responses)
                              ↓↑
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js + Express)                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  server.js                                               │   │
│  │  - POST /api/send-zalo-notification                      │   │
│  │  - POST /api/send-admin-notification                     │   │
│  │  - GET /health                                           │   │
│  │  - Serve static files                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         ↓                                    ↓
    (Firebase)                          (Zalo API)
         ↓                                    ↓
┌──────────────────────┐        ┌──────────────────────┐
│  Firebase Realtime   │        │   Zalo Official      │
│  Database            │        │   Account (OA)       │
│  - quiz_results      │        │   - Send Messages    │
│  - Lưu đáp án        │        │   - Notifications    │
│  - Lưu điểm số       │        │   - User Management  │
└──────────────────────┘        └──────────────────────┘
         ↓                                    ↓
    (Cloud)                            (Zalo Server)
         ↓                                    ↓
    [Dữ liệu]                          [Thông báo]
                                             ↓
                                    ┌──────────────────┐
                                    │  User's Zalo     │
                                    │  Receives        │
                                    │  Notification    │
                                    └──────────────────┘
```

---

## Luồng Dữ Liệu Chi Tiết

### 1. Người Dùng Hoàn Thành Test

```
┌─────────────────────────────────────────────────────────────┐
│ User nhấn "Gửi đáp án"                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ script.js tính điểm                                         │
│ - So sánh đáp án với đáp án đúng                            │
│ - Tính tổng điểm                                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Chuẩn bị dữ liệu:                                           │
│ {                                                           │
│   email: "user@example.com",                                │
│   score: "18/20",                                           │
│   timestamp: "2024-01-15T10:30:00.000Z",                    │
│   answers: { question_1: "A", ... }                         │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
```

### 2. Lưu Firebase (Ngầm)

```
┌─────────────────────────────────────────────────────────────┐
│ script.js gọi Firebase push()                               │
│ - Lưu dữ liệu vào quiz_results                              │
│ - Không chặn UI (async)                                     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Firebase Realtime Database                                  │
│ quiz_results/                                               │
│ ├── -auto_id_1/                                             │
│ │   ├── email: "user@example.com"                           │
│ │   ├── score: "18/20"                                      │
│ │   ├── timestamp: "2024-01-15T10:30:00.000Z"               │
│ │   └── answers: {...}                                      │
│ └── -auto_id_2/                                             │
│     └── ...                                                 │
└─────────────────────────────────────────────────────────────┘
```

### 3. Gửi Thông Báo Zalo

```
┌─────────────────────────────────────────────────────────────┐
│ script.js gọi sendZaloNotification()                        │
│ - Gửi POST request đến /api/send-zalo-notification          │
│ - Dữ liệu: email, score, timestamp, totalQuestions          │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ server.js nhận request                                      │
│ - Validate dữ liệu                                          │
│ - Kiểm tra Access Token                                     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ server.js gọi Zalo API                                      │
│ POST https://openapi.zalo.me/v2.0/oa/message/cs/send        │
│ Headers: access_token, Content-Type                         │
│ Body: recipient, message                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Zalo Server xử lý                                           │
│ - Xác thực OA                                               │
│ - Gửi thông báo đến user                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ User nhận thông báo trên Zalo                               │
│ 🎉 Chúc mừng! Bạn đã hoàn thành bài test.                   │
│ 📊 Kết quả: 18/20                                           │
│ ⏰ Thời gian: 15/01/2024 10:30:00                            │
└─────────────────────────────────────────────────────────────┘
```

### 4. Hiển Thị Kết Quả

```
┌─────────────────────────────────────────────────────────────┐
│ script.js hiển thị màn hình thành công                      │
│ - Ẩn form quiz                                              │
│ - Hiển thị điểm số                                          │
│ - Nút "Làm lại"                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Cấu Trúc Thư Mục

```
Vibe-coding-online2/
│
├── 📄 Frontend Files
│   ├── index.html              # Trang chính
│   ├── script.js               # Logic chính (+ Zalo integration)
│   ├── style.css               # Styling
│   └── test-firebase.mjs       # Test Firebase
│
├── 🖥️ Backend Files
│   ├── server.js               # Express server
│   ├── zalo-notification.js    # Hàm gửi Zalo
│   └── test-zalo.js            # Test Zalo
│
├── ⚙️ Configuration
│   ├── package.json            # Dependencies
│   ├── .env.example            # Template .env
│   └── .env                    # (Tạo từ .env.example)
│
├── 📚 Documentation
│   ├── README.md               # Tài liệu chính
│   ├── QUICK_START.md          # Bắt đầu nhanh
│   ├── ZALO_SETUP.md           # Hướng dẫn Zalo
│   ├── ARCHITECTURE.md         # File này
│   └── INTEGRATION_SUMMARY.md  # Tóm tắt
│
├── 🔒 Security
│   ├── .gitignore              # Bảo vệ file nhạy cảm
│   └── node_modules/           # (Tạo sau npm install)
│
└── 📦 Git
    └── .git/                   # Repository
```

---

## Các Thành Phần Chính

### Frontend (Client-Side)

```javascript
// index.html + script.js
1. Google Sign-In
   └─ Xác thực người dùng

2. Quiz Form
   ├─ 20 câu hỏi
   ├─ Radio buttons
   └─ Submit button

3. Result Display
   ├─ Điểm số
   ├─ Thời gian
   └─ Nút làm lại

4. Zalo Integration
   └─ Gọi API /api/send-zalo-notification
```

### Backend (Server-Side)

```javascript
// server.js
1. Express Server
   ├─ CORS enabled
   ├─ JSON parser
   └─ Static file serving

2. API Endpoints
   ├─ POST /api/send-zalo-notification
   ├─ POST /api/send-admin-notification
   ├─ GET /health
   └─ GET / (serve index.html)

3. Zalo Integration
   └─ Axios HTTP client
      └─ Call Zalo API
```

### External Services

```
1. Firebase Realtime Database
   ├─ Store quiz results
   ├─ Store user answers
   └─ Store scores

2. Zalo Official Account
   ├─ Send notifications
   ├─ Manage users
   └─ Track messages

3. Google OAuth
   ├─ User authentication
   ├─ Get user info
   └─ Verify credentials
```

---

## Sequence Diagram

```
User          Frontend        Backend         Firebase        Zalo
 │               │               │               │              │
 ├─ Trả lời ────→│               │               │              │
 │               │               │               │              │
 ├─ Nhấn gửi ───→│               │               │              │
 │               │               │               │              │
 │               ├─ Tính điểm ───│               │              │
 │               │               │               │              │
 │               ├─ Chuẩn bị dữ liệu             │              │
 │               │               │               │              │
 │               ├─ Push Firebase ──────────────→│              │
 │               │               │               │              │
 │               ├─ Gọi API ────→│               │              │
 │               │               │               │              │
 │               │               ├─ Gọi Zalo ──────────────────→│
 │               │               │               │              │
 │               │               │               │    Gửi thông báo
 │               │               │               │              │
 │               │               │    Response ←──────────────┤
 │               │               │←──────────────┤              │
 │               │←──────────────┤               │              │
 │               │               │               │              │
 │←─ Hiển thị ───┤               │               │              │
 │  kết quả      │               │               │              │
 │               │               │               │              │
 ├─ Nhận thông báo Zalo ─────────────────────────────────────→│
 │               │               │               │              │
```

---

## Bảo Mật

```
┌─────────────────────────────────────────────────────────────┐
│ Security Layers                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. Frontend                                                 │
│    ├─ Google OAuth (xác thực)                              │
│    └─ HTTPS (nếu production)                               │
│                                                             │
│ 2. Backend                                                  │
│    ├─ CORS (kiểm tra origin)                               │
│    ├─ Input validation                                     │
│    └─ Error handling                                       │
│                                                             │
│ 3. Environment                                              │
│    ├─ .env file (không commit)                             │
│    ├─ Access Token bảo vệ                                  │
│    └─ .gitignore                                           │
│                                                             │
│ 4. External Services                                        │
│    ├─ Firebase Rules                                       │
│    ├─ Zalo API Authentication                              │
│    └─ Google OAuth Verification                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Performance

```
┌─────────────────────────────────────────────────────────────┐
│ Optimization Strategies                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. UI Optimistic                                            │
│    └─ Hiển thị kết quả ngay, không chờ server              │
│                                                             │
│ 2. Async Operations                                         │
│    ├─ Firebase push (ngầm)                                 │
│    └─ Zalo notification (ngầm)                             │
│                                                             │
│ 3. Caching                                                  │
│    └─ Static files (CSS, JS)                               │
│                                                             │
│ 4. CDN                                                      │
│    ├─ Firebase SDK (từ CDN)                                │
│    ├─ Google Identity (từ CDN)                             │
│    └─ Google Fonts (từ CDN)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Scalability

```
┌─────────────────────────────────────────────────────────────┐
│ Có thể mở rộng bằng:                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. Horizontal Scaling                                       │
│    └─ Chạy nhiều instance server                           │
│                                                             │
│ 2. Load Balancing                                           │
│    └─ Phân phối traffic                                    │
│                                                             │
│ 3. Caching Layer                                            │
│    └─ Redis, Memcached                                     │
│                                                             │
│ 4. Database Optimization                                    │
│    └─ Firebase Realtime DB (auto-scale)                    │
│                                                             │
│ 5. Message Queue                                            │
│    └─ Xử lý Zalo notifications async                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Monitoring & Logging

```
┌─────────────────────────────────────────────────────────────┐
│ Có thể thêm:                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. Server Logs                                              │
│    ├─ Request/Response logs                                │
│    ├─ Error logs                                           │
│    └─ Performance metrics                                  │
│                                                             │
│ 2. Analytics                                                │
│    ├─ Số lượng test hoàn thành                             │
│    ├─ Điểm số trung bình                                   │
│    └─ Thời gian hoàn thành                                 │
│                                                             │
│ 3. Monitoring Tools                                         │
│    ├─ Sentry (error tracking)                              │
│    ├─ DataDog (monitoring)                                 │
│    └─ New Relic (APM)                                      │
│                                                             │
│ 4. Alerting                                                 │
│    ├─ Server down                                          │
│    ├─ High error rate                                      │
│    └─ Zalo API failures                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**Kiến trúc này đảm bảo:**
- ✅ Tính ổn định
- ✅ Bảo mật
- ✅ Hiệu suất
- ✅ Khả năng mở rộng
- ✅ Dễ bảo trì
