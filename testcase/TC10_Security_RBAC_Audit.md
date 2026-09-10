# BẢNG TEST CASES - PHÂN HỆ 10: BẢO MẬT, PHÂN QUYỀN RBAC & AUDIT LOG

> Bao phủ: FR-SEC-01 đến FR-SEC-05 | AC-ADM-01, 02 | BRULE-09, 10 | Chuẩn 8 cột ngang Excel

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-SEC-001 | Phân quyền RBAC | Admin truy cập endpoint quản trị cấp cao thành công (BRULE-09) | Tài khoản có role = 'admin' | 1. Gửi GET /api/v1/admin/audit-logs | Token Admin | HTTP 200 OK, truy cập thành công nhật ký kiểm toán | High |
| TC-SEC-002 | Phân quyền RBAC | Khách hàng cố tình gọi API Admin bị chặn 403 Forbidden | Tài khoản có role = 'customer' | 1. Khách gửi request GET /api/v1/admin/dashboard | Token Customer | Hệ thống từ chối HTTP 403 Forbidden: 'Bạn không có quyền truy cập chức năng này' | High |
| TC-SEC-003 | Phân quyền RBAC | Phân tách quyền nghiêm ngặt giữa Operator và Admin (FR-SEC-02) | Tài khoản có role = 'operator' | 1. Operator cố tình gọi PUT /api/v1/admin/users/:id/role để đổi quyền | Token Operator | Hệ thống chặn HTTP 403 Forbidden: 'Chỉ Super Admin mới có quyền phân quyền người dùng' | High |
| TC-SEC-004 | Audit Log bất biến | Tự động ghi vết Audit Log khi duyệt hồ sơ tài xế (BRULE-10) | Operator bấm duyệt tài xế A | 1. Hoàn tất duyệt tài xế<br>2. Kiểm tra collection AuditLogs trong DB | action: 'APPROVE_DRIVER', entity: 'DriverProfile' | 1 bản ghi mới được tạo trong AuditLogs chứa operatorId, timestamp, dữ liệu cũ và mới | High |
| TC-SEC-005 | Audit Log bất biến | Đảm bảo Audit Log không thể bị xóa hoặc sửa (Append-Only) | Cơ sở dữ liệu MongoDB | 1. Cố tình gọi hàm delete/update trên model AuditLog | AuditLog.deleteOne() | Model hoặc API chặn thao tác, không cho phép chỉnh sửa nhật ký đã ghi | High |
| TC-SEC-006 | Mã hóa bảo mật | Mật khẩu người dùng bắt buộc được mã hóa bằng bcrypt trước khi lưu vào DB | Đăng ký tài khoản mới | 1. Đăng ký với pass 'Password@123'<br>2. Mở trực tiếp MongoDB kiểm tra trường passwordHash | Password gốc: Password@123 | Trường passwordHash là chuỗi mã hóa $2a$10$... không thể dịch ngược thành plaintext | High |
| TC-SEC-007 | Mã hóa bảo mật | Tuyệt đối không lưu trữ thông tin số thẻ tín dụng hoặc mã CVV (NFR-SEC-04) | Khách hàng thanh toán online | 1. Nhập thông tin thẻ trên Mock Gateway<br>2. Kiểm tra DB Payment | Card Number, CVV | Database chỉ lưu transactionId của cổng, không có bất kỳ trường nào lưu số thẻ hoặc CVV | High |
