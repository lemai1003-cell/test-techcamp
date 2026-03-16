const response = await fetch('https://test-techcamp-default-rtdb.asia-southeast1.firebasedatabase.app/quiz_results.json');
const data = await response.json();

if (!data) {
    console.log("Hiện chưa có dữ liệu nộp bài nào.");
} else {
    console.log("KẾT QUẢ CÁC BÀI TEST:");
    console.log("------------------------");
    
    // Convert object to array and sort by submission time
    const entries = Object.values(data).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    entries.forEach((item, index) => {
        const email = item.email || "Không rõ Email";
        const score = item.score ? item.score : "Chưa chấm điểm";
        
        let dateSubmitted = "Không rõ thời gian";
        if (item.timestamp) {
            const date = new Date(item.timestamp);
            // format: DD/MM/YYYY HH:mm:ss
            dateSubmitted = date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        }
        
        console.log(`${index + 1}. [${email}]: ${score} | ${dateSubmitted}`);
    });
}
