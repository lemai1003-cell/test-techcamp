/**
 * Hàm gửi thông báo đến group Telegram
 * @param {Object} userData - Dữ liệu người dùng
 * @param {string} userData.email - Email người dùng
 * @param {string} userData.score - Điểm số (ví dụ: "18/20")
 * @param {string} userData.timestamp - Thời gian hoàn thành
 * @param {number} userData.totalQuestions - Tổng số câu hỏi
 * @returns {Promise<boolean>} - True nếu gửi thành công
 */
export async function sendTelegramNotification(userData) {
    try {
        const response = await fetch('/api/send-telegram-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                score: userData.score,
                timestamp: userData.timestamp,
                totalQuestions: userData.totalQuestions
            })
        });

        if (!response.ok) {
            console.error('❌ Lỗi gửi thông báo Telegram:', response.statusText);
            return false;
        }

        const result = await response.json();
        console.log('✅ Thông báo Telegram đã gửi thành công:', result);
        return true;
    } catch (error) {
        console.error('❌ Lỗi kết nối API:', error);
        return false;
    }
}

/**
 * Hàm lấy tổng số submit
 * @returns {Promise<number>} - Tổng số học viên đã submit
 */
export async function getTotalSubmits() {
    try {
        const response = await fetch('/api/get-total-submits');
        const result = await response.json();
        return result.totalSubmits || 0;
    } catch (error) {
        console.error('❌ Lỗi lấy tổng submit:', error);
        return 0;
    }
}
