# 👥 Cách Lấy Group ID Zalo

## 🎯 Mục Đích
Lấy Group ID từ link group Zalo để gửi thông báo đến group admin.

---

## 📱 Cách 1: Từ Link Group (Dễ Nhất)

### Bước 1: Mở Link Group
```
https://zalo.me/g/uvbpaz502
```

### Bước 2: Lấy Group ID
Group ID là phần sau `/g/`:
```
https://zalo.me/g/uvbpaz502
                    ↑
                Group ID: uvbpaz502
```

### Bước 3: Thêm vào .env
```env
ADMIN_GROUP_ID=uvbpaz502
```

---

## 🔍 Cách 2: Từ Zalo App

### Bước 1: Mở Group Trên Zalo
- Mở Zalo app
- Tìm group admin
- Nhấn vào group

### Bước 2: Xem Thông Tin Group
- Nhấn vào tên group (phía trên)
- Chọn "Thông tin nhóm"
- Tìm "ID nhóm" hoặc "Group ID"

### Bước 3: Copy Group ID
- Copy ID
- Thêm vào file `.env`

---

## 📋 Cấu Hình .env

```env
# Zalo Configuration
ZALO_ACCESS_TOKEN=your_access_token_here
ADMIN_GROUP_ID=uvbpaz502

# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173
```

---

## ✅ Kiểm Tra

### Test Kết Nối
```bash
npm run test:zalo
```

Nếu thấy:
```
✅ ZALO_ACCESS_TOKEN found
👥 Group ID: uvbpaz502
✅ Success! Response: {...}
🎉 Zalo group connection is working!
```

→ Cấu hình thành công! ✅

---

## 🆘 Troubleshooting

### ❌ Lỗi: "Group ID không hợp lệ"
- Kiểm tra Group ID có đúng không
- Kiểm tra OA đã được thêm vào group không
- Kiểm tra OA có quyền gửi tin nhắn không

### ❌ Lỗi: "Không thể gửi tin nhắn"
- Kiểm tra OA đã được thêm vào group
- Kiểm tra Access Token còn hạn
- Kiểm tra group có hoạt động không

### ❌ Lỗi: "ADMIN_GROUP_ID not found"
- Kiểm tra file `.env` có `ADMIN_GROUP_ID` không
- Kiểm tra không có khoảng trắng thừa
- Restart server

---

## 📝 Ghi Chú

- Group ID là duy nhất cho mỗi group
- Không thay đổi Group ID khi chạy
- Nếu thay đổi group, cập nhật Group ID mới

---

**Bước tiếp theo:** Cập nhật `.env` và chạy `npm run test:zalo`
