import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Serve static files
app.use(express.static(__dirname));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Lưu trữ số lượng submit
let totalSubmits = 0;

// API endpoint để gửi thông báo đến group Telegram
app.post('/api/send-telegram-notification', async (req, res) => {
    try {
        const { email, score, timestamp, totalQuestions } = req.body;

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_GROUP_ID) {
            return res.status(500).json({ 
                success: false, 
                error: 'TELEGRAM_BOT_TOKEN hoặc TELEGRAM_GROUP_ID chưa được cấu hình' 
            });
        }

        // Tăng số lượng submit
        totalSubmits++;

        // Tạo nội dung thông báo
        const messageText = `📝 Có học viên hoàn thành bài test!\n\n👤 Email: ${email}\n📊 Kết quả: ${score}/${totalQuestions}\n⏰ Thời gian: ${new Date(timestamp).toLocaleString('vi-VN')}\n📊 Tổng submit: ${totalSubmits} học viên`;

        // Gửi request đến Telegram API
        const response = await axios.post(TELEGRAM_API_URL, {
            chat_id: TELEGRAM_GROUP_ID,
            text: messageText,
            parse_mode: 'HTML'
        });

        console.log('✅ Telegram notification sent. Total submits:', totalSubmits);
        res.json({ 
            success: true, 
            message: 'Thông báo đã gửi đến group Telegram',
            totalSubmits: totalSubmits
        });

    } catch (error) {
        console.error('❌ Error sending Telegram notification:', error.response?.data || error.message);
        res.status(500).json({ 
            success: false, 
            error: error.response?.data?.description || 'Lỗi gửi thông báo' 
        });
    }
});

// API endpoint để lấy tổng số submit
app.get('/api/get-total-submits', (req, res) => {
    res.json({ 
        success: true, 
        totalSubmits: totalSubmits 
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve index.html cho SPA
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📱 Telegram notifications enabled: ${TELEGRAM_BOT_TOKEN ? '✅' : '❌'}`);
    console.log(`👥 Telegram Group ID: ${TELEGRAM_GROUP_ID ? '✅' : '❌'}`);
});
