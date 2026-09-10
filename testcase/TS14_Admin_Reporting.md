# TEST SCENARIO 14: QUẢN TRỊ HỆ THỐNG & XEM BÁO CÁO

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-ADM-001 | Quản trị hệ thống & Xem báo cáo | Admin/Operator xem Dashboard tổng quan các chuyến trong ngày | Đăng nhập với tài khoản Admin hoặc Operator | 1. Mở trang Dashboard | Role: Admin / Operator | Hiển thị tổng số chuyến trong ngày, doanh thu, số tài xế đang online | High |
| TC-ADM-002 | Quản trị hệ thống & Xem báo cáo | Tìm kiếm người dùng theo tên hoặc số điện thoại | Trang Quản lý người dùng | 1. Nhập từ khóa '0912345678'<br>2. Nhấn Tìm kiếm | Từ khóa: 0912345678 | Hiển thị chính xác thông tin tài khoản của người dùng tương ứng | Medium |
| TC-ADM-003 | Quản trị hệ thống & Xem báo cáo | Xem báo cáo thống kê doanh thu theo ngày và theo loại xe | Màn hình Báo cáo tài chính | 1. Chọn khoảng ngày xem báo cáo<br>2. Nhấn Xem báo cáo | Từ ngày: 01/08/2026 Đến ngày: 31/08/2026 | Hiển thị bảng tổng hợp doanh thu theo từng ngày và phân loại xe | High |
| TC-ADM-004 | Quản trị hệ thống & Xem báo cáo | Chặn người dùng thông thường truy cập trang quản trị Admin | Đăng nhập bằng tài khoản Khách hàng | 1. Thử mở URL trang quản trị Admin | Role: Customer | Chặn truy cập; hiển thị lỗi 403 Bạn không có quyền truy cập trang này | High |
| TC-ADM-005 | Quản trị hệ thống & Xem báo cáo | Operator can thiệp hỗ trợ hủy chuyến xe khi tài xế gặp sự cố | Chuyến xe bị sự cố tài xế hỏng xe giữa đường | 1. Operator mở chi tiết chuyến xe<br>2. Chọn 'Can thiệp hủy chuyến'<br>3. Nhập lý do<br>4. Xác nhận | Lý do: 'Xe tài xế gặp sự cố kỹ thuật' | Chuyến xe được hủy an toàn; giải phóng khách hàng để đặt cuốc khác | High |
