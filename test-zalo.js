import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function testTelegramConnection() {
    console.log('🧪 Testing Telegram Connection...\n');

    // Check if token exists
    if (!TELEGRAM_BOT_TOKEN) {
        console.error('❌ TELEGRAM_BOT_TOKEN not found in .env file');
        console.log('📝 Please create .env file with TELEGRAM_BOT_TOKEN');
        process.exit(1);
    }

    if (!TELEGRAM_GROUP_ID) {
        console.error('❌ TELEGRAM_GROUP_ID not found in .env file');
        console.log('📝 Please add TELEGRAM_GROUP_ID to .env file');
        process.exit(1);
    }

    console.log('✅ TELEGRAM_BOT_TOKEN found');
    console.log(`📌 Token: ${TELEGRAM_BOT_TOKEN.substring(0, 20)}...`);
    console.log(`👥 Group ID: ${TELEGRAM_GROUP_ID}`);

    // Test message
    const testMessage = `📝 Test thông báo từ Vibe Coding\n\n👤 Email: test@example.com\n📊 Kết quả: 18/20\n⏰ Thời gian: 15/01/2024 10:30:00\n📊 Tổng submit: 1 học viên`;

    try {
        console.log('\n📤 Sending test message to Telegram group...');
        const response = await axios.post(TELEGRAM_API_URL, {
            chat_id: TELEGRAM_GROUP_ID,
            text: testMessage,
            parse_mode: 'HTML'
        });

        console.log('✅ Success! Response:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n🎉 Telegram group connection is working!');

    } catch (error) {
        console.error('❌ Error sending message:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Message:', error.message);
        }
        process.exit(1);
    }
}

testTelegramConnection();
