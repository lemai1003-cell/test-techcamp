# 🖥️ Danh Sách Lệnh Nhanh

## 📦 Cài Đặt

```bash
# Cài đặt tất cả dependencies
npm install

# Cài đặt package cụ thể
npm install express
npm install axios
npm install dotenv
npm install cors
npm install nodemon --save-dev
```

---

## 🚀 Chạy Server

```bash
# Development (với auto-reload)
npm run dev

# Production
npm start

# Chạy trên port khác
PORT=3001 npm run dev
```

---

## 🧪 Testing

```bash
# Test Firebase
npm test

# Test Zalo connection
npm run test:zalo

# Test health check
curl http://localhost:3000/health

# Test Zalo notification
curl -X POST http://localhost:3000/api/send-zalo-notification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "score": "18/20",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "totalQuestions": 20
  }'
```

---

## 📝 Cấu Hình

```bash
# Tạo file .env từ template
cp .env.example .env

# Xem nội dung .env
cat .env

# Xóa file .env (nếu cần)
rm .env
```

---

## 📂 Quản Lý File

```bash
# Liệt kê file
ls -la

# Xem cấu trúc thư mục
tree

# Xem nội dung file
cat filename.txt

# Tìm file
find . -name "*.js"

# Xóa file
rm filename.txt

# Xóa thư mục
rm -rf node_modules
```

---

## 🔍 Kiểm Tra

```bash
# Kiểm tra Node.js version
node --version

# Kiểm tra npm version
npm --version

# Kiểm tra port 3000 có bị chiếm không
netstat -an | grep 3000

# Kiểm tra process chạy trên port 3000
lsof -i :3000
```

---

## 🐛 Debug

```bash
# Xem logs server
npm run dev

# Xem logs chi tiết
DEBUG=* npm run dev

# Xem error logs
npm run dev 2>&1 | tee error.log

# Kiểm tra syntax JavaScript
node -c script.js
```

---

## 🔐 Bảo Mật

```bash
# Kiểm tra .env không được commit
git status

# Thêm .env vào .gitignore
echo ".env" >> .gitignore

# Kiểm tra file nhạy cảm
git ls-files | grep -E "\.env|node_modules"
```

---

## 📊 Git

```bash
# Kiểm tra status
git status

# Thêm file
git add .

# Commit
git commit -m "Add Zalo notification integration"

# Push
git push origin main

# Xem log
git log --oneline
```

---

## 🌐 Trình Duyệt

```bash
# Mở localhost
http://localhost:3000

# Health check
http://localhost:3000/health

# Mở Zalo OA
https://oa.zalo.me

# Mở Firebase Console
https://console.firebase.google.com
```

---

## 📱 Zalo API

```bash
# Test Zalo connection
npm run test:zalo

# Gửi thông báo test
curl -X POST http://localhost:3000/api/send-zalo-notification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "score": "20/20",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "totalQuestions": 20
  }'

# Gửi thông báo admin
curl -X POST http://localhost:3000/api/send-admin-notification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "score": "18/20",
    "totalQuestions": 20,
    "adminZaloId": "admin_id_here"
  }'
```

---

## 🚀 Triển Khai

### Heroku
```bash
# Cài Heroku CLI
npm install -g heroku

# Đăng nhập
heroku login

# Tạo app
heroku create your-app-name

# Set environment variables
heroku config:set ZALO_ACCESS_TOKEN=your_token
heroku config:set ZALO_OA_ID=your_oa_id

# Deploy
git push heroku main

# Xem logs
heroku logs --tail
```

### Railway
```bash
# Cài Railway CLI
npm install -g @railway/cli

# Đăng nhập
railway login

# Khởi tạo project
railway init

# Deploy
railway up

# Xem logs
railway logs
```

### Render
```bash
# Kết nối GitHub
# Tạo Web Service
# Set environment variables
# Deploy tự động
```

---

## 🧹 Dọn Dẹp

```bash
# Xóa node_modules
rm -rf node_modules

# Xóa package-lock.json
rm package-lock.json

# Cài lại
npm install

# Xóa logs
rm -f *.log

# Xóa cache
npm cache clean --force
```

---

## 📚 Tài Liệu

```bash
# Xem README
cat README.md

# Xem QUICK_START
cat QUICK_START.md

# Xem ZALO_SETUP
cat ZALO_SETUP.md

# Xem ARCHITECTURE
cat ARCHITECTURE.md
```

---

## 🔄 Workflow Hàng Ngày

```bash
# Sáng: Bắt đầu
npm run dev

# Giữa ngày: Test
npm run test:zalo

# Chiều: Commit
git add .
git commit -m "Update features"
git push

# Tối: Deploy
git push heroku main
```

---

## ⚡ Lệnh Nhanh

```bash
# Tất cả trong một dòng
npm install && npm run dev

# Test và deploy
npm run test:zalo && git push heroku main

# Cài lại từ đầu
rm -rf node_modules package-lock.json && npm install

# Xem tất cả lệnh
npm run
```

---

## 🆘 Troubleshooting

```bash
# Port 3000 đã được sử dụng
lsof -i :3000
kill -9 <PID>

# Xóa node_modules và cài lại
rm -rf node_modules && npm install

# Xóa cache npm
npm cache clean --force

# Kiểm tra syntax
node -c server.js

# Xem error chi tiết
npm run dev 2>&1
```

---

## 📋 Cheat Sheet

| Lệnh | Mục Đích |
|------|----------|
| `npm install` | Cài dependencies |
| `npm run dev` | Chạy development |
| `npm start` | Chạy production |
| `npm run test:zalo` | Test Zalo |
| `npm test` | Test Firebase |
| `npm run` | Xem tất cả lệnh |
| `git status` | Kiểm tra status |
| `git push` | Push lên GitHub |
| `heroku logs --tail` | Xem logs Heroku |

---

## 🎯 Workflow Nhanh

### Bắt Đầu
```bash
npm install
npm run dev
```

### Test
```bash
npm run test:zalo
curl http://localhost:3000/health
```

### Deploy
```bash
git add .
git commit -m "message"
git push heroku main
```

---

**Lưu ý:** Thay `your-app-name`, `your_token`, v.v. bằng giá trị thực tế.
