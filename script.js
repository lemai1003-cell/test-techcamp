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
const TELEGRAM_BOT_TOKEN = "7292150917:AAEvL-C_1zX6VpGvK6ZfC27q7a75G9-f7i4";
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
    { question: "Mục tiêu chính của một Business Analyst trong dự án là gì?", options: ["Lập trình code", "Thiết kế giao diện", "Kết nối yêu cầu kinh doanh với giải pháp kỹ thuật", "Kiểm thử lỗi phần mềm"], correct: 2 },
    { question: "Khái niệm 'Wholesale Banking' thường ám chỉ đối tượng khách hàng nào?", options: ["Cá nhân nhỏ lẻ", "Các tập đoàn và doanh nghiệp lớn", "Khách hàng ưu tiên", "Sinh viên"], correct: 1 },
    { question: "Trong quy trình phát triển phần mềm Agile, BA thường đóng vai trò nào?", options: ["Project Manager", "Scrum Master", "Product Owner hoặc hỗ trợ PO", "Lead Developer"], correct: 2 },
    { question: "Lending là gì trong lĩnh vực ngân hàng?", options: ["Gửi tiết kiệm", "Thanh toán hóa đơn", "Cho vay và cấp tín dụng", "Dịch vụ thẻ"], correct: 2 },
    { question: "Biểu đồ nào thường được BA dùng để mô tả quy trình nghiệp vụ?", options: ["BPMN hoặc Flowchart", "Pie Chart", "Bar Chart", "Gantt Chart"], correct: 0 },
    { question: "Hệ thống Core Banking có chức năng gì?", options: ["Quản lý nhân sự", "Quản lý giao dịch tài chính cốt lõi của ngân hàng", "Quản lý email công ty", "Thiết kế website"], correct: 1 },
    { question: "Đặc điểm của kỹ thuật phỏng vấn (Interview) trong thu thập yêu cầu là gì?", options: ["Thu thập dữ liệu từ hàng ngàn người", "Trao đổi trực tiếp để hiểu sâu về nhu cầu", "Quan sát thói quen người dùng", "Chạy thử phần mềm"], correct: 1 },
    { question: "Khái niệm 'Backlog' trong dự án là gì?", options: ["Lỗi phần mềm", "Danh sách các yêu cầu cần thực hiện", "Hợp đồng kinh tế", "Tài liệu thiết kế database"], correct: 1 },
    { question: "Trong ngân hàng, KYC viết tắt của cụm từ nào?", options: ["Keep Your Cache", "Key Yield Concept", "Know Your Customer", "Knowledge Yield Credit"], correct: 2 },
    { question: "Kỹ năng nào là quan trọng NHẤT đối với một BA?", options: ["Kỹ năng lập trình Java", "Kỹ năng giao tiếp và lắng nghe", "Kỹ năng sửa chữa phần cứng", "Kỹ năng đồ họa"], correct: 1 }
];

document.addEventListener('DOMContentLoaded', () => {
    const googleButtonContainer = document.getElementById('googleButtonContainer');
    const userInfo = document.getElementById('userInfo');
    const userAvatar = document.getElementById('userAvatar');
    const userEmail = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const quizForm = document.getElementById('quizForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const successMessage = document.getElementById('successMessage');
    const loginStatus = document.getElementById('loginStatus');

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

    if (prefillEmail && prefillPhone) {
        // Tự động vào nếu có params từ Web 1
        if (googleButtonContainer) googleButtonContainer.classList.add('hidden');
        if (userInfo) userInfo.classList.remove('hidden');
        
        userAvatar.src = "https://www.gstatic.com/identity/boq/gsi/images/google-logo.png";
        userEmail.textContent = prefillEmail;
        userEmail.dataset.phone = prefillPhone; 
        
        quizForm.classList.remove('hidden');
    }

    // Callback khi đăng nhập Google thành công
    window.handleGoogleLogin = (response) => {
        const payload = decodeJwtResponse(response.credential);
        
        if (googleButtonContainer) googleButtonContainer.classList.add('hidden');
        if (userInfo) userInfo.classList.remove('hidden');
        
        userAvatar.src = payload.picture;
        userEmail.textContent = payload.email;
        quizForm.classList.remove('hidden');
    };

    const GOOGLE_CLIENT_ID = "336018277787-0prgo2k750aft6678cdeioqgptic9kq3.apps.googleusercontent.com";
    
    setTimeout(() => {
        if (window.google) {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin,
                auto_select: false,
                itp_support: true,
                use_fedcm_for_prompt: true
            });
            google.accounts.id.renderButton(
                googleBtnContainer,
                { 
                    theme: "outline", 
                    size: "large", 
                    shape: "pill", 
                    width: "250", 
                    text: "signin_with",
                    logo_alignment: "left"
                }
            );
        }
    }, 500); 

    // XỬ LÝ ĐĂNG XUẤT
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (userInfo) userInfo.classList.add('hidden');
            if (googleButtonContainer) googleButtonContainer.classList.remove('hidden');
            
            quizForm.classList.add('hidden');
            successMessage.classList.add('hidden');
            
            if (window.google) {
                google.accounts.id.disableAutoSelect();
                google.accounts.id.renderButton(
                    googleButtonContainer,
                    { 
                        theme: "outline", 
                        size: "large", 
                        shape: "pill", 
                        width: "250", 
                        text: "signin_with",
                        logo_alignment: "left"
                    }
                );
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
            timestamp: serverTimestamp()
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
