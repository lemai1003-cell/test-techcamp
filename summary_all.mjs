const response = await fetch('https://test-techcamp-default-rtdb.asia-southeast1.firebasedatabase.app/quiz_results.json');
const data = await response.json();

if (!data) {
    console.log("Hiện chưa có dữ liệu nộp bài nào.");
} else {
    console.log("\n📋 TẤT CẢ DANH SÁCH HỌC VIÊN ĐÃ NỘP BÀI:");
    console.log("(Sắp xếp theo thứ tự nộp bài sớm nhất lên đầu)");
    console.log("--------------------------------------------------");
    
    // Chuyển object dữ liệu thành mảng
    const entries = Object.values(data);
    
    // Lọc bỏ những submission không có điểm (những lần test lỗi trước đây) 
    // Nếu bạn muốn giữ lại thì bỏ .filter này đi
    const scoredEntries = entries.filter(item => item.score);
    
    // Sắp xếp tăng dần theo thời gian tạo (Create Date ASC: Cũ nhất ở trên, mới nhất ở dưới)
    scoredEntries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    if (scoredEntries.length === 0) {
        console.log("Hiện tại chưa có dữ liệu nộp bài hoàn chỉnh.");
    } else {
        scoredEntries.forEach((item, index) => {
            const email = item.email || "Không rõ Email";
            const score = item.score ? item.score.replace(/\s+/g, '') : "Chưa có điểm";
            
            let dateSubmitted = "Không rõ thời gian";
            if (item.timestamp) {
                const date = new Date(item.timestamp);
                dateSubmitted = date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            }
            
            console.log(`${index + 1}. Email: [${email}] -- Điểm: ${score}`);
            console.log(`   Thời gian nộp: ${dateSubmitted}`);
            console.log("   ---");
        });
    }
}
