# ⚡ Hướng Dẫn Nhanh - Tích Hợp Zalo

## 5 Bước Để Bắt Đầu

### 1️⃣ Tạo Zalo OA (5 phút)
- Truy cập: https://oa.zalo.me
- Tạo OA mới → Xác minh tài khoản
- Lấy **Access Token** từ Settings → API & Webhooks
- Lấy **OA ID**

### 2️⃣ Cấu Hình (2 phút)
Tạo file `.env` trong thư mục `Vibe-coding-online2/`:

```env
ZALO_ACCESS_TOKEN=paste_token_here
ZALO_OA_ID=paste_oa_id_here
PORT=3000
```

### 3️⃣ Cài Đặt Dependencies (3 phút)
```bash
cd Vibe-coding-online2
npm install
```

### 4️⃣ Chạy Server (1 phút)
```bash
npm run dev
```

Bạn sẽ thấy:
```
🚀 Server running on http://localhost:3000
📱 Zalo notifications enabled: ✅
```

### 5️⃣ Test (2 phút)
1. Mở: http://localhost:3000
2. Đăng nhập Google
3. Trả lời bài test
4. Nhấn "Gửi đáp án"
5. Kiểm tra Zalo OA để xem thông báo ✅

---

## 📋 Danh Sách File Mới

Các file đã được tạo/cập nhật:

| File | Mô Tả |
|------|-------|
| `server.js` | Backend server (gửi thông báo Zalo) |
| `zalo-notification.js` | Hàm gửi thông báo |
| `script.js` | Cập nhật để gọi API Zalo |
| `package.json` | Cập nhật dependencies |
| `.env.example` | Template biến môi trường |
| `.gitignore` | Bảo vệ file nhạy cảm |
| `ZALO_SETUP.md` | Hướng dẫn chi tiết |
| `README.md` | Tài liệu dự án |
| `QUICK_START.md` | File này |

---

## 🔍 Kiểm Tra Nhanh

### Health Check
```bash
curl http://localhost:3000/health
```

Kết quả mong đợi:
```json
{"status":"OK","timestamp":"..."}
```

### Test Thông Báo
```bash
curl -X POST http://localhost:3000/api/send-zalo-notification \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","score":"18/20","timestamp":"2024-01-15T10:30:00.000Z","totalQuestions":20}'
```

---

## ⚠️ Lưu Ý Quan Trọng

1. **Không commit `.env`** - Đã thêm vào `.gitignore`
2. **Người dùng phải follow OA** - Mới nhận được thông báo
3. **Access Token có hạn** - Kiểm tra định kỳ
4. **Chạy server trước** - Rồi mới mở frontend

---

## 🆘 Gặp Vấn Đề?

| Lỗi | Giải Pháp |
|-----|----------|
| `Cannot find module 'express'` | Chạy `npm install` |
| `ZALO_ACCESS_TOKEN chưa được cấu hình` | Kiểm tra file `.env` |
| Không nhận thông báo | OA đã xác minh? Người dùng follow OA? |
| CORS error | Kiểm tra `FRONTEND_URL` trong `.env` |

Xem chi tiết: [ZALO_SETUP.md](./ZALO_SETUP.md)

---

## 📞 Tiếp Theo

- ✅ Chạy thành công? → Triển khai lên production
- ❓ Cần tùy chỉnh? → Xem [ZALO_SETUP.md](./ZALO_SETUP.md)
- 🚀 Sẵn sàng deploy? → Xem phần "Triển Khai" trong README.md

---

**Chúc bạn thành công! 🎉**
