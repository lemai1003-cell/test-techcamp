document.addEventListener('DOMContentLoaded', () => {
    const googleLoginBtn = document.getElementById('googleLoginBtn');
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

    // Danh sách 20 câu hỏi trắc nghiệm Banking
    const quizData = [
        { id: 1, q: "Ngành ngân hàng chủ yếu cung cấp loại dịch vụ nào?", a: "Dịch vụ tài chính trung gian", b: "Sản xuất công nghiệp", c: "Dịch vụ vận tải", d: "Dịch vụ nông nghiệp" },
        { id: 2, q: "Chuyển khoản liên ngân hàng là gì?", a: "Chuyển tiền giữa các ngân hàng khác nhau", b: "Chuyển tiền trong cùng ngân hàng", c: "Chuyển tiền quốc tế", d: "Chuyển tiền bằng tiền mặt" },
        { id: 3, q: "Core Banking là hệ thống gì?", a: "Hệ thống quản lý khách hàng", b: "Hệ thống lõi xử lý giao dịch ngân hàng", c: "Hệ thống thanh toán QR", d: "Hệ thống ATM" },
        { id: 4, q: "KYC dùng để làm gì?", a: "Xác minh danh tính khách hàng", b: "Tính lãi suất", c: "Quản lý thẻ", d: "Tính phí giao dịch" },
        { id: 5, q: "AML là viết tắt của gì?", a: "Anti Money Laundering", b: "Automatic Money Logic", c: "Account Management Level", d: "Advanced Market Loan" },
        { id: 6, q: "Current Account là loại tài khoản nào?", a: "Tài khoản thanh toán", b: "Tài khoản tiết kiệm", c: "Tài khoản vay", d: "Tài khoản đầu tư" },
        { id: 7, q: "Savings Account chủ yếu dùng để làm gì?", a: "Tích lũy tiền và hưởng lãi", b: "Chuyển tiền quốc tế", c: "Quản lý thẻ tín dụng", d: "Đầu tư chứng khoán" },
        { id: 8, q: "Term Deposit là gì?", a: "Tiền gửi có kỳ hạn", b: "Tiền gửi không kỳ hạn", c: "Khoản vay", d: "Tài khoản thanh toán" },
        { id: 9, q: "Internal Transfer là gì?", a: "Chuyển tiền giữa hai ngân hàng", b: "Chuyển tiền trong cùng ngân hàng", c: "Chuyển tiền quốc tế", d: "Chuyển tiền bằng tiền mặt" },
        { id: 10, q: "NAPAS dùng để làm gì?", a: "Chuyển tiền nhanh liên ngân hàng", b: "Quản lý CIF", c: "Tính lãi suất", d: "Quản lý khoản vay" },
        { id: 11, q: "SWIFT chủ yếu dùng cho giao dịch nào?", a: "Chuyển tiền nội bộ", b: "Chuyển tiền quốc tế", c: "Thanh toán QR", d: "Thanh toán hóa đơn" },
        { id: 12, q: "Nếu rút tiền trước hạn từ tiền gửi có kỳ hạn thì điều gì xảy ra?", a: "Vẫn hưởng lãi ban đầu", b: "Áp dụng lãi suất không kỳ hạn", c: "Không được rút", d: "Lãi tăng" },
        { id: 13, q: "Điều kiện để chuyển tiền là gì?", a: "Tài khoản active", b: "Có đủ số dư", c: "Không vượt hạn mức", d: "Tất cả" },
        { id: 14, q: "Clearing là gì?", a: "Chuyển tiền thực tế", b: "Xác nhận nghĩa vụ thanh toán", c: "Hạch toán GL", d: "Xóa giao dịch" },
        { id: 15, q: "Settlement là gì?", a: "Chuyển tiền thực tế", b: "Kiểm tra AML", c: "Xác thực OTP", d: "Phát hành thẻ" },
        { id: 16, q: "Available Balance là gì?", a: "Tổng tiền từng nạp", b: "Tiền có thể sử dụng ngay", c: "Tổng tiền trong ngân hàng", d: "Tiền đã rút" },
        { id: 17, q: "CITAD là hệ thống gì?", a: "Thanh toán quốc tế", b: "Thanh toán bù trừ liên ngân hàng theo phiên", c: "Hệ thống ATM", d: "Hệ thống ví điện tử" },
        { id: 18, q: "EOD trong ngân hàng là gì?", a: "End Of Deposit", b: "End Of Day", c: "End Of Debit", d: "End Of Data" },
        { id: 19, q: "Bạn biết những sản phẩm chính của ngân hàng nào?", a: "Chỉ tài khoản thanh toán", b: "Tài khoản, vay, thẻ, bảo hiểm", c: "Chỉ tiền gửi tiết kiệm", d: "Chỉ dịch vụ chuyển tiền" },
        { id: 20, q: "Internet Banking / Mobile Banking khác nhau như thế nào?", a: "Không có khác biệt", b: "Internet Banking qua web, Mobile Banking qua app", c: "Cùng một dịch vụ", d: "Mobile Banking chỉ cho vay" }
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
                            <input type="radio" name="q${item.id}" value="A" required>
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

    // MÔ PHỎNG ĐĂNG NHẬP GOOGLE
    // Ghi chú cho dự án thật: Hãy tích hợp Google Identity Services (GSI) 
    // bằng thư viện google tài liệu: https://developers.google.com/identity/gsi/web/guides/overview
    googleLoginBtn.addEventListener('click', () => {
        // Dữ liệu mô phỏng
        const mockUser = {
            email: 'ungvien.gioi@gmail.com',
            // Sử dụng một avatar placeholder ngẫu nhiên đẹp mắt
            photoUrl: 'https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff&size=128&rounded=true'
        };

        // Cập nhật giao diện
        googleLoginBtn.classList.add('hidden');
        userInfo.classList.remove('hidden');
        
        userAvatar.src = mockUser.photoUrl;
        userEmail.textContent = mockUser.email;

        // Hiển thị form bài test
        quizForm.classList.remove('hidden');
    });

    // XỬ LÝ ĐĂNG XUẤT
    logoutBtn.addEventListener('click', () => {
        userInfo.classList.add('hidden');
        googleLoginBtn.classList.remove('hidden');
        quizForm.classList.add('hidden');
        successMessage.classList.add('hidden');
        quizForm.reset();
    });

    // XỬ LÝ NÚT VỀ TRƯỚC (QUAY LẠI MÀN HÌNH CHỌN EMAIL)
    backBtn.addEventListener('click', () => {
        userInfo.classList.add('hidden');
        googleLoginBtn.classList.remove('hidden');
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
        
        quizData.forEach(item => {
            answers[`question_${item.id}`] = formData.get(`q${item.id}`);
        });

        const submittedData = {
            email: userEmail.textContent,
            answers: answers,
            timestamp: new Date().toISOString()
        };

        console.log('Dữ liệu chuẩn bị gửi đi:', submittedData);

        // TODO: Ở đây bạn sẽ dùng fetch() POST dữ liệu lên server hoặc Google Apps Script
        
        // Hiển thị thông báo thành công
        authSection.classList.add('hidden');
        quizForm.classList.add('hidden');
        successMessage.classList.remove('hidden');
    });

    // BUTTON LÀM LẠI BÀI CHO QUÁ TRÌNH TEST DEMO
    resetBtn.addEventListener('click', () => {
        successMessage.classList.add('hidden');
        authSection.classList.remove('hidden');
        quizForm.classList.remove('hidden');
        quizForm.reset();
    });
});
