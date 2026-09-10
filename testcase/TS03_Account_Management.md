# TEST SCENARIO 03: QUẢN LÝ TÀI KHOẢN & ĐỔI MẬT KHẨU

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-ACC-001 | Quản lý tài khoản & Đổi mật khẩu | Xem thông tin cá nhân khi đã đăng nhập | Người dùng đã đăng nhập | 1. Mở trang Thông tin cá nhân | User Token hợp lệ | Hiển thị đúng họ tên, email, số điện thoại và vai trò tài khoản | Medium |
| TC-ACC-002 | Quản lý tài khoản & Đổi mật khẩu | Cập nhật họ tên và số điện thoại mới | Đang ở trang Thông tin cá nhân | 1. Nhập họ tên mới<br>2. Nhấn Lưu thay đổi | Họ tên: Nguyễn Văn A (Mới) | Cập nhật thành công; dữ liệu mới được hiển thị ngay | Medium |
| TC-ACC-003 | Quản lý tài khoản & Đổi mật khẩu | Đổi mật khẩu thành công khi nhập đúng mật khẩu cũ | Người dùng đã đăng nhập | 1. Nhập mật khẩu hiện tại đúng<br>2. Nhập mật khẩu mới >= 6 ký tự<br>3. Nhấn Đổi mật khẩu | Pass cũ: Password@123<br>Pass mới: NewPassword@456 | Đổi mật khẩu thành công; có thể đăng nhập bằng mật khẩu mới | High |
| TC-ACC-004 | Quản lý tài khoản & Đổi mật khẩu | Đổi mật khẩu thất bại khi nhập sai mật khẩu cũ | Người dùng đã đăng nhập | 1. Nhập sai mật khẩu hiện tại<br>2. Nhập mật khẩu mới<br>3. Nhấn Đổi mật khẩu | Pass cũ: WrongPass<br>Pass mới: NewPassword@456 | Báo lỗi: Mật khẩu hiện tại không chính xác | High |
| TC-ACC-005 | Quản lý tài khoản & Đổi mật khẩu | Đăng xuất khỏi hệ thống và hủy phiên làm việc | Đang trong phiên đăng nhập | 1. Nhấn nút Đăng xuất<br>2. Xác nhận | User Token | Xóa phiên/token; chuyển hướng về trang Đăng nhập; không thể truy cập lại chức năng cũ | High |
