import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Khởi tạo Firebase từ Config trong hình
const firebaseConfig = {
  apiKey: "AIzaSyBjv43edl5DwCqu78gFDW-vXjkVPWwWFQ", 
  authDomain: "test-techcamp.firebaseapp.com",
  projectId: "test-techcamp",
  storageBucket: "test-techcamp.firebasestorage.app",
  messagingSenderId: "780762284438",
  appId: "1:780762284438:web:9714fc25c9cdec51295db7",
  measurementId: "G-XGKW71LSZF",
  databaseURL: "https://test-techcamp-default-rtdb.asia-southeast1.firebasedatabase.app" // Sửa lại theo location Singapore
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const googleButtonContainer = document.getElementById('googleButtonContainer');
    const userInfo = document.getElementById('userInfo');
    const userAvatar = document.getElementById('userAvatar');
    const userEmail = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const quizForm = document.getElementById('quizForm');
    const successMessage = document.getElementById('successMessage');
    const authSection = document.getElementById('authSection');
    const resetBtn = document.getElementById('resetBtn');
    const backBtn = document.getElementById('backBtn');
    const questionsContainer = document.getElementById('questionsContainer');
    const cardHeader = document.getElementById('cardHeader');

    // Danh sách 20 câu hỏi trắc nghiệm Banking
    const quizData = [
        { id: 1, q: "Ngành ngân hàng chủ yếu cung cấp loại dịch vụ nào?", a: "Dịch vụ tài chính trung gian", b: "Sản xuất công nghiệp", c: "Dịch vụ vận tải", d: "Dịch vụ nông nghiệp", ans: "A" },
        { id: 2, q: "Chuyển khoản liên ngân hàng là gì?", a: "Chuyển tiền giữa các ngân hàng khác nhau", b: "Chuyển tiền trong cùng ngân hàng", c: "Chuyển tiền quốc tế", d: "Chuyển tiền bằng tiền mặt", ans: "A" },
        { id: 3, q: "Core Banking là hệ thống gì?", a: "Hệ thống quản lý khách hàng", b: "Hệ thống lõi xử lý giao dịch ngân hàng", c: "Hệ thống thanh toán QR", d: "Hệ thống ATM", ans: "B" },
        { id: 4, q: "KYC dùng để làm gì?", a: "Xác minh danh tính khách hàng", b: "Tính lãi suất", c: "Quản lý thẻ", d: "Tính phí giao dịch", ans: "A" },
        { id: 5, q: "BA làm gì khi business và IT hiểu khác nhau về yêu cầu?", a: "Bỏ qua sự khác biệt", b: "Cầu nối, giải thích để cả hai hiểu nhau", c: "Chọn phía business", d: "Chọn phía IT", ans: "B" },
        { id: 6, q: "Use Case dùng để làm gì?", a: "Mô tả tương tác giữa user và hệ thống", b: "Tính toán chi phí", c: "Quản lý nhân sự", d: "Lập kế hoạch dự án", ans: "A" },
        { id: 7, q: "Savings Account chủ yếu dùng để làm gì?", a: "Tích lũy tiền và hưởng lãi", b: "Chuyển tiền quốc tế", c: "Quản lý thẻ tín dụng", d: "Đầu tư chứng khoán", ans: "A" },
        { id: 8, q: "User Story thường có format nào?", a: "As a [user], I want [feature], so that [benefit]", b: "Input – Process – Output", c: "If – Then", d: "Action – Result", ans: "A" },
        { id: 9, q: "Internal Transfer là gì?", a: "Chuyển tiền giữa hai ngân hàng", b: "Chuyển tiền trong cùng ngân hàng", c: "Chuyển tiền quốc tế", d: "Chuyển tiền bằng tiền mặt", ans: "B" },
        { id: 10, q: "Chức năng chính của hệ thống chuyển mạch tài chính và bù trừ điện tử NAPAS?", a: "Chuyển tiền nhanh liên ngân hàng", b: "Quản lý CIF", c: "Tính lãi suất", d: "Quản lý khoản vay", ans: "A" },
        { id: 11, q: "Người hoặc tổ chức có ảnh hưởng hoặc bị ảnh hưởng bởi dự án?", a: "Người viết code", b: "Người liên quan đến dự án", c: "Người test", d: "Người deploy", ans: "B" },
        { id: 12, q: "Nếu rút tiền trước hạn từ tiền gửi có kỳ hạn thì điều gì xảy ra?", a: "Vẫn hưởng lãi ban đầu", b: "Áp dụng lãi suất không kỳ hạn", c: "Không được rút", d: "Lãi tăng", ans: "B" },
        { id: 13, q: "Điều kiện để chuyển tiền là gì?", a: "Tài khoản active", b: "Có đủ số dư", c: "Không vượt hạn mức", d: "Tất cả", ans: "D" },
        { id: 14, q: "Requirement document là gì?", a: "Tài liệu mô tả yêu cầu chi tiết của dự án", b: "Tài liệu lập trình", c: "Tài liệu test", d: "Tài liệu triển khai", ans: "A" },
        { id: 15, q: "Settlement trong ngân hàng là gì?", a: "Chuyển tiền thực tế", b: "Kiểm tra AML", c: "Xác thực OTP", d: "Phát hành thẻ", ans: "A" },
        { id: 16, q: "Available Balance trong ngân hàng là gì?", a: "Tổng tiền từng nạp", b: "Tiền có thể sử dụng ngay", c: "Tổng tiền trong ngân hàng", d: "Tiền đã rút", ans: "B" },
        { id: 17, q: "Vai trò chính của BA trong dự án là gì?", a: "Phân tích nghiệp vụ và đặc tả yêu cầu", b: "Viết code", c: "Server setup", d: "Network", ans: "A" },
        { id: 18, q: "EOD trong ngân hàng là gì?", a: "End Of Deposit", b: "End Of Day", c: "End Of Debit", d: "End Of Data", ans: "B" },
        { id: 19, q: "Deliverable quan trọng của BA là gì?", a: "Requirement document", b: "Source code", c: "Database", d: "Server", ans: "A" },
        { id: 20, q: "Internet Banking / Mobile Banking khác nhau như thế nào?", a: "Không có khác biệt", b: "Internet Banking truy cập qua trình duyệt web, Mobile Banking sử dụng ứng dụng trên điện thoại", c: "Cùng một dịch vụ", d: "Mobile Banking chỉ cho vay", ans: "B" }
    ];

    // Tạo HTML cho các câu hỏi
    function renderQuestions() {
        let html = '';
        quizData.forEach(item => {
            html += `
                <div class="question-block">
                    <h3 class="question-title">
                        <span class="q-num">${item.id}</span> 
                        <span class="q-content">${item.q}</span>
                    </h3>
                    <div class="options-group">
                        <label class="option-label">
                            <input type="radio" name="q${item.id}" value="A">
                            <span class="custom-radio"></span>
                            <span class="option-text">${item.a}</span>
                        </label>
                        <label class="option-label">
                            <input type="radio" name="q${item.id}" value="B">
                            <span class="custom-radio"></span>
                            <span class="option-text">${item.b}</span>
                        </label>
                        <label class="option-label">
                            <input type="radio" name="q${item.id}" value="C">
                            <span class="custom-radio"></span>
                            <span class="option-text">${item.c}</span>
                        </label>
                        <label class="option-label">
                            <input type="radio" name="q${item.id}" value="D">
                            <span class="custom-radio"></span>
                            <span class="option-text">${item.d}</span>
                        </label>
                    </div>
                </div>
            `;
        });
        questionsContainer.innerHTML = html;
    }
    
    // Gọi hàm render để hiển thị 20 câu hỏi ra màn hình
    renderQuestions();

    // HÀM GIẢI MÃ TOKEN GOOGLE
    function decodeJwtResponse(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    // XỬ LÝ KHI ĐĂNG NHẬP GOOGLE THÀNH CÔNG
    window.handleGoogleLogin = (response) => {
        const payload = decodeJwtResponse(response.credential);
        console.log("Đăng nhập thành công:", payload.email);

        // Cập nhật giao diện
        googleButtonContainer.classList.add('hidden');
        userInfo.classList.remove('hidden');
        
        userAvatar.src = payload.picture;
        userEmail.textContent = payload.email;

        // Hiển thị form bài test
        quizForm.classList.remove('hidden');
    };

    // KHỞI TẠO NÚT GOOGLE (Cần thay thế YOUR_CLIENT_ID_HERE bằng ID thật)
    const GOOGLE_CLIENT_ID = "336018277787-0prgo2k750aft6678cdeioqgptic9kq3.apps.googleusercontent.com";
    
    // Đợi thư viện Google load xong
    setTimeout(() => {
        if (window.google) {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin
            });
            google.accounts.id.renderButton(
                googleButtonContainer,
                { theme: "outline", size: "large", shape: "pill", width: "250" }
            );
        }
    }, 500); // Thêm delay nhỏ để chắc chắn thư viện Google đã load 

    // XỬ LÝ ĐĂNG XUẤT
    logoutBtn.addEventListener('click', () => {
        userInfo.classList.add('hidden');
        googleButtonContainer.classList.remove('hidden');
        quizForm.classList.add('hidden');
        successMessage.classList.add('hidden');
        quizForm.reset();
        if (window.google) google.accounts.id.disableAutoSelect(); // Đăng xuất khỏi hệ thống Google
    });

    // XỬ LÝ NÚT VỀ TRƯỚC (QUAY LẠI MÀN HÌNH CHỌN EMAIL)
    backBtn.addEventListener('click', () => {
        userInfo.classList.add('hidden');
        googleButtonContainer.classList.remove('hidden');
        quizForm.classList.add('hidden');
        quizForm.reset();
    });

    // XỬ LÝ GỬI FORM NHẬN ĐÁP ÁN
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Kiểm tra xem đã đăng nhập chưa (đề phòng chỉnh sửa HTML)
        if (userInfo.classList.contains('hidden')) {
            alert('Vui lòng đăng nhập Google trước khi gửi đáp án!');
            return;
        }

        // Lấy dữ liệu bài làm
        const formData = new FormData(quizForm);
        const answers = {};
        let correctCount = 0;
        
        quizData.forEach(item => {
            const selectedOption = formData.get(`q${item.id}`);
            answers[`question_${item.id}`] = selectedOption || null;
            
            // Đối chiếu đáp án đúng
            if (selectedOption === item.ans) {
                correctCount++;
            }
        });

        // scoreString nay se duoc public ra block try
        window.scoreString = `${correctCount}/${quizData.length}`;

        const submittedData = {
            email: userEmail.textContent,
            answers: answers,
            score: window.scoreString,  // Ghi nhận điểm lên Database
            timestamp: new Date().toISOString()
        };

        // Bổ sung hiệu ứng nút đang xử lý để user biết đã bấm
        const submitBtn = quizForm.querySelector('.submit-btn');
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Đang gửi dữ liệu...</span>';
        submitBtn.disabled = true;

        console.log('Dữ liệu chuẩn bị gửi đi:', submittedData);

        // Lưu thông tin vào Firebase
        try {
            const dbRef = ref(database, 'quiz_results');
            
            // Firebase sẽ tự lo phần đồng bộ mạng ngầm
            push(dbRef, submittedData)
                .then(() => console.log("Đã đồng bộ kết quả lên Firebase thành công ngầm!"))
                .catch(err => console.error("Lỗi đồng bộ ngầm: ", err));

            // Hiển thị giao diện thành công NGAY LẬP TỨC 
            // KHÔNG BẮT NGƯỜI DÙNG PHẢI CHỜ (UI Optimistic)
            setTimeout(() => { // delay nhẹ 0.5s cho chân thực
                authSection.classList.add('hidden');
                quizForm.classList.add('hidden');
                cardHeader.classList.add('hidden');

                // Cập nhật điểm số lên màn hình
                const scoreDisplay = document.getElementById('scoreDisplay');
                if (scoreDisplay) {
                    scoreDisplay.innerHTML = `Bạn đã trả lời đúng <strong>${window.scoreString}</strong> câu hỏi.`;
                }

                successMessage.classList.remove('hidden');
                
                // Trả lại trạng thái cho nút
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
            }, 500);

        } catch (err) {
            console.error("Lỗi kết nối bộ xử lý Firebase:", err);
            alert("Vui lòng tải lại trang và thử một lần nữa!");
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;
        }

    });

    // BUTTON LÀM LẠI BÀI CHO QUÁ TRÌNH TEST DEMO
    resetBtn.addEventListener('click', () => {
        successMessage.classList.add('hidden');
        cardHeader.classList.remove('hidden');
        if (!window.currentUser) {
            authSection.classList.remove('hidden');
        } else {
            quizForm.classList.remove('hidden');
        }
        quizForm.reset();
    });
});
