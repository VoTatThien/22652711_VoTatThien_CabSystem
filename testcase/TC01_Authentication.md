# Test Cases Module 1: Authentication

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-001 |
| **Tên Test Case** | Đăng ký khách hàng thành công |
| **Mã Yêu cầu** | FR-AUTH-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Hệ thống hoạt động bình thường, email và số điện thoại chưa tồn tại |
| **Các bước thực hiện** | 1. Nhập thông tin hợp lệ<br>2. Nhấn nút Đăng ký |
| **Dữ liệu kiểm thử** | Email: kh1@mail.com, SĐT: 0901234567, Pass: 123456 |
| **Kết quả kỳ vọng** | HTTP 201 Created, DB thêm bản ghi Customer |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-002 |
| **Tên Test Case** | Đăng ký với email sai định dạng RFC5322 |
| **Mã Yêu cầu** | FR-AUTH-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Như TC-AUTH-001 |
| **Các bước thực hiện** | 1. Nhập email sai định dạng<br>2. Nhấn Đăng ký |
| **Dữ liệu kiểm thử** | Email: kh1@mail, SĐT: 0901234567, Pass: 123456 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, message lỗi định dạng email |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-003 |
| **Tên Test Case** | Đăng ký với SĐT không đủ 10 số |
| **Mã Yêu cầu** | FR-AUTH-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Như TC-AUTH-001 |
| **Các bước thực hiện** | 1. Nhập SĐT 9 số<br>2. Nhấn Đăng ký |
| **Dữ liệu kiểm thử** | Email: kh2@mail.com, SĐT: 090123456, Pass: 123456 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, message lỗi SĐT phải là 10 số VN |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-004 |
| **Tên Test Case** | Đăng ký với mật khẩu ngắn hơn 6 ký tự |
| **Mã Yêu cầu** | FR-AUTH-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Như TC-AUTH-001 |
| **Các bước thực hiện** | 1. Nhập password < 6 ký tự<br>2. Nhấn Đăng ký |
| **Dữ liệu kiểm thử** | Email: kh3@mail.com, SĐT: 0901234568, Pass: 12345 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, message lỗi mật khẩu tối thiểu 6 ký tự |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-005 |
| **Tên Test Case** | Đăng ký trùng Email |
| **Mã Yêu cầu** | FR-AUTH-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Email kh1@mail.com đã tồn tại |
| **Các bước thực hiện** | 1. Nhập lại email đã tồn tại<br>2. Nhấn Đăng ký |
| **Dữ liệu kiểm thử** | Email: kh1@mail.com, SĐT: 0988888888, Pass: 123456 |
| **Kết quả kỳ vọng** | HTTP 409 Conflict, message email đã tồn tại |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-006 |
| **Tên Test Case** | Đăng ký trùng Số điện thoại |
| **Mã Yêu cầu** | FR-AUTH-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | SĐT 0901234567 đã tồn tại |
| **Các bước thực hiện** | 1. Nhập lại SĐT đã tồn tại<br>2. Nhấn Đăng ký |
| **Dữ liệu kiểm thử** | Email: kh4@mail.com, SĐT: 0901234567, Pass: 123456 |
| **Kết quả kỳ vọng** | HTTP 409 Conflict, message SĐT đã tồn tại |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-007 |
| **Tên Test Case** | Đăng ký tài xế thành công |
| **Mã Yêu cầu** | FR-AUTH-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Hệ thống bình thường |
| **Các bước thực hiện** | 1. Nhập thông tin tài xế và phương tiện<br>2. Nhấn Đăng ký |
| **Dữ liệu kiểm thử** | Email: tx1@mail.com, GPLX: 123456789012, Biển số: 51H-12345 |
| **Kết quả kỳ vọng** | HTTP 201 Created, DB thêm bản ghi Driver và Vehicle |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-008 |
| **Tên Test Case** | Đăng ký tài xế trùng GPLX |
| **Mã Yêu cầu** | FR-AUTH-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | GPLX đã tồn tại trong DB |
| **Các bước thực hiện** | 1. Nhập GPLX đã tồn tại<br>2. Nhấn Đăng ký |
| **Dữ liệu kiểm thử** | GPLX: 123456789012 |
| **Kết quả kỳ vọng** | HTTP 409 Conflict, message GPLX đã tồn tại |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-009 |
| **Tên Test Case** | Đăng ký tài xế trùng Biển số xe |
| **Mã Yêu cầu** | FR-AUTH-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Biển số đã được đăng ký |
| **Các bước thực hiện** | 1. Nhập Biển số đã tồn tại<br>2. Nhấn Đăng ký |
| **Dữ liệu kiểm thử** | Biển số: 51H-12345 |
| **Kết quả kỳ vọng** | HTTP 409 Conflict, message Biển số đã được đăng ký |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-010 |
| **Tên Test Case** | Đăng nhập thành công |
| **Mã Yêu cầu** | FR-AUTH-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài khoản tồn tại và đang active |
| **Các bước thực hiện** | 1. Nhập đúng thông tin<br>2. Nhấn Đăng nhập |
| **Dữ liệu kiểm thử** | Email: kh1@mail.com, Pass: 123456 |
| **Kết quả kỳ vọng** | HTTP 200 OK, trả về JWT 15m và Refresh token 7d |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-011 |
| **Tên Test Case** | Đăng nhập sai mật khẩu |
| **Mã Yêu cầu** | FR-AUTH-03 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài khoản tồn tại |
| **Các bước thực hiện** | 1. Nhập sai mật khẩu<br>2. Nhấn Đăng nhập |
| **Dữ liệu kiểm thử** | Email: kh1@mail.com, Pass: wrongpass |
| **Kết quả kỳ vọng** | HTTP 401 Unauthorized, message sai thông tin đăng nhập |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-012 |
| **Tên Test Case** | Đăng nhập tài khoản bị khóa |
| **Mã Yêu cầu** | FR-AUTH-03 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài khoản có isActive=false |
| **Các bước thực hiện** | 1. Đăng nhập tài khoản bị khóa<br>2. Nhấn Đăng nhập |
| **Dữ liệu kiểm thử** | Email: blocked@mail.com, Pass: 123456 |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden, message tài khoản bị khóa |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-013 |
| **Tên Test Case** | Brute-force login - 429 Rate Limit |
| **Mã Yêu cầu** | FR-AUTH-03, NFR-SEC-06 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài khoản tồn tại |
| **Các bước thực hiện** | 1. Nhập sai MK 5 lần liên tiếp<br>2. Nhấn Đăng nhập lần 6 |
| **Dữ liệu kiểm thử** | Email: kh1@mail.com, Pass: wrong |
| **Kết quả kỳ vọng** | HTTP 429 Too Many Requests, khóa tạm thời 15 phút |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-014 |
| **Tên Test Case** | Xem và cập nhật Profile thành công |
| **Mã Yêu cầu** | FR-AUTH-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Đã đăng nhập, có JWT hợp lệ |
| **Các bước thực hiện** | 1. Gọi API cập nhật profile |
| **Dữ liệu kiểm thử** | Name: Nguyen Van A, Phone: 0911111111 |
| **Kết quả kỳ vọng** | HTTP 200 OK, DB cập nhật Name và Phone |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-015 |
| **Tên Test Case** | Cập nhật Profile - Không có Token |
| **Mã Yêu cầu** | FR-AUTH-04 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chưa đăng nhập |
| **Các bước thực hiện** | 1. Gọi API không kèm Authorization header |
| **Dữ liệu kiểm thử** | Name: Nguyen B |
| **Kết quả kỳ vọng** | HTTP 401 Unauthorized |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-016 |
| **Tên Test Case** | Cập nhật Profile - Token hết hạn |
| **Mã Yêu cầu** | FR-AUTH-04 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | JWT đã quá 15 phút |
| **Các bước thực hiện** | 1. Gọi API với token hết hạn |
| **Dữ liệu kiểm thử** | Name: Nguyen C |
| **Kết quả kỳ vọng** | HTTP 401 Unauthorized, message Token Expired |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-017 |
| **Tên Test Case** | Đổi mật khẩu thành công |
| **Mã Yêu cầu** | FR-AUTH-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Đã đăng nhập |
| **Các bước thực hiện** | 1. Nhập MK cũ và MK mới<br>2. Đổi mật khẩu |
| **Dữ liệu kiểm thử** | Old: 123456, New: 654321 |
| **Kết quả kỳ vọng** | HTTP 200 OK, mật khẩu được cập nhật trong DB |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-018 |
| **Tên Test Case** | Đổi mật khẩu - MK mới giống MK cũ |
| **Mã Yêu cầu** | FR-AUTH-05 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Thấp |
| **Điều kiện tiên quyết** | Đã đăng nhập |
| **Các bước thực hiện** | 1. Nhập MK mới giống MK cũ |
| **Dữ liệu kiểm thử** | Old: 123456, New: 123456 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, message MK mới phải khác MK cũ |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-AUTH-019 |
| **Tên Test Case** | Logout và thu hồi Refresh Token |
| **Mã Yêu cầu** | FR-AUTH-06 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Đã đăng nhập |
| **Các bước thực hiện** | 1. Gọi API Logout kèm Refresh Token |
| **Dữ liệu kiểm thử** | RefreshToken: xxx |
| **Kết quả kỳ vọng** | HTTP 200 OK, DB đánh dấu token đã thu hồi (revoked) |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |
