# 📱 Hướng Dẫn Tích Hợp Telegram

## 🎯 Mục Đích
Gửi thông báo tự động đến **group Telegram** khi có học viên hoàn thành bài test.

---

## 📋 Bước 1: Lấy Telegram Bot Token

### 1.1 Tạo Bot Mới
1. Mở Telegram
2. Tìm **@BotFather**
3. Nhấn **/start**
4. Nhấn **/newbot**
5. Đặt tên bot: "Vibe Coding Test"
6. Đặt username: "vibe_coding_test_bot" (phải kết thúc bằng _bot)
7. Copy **Bot Token** (ví dụ: `8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE`)

### 1.2 Lưu Token
- Mở Notepad
- Dán token vào
- Lưu file

---

## 📋 Bước 2: Lấy Group ID

### 2.1 Tạo Group
1. Mở Telegram
2. Tạo group mới: "Noti-techcamp"
3. Thêm bot vào group

### 2.2 Lấy Group ID
**Cách 1: Sử dụng Bot**
1. Gửi tin nhắn bất kỳ vào group
2. Truy cập: `https://api.telegram.org/bot{TOKEN}/getUpdates`
3. Thay `{TOKEN}` bằng bot token của bạn
4. Tìm `"chat":{"id":-123456789}` (số âm)
5. Copy Group ID

**Cách 2: Sử dụng @userinfobot**
1. Thêm @userinfobot vào group
2. Gửi `/start`
3. Copy Group ID

---

## ⚙️ Bước 3: Cấu Hình .env

### 3.1 Tạo File .env
Tạo file `.env` trong thư mục `Vibe-coding-online2/`:

```env
TELEGRAM_BOT_TOKEN=8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE
TELEGRAM_GROUP_ID=-123456789
PORT=3000
```

**Thay thế:**
- `8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE` → Bot Token của bạn
- `-123456789` → Group ID của bạn (phải có dấu âm)

### 3.2 Lưu File
- Nhấn **Ctrl + S**
- Đóng file

---

## 🚀 Bước 4: Cài Đặt

### 4.1 Mở Terminal
- Nhấn **Windows + R**
- Gõ: `cmd`
- Nhấn **Enter**

### 4.2 Chuyển Thư Mục
```bash
cd C:\Users\User\Dropbox\KIRO\Vibe-coding-online2
```
Nhấn **Enter**

### 4.3 Cài Đặt
```bash
npm install
```
Nhấn **Enter**

Chờ 2-3 phút...

---

## 🧪 Bước 5: Test Kết Nối

### 5.1 Mở Terminal Mới
- Nhấn **Windows + R**
- Gõ: `cmd`
- Nhấn **Enter**

### 5.2 Chuyển Thư Mục
```bash
cd C:\Users\User\Dropbox\KIRO\Vibe-coding-online2
```
Nhấn **Enter**

### 5.3 Test
```bash
npm run test:zalo
```
Nhấn **Enter**

### 5.4 Kiểm Tra Kết Quả
Nếu thấy:
```
✅ TELEGRAM_BOT_TOKEN found
👥 Group ID: -123456789
✅ Success!
🎉 Telegram group connection is working!
```

→ **Thành công!** ✅

---

## 🚀 Bước 6: Chạy Server

### 6.1 Chạy
```bash
npm run dev
```
Nhấn **Enter**

### 6.2 Kiểm Tra
Bạn sẽ thấy:
```
🚀 Server running on http://localhost:3000
📱 Telegram notifications enabled: ✅
👥 Telegram Group ID: ✅
```

---

## 🧪 Bước 7: Test Toàn Bộ

### 7.1 Mở Trình Duyệt
- Truy cập: `http://localhost:3000`

### 7.2 Đăng Nhập Google
- Nhấn nút "Đăng nhập Google"
- Chọn tài khoản

### 7.3 Trả Lời Bài Test
- Trả lời ít nhất 1 câu hỏi
- Nhấn "Gửi đáp án"

### 7.4 Kiểm Tra Group Telegram
- Mở Telegram
- Vào group "Noti-techcamp"
- Kiểm tra có thông báo không

**Thông báo sẽ như thế này:**
```
📝 Có học viên hoàn thành bài test!

👤 Email: your_email@gmail.com
📊 Kết quả: 18/20
⏰ Thời gian: 15/01/2024 10:30:00
📊 Tổng submit: 1 học viên
```

✅ **Hoàn thành!**

---

## 🆘 Troubleshooting

### ❌ Lỗi: "TELEGRAM_BOT_TOKEN not found"
**Giải pháp:**
- Kiểm tra file `.env` có tồn tại không
- Kiểm tra `TELEGRAM_BOT_TOKEN` có giá trị không
- Restart server

### ❌ Lỗi: "Unauthorized"
**Giải pháp:**
- Kiểm tra Bot Token có đúng không
- Kiểm tra bot đã được thêm vào group không

### ❌ Lỗi: "Bad Request: chat not found"
**Giải pháp:**
- Kiểm tra Group ID có đúng không
- Kiểm tra Group ID có dấu âm không (ví dụ: `-123456789`)

### ❌ Không nhận thông báo
**Giải pháp:**
1. Kiểm tra bot đã được thêm vào group
2. Kiểm tra bot có quyền gửi tin nhắn
3. Chạy `npm run test:zalo` để test

---

## 📝 Ghi Chú

- Bot Token là duy nhất cho mỗi bot
- Group ID phải có dấu âm (-)
- Không chia sẻ Bot Token công khai
- Nếu token bị lộ, tạo token mới từ @BotFather

---

**Bước tiếp theo:** Cập nhật `.env` và chạy `npm run dev`
