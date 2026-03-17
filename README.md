# 🎓 Vibe Coding Online - Nền Tảng Trắc Nghiệm Trực Tuyến

Ứng dụng trắc nghiệm trực tuyến chuyên nghiệp với tích hợp **thông báo Zalo** tự động khi người dùng hoàn thành bài test.

## ✨ Tính Năng

- ✅ **Google Sign-In** - Xác thực an toàn với Google
- ✅ **20 Câu Hỏi Banking** - Trắc nghiệm chuyên sâu
- ✅ **Tính Điểm Tự Động** - Kết quả ngay lập tức
- ✅ **Lưu Firebase** - Dữ liệu đồng bộ trên cloud
- ✅ **Thông Báo Zalo** - Gửi kết quả qua Zalo OA
- ✅ **Responsive Design** - Hoạt động trên mọi thiết bị
- ✅ **UI Optimistic** - Hiển thị kết quả ngay, không chờ

## 🚀 Bắt Đầu Nhanh

### 1. Cài Đặt
```bash
npm install
```

### 2. Cấu Hình Zalo
Tạo file `.env`:
```env
ZALO_ACCESS_TOKEN=your_token_here
ZALO_OA_ID=your_oa_id_here
PORT=3000
```

Xem chi tiết: [ZALO_SETUP.md](./ZALO_SETUP.md)

### 3. Chạy Server
```bash
npm run dev
```

### 4. Truy Cập
Mở trình duyệt: `http://localhost:3000`

## 📁 Cấu Trúc Dự Án

```
Vibe-coding-online2/
├── index.html                 # Trang chính
├── script.js                  # Logic chính (+ Zalo integration)
├── style.css                  # Styling
├── server.js                  # Backend server
├── zalo-notification.js       # Hàm gửi thông báo Zalo
├── package.json               # Dependencies
├── .env.example               # Template biến môi trường
├── .gitignore                 # Git ignore rules
├── ZALO_SETUP.md              # Hướng dẫn Zalo
├── README.md                  # File này
└── test-firebase.mjs          # Test Firebase connection
```

## 🔧 Công Nghệ Sử Dụng

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling (Glassmorphism design)
- **JavaScript ES6** - Logic
- **Firebase SDK** - Realtime Database
- **Google Identity Services** - OAuth

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Axios** - HTTP client
- **Zalo API** - Thông báo

## 📊 Luồng Dữ Liệu

```
User trả lời test
    ↓
Tính điểm tự động
    ↓
Lưu Firebase (ngầm)
    ↓
Gửi thông báo Zalo
    ↓
Hiển thị kết quả
```

## 🔐 Bảo Mật

- ✅ Không lưu mật khẩu
- ✅ Sử dụng OAuth Google
- ✅ Access Token được bảo vệ trong `.env`
- ✅ CORS được cấu hình
- ✅ Validate dữ liệu trên server

## 📱 Thông Báo Zalo

Khi người dùng hoàn thành test, họ sẽ nhận được thông báo:

```
🎉 Chúc mừng! Bạn đã hoàn thành bài test.

📊 Kết quả: 18/20
⏰ Thời gian: 15/01/2024 10:30:00
```

## 🧪 Testing

### Test Thông Báo Zalo
```bash
curl -X POST http://localhost:3000/api/send-zalo-notification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "score": "18/20",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "totalQuestions": 20
  }'
```

### Test Firebase
```bash
node test-firebase.mjs
```

## 📈 Triển Khai

### Heroku
```bash
heroku create your-app-name
heroku config:set ZALO_ACCESS_TOKEN=your_token
git push heroku main
```

### Railway / Render
Xem hướng dẫn chi tiết trong [ZALO_SETUP.md](./ZALO_SETUP.md)

## 🐛 Troubleshooting

| Vấn Đề | Giải Pháp |
|--------|----------|
| Không nhận thông báo Zalo | Kiểm tra Access Token, OA đã xác minh |
| CORS error | Cập nhật `FRONTEND_URL` trong `.env` |
| Firebase error | Kiểm tra kết nối internet, API key |
| Server không chạy | Kiểm tra port 3000 có bị chiếm không |

## 📞 Hỗ Trợ

Xem file [ZALO_SETUP.md](./ZALO_SETUP.md) để hướng dẫn chi tiết.

## 📄 License

MIT

---

**Phiên bản:** 1.0.0  
**Cập nhật lần cuối:** 2024-01-15  
**Tác giả:** Vibe Coding Team
