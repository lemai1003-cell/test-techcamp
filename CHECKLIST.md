# ✅ Danh Sách Kiểm Tra - Tích Hợp Zalo

## 📋 Chuẩn Bị

- [ ] Đã đọc file `QUICK_START.md`
- [ ] Đã hiểu kiến trúc (xem `ARCHITECTURE.md`)
- [ ] Có tài khoản Zalo
- [ ] Có Node.js cài đặt (v14+)

---

## 🔧 Bước 1: Tạo Zalo OA

- [ ] Truy cập https://oa.zalo.me
- [ ] Đăng nhập bằng tài khoản Zalo
- [ ] Tạo OA mới
- [ ] Xác minh tài khoản
- [ ] Vào Settings → API & Webhooks
- [ ] Lấy **Access Token** (lưu vào notepad)
- [ ] Lấy **OA ID** (lưu vào notepad)

---

## 📝 Bước 2: Cấu Hình

- [ ] Mở thư mục `Vibe-coding-online2`
- [ ] Tạo file `.env` (copy từ `.env.example`)
- [ ] Thay `ZALO_ACCESS_TOKEN` bằng token thực
- [ ] Thay `ZALO_OA_ID` bằng OA ID thực
- [ ] Kiểm tra file `.env` đã được tạo
- [ ] Kiểm tra `.env` không được commit (xem `.gitignore`)

---

## 📦 Bước 3: Cài Đặt Dependencies

- [ ] Mở Terminal/PowerShell
- [ ] Chạy: `cd Vibe-coding-online2`
- [ ] Chạy: `npm install`
- [ ] Chờ cài đặt hoàn thành
- [ ] Kiểm tra folder `node_modules` được tạo

---

## 🚀 Bước 4: Chạy Server

- [ ] Chạy: `npm run dev`
- [ ] Kiểm tra output:
  ```
  🚀 Server running on http://localhost:3000
  📱 Zalo notifications enabled: ✅
  ```
- [ ] Nếu lỗi, xem phần Troubleshooting

---

## 🧪 Bước 5: Test Kết Nối

### Test 1: Health Check
- [ ] Mở trình duyệt
- [ ] Truy cập: `http://localhost:3000/health`
- [ ] Kiểm tra kết quả JSON
- [ ] Nếu OK → ✅ Server chạy bình thường

### Test 2: Zalo Connection
- [ ] Mở Terminal mới
- [ ] Chạy: `npm run test:zalo`
- [ ] Kiểm tra output:
  ```
  ✅ ZALO_ACCESS_TOKEN found
  ✅ Success! Response: {...}
  🎉 Zalo connection is working!
  ```
- [ ] Nếu lỗi → Kiểm tra Access Token

### Test 3: Full Flow
- [ ] Mở: `http://localhost:3000`
- [ ] Đăng nhập Google
- [ ] Trả lời bài test (ít nhất 1 câu)
- [ ] Nhấn "Gửi đáp án"
- [ ] Kiểm tra Zalo OA để xem thông báo
- [ ] Nếu nhận được → ✅ Thành công!

---

## 📱 Bước 6: Kiểm Tra Zalo

- [ ] Mở Zalo trên điện thoại
- [ ] Tìm OA vừa tạo
- [ ] Kiểm tra có thông báo không
- [ ] Nội dung thông báo:
  ```
  🎉 Chúc mừng! Bạn đã hoàn thành bài test.
  
  📊 Kết quả: X/20
  ⏰ Thời gian: [ngày giờ]
  ```
- [ ] Nếu không nhận được → Xem Troubleshooting

---

## 🔍 Troubleshooting

### ❌ Lỗi: "Cannot find module 'express'"
- [ ] Chạy: `npm install`
- [ ] Kiểm tra folder `node_modules` tồn tại
- [ ] Restart server

### ❌ Lỗi: "ZALO_ACCESS_TOKEN chưa được cấu hình"
- [ ] Kiểm tra file `.env` tồn tại
- [ ] Kiểm tra `ZALO_ACCESS_TOKEN` có giá trị
- [ ] Kiểm tra không có khoảng trắng thừa
- [ ] Restart server

### ❌ Lỗi: "Không nhận được thông báo Zalo"
- [ ] Kiểm tra OA đã xác minh chưa
- [ ] Kiểm tra bạn đã follow OA chưa
- [ ] Kiểm tra Access Token còn hạn không
- [ ] Chạy `npm run test:zalo` để test
- [ ] Xem logs server để tìm lỗi

### ❌ Lỗi: "CORS error"
- [ ] Kiểm tra `FRONTEND_URL` trong `.env`
- [ ] Nếu chạy local: `FRONTEND_URL=http://localhost:5173`
- [ ] Restart server

### ❌ Lỗi: "Port 3000 đã được sử dụng"
- [ ] Thay port trong `.env`: `PORT=3001`
- [ ] Hoặc tắt ứng dụng khác đang dùng port 3000
- [ ] Restart server

---

## 📊 Bước 7: Kiểm Tra Dữ Liệu

- [ ] Mở Firebase Console
- [ ] Vào Realtime Database
- [ ] Kiểm tra `quiz_results` có dữ liệu mới
- [ ] Kiểm tra email, score, timestamp
- [ ] Nếu có → ✅ Firebase lưu bình thường

---

## 🔐 Bước 8: Bảo Mật

- [ ] Kiểm tra `.env` không được commit
- [ ] Kiểm tra `.gitignore` có `.env`
- [ ] Kiểm tra `node_modules` không được commit
- [ ] Kiểm tra không chia sẻ Access Token
- [ ] Kiểm tra `.env.example` không có giá trị thực

---

## 📚 Bước 9: Tài Liệu

- [ ] Đã đọc `README.md`
- [ ] Đã đọc `QUICK_START.md`
- [ ] Đã đọc `ZALO_SETUP.md`
- [ ] Đã đọc `ARCHITECTURE.md`
- [ ] Đã đọc `INTEGRATION_SUMMARY.md`

---

## 🚀 Bước 10: Triển Khai (Tùy Chọn)

### Nếu muốn deploy lên production:

- [ ] Chọn platform (Heroku, Railway, Render)
- [ ] Tạo tài khoản trên platform
- [ ] Kết nối GitHub repository
- [ ] Set environment variables
- [ ] Deploy
- [ ] Test trên production URL

---

## ✨ Hoàn Thành!

Nếu tất cả các mục trên đều ✅, bạn đã:

- ✅ Tạo Zalo OA thành công
- ✅ Cấu hình backend
- ✅ Cài đặt dependencies
- ✅ Chạy server
- ✅ Test kết nối
- ✅ Nhận thông báo Zalo
- ✅ Lưu dữ liệu Firebase
- ✅ Bảo vệ thông tin nhạy cảm

---

## 📞 Tiếp Theo

### Nếu muốn tùy chỉnh:
- [ ] Xem `ZALO_SETUP.md` - Phần "Tùy Chỉnh Thông Báo"
- [ ] Thay đổi nội dung thông báo
- [ ] Thêm thông báo cho admin
- [ ] Thêm template message

### Nếu muốn triển khai:
- [ ] Xem `README.md` - Phần "Triển Khai"
- [ ] Chọn platform
- [ ] Deploy

### Nếu gặp vấn đề:
- [ ] Xem `ZALO_SETUP.md` - Phần "Troubleshooting"
- [ ] Kiểm tra logs server
- [ ] Chạy `npm run test:zalo`

---

## 📋 Ghi Chú

```
Ngày bắt đầu: _______________
Ngày hoàn thành: _______________
Ghi chú: _______________
```

---

**Chúc bạn thành công! 🎉**

Nếu có bất kỳ câu hỏi nào, hãy xem các file tài liệu hoặc kiểm tra logs server.
