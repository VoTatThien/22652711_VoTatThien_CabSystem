# Test Cases - Module 5: Payment & Pricing

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-001 |
| **Tên Test Case** | Tính cước thực tế khi kết thúc chuyến |
| **Mã Yêu cầu** | FR-PAY-01, BRULE-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến đi hoàn thành, có thông số quãng đường và thời gian thực tế. |
| **Các bước thực hiện** | 1. Tài xế bấm kết thúc chuyến đi.<br>2. Hệ thống tính toán dựa trên cấu hình giá hiện hành. |
| **Dữ liệu kiểm thử** | actualDistance: 10km, actualDuration: 15p. BaseFare: 10k, perKm: 12k, perMin: 1k. |
| **Kết quả kỳ vọng** | Cước = (10*12) + (15*1) + 10 = 145k. HTTP 200, phản hồi JSON chứa giá trị cuối. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-002 |
| **Tên Test Case** | Chuyến đi siêu ngắn có cước nhỏ hơn mức giá tối thiểu (BaseFare) |
| **Mã Yêu cầu** | FR-PAY-01, BRULE-01 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Khách hàng đi khoảng cách cực ngắn. |
| **Các bước thực hiện** | 1. Tính cước cho chuyến đi 0.1km, 1 phút. |
| **Dữ liệu kiểm thử** | Công thức tính ra 12.2k, nhưng BaseFare cấu hình là 20k. |
| **Kết quả kỳ vọng** | Tổng cước bị làm tròn lên mức 20k theo BaseFare. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-003 |
| **Tên Test Case** | Admin cập nhật cấu hình giá thành công |
| **Mã Yêu cầu** | FR-PAY-02, BRULE-10 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài khoản Admin đang đăng nhập. |
| **Các bước thực hiện** | 1. Admin gửi request PUT /api/pricing với thông số mới cho SUV.<br>2. Kiểm tra DB và AuditLog. |
| **Dữ liệu kiểm thử** | BaseFare: 30k, perKm: 15k, perMin: 2k cho xe SUV. |
| **Kết quả kỳ vọng** | HTTP 200. PricingConfigs cập nhật. Một record AuditLog được tạo lưu lại ai, khi nào, thay đổi gì. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-004 |
| **Tên Test Case** | Admin cập nhật cấu hình giá trị âm |
| **Mã Yêu cầu** | FR-PAY-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Đăng nhập Admin. |
| **Các bước thực hiện** | 1. Admin điền BaseFare là -10000. |
| **Dữ liệu kiểm thử** | BaseFare = -10000 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request. Báo lỗi validation không cho phép giá trị âm. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-005 |
| **Tên Test Case** | Admin cập nhật cấu hình giá trị bằng 0 |
| **Mã Yêu cầu** | FR-PAY-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Đăng nhập Admin. |
| **Các bước thực hiện** | 1. Admin cập nhật perKm = 0. |
| **Dữ liệu kiểm thử** | perKm = 0 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request. Yêu cầu giá trị phải lớn hơn 0. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-006 |
| **Tên Test Case** | User không phải Admin cố gắng đổi cấu hình giá |
| **Mã Yêu cầu** | FR-PAY-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Đăng nhập bằng tài khoản Customer hoặc Driver. |
| **Các bước thực hiện** | 1. Gọi API PUT /api/pricing. |
| **Dữ liệu kiểm thử** | Token của Customer. |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden. Truy cập bị từ chối. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-007 |
| **Tên Test Case** | Xác nhận thanh toán tiền mặt thành công |
| **Mã Yêu cầu** | FR-PAY-03, FR-PAY-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến đi kết thúc, phương thức thanh toán là CASH. |
| **Các bước thực hiện** | 1. Tài xế bấm "Xác nhận đã nhận tiền". |
| **Dữ liệu kiểm thử** | ID chuyến đi = 123. |
| **Kết quả kỳ vọng** | DB Payment state -> COMPLETED. Tài xế state -> AVAILABLE. HTTP 200. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-008 |
| **Tên Test Case** | Tài xế cố xác nhận tiền mặt trên chuyến thanh toán điện tử |
| **Mã Yêu cầu** | FR-PAY-03, FR-PAY-05 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Chuyến đi phương thức E-WALLET. |
| **Các bước thực hiện** | 1. Tài xế gọi API POST /api/payment/cash-confirm. |
| **Dữ liệu kiểm thử** | ID chuyến đi đang dùng E-WALLET. |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, báo lỗi sai phương thức thanh toán. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-009 |
| **Tên Test Case** | Tài xế ấn xác nhận tiền mặt 2 lần |
| **Mã Yêu cầu** | FR-PAY-03 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Thấp |
| **Điều kiện tiên quyết** | Chuyến đi CASH đã được xác nhận COMPLETED. |
| **Các bước thực hiện** | 1. Tài xế gửi lại API cash-confirm cho cùng chuyến đi. |
| **Dữ liệu kiểm thử** | Payment record status đã là COMPLETED. |
| **Kết quả kỳ vọng** | HTTP 409 Conflict hoặc 400 Bad Request, thanh toán đã hoàn tất. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-010 |
| **Tên Test Case** | Đổi sang tiền mặt trước khi kết thúc chuyến |
| **Mã Yêu cầu** | FR-PAY-03, AC-PAY-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Chuyến đi đang diễn ra, phương thức ban đầu là CREDIT_CARD. |
| **Các bước thực hiện** | 1. Khách hàng đổi sang CASH trên app.<br>2. Tài xế nhận thông báo cập nhật. |
| **Dữ liệu kiểm thử** | Update paymentMethod = CASH. |
| **Kết quả kỳ vọng** | DB cập nhật phương thức thành công. Event WS bắn về cho tài xế báo đổi phương thức. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-011 |
| **Tên Test Case** | Thanh toán qua Mock Gateway thành công |
| **Mã Yêu cầu** | FR-PAY-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến đi E-WALLET kết thúc. |
| **Các bước thực hiện** | 1. Hệ thống gọi Mock Payment Gateway.<br>2. Gateway trả về SUCCESS. |
| **Dữ liệu kiểm thử** | Số tiền: 50000, CardInfo valid. |
| **Kết quả kỳ vọng** | Transaction ID được lưu. Payment status = COMPLETED. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-012 |
| **Tên Test Case** | Gateway phản hồi chậm (Timeout boundary) |
| **Mã Yêu cầu** | FR-PAY-05 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Chuyến đi kết thúc, Mock Gateway bị trễ (delay 10s). |
| **Các bước thực hiện** | 1. Hệ thống gọi thanh toán và đợi. |
| **Dữ liệu kiểm thử** | API Gateway delay = 10000ms. |
| **Kết quả kỳ vọng** | Giao dịch vẫn thành công nếu trong ngưỡng timeout, hệ thống không bị crash. App khách hiển thị "Đang xử lý". |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-013 |
| **Tên Test Case** | Payment Gateway trả về lỗi |
| **Mã Yêu cầu** | FR-PAY-06, EX-07 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng chọn E-WALLET. |
| **Các bước thực hiện** | 1. Hệ thống gọi Gateway.<br>2. Gateway trả về HTTP 500 hoặc status=ERROR. |
| **Dữ liệu kiểm thử** | Gateway Mock thiết lập trả về lỗi. |
| **Kết quả kỳ vọng** | Payment status = FAILED. Thông báo lỗi cho người dùng. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-014 |
| **Tên Test Case** | Thanh toán thất bại do không đủ số dư |
| **Mã Yêu cầu** | FR-PAY-06, EX-07 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng dùng thẻ giả lập "INSUFFICIENT_FUNDS". |
| **Các bước thực hiện** | 1. Tiến hành charge tiền qua Gateway. |
| **Dữ liệu kiểm thử** | Mock Card Code: 4002 (Insufficient Funds). |
| **Kết quả kỳ vọng** | Payment status = FAILED. Trả về thông báo "Không đủ số dư". |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-015 |
| **Tên Test Case** | Gợi ý thử lại hoặc đổi sang tiền mặt khi thanh toán điện tử thất bại |
| **Mã Yêu cầu** | FR-PAY-06, AC-PAY-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Chuyến đi đang có Payment FAILED. |
| **Các bước thực hiện** | 1. API trả kết quả FAILED về App khách.<br>2. App hiển thị popup. |
| **Dữ liệu kiểm thử** | Error response từ server. |
| **Kết quả kỳ vọng** | Khách hàng thấy tuỳ chọn "Thử lại thanh toán" hoặc "Trả tiền mặt cho tài xế". |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-016 |
| **Tên Test Case** | Chuyển đổi sang tiền mặt và hoàn tất sau khi e-payment lỗi |
| **Mã Yêu cầu** | FR-PAY-06, AC-PAY-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Payment FAILED. |
| **Các bước thực hiện** | 1. Khách hàng bấm "Trả tiền mặt".<br>2. Server đổi phương thức thành CASH.<br>3. Tài xế xác nhận nhận tiền. |
| **Dữ liệu kiểm thử** | API update method = CASH, gọi API cash-confirm. |
| **Kết quả kỳ vọng** | Giao dịch cuối cùng thành công (COMPLETED). |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-017 |
| **Tên Test Case** | Tạo hóa đơn điện tử và gửi email thành công |
| **Mã Yêu cầu** | FR-PAY-07 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Thanh toán chuyển sang COMPLETED, user có địa chỉ email hợp lệ. |
| **Các bước thực hiện** | 1. Hệ thống tạo hóa đơn (tính VAT 10%).<br>2. Kích hoạt job gửi email biên lai. |
| **Dữ liệu kiểm thử** | Tổng cước = 100k -> Tiền chuyến=90.9k, VAT=9.1k. Email test. |
| **Kết quả kỳ vọng** | Bảng Invoice có dữ liệu. Email nhận được nội dung hóa đơn PDF/HTML. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-PAY-018 |
| **Tên Test Case** | Từ chối xuất hóa đơn cho chuyến đi chưa hoàn thành |
| **Mã Yêu cầu** | FR-PAY-07 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Chuyến đi trạng thái IN_PROGRESS hoặc CANCELLED. |
| **Các bước thực hiện** | 1. Khách hàng (hoặc API call trực tiếp) yêu cầu lấy Invoice. |
| **Dữ liệu kiểm thử** | `rideId` của chuyến đi chưa thanh toán. |
| **Kết quả kỳ vọng** | HTTP 404 hoặc 400, "Invoice not available for this ride". |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |
