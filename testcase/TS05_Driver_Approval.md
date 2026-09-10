# TEST SCENARIO 05: XÉT DUYỆT HỒ SƠ TÀI XẾ

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-APP-001 | Xét duyệt hồ sơ tài xế | Admin/Operator xem danh sách tài xế chờ phê duyệt | Đăng nhập bằng tài khoản Admin hoặc Operator | 1. Mở menu Quản lý tài xế<br>2. Chọn tab 'Chờ duyệt' | Role: Admin / Operator | Hiển thị danh sách các tài xế mới đăng ký kèm thông tin GPLX và xe | High |
| TC-APP-002 | Xét duyệt hồ sơ tài xế | Phê duyệt hồ sơ tài xế hợp lệ | Đang xem hồ sơ tài xế chờ duyệt | 1. Kiểm tra giấy tờ hợp lệ<br>2. Nhấn nút 'Phê duyệt'<br>3. Xác nhận | Driver ID hợp lệ | Hồ sơ chuyển sang Approved; tài xế nhận thông báo và có thể bật Online | High |
| TC-APP-003 | Xét duyệt hồ sơ tài xế | Từ chối hồ sơ tài xế kèm lý do | Giấy tờ tài xế không đạt yêu cầu | 1. Nhấn nút 'Từ chối'<br>2. Nhập lý do (GPLX mờ)<br>3. Xác nhận | Lý do: 'Ảnh chụp GPLX bị mờ, không rõ số' | Hồ sơ chuyển Rejected; thông báo lý do từ chối gửi về tài xế | High |
| TC-APP-004 | Xét duyệt hồ sơ tài xế | Người dùng thường không có quyền xét duyệt tài xế | Đăng nhập bằng tài khoản Khách hàng (Customer) | 1. Thử gửi request duyệt tài xế | Role: Customer | Hệ thống từ chối; báo lỗi không có quyền truy cập (HTTP 403 Forbidden) | High |
