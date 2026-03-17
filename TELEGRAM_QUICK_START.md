# ⚡ Cập Nhật Nhanh - Telegram

## 🎯 Thay Đổi

**Trước:** Gửi thông báo đến Zalo
**Sau:** Gửi thông báo đến Telegram

---

## 3 Bước Cập Nhật

### 1️⃣ Lấy Telegram Bot Token (5 phút)

**Bạn đã có:**
```
Token: 8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE
Group: Noti-techcamp
```

**Cần lấy Group ID:**
1. Mở Telegram
2. Vào group "Noti-techcamp"
3. Gửi tin nhắn bất kỳ
4. Truy cập: `https://api.telegram.org/bot8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE/getUpdates`
5. Tìm `"chat":{"id":-123456789}`
6. Copy Group ID (ví dụ: `-123456789`)

### 2️⃣ Cập Nhật .env (1 phút)

```env
TELEGRAM_BOT_TOKEN=8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE
TELEGRAM_GROUP_ID=-123456789
PORT=3000
```

**Thay thế:**
- `8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE` → Bot Token
- `-123456789` → Group ID (phải có dấu âm)

### 3️⃣ Restart Server (1 phút)

```bash
npm run dev
```

---

## ✅ Kiểm Tra

```bash
npm run test:zalo
```

Nếu thấy:
```
✅ TELEGRAM_BOT_TOKEN found
👥 Group ID: -123456789
✅ Success!
🎉 Telegram group connection is working!
```

→ Thành công! ✅

---

## 📊 Thông Báo Mới

```
📝 Có học viên hoàn thành bài test!

👤 Email: student@example.com
📊 Kết quả: 18/20
⏰ Thời gian: 15/01/2024 10:30:00
📊 Tổng submit: 5 học viên
```

---

## 📝 File Cập Nhật

- ✏️ `server.js` - Thêm endpoint Telegram
- ✏️ `zalo-notification.js` - Hàm gửi Telegram
- ✏️ `script.js` - Gọi hàm mới
- ✏️ `.env.example` - Thêm TELEGRAM_BOT_TOKEN
- ✏️ `test-zalo.js` - Test Telegram

---

## 🆕 File Mới

- 📄 `TELEGRAM_SETUP.md` - Hướng dẫn chi tiết
- 📄 `TELEGRAM_QUICK_START.md` - File này

---

## 🚀 Chạy Ngay

```bash
# 1. Cập nhật .env
TELEGRAM_BOT_TOKEN=8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE
TELEGRAM_GROUP_ID=-123456789

# 2. Restart
npm run dev

# 3. Test
npm run test:zalo

# 4. Truy cập
http://localhost:3000
```

---

**Hoàn thành! 🎉**
