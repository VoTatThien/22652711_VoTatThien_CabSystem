# Module 10: Bảo mật, RBAC & Audit (Security, RBAC, Audit)

## FR-SEC-01 & 02: RBAC strict separation (BRULE-09)

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-001 |
| **Tên Test Case** | Admin truy cập endpoint dành riêng cho Admin |
| **Mã yêu cầu liên quan** | FR-SEC-01, BRULE-09 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | User có role `ADMIN`. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/dashboard` |
| **Dữ liệu kiểm thử (Test Data)** | Token Admin |
| **Kết quả mong đợi (Expected Result)** | HTTP 200 OK, trả về dữ liệu bình thường. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-002 |
| **Tên Test Case** | Operator truy cập endpoint của Operator |
| **Mã yêu cầu liên quan** | FR-SEC-01, BRULE-09 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | User có role `OPERATOR`. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API giám sát chuyến đi `GET /api/operator/rides/active` |
| **Dữ liệu kiểm thử (Test Data)** | Token Operator |
| **Kết quả mong đợi (Expected Result)** | HTTP 200 OK. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-003 |
| **Tên Test Case** | Operator bị từ chối khi cập nhật bảng giá (Admin Only) |
| **Mã yêu cầu liên quan** | FR-SEC-02, BRULE-09 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | User có role `OPERATOR`. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `PUT /api/admin/pricing` |
| **Dữ liệu kiểm thử (Test Data)** | Token Operator, JSON data cập nhật giá |
| **Kết quả mong đợi (Expected Result)** | HTTP 403 Forbidden. Thông báo lỗi quyền truy cập. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-004 |
| **Tên Test Case** | Customer bị từ chối khi truy cập Admin Dashboard |
| **Mã yêu cầu liên quan** | FR-SEC-02, BRULE-09 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | User có role `CUSTOMER`. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/admin/dashboard` |
| **Dữ liệu kiểm thử (Test Data)** | Token Customer |
| **Kết quả mong đợi (Expected Result)** | HTTP 403 Forbidden. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-005 |
| **Tên Test Case** | Driver bị từ chối khi gọi API duyệt tài xế khác |
| **Mã yêu cầu liên quan** | FR-SEC-02, BRULE-09 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | User có role `DRIVER`. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `POST /api/admin/drivers/{ID}/approve` |
| **Dữ liệu kiểm thử (Test Data)** | Token Driver |
| **Kết quả mong đợi (Expected Result)** | HTTP 403 Forbidden. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-SEC-03: Immutable Audit Log (BRULE-10)

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-006 |
| **Tên Test Case** | Ghi Audit Log tự động khi Duyệt tài xế |
| **Mã yêu cầu liên quan** | FR-SEC-03, BRULE-10 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Admin thực hiện duyệt tài khoản Driver X. |
| **Các bước thực hiện (Test Steps)** | 1. Admin duyệt tài xế.<br>2. Kiểm tra collection/table AuditLog. |
| **Dữ liệu kiểm thử (Test Data)** | DriverID: `DRV_10` |
| **Kết quả mong đợi (Expected Result)** | Một record AuditLog được tạo với action `APPROVE_DRIVER`, `actorID`, `targetID`, `timestamp`. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-007 |
| **Tên Test Case** | Ghi Audit Log khi Cập nhật bảng giá |
| **Mã yêu cầu liên quan** | FR-SEC-03, BRULE-10 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Admin đổi giá cước. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API update giá.<br>2. Kiểm tra bảng AuditLog. |
| **Dữ liệu kiểm thử (Test Data)** | Giá mới: 15000 |
| **Kết quả mong đợi (Expected Result)** | Record `UPDATE_PRICING` được lưu, kèm JSON thay đổi cũ/mới. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-008 |
| **Tên Test Case** | Ghi Audit Log khi Block tài xế |
| **Mã yêu cầu liên quan** | FR-SEC-03, BRULE-10 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Admin khóa tài xế vi phạm. |
| **Các bước thực hiện (Test Steps)** | 1. Block tài xế.<br>2. Kiểm tra bảng AuditLog. |
| **Dữ liệu kiểm thử (Test Data)** | Action `BLOCK_DRIVER` |
| **Kết quả mong đợi (Expected Result)** | Record `BLOCK_DRIVER` được lưu lại kèm lý do (reason). |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-009 |
| **Tên Test Case** | Đảm bảo AuditLog không thể bị chỉnh sửa hoặc xóa |
| **Mã yêu cầu liên quan** | FR-SEC-03, BRULE-10 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Có một record trong AuditLog. Admin cố gắng gọi API xóa hoặc sửa qua hệ thống. |
| **Các bước thực hiện (Test Steps)** | 1. Kiểm tra mã nguồn API có endpoint DELETE hoặc PUT cho `/api/admin/audit-logs` không.<br>2. Thử tạo request DELETE thủ công. |
| **Dữ liệu kiểm thử (Test Data)** | Mọi ID AuditLog |
| **Kết quả mong đợi (Expected Result)** | Hệ thống không có API xóa/sửa AuditLog (404 Not Found hoặc 405 Method Not Allowed). Tính chất Append-only. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-SEC-04: Password hashing & data security

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-010 |
| **Tên Test Case** | Mật khẩu được băm (hashing) trước khi lưu DB |
| **Mã yêu cầu liên quan** | FR-SEC-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Đăng ký tài khoản mới. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `POST /api/auth/register`<br>2. Truy vấn trực tiếp vào DB để kiểm tra field `password`. |
| **Dữ liệu kiểm thử (Test Data)** | Password plain text: `Password@123` |
| **Kết quả mong đợi (Expected Result)** | Trong DB là chuỗi hash bcrypt (ví dụ: `$2a$10$...`), không lưu `Password@123`. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-011 |
| **Tên Test Case** | Không bao giờ lưu trữ CVV thẻ tín dụng |
| **Mã yêu cầu liên quan** | NFR-SEC-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng thêm phương thức thanh toán Thẻ Tín Dụng. |
| **Các bước thực hiện (Test Steps)** | 1. Thêm thẻ kèm CVV.<br>2. Check DB lưu trữ. |
| **Dữ liệu kiểm thử (Test Data)** | Card number: `4111...`, CVV: `123` |
| **Kết quả mong đợi (Expected Result)** | CVV chỉ dùng để tokenize qua Payment Gateway một lần, tuyệt đối không được xuất hiện trong bất kỳ bảng nào của DB. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-SEC-05: Circuit Breaker & fault isolation

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-012 |
| **Tên Test Case** | Circuit Breaker kích hoạt khi Payment Gateway bị lỗi/timeout |
| **Mã yêu cầu liên quan** | FR-SEC-05 |
| **Loại kiểm thử** | Positive / Fault Tolerance |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Cấu hình Payment Gateway (VNPay/Momo) bị ngắt kết nối hoặc delay > 10s. |
| **Các bước thực hiện (Test Steps)** | 1. Khách hàng thực hiện thanh toán chuyến đi. |
| **Dữ liệu kiểm thử (Test Data)** | Thanh toán chuyến `RIDE_333` |
| **Kết quả mong đợi (Expected Result)** | Sau khi timeout 5s, Circuit Breaker ngắt kết nối, bật Fallback method (chuyển sang Cash hoặc đưa vào trạng thái Pending) mà không làm crash app. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-SEC-013 |
| **Tên Test Case** | Circuit Breaker phục hồi sau thời gian lỗi |
| **Mã yêu cầu liên quan** | FR-SEC-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Circuit Breaker đang ở trạng thái OPEN. Sau đó kết nối Payment Gateway được phục hồi. |
| **Các bước thực hiện (Test Steps)** | 1. Chờ hết thời gian sleep window của Circuit Breaker (vd: 30s).<br>2. Khách hàng thực hiện thanh toán mới. |
| **Dữ liệu kiểm thử (Test Data)** | Thanh toán `RIDE_444` |
| **Kết quả mong đợi (Expected Result)** | Circuit Breaker chuyển sang HALF_OPEN rồi CLOSED. Giao dịch thành công qua Payment Gateway bình thường. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |
