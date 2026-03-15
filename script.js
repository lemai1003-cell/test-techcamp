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
        const q1 = formData.get('q1');
        const q2 = formData.get('q2');

        const submittedData = {
            email: userEmail.textContent,
            answers: {
                question_1: q1,
                question_2: q2
            },
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
