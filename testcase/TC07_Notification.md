# BẢNG TEST CASES - PHÂN HỆ 7: TRUNG TÂM THÔNG BÁO (NOTIFICATION)

> Bao phủ: FR-NOTIF-01 đến FR-NOTIF-05 | AC-AUTH-01, AC-MCH-02, AC-RIDE-01 | Chuẩn 8 cột ngang Excel

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-NOTIF-001 | Thông báo In-App | Bắn thông báo đẩy In-app khi tài xế chấp nhận cuốc | Tài xế vừa bấm nhận cuốc xe | 1. Server kích hoạt sự kiện thông báo<br>2. App khách hàng nhận socket | Tiêu đề: 'Đã tìm thấy tài xế!' | Khách hàng nhận popup thông báo tên tài xế, biển số xe và thời gian đến dự kiến | High |
| TC-NOTIF-002 | Thông báo Email | Gửi email hóa đơn tự động sau khi thanh toán thành công | Cuốc xe thanh toán hoàn tất | 1. Hệ thống tạo hóa đơn<br>2. Kích hoạt hàng đợi gửi email nền | Email nhận: customer@example.com | Khách hàng nhận được email chứa chi tiết biên lai cước phí trong vòng 30 giây | Medium |
| TC-NOTIF-003 | Hộp thư thông báo | Người dùng xem danh sách thông báo cá nhân | Đã đăng nhập | 1. Mở màn hình Chuông thông báo (GET /api/v1/notifications) | User Token | HTTP 200 OK, trả về danh sách thông báo phân trang, hiển thị rõ tin chưa đọc (isRead=false) | Medium |
| TC-NOTIF-004 | Đánh dấu đã đọc | Đánh dấu 1 thông báo cụ thể là đã đọc | Có thông báo chưa đọc | 1. Bấm vào thông báo để xem chi tiết | PUT /api/v1/notifications/:id/read | isRead chuyển sang true, số lượng badge thông báo chưa đọc giảm 1, HTTP 200 OK | Low |
| TC-NOTIF-005 | Đánh dấu đã đọc | Đánh dấu tất cả thông báo là đã đọc | Có nhiều thông báo chưa đọc | 1. Nhấn nút 'Đánh dấu đã đọc tất cả' | PUT /api/v1/notifications/read-all | Toàn bộ thông báo của user chuyển isRead=true, badge về 0, HTTP 200 OK | Low |
