# Module 7: Quản lý Thông báo (Notification)

## FR-NOTIF-01: In-app real-time notification

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-001 |
| **Tên Test Case** | Push thông báo realtime khi tài xế nhận chuyến |
| **Mã yêu cầu liên quan** | FR-NOTIF-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng (User A) đang mở app và kết nối socket. Chuyến xe của User A vừa được Tài xế nhận. |
| **Các bước thực hiện (Test Steps)** | 1. Tài xế bấm nhận chuyến.<br>2. Kiểm tra app của User A xem có nhận được event socket không. |
| **Dữ liệu kiểm thử (Test Data)** | RideID: `RIDE_999`, DriverID: `DRV_01` |
| **Kết quả mong đợi (Expected Result)** | User A nhận được payload JSON qua socket với event `RIDE_ACCEPTED`, hiển thị thông báo popup trên app. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-002 |
| **Tên Test Case** | Push thông báo realtime khi tài xế đến nơi |
| **Mã yêu cầu liên quan** | FR-NOTIF-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Tài xế đang thực hiện chuyến đi và cách điểm đón < 50m. |
| **Các bước thực hiện (Test Steps)** | 1. Tài xế bấm nút "Đã đến nơi".<br>2. Kiểm tra app khách hàng. |
| **Dữ liệu kiểm thử (Test Data)** | RideID: `RIDE_999` |
| **Kết quả mong đợi (Expected Result)** | Hệ thống push event `DRIVER_ARRIVED` qua socket cho khách hàng. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-003 |
| **Tên Test Case** | Push thông báo realtime khi hoàn thành chuyến |
| **Mã yêu cầu liên quan** | FR-NOTIF-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Chuyến xe đang ở trạng thái IN_PROGRESS. |
| **Các bước thực hiện (Test Steps)** | 1. Tài xế bấm nút "Hoàn thành chuyến".<br>2. Kiểm tra app khách hàng. |
| **Dữ liệu kiểm thử (Test Data)** | RideID: `RIDE_999` |
| **Kết quả mong đợi (Expected Result)** | Event `RIDE_COMPLETED` gửi đến khách hàng kèm cước phí và yêu cầu đánh giá. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-NOTIF-02: Asynchronous email notification

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-004 |
| **Tên Test Case** | Gửi email chào mừng khi đăng ký thành công |
| **Mã yêu cầu liên quan** | FR-NOTIF-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng chưa có tài khoản. |
| **Các bước thực hiện (Test Steps)** | 1. Đăng ký tài khoản mới.<br>2. Kiểm tra hộp thư email của khách hàng. |
| **Dữ liệu kiểm thử (Test Data)** | Email: `testuser@example.com` |
| **Kết quả mong đợi (Expected Result)** | Sau 1-2 phút, email Welcome được gửi thành công, Job worker báo status SUCCESS. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-005 |
| **Tên Test Case** | Gửi hóa đơn qua email khi thanh toán thành công |
| **Mã yêu cầu liên quan** | FR-NOTIF-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Chuyến xe hoàn thành, thanh toán online thành công. |
| **Các bước thực hiện (Test Steps)** | 1. Khách hàng thanh toán chuyến xe.<br>2. Kiểm tra hộp thư email. |
| **Dữ liệu kiểm thử (Test Data)** | RideID: `RIDE_999`, Email: `testuser@example.com`, Amount: `50000` |
| **Kết quả mong đợi (Expected Result)** | Email hóa đơn điện tử (PDF attachment) được gửi đến khách hàng. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-006 |
| **Tên Test Case** | Xử lý lỗi khi gửi email đến địa chỉ không hợp lệ |
| **Mã yêu cầu liên quan** | FR-NOTIF-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | User có email sai định dạng hoặc không tồn tại (bounce). |
| **Các bước thực hiện (Test Steps)** | 1. Kích hoạt gửi email hóa đơn.<br>2. Kiểm tra log hệ thống. |
| **Dữ liệu kiểm thử (Test Data)** | Email: `invalid_email@nowhere.local` |
| **Kết quả mong đợi (Expected Result)** | Job worker thử lại tối đa 3 lần sau đó đánh dấu là FAILED, hệ thống vẫn hoạt động bình thường không crash. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-NOTIF-03: In-app notification list

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-007 |
| **Tên Test Case** | Lấy danh sách thông báo với phân trang |
| **Mã yêu cầu liên quan** | FR-NOTIF-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | User đã đăng nhập, có 25 thông báo trong DB. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/notifications?page=1&limit=10`<br>2. Gọi API `GET /api/notifications?page=2&limit=10` |
| **Dữ liệu kiểm thử (Test Data)** | Token của User |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, trả về 10 thông báo ở trang 1, 10 thông báo trang 2, tổng count là 25. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-008 |
| **Tên Test Case** | Lọc thông báo chưa đọc |
| **Mã yêu cầu liên quan** | FR-NOTIF-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | User có 5 thông báo chưa đọc, 10 đã đọc. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/notifications?isRead=false` |
| **Dữ liệu kiểm thử (Test Data)** | Query param `isRead=false` |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, danh sách trả về chỉ chứa 5 thông báo có `isRead: false`. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-NOTIF-04: Mark as read

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-009 |
| **Tên Test Case** | Đánh dấu 1 thông báo đã đọc |
| **Mã yêu cầu liên quan** | FR-NOTIF-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | User có thông báo ID `NOTIF_01` chưa đọc. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `PATCH /api/notifications/NOTIF_01/read` |
| **Dữ liệu kiểm thử (Test Data)** | NotificationID: `NOTIF_01` |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, DB update `isRead=true` cho thông báo đó. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-010 |
| **Tên Test Case** | Đánh dấu tất cả đã đọc |
| **Mã yêu cầu liên quan** | FR-NOTIF-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Thấp |
| **Điều kiện tiên quyết (Preconditions)** | User có 20 thông báo chưa đọc. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `POST /api/notifications/read-all` |
| **Dữ liệu kiểm thử (Test Data)** | Header Authorization |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, DB update toàn bộ thông báo của user thành `isRead=true`. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-011 |
| **Tên Test Case** | Không cho phép đánh dấu thông báo của người khác |
| **Mã yêu cầu liên quan** | FR-NOTIF-04 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | User A đăng nhập, lấy ID thông báo của User B. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `PATCH /api/notifications/{ID_CUA_B}/read` bằng token User A. |
| **Dữ liệu kiểm thử (Test Data)** | NotificationID của User B |
| **Kết quả mong đợi (Expected Result)** | HTTP 403 Forbidden hoặc 404 Not Found, không thay đổi DB. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-NOTIF-05: Extensible notification channel

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-NOTIF-012 |
| **Tên Test Case** | Hệ thống queue thông báo qua Mock Provider |
| **Mã yêu cầu liên quan** | FR-NOTIF-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Thấp |
| **Điều kiện tiên quyết (Preconditions)** | Kích hoạt SMS Channel (Mock). |
| **Các bước thực hiện (Test Steps)** | 1. Trigger gửi OTP SMS.<br>2. Kiểm tra Message Queue và Mock Provider Log. |
| **Dữ liệu kiểm thử (Test Data)** | Phone: `0901234567` |
| **Kết quả mong đợi (Expected Result)** | Tin nhắn được đẩy vào RabbitMQ/Redis Queue và log "SMS sent via MOCK" xuất hiện. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |
