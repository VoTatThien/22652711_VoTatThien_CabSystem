# Module 9: Vận hành Quản trị (Admin Operations)

## FR-ADM-01: Dashboard operations overview

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-001 |
| **Tên Test Case** | Hiển thị thông số tổng quan hôm nay trên Dashboard |
| **Mã yêu cầu liên quan** | FR-ADM-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Admin đăng nhập thành công. Có dữ liệu cuốc xe và tài xế hằng ngày. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/dashboard/today` |
| **Dữ liệu kiểm thử (Test Data)** | Token của Admin |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, trả về JSON bao gồm `totalRides`, `revenue`, `activeDrivers`, `completionRate` của ngày hiện tại. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-ADM-02: Customer management

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-002 |
| **Tên Test Case** | Tìm kiếm khách hàng theo Tên |
| **Mã yêu cầu liên quan** | FR-ADM-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Có khách hàng tên "Nguyen Van A". |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/customers?search=Nguyen` |
| **Dữ liệu kiểm thử (Test Data)** | Keyword: `Nguyen` |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, trả về danh sách khách hàng có tên chứa "Nguyen". |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-003 |
| **Tên Test Case** | Tìm kiếm khách hàng theo Số điện thoại / Email |
| **Mã yêu cầu liên quan** | FR-ADM-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng có email `test@email.com` và SĐT `0901112222`. |
| **Các bước thực hiện (Test Steps)** | 1. Search với SĐT.<br>2. Search với Email. |
| **Dữ liệu kiểm thử (Test Data)** | Keyword: `0901112222` |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, trả về đúng khách hàng khớp SĐT/Email. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-004 |
| **Tên Test Case** | Xem lịch sử chuyến đi của một khách hàng |
| **Mã yêu cầu liên quan** | FR-ADM-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Lấy ID của Khách hàng A. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/customers/{ID}/rides` |
| **Dữ liệu kiểm thử (Test Data)** | CustomerID: `CUST_01` |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, trả về danh sách chuyến xe do khách hàng này đặt (có phân trang). |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-005 |
| **Tên Test Case** | Hủy kích hoạt tài khoản khách hàng (Deactivate) |
| **Mã yêu cầu liên quan** | FR-ADM-02 |
| **Loại kiểm thử** | Negative (kiểm thử case vô hiệu hóa) |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng A đang ở trạng thái ACTIVE. |
| **Các bước thực hiện (Test Steps)** | 1. Admin gọi API `POST /api/admin/customers/{ID}/deactivate`<br>2. Khách hàng A thử đăng nhập lại. |
| **Dữ liệu kiểm thử (Test Data)** | CustomerID: `CUST_01` |
| **Kết quả mong đợi (Expected Result)** | API trả về 200 OK. Lần đăng nhập sau của khách hàng A báo lỗi 403 (Account deactivated). |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-ADM-03: Driver management

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-006 |
| **Tên Test Case** | Lọc tài xế theo trạng thái |
| **Mã yêu cầu liên quan** | FR-ADM-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Hệ thống có tài xế trạng thái AVAILABLE, BUSY, OFFLINE. |
| **Các bước thực hiện (Test Steps)** | 1. Lọc tài xế với status = AVAILABLE. |
| **Dữ liệu kiểm thử (Test Data)** | Query `status=AVAILABLE` |
| **Kết quả mong đợi (Expected Result)** | Trả về danh sách chỉ gồm các tài xế AVAILABLE. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-007 |
| **Tên Test Case** | Xem thông tin phương tiện của tài xế |
| **Mã yêu cầu liên quan** | FR-ADM-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Có DriverID. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/drivers/{ID}` |
| **Dữ liệu kiểm thử (Test Data)** | DriverID: `DRV_01` |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, JSON trả về bao gồm thông tin chi tiết xe (Biển số, Loại xe, Màu sắc). |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-ADM-04: Ride monitoring & intervention (EX-06)

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-008 |
| **Tên Test Case** | Operator buộc hủy chuyến xe bị kẹt với lý do |
| **Mã yêu cầu liên quan** | FR-ADM-04, EX-06 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Chuyến xe `RIDE_STUCK` nằm ở IN_PROGRESS quá 24h, tài xế không phản hồi. |
| **Các bước thực hiện (Test Steps)** | 1. Operator gọi API hủy chuyến của Admin.<br>2. Cung cấp lý do hủy. |
| **Dữ liệu kiểm thử (Test Data)** | RideID: `RIDE_STUCK`, reason: `Driver unresponsive` |
| **Kết quả mong đợi (Expected Result)** | HTTP 200. Trạng thái chuyến đổi thành CANCELLED, gửi thông báo cho khách. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-009 |
| **Tên Test Case** | Can thiệp không cung cấp lý do |
| **Mã yêu cầu liên quan** | FR-ADM-04, EX-06 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Chuyến xe cần hủy. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API hủy mà không kèm field `reason`. |
| **Dữ liệu kiểm thử (Test Data)** | Body thiếu `reason` |
| **Kết quả mong đợi (Expected Result)** | HTTP 400 Bad Request. Yêu cầu bắt buộc phải có lý do (reason required). |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-010 |
| **Tên Test Case** | Operator điều phối lại (reassign) chuyến xe |
| **Mã yêu cầu liên quan** | FR-ADM-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Chuyến xe đang tìm tài xế hoặc tài xế cũ hỏng xe. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `POST /api/admin/rides/{ID}/reassign` với ID tài xế mới. |
| **Dữ liệu kiểm thử (Test Data)** | RideID: `RIDE_123`, NewDriverID: `DRV_99` |
| **Kết quả mong đợi (Expected Result)** | Chuyến xe được gán cho tài xế mới, tài xế mới nhận được socket event thông báo. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-ADM-05: Payment transactions audit

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-011 |
| **Tên Test Case** | Tìm giao dịch theo trạng thái COMPLETED |
| **Mã yêu cầu liên quan** | FR-ADM-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Có các giao dịch trong DB. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/transactions?status=COMPLETED` |
| **Dữ liệu kiểm thử (Test Data)** | Query `status=COMPLETED` |
| **Kết quả mong đợi (Expected Result)** | Trả về các giao dịch thanh toán thành công. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-012 |
| **Tên Test Case** | Tìm giao dịch theo khoảng thời gian |
| **Mã yêu cầu liên quan** | FR-ADM-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Có các giao dịch tạo trong tháng 9/2023. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/transactions?startDate=2023-09-01&endDate=2023-09-30` |
| **Dữ liệu kiểm thử (Test Data)** | Date range tháng 9/2023 |
| **Kết quả mong đợi (Expected Result)** | Trả về giao dịch phát sinh trong khung thời gian này. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-013 |
| **Tên Test Case** | Lọc giao dịch theo phương thức thanh toán |
| **Mã yêu cầu liên quan** | FR-ADM-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Thấp |
| **Điều kiện tiên quyết (Preconditions)** | Giao dịch thanh toán bằng CREDIT_CARD và CASH. |
| **Các bước thực hiện (Test Steps)** | 1. Filter với `method=CREDIT_CARD`. |
| **Dữ liệu kiểm thử (Test Data)** | Query `method=CREDIT_CARD` |
| **Kết quả mong đợi (Expected Result)** | Trả về danh sách chỉ các giao dịch qua thẻ tín dụng. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-ADM-06: Revenue report

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-014 |
| **Tên Test Case** | Thống kê doanh thu theo loại xe (Bike/Car) |
| **Mã yêu cầu liên quan** | FR-ADM-06 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Có dữ liệu chuyến xe hoàn thành cho cả Bike và Car. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/reports/revenue?groupBy=vehicleType` |
| **Dữ liệu kiểm thử (Test Data)** | Query `groupBy=vehicleType` |
| **Kết quả mong đợi (Expected Result)** | Trả về tổng doanh thu phân bổ theo BIKE và CAR. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-015 |
| **Tên Test Case** | Báo cáo doanh thu nhóm theo ngày (Daily) |
| **Mã yêu cầu liên quan** | FR-ADM-06 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Admin cần xem biểu đồ doanh thu. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/reports/revenue?groupBy=day&month=09&year=2023` |
| **Dữ liệu kiểm thử (Test Data)** | Time frame tháng 9/2023 |
| **Kết quả mong đợi (Expected Result)** | Mảng dữ liệu chứa tổng doanh thu cho từng ngày trong tháng 9. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-ADM-07: Operations report

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-016 |
| **Tên Test Case** | Tính tỷ lệ hoàn thành (Completion Rate) vs Hủy |
| **Mã yêu cầu liên quan** | FR-ADM-07 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Có 100 chuyến xe tổng, trong đó 80 COMPLETED, 20 CANCELLED. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/reports/operations` |
| **Dữ liệu kiểm thử (Test Data)** | Không |
| **Kết quả mong đợi (Expected Result)** | Trả về `total: 100`, `completed: 80`, `cancelled: 20`, `completionRate: 80%`. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-ADM-08: Driver performance report

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-017 |
| **Tên Test Case** | Lấy danh sách Top tài xế đánh giá cao nhất |
| **Mã yêu cầu liên quan** | FR-ADM-08 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Thấp |
| **Điều kiện tiên quyết (Preconditions)** | Có nhiều tài xế với các mức rating khác nhau. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/reports/drivers/top-rated` |
| **Dữ liệu kiểm thử (Test Data)** | Limit = 10 |
| **Kết quả mong đợi (Expected Result)** | Danh sách 10 tài xế có `averageRating` cao nhất giảm dần. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-ADM-018 |
| **Tên Test Case** | Lấy danh sách tài xế có tỷ lệ hủy cao |
| **Mã yêu cầu liên quan** | FR-ADM-08 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Có tài xế chuyên hủy cuốc. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/reports/drivers/high-cancellations` |
| **Dữ liệu kiểm thử (Test Data)** | `threshold=10%` |
| **Kết quả mong đợi (Expected Result)** | Danh sách tài xế có tỷ lệ hủy >= 10%, nhằm mục đích cảnh cáo. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |
