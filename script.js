// Import các hàm từ Firebase (với Firebase v9+ modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, set, serverTimestamp, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDJsvWI-J9pc-JhzheR_C4xQXhCNbWDnFI",
  authDomain: "project-course-985d2.firebaseapp.com",
  projectId: "project-course-985d2",
  storageBucket: "project-course-985d2.firebasestorage.app",
  messagingSenderId: "332733702113",
  appId: "1:332733702113:web:fa1503e178361455d83ca0",
  measurementId: "G-SG3NJ1FHXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Cấu hình Telegram
const TELEGRAM_BOT_TOKEN = "8601457526:AAEDpglDCgTX_qBoRDWNddVXK4MR-IS4AwE";
const TELEGRAM_GROUP_ID = "-5207532142";

// Hàm gửi thông báo Telegram (gọi thẳng, không cần server)
async function sendTelegramNotification({ email, phone, score, totalQuestions, timestamp }) {
    try {
        // Lấy tổng số submit từ Firebase
        const dbRef = ref(database, 'quiz_results');
        const snapshot = await get(dbRef);
        const totalSubmits = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

        const text = 
`📝 Có học viên hoàn thành bài test!

📧 Email: ${email}
📞 SĐT: ${phone || 'Chưa nhập'}
📊 Đáp án: ${score}
👥 Tổng submit: ${totalSubmits}`;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_GROUP_ID,
                text: text
            })
        });
        console.log("Đã gửi thông báo Telegram");
    } catch (error) {
        console.error("Lỗi khi gửi Telegram:", error);
    }
}

// BỘ CÂU HỎI
const quizData = [
    { question: "Ngành ngân hàng chủ yếu cung cấp loại dịch vụ nào?", options: ["Dịch vụ tài chính trung gian", "Sản xuất công nghiệp", "Dịch vụ vận tải", "Dịch vụ nông nghiệp"], correct: 0 },
    { question: "Chuyển khoản liên ngân hàng là gì?", options: ["Chuyển tiền giữa các ngân hàng khác nhau", "Chuyển tiền trong cùng ngân hàng", "Chuyển tiền quốc tế", "Chuyển tiền bằng tiền mặt"], correct: 0 },
    { question: "Core Banking là hệ thống gì?", options: ["Hệ thống quản lý khách hàng", "Hệ thống lõi xử lý giao dịch ngân hàng", "Hệ thống thanh toán QR", "Hệ thống ATM"], correct: 1 },
    { question: "KYC dùng để làm gì?", options: ["Xác minh danh tính khách hàng", "Tính lãi suất", "Quản lý thẻ", "Tính phí giao dịch"], correct: 0 },
    { question: "BA làm gì khi business và IT hiểu khác nhau về yêu cầu?", options: ["Bỏ qua sự khác biệt", "Cầu nối, giải thích để cả hai hiểu nhau", "Chọn phía business", "Chọn phía IT"], correct: 1 },
    { question: "Use Case dùng để làm gì?", options: ["Mô tả tương tác giữa user và hệ thống", "Tính toán chi phí", "Quản lý nhân sự", "Lập kế hoạch dự án"], correct: 0 },
    { question: "Savings Account chủ yếu dùng để làm gì?", options: ["Tích lũy tiền và hưởng lãi", "Chuyển tiền quốc tế", "Quản lý thẻ tín dụng", "Đầu tư chứng khoán"], correct: 0 },
    { question: "User Story thường có format nào?", options: ["As a [user], I want [feature], so that [benefit]", "Input – Process – Output", "If – Then", "Action – Result"], correct: 0 },
    { question: "Internal Transfer là gì?", options: ["Chuyển tiền giữa hai ngân hàng", "Chuyển tiền trong cùng ngân hàng", "Chuyển tiền quốc tế", "Chuyển tiền bằng tiền mặt"], correct: 1 },
    { question: "Chức năng chính của hệ thống chuyển mạch tài chính và bù trừ điện tử NAPAS?", options: ["Chuyển tiền nhanh liên ngân hàng", "Quản lý CIF", "Tính lãi suất", "Quản lý khoản vay"], correct: 0 },
    { question: "Stakeholder là ai?", options: ["Người viết code", "Người hoặc tổ chức có ảnh hưởng hoặc bị ảnh hưởng bởi dự án", "Người test", "Người deploy"], correct: 1 },
    { question: "Nếu rút tiền trước hạn từ tiền gửi có kỳ hạn thì điều gì xảy ra?", options: ["Vẫn hưởng lãi ban đầu", "Áp dụng lãi suất không kỳ hạn", "Không được rút", "Lãi tăng"], correct: 1 },
    { question: "Điều kiện để chuyển tiền là gì?", options: ["Tài khoản active", "Có đủ số dư", "Không vượt hạn mức", "Tất cả các điều kiện trên"], correct: 3 },
    { question: "Requirement document là gì?", options: ["Tài liệu mô tả yêu cầu chi tiết của dự án", "Tài liệu lập trình", "Tài liệu test", "Tài liệu triển khai"], correct: 0 },
    { question: "Settlement trong ngân hàng là gì?", options: ["Chuyển tiền thực tế", "Kiểm tra AML", "Xác thực OTP", "Phát hành thẻ"], correct: 0 },
    { question: "Available Balance trong ngân hàng là gì?", options: ["Tổng tiền từng nạp", "Tiền có thể sử dụng ngay", "Tổng tiền trong ngân hàng", "Tiền đã rút"], correct: 1 },
    { question: "Vai trò chính của BA trong dự án là gì?", options: ["Phân tích nghiệp vụ và đặc tả yêu cầu", "Viết code", "Setup server", "Network"], correct: 0 },
    { question: "EOD trong ngân hàng là gì?", options: ["End Of Deposit", "End Of Day", "End Of Debit", "End Of Data"], correct: 1 },
    { question: "Deliverable quan trọng của BA là gì?", options: ["Requirement document", "Source code", "Database", "Server configuration"], correct: 0 },
    { question: "Internet Banking / Mobile Banking khác nhau như thế nào?", options: ["Không có khác biệt", "Internet Banking truy cập qua trình duyệt web, Mobile Banking sử dụng ứng dụng trên điện thoại", "Cùng một dịch vụ", "Mobile Banking chỉ cho vay"], correct: 1 }
];

document.addEventListener('DOMContentLoaded', () => {
    const googleBtnContainer = document.getElementById('googleBtnContainer');
    const googleCustomBtn = document.getElementById('googleCustomBtn');
    const userInfo = document.getElementById('userInfo');
    const userAvatar = document.getElementById('userAvatar');
    const userEmail = document.getElementById('googleUserEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const quizForm = document.getElementById('quizForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const successMessage = document.getElementById('successMessage');
    
    // Các phần mới hiển thị data
    const displayEmail = document.getElementById('displayEmail');
    const displayPhone = document.getElementById('displayPhone');

    // Hàm decode token JWT của Google
    function decodeJwtResponse(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    // ============================================
    // KIỂM TRA ĐĂNG NHẬP (URL PARAMS HOẶC GOOGLE)
    // ============================================
    const urlParams = new URLSearchParams(window.location.search);
    const prefillEmail = urlParams.get('at_email');
    const prefillPhone = urlParams.get('at_phone');

    // 1. Luôn xóa Email để chờ Google
    if (displayEmail) displayEmail.value = "";

    // 2. Điền SĐT nếu có trong link
    if (prefillPhone) {
        if (displayPhone) displayPhone.value = prefillPhone;
    }

    // 3. Xử lý UI nếu có đủ tham số (như từ Trang 1 sang)
    if (prefillEmail && prefillPhone) {
        if (googleCustomBtn) googleCustomBtn.classList.add('hidden');
        if (userInfo) userInfo.classList.remove('hidden');
        
        userAvatar.src = "https://www.gstatic.com/identity/boq/gsi/images/google-logo.png";
        if (userEmail) userEmail.textContent = "Vui lòng Đăng nhập Google để xác thực"; 
        
        quizForm.classList.remove('hidden');
    }

    // Callback khi đăng nhập Google thành công
    window.handleGoogleLogin = (response) => {
        const payload = decodeJwtResponse(response.credential);
        
        if (googleCustomBtn) googleCustomBtn.classList.add('hidden');
        if (userInfo) userInfo.classList.remove('hidden');
        
        userAvatar.src = payload.picture;
        if (userEmail) userEmail.textContent = payload.email;
        
        if (displayEmail) displayEmail.value = payload.email;
        if (displayPhone) displayPhone.placeholder = "Vui lòng nhập SĐT";

        quizForm.classList.remove('hidden');
    };

    const GOOGLE_CLIENT_ID = "336018277787-0prgo2k750aft6678cdeioqgptic9kq3.apps.googleusercontent.com";
    
    const renderIconBtn = () => {
        if (window.google) {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin,
                auto_select: false,
                itp_support: true
            });
            google.accounts.id.renderButton(
                googleBtnContainer,
                { theme: "outline", size: "large", shape: "circle", type: "icon" }
            );
        }
    };

    setTimeout(renderIconBtn, 500); 

    // Kích hoạt click cho phần vỏ bọc bên ngoài
    if (googleCustomBtn) {
        googleCustomBtn.addEventListener('click', () => {
            if (window.google) google.accounts.id.prompt();
        });
    }

    // XỬ LÝ ĐĂNG XUẤT
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (userInfo) userInfo.classList.add('hidden');
            if (googleCustomBtn) googleCustomBtn.classList.remove('hidden');
            
            // CHỈ xóa sạch email, KHÔNG xóa số điện thoại theo yêu cầu
            if (displayEmail) displayEmail.value = "";
            if (userEmail) userEmail.textContent = "";

            quizForm.classList.add('hidden');
            successMessage.classList.add('hidden');
            
            if (window.google) {
                google.accounts.id.disableAutoSelect();
                renderIconBtn();
            }
        });
    }

    // RENDER CÂU HỎI
    function renderQuiz() {
        questionsContainer.innerHTML = '';
        quizData.forEach((item, index) => {
            const qBlock = document.createElement('div');
            qBlock.className = 'question-block';
            
            let optionsHtml = '';
            item.options.forEach((opt, optIdx) => {
                optionsHtml += `
                    <label class="option-label">
                        <input type="radio" name="q${index}" value="${optIdx}" required>
                        <span class="custom-radio"></span>
                        <span class="option-text">${opt}</span>
                    </label>
                `;
            });

            qBlock.innerHTML = `
                <div class="question-title">
                    <span class="q-num">${index + 1}</span>
                    <span>${item.question}</span>
                </div>
                <div class="options-group">
                    ${optionsHtml}
                </div>
            `;
            questionsContainer.appendChild(qBlock);
        });
    }

    renderQuiz();

    // XỬ LÝ NỘP BÀI
    quizForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = quizForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Đang nộp...';

        let score = 0;
        quizData.forEach((item, index) => {
            const selected = quizForm.querySelector(`input[name="q${index}"]:checked`);
            if (selected && parseInt(selected.value) === item.correct) {
                score++;
            }
        });

        window.scoreString = `${score}/${quizData.length}`;

        const submittedData = {
            email: userEmail.textContent,
            score: window.scoreString,
            timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
        };

        try {
            const resultRef = ref(database, 'quiz_results');
            const newResultRef = push(resultRef);
            await set(newResultRef, submittedData);

            sendTelegramNotification({
                email: userEmail.textContent,
                phone: userEmail.dataset.phone || 'Chưa rõ',
                score: window.scoreString,
                timestamp: submittedData.timestamp,
                totalQuestions: quizData.length
            });

            quizForm.classList.add('hidden');
            successMessage.classList.remove('hidden');

        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!");
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Nộp bài';
        }
    });

    // Reset test
    window.resetQuiz = () => {
        quizForm.reset();
        successMessage.classList.add('hidden');
        quizForm.classList.remove('hidden');
    };
});
