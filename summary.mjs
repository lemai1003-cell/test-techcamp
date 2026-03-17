const response = await fetch('https://test-techcamp-default-rtdb.asia-southeast1.firebasedatabase.app/quiz_results.json');
const data = await response.json();

if (!data) {
    console.log("Hiện chưa có dữ liệu nộp bài nào.");
} else {
    console.log("🏆 DANH SÁCH CÁC BẠN ĐẠT ĐIỂM TUYỆT ĐỐI 20/20:");
    console.log("--------------------------------------------------");
    
    // Chuyển object dữ liệu thành mảng
    const entries = Object.values(data);
    
    // Lọc những bạn đạt 20/20 (xóa dấu cách để đề phòng "20 / 20" hoặc "20/20")
    const perfectScores = entries.filter(item => {
        if (!item.score) return false;
        return item.score.replace(/\s+/g, '') === '20/20';
    });
    
    // Sắp xếp tăng dần theo thời gian tạo (Create Date ASC: Cũ nhất ở trên, mới nhất ở dưới)
    perfectScores.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    if (perfectScores.length === 0) {
        console.log("Hiện tại chưa có học viên nào đạt trên 20/20.");
    } else {
        perfectScores.forEach((item, index) => {
            const email = item.email || "Không rõ Email";
            let dateSubmitted = "Không rõ thời gian";
            if (item.timestamp) {
                const date = new Date(item.timestamp);
                dateSubmitted = date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            }
            console.log(`${index + 1}. Email: ${email}`);
            console.log(`   Thời gian nộp bài: ${dateSubmitted}\n`);
        });
    }
}
