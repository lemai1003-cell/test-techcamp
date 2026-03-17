# 📱 Hướng Dẫn Tích Hợp Thông Báo Zalo

## 🎯 Mục Đích
Gửi thông báo Zalo tự động cho người dùng khi họ hoàn thành bài test, cùng với điểm số và thời gian.

---

## 📋 Bước 1: Chuẩn Bị Tài Khoản Zalo

### 1.1 Tạo Zalo Official Account (OA)
1. Truy cập: https://oa.zalo.me
2. Đăng nhập bằng tài khoản Zalo
3. Nhấn "Tạo OA mới"
4. Điền thông tin:
   - Tên OA: "Vibe Coding Test" (hoặc tên khác)
   - Mô tả: "Nền tảng trắc nghiệm trực tuyến"
   - Chọn danh mục: "Giáo dục"
5. Xác minh tài khoản

### 1.2 Lấy Access Token
1. Vào OA vừa tạo
2. Chọn **Settings** → **API & Webhooks**
3. Tìm mục **Access Token**
4. Nhấn "Tạo token mới" hoặc copy token hiện tại
5. **Lưu token này** (sẽ dùng trong file `.env`)

### 1.3 Lấy OA ID
1. Vẫn ở mục **Settings**
2. Tìm **OA ID** (thường là một số dài)
3. **Lưu OA ID này**

---

## 🔧 Bước 2: Cấu Hình Backend

### 2.1 Cài Đặt Dependencies
```bash
cd Vibe-coding-online2
npm install
```

### 2.2 Tạo File `.env`
Tạo file `.env` trong thư mục `Vibe-coding-online2/`:

```env
# Zalo Configuration
ZALO_ACCESS_TOKEN=your_access_token_here
ZALO_OA_ID=your_oa_id_here
ADMIN_ZALO_ID=admin_zalo_user_id_here

# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173
```

**Thay thế:**
- `your_access_token_here` → Token lấy từ bước 1.2
- `your_oa_id_here` → OA ID lấy từ bước 1.3
- `admin_zalo_user_id_here` → Zalo ID của admin (nếu muốn nhận thông báo)

### 2.3 Kiểm Tra File Cấu Hình
Đảm bảo các file sau đã tồn tại:
- ✅ `server.js` - Backend server
- ✅ `zalo-notification.js` - Hàm gửi thông báo
- ✅ `script.js` - Đã cập nhật để gọi API Zalo
- ✅ `package.json` - Đã cập nhật dependencies

---

## 🚀 Bước 3: Chạy Server

### 3.1 Chạy ở Chế Độ Development
```bash
npm run dev
```

Hoặc chạy trực tiếp:
```bash
node server.js
```

**Output mong đợi:**
```
🚀 Server running on http://localhost:3000
📱 Zalo notifications enabled: ✅
```

### 3.2 Kiểm Tra Health Check
Mở trình duyệt, truy cập:
```
http://localhost:3000/health
```

Nếu thấy:
```json
{"status":"OK","timestamp":"2024-01-15T10:30:00.000Z"}
```
→ Server đang chạy bình thường ✅

---

## 🧪 Bước 4: Kiểm Tra Thông Báo

### 4.1 Cách 1: Test Thông Báo Trực Tiếp
Sử dụng Postman hoặc curl:

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

### 4.2 Cách 2: Test Qua Giao Diện
1. Mở `http://localhost:3000` trên trình duyệt
2. Đăng nhập Google
3. Trả lời bài test
4. Nhấn "Gửi đáp án"
5. Kiểm tra Zalo OA để xem thông báo

### 4.3 Kiểm Tra Logs
Xem console của server để kiểm tra:
```
✅ Zalo notification sent to: user@example.com
```

---

## 📊 Bước 5: Tùy Chỉnh Thông Báo

### 5.1 Thay Đổi Nội Dung Thông Báo
Mở file `server.js`, tìm phần:

```javascript
const message = {
    recipient: {
        user_id: email
    },
    message: {
        text: `🎉 Chúc mừng! Bạn đã hoàn thành bài test.\n\n📊 Kết quả: ${score}/${totalQuestions}\n⏰ Thời gian: ${new Date(timestamp).toLocaleString('vi-VN')}`
    }
};
```

Bạn có thể thay đổi nội dung thông báo tùy ý.

### 5.2 Gửi Thông Báo Cho Admin
Nếu muốn admin nhận thông báo khi có người hoàn thành test:

1. Lấy Zalo ID của admin (hỏi admin hoặc xem trong Zalo)
2. Lưu vào localStorage hoặc cấu hình:
```javascript
localStorage.setItem('adminZaloId', 'admin_zalo_id_here');
```

---

## 🐛 Troubleshooting

### ❌ Lỗi: "ZALO_ACCESS_TOKEN chưa được cấu hình"
**Giải pháp:**
- Kiểm tra file `.env` có tồn tại không
- Kiểm tra `ZALO_ACCESS_TOKEN` có giá trị không
- Restart server sau khi thay đổi `.env`

### ❌ Lỗi: "Không nhận được thông báo Zalo"
**Giải pháp:**
1. Kiểm tra OA đã được xác minh chưa
2. Kiểm tra người dùng đã follow OA chưa
3. Kiểm tra Access Token còn hạn không
4. Xem logs server để tìm lỗi chi tiết

### ❌ Lỗi: "CORS error"
**Giải pháp:**
- Cập nhật `FRONTEND_URL` trong `.env` để khớp với domain frontend
- Nếu chạy local: `FRONTEND_URL=http://localhost:5173`

### ❌ Lỗi: "Cannot find module 'express'"
**Giải pháp:**
```bash
npm install
```

---

## 🔐 Bảo Mật

### ⚠️ Quan Trọng
1. **Không commit `.env` lên Git**
   - Thêm `.env` vào `.gitignore`
   ```
   .env
   .env.local
   node_modules/
   ```

2. **Bảo vệ Access Token**
   - Không chia sẻ token công khai
   - Nếu token bị lộ, tạo token mới ngay

3. **Validate dữ liệu**
   - Server đã validate email và score
   - Không gửi dữ liệu nhạy cảm qua Zalo

---

## 📈 Triển Khai Lên Production

### Tùy Chọn 1: Heroku
```bash
# Cài Heroku CLI
# Đăng nhập
heroku login

# Tạo app
heroku create your-app-name

# Set environment variables
heroku config:set ZALO_ACCESS_TOKEN=your_token
heroku config:set ZALO_OA_ID=your_oa_id

# Deploy
git push heroku main
```

### Tùy Chọn 2: Railway
1. Truy cập: https://railway.app
2. Kết nối GitHub
3. Deploy repository
4. Set environment variables trong dashboard

### Tùy Chọn 3: Render
1. Truy cập: https://render.com
2. Tạo Web Service mới
3. Kết nối GitHub
4. Set environment variables

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra logs server
2. Xem Zalo OA settings
3. Kiểm tra Access Token còn hạn
4. Đảm bảo người dùng đã follow OA

---

## ✅ Checklist Hoàn Thành

- [ ] Tạo Zalo OA
- [ ] Lấy Access Token
- [ ] Tạo file `.env`
- [ ] Cài đặt dependencies (`npm install`)
- [ ] Chạy server (`npm run dev`)
- [ ] Test thông báo
- [ ] Kiểm tra logs
- [ ] Triển khai lên production (nếu cần)

---

**Chúc mừng! 🎉 Bạn đã tích hợp thành công thông báo Zalo cho hệ thống test.**
