# 📢 Cập Nhật: Gửi Thông Báo Đến Group Admin

## 🎯 Thay Đổi

Hệ thống đã được cập nhật để gửi thông báo đến **group admin Zalo** thay vì gửi cho từng user.

---

## 📊 Format Thông Báo

Khi có học viên hoàn thành bài test, group admin sẽ nhận:

```
📝 Có học viên hoàn thành bài test!

👤 Email: student@example.com
📊 Kết quả: 18/20
⏰ Thời gian: 15/01/2024 10:30:00
📊 Tổng submit: 5 học viên
```

---

## 🔧 Cấu Hình

### Bước 1: Lấy Group ID
Xem file: `GET_GROUP_ID.md`

Link group: https://zalo.me/g/uvbpaz502
→ Group ID: `uvbpaz502`

### Bước 2: Cập Nhật .env
```env
ZALO_ACCESS_TOKEN=your_token_here
ADMIN_GROUP_ID=uvbpaz502
PORT=3000
```

### Bước 3: Restart Server
```bash
npm run dev
```

---

## 📝 File Đã Cập Nhật

| File | Thay Đổi |
|------|---------|
| `server.js` | Thêm endpoint `/api/send-admin-group-notification` |
| `zalo-notification.js` | Thay đổi hàm gửi thông báo |
| `script.js` | Gọi hàm gửi thông báo group |
| `.env.example` | Thêm `ADMIN_GROUP_ID` |
| `test-zalo.js` | Test gửi đến group |

---

## 🆕 File Mới

- `GET_GROUP_ID.md` - Hướng dẫn lấy Group ID
- `UPDATE_GROUP_NOTIFICATION.md` - File này

---

## 🚀 Chạy

```bash
# Cài đặt
npm install

# Chạy server
npm run dev

# Test kết nối
npm run test:zalo
```

---

## ✅ Kiểm Tra

1. Mở: http://localhost:3000
2. Đăng nhập Google
3. Trả lời bài test
4. Nhấn "Gửi đáp án"
5. Kiểm tra group Zalo để xem thông báo

---

## 📊 Tính Năng Mới

✅ Gửi thông báo đến group admin
✅ Hiển thị email học viên
✅ Hiển thị kết quả (xx/yy)
✅ Hiển thị thời gian hoàn thành
✅ Đếm tổng số học viên đã submit
✅ Tự động cập nhật số lượng

---

## 🔄 API Endpoints

### Gửi Thông Báo Group
```
POST /api/send-admin-group-notification
Body: {
  email: "student@example.com",
  score: "18/20",
  timestamp: "2024-01-15T10:30:00.000Z",
  totalQuestions: 20
}
```

### Lấy Tổng Submit
```
GET /api/get-total-submits
Response: {
  success: true,
  totalSubmits: 5
}
```

---

## 📱 Hàm JavaScript

### Gửi Thông Báo
```javascript
import { sendAdminGroupNotification } from "./zalo-notification.js";

sendAdminGroupNotification({
    email: "student@example.com",
    score: "18/20",
    timestamp: "2024-01-15T10:30:00.000Z",
    totalQuestions: 20
});
```

### Lấy Tổng Submit
```javascript
import { getTotalSubmits } from "./zalo-notification.js";

const total = await getTotalSubmits();
console.log(`Tổng submit: ${total}`);
```

---

## 🆘 Troubleshooting

### ❌ Không nhận thông báo
1. Kiểm tra Group ID có đúng không
2. Kiểm tra OA đã được thêm vào group
3. Chạy `npm run test:zalo` để test

### ❌ Lỗi "ADMIN_GROUP_ID not found"
1. Kiểm tra file `.env` có `ADMIN_GROUP_ID`
2. Restart server
3. Kiểm tra không có khoảng trắng thừa

### ❌ Số lượng submit không cập nhật
- Số lượng được lưu trong memory
- Nếu restart server, số lượng sẽ reset
- Để lưu vĩnh viễn, cần lưu vào database

---

## 💡 Cải Tiến Trong Tương Lai

Có thể thêm:
- Lưu số lượng submit vào database
- Gửi báo cáo hàng ngày
- Gửi thông báo khi có điểm cao
- Gửi thông báo khi có điểm thấp
- Thống kê chi tiết

---

## 📞 Hỗ Trợ

Xem file: `GET_GROUP_ID.md` để lấy Group ID
Xem file: `ZALO_SETUP.md` để cấu hình chi tiết

---

**Bước tiếp theo:** Cập nhật `.env` và chạy `npm run dev`
