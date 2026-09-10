# Test Cases Module 2: Driver Management

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-001 |
| **Tên Test Case** | Đăng ký xe hợp lệ |
| **Mã Yêu cầu** | FR-DRV-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế đã đăng nhập |
| **Các bước thực hiện** | 1. Điền thông tin xe hợp lệ<br>2. Lưu thông tin |
| **Dữ liệu kiểm thử** | Type: Sedan, Plate: 51F-12345, Seats: 4 |
| **Kết quả kỳ vọng** | HTTP 201 Created, DB lưu Vehicle |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-002 |
| **Tên Test Case** | Đăng ký xe trùng biển số |
| **Mã Yêu cầu** | FR-DRV-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Biển số đã tồn tại |
| **Các bước thực hiện** | 1. Nhập biển số đã có |
| **Dữ liệu kiểm thử** | Plate: 51F-12345 |
| **Kết quả kỳ vọng** | HTTP 409 Conflict, message trùng biển số |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-003 |
| **Tên Test Case** | Đổi trạng thái Online/Offline thành công |
| **Mã Yêu cầu** | FR-DRV-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế isApproved=true, isActive=true |
| **Các bước thực hiện** | 1. Bật/Tắt trạng thái hoạt động |
| **Dữ liệu kiểm thử** | Action: toggle_status |
| **Kết quả kỳ vọng** | HTTP 200 OK, DB cập nhật isAvailable |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-004 |
| **Tên Test Case** | Tài xế chưa được duyệt đổi Online |
| **Mã Yêu cầu** | FR-DRV-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế isApproved=false |
| **Các bước thực hiện** | 1. Bật trạng thái hoạt động |
| **Dữ liệu kiểm thử** | Action: online |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden, message chưa được duyệt |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-005 |
| **Tên Test Case** | Auto busy khi nhận cuốc xe |
| **Mã Yêu cầu** | FR-DRV-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế đang Online và Available |
| **Các bước thực hiện** | 1. Tài xế bấm Chấp nhận cuốc |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | Hệ thống tự động set status tài xế thành busy |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-006 |
| **Tên Test Case** | Tài xế busy không nhận được cuốc mới |
| **Mã Yêu cầu** | FR-DRV-03 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế đang busy |
| **Các bước thực hiện** | 1. Hệ thống tìm tài xế cho cuốc mới |
| **Dữ liệu kiểm thử** | Ride Request |
| **Kết quả kỳ vọng** | Tài xế bị bỏ qua trong danh sách tìm kiếm |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-007 |
| **Tên Test Case** | Duyệt tài xế thành công |
| **Mã Yêu cầu** | FR-DRV-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Operator đã đăng nhập, tài xế isApproved=false |
| **Các bước thực hiện** | 1. Operator duyệt tài xế |
| **Dữ liệu kiểm thử** | DriverID: D123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, DB isApproved=true, sinh Audit Log, gửi Email |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-008 |
| **Tên Test Case** | Từ chối tài xế với lý do |
| **Mã Yêu cầu** | FR-DRV-04 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Như TC-DRV-007 |
| **Các bước thực hiện** | 1. Operator từ chối tài xế |
| **Dữ liệu kiểm thử** | DriverID: D123, Reason: GPLX mờ |
| **Kết quả kỳ vọng** | HTTP 200 OK, isApproved=false, lưu lý do |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-009 |
| **Tên Test Case** | Khách hàng thử duyệt tài xế |
| **Mã Yêu cầu** | FR-DRV-04 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng đăng nhập |
| **Các bước thực hiện** | 1. Gọi API duyệt tài xế |
| **Dữ liệu kiểm thử** | DriverID: D123 |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden, không đủ quyền |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-010 |
| **Tên Test Case** | Xem Dashboard Tài xế |
| **Mã Yêu cầu** | FR-DRV-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế đã đăng nhập |
| **Các bước thực hiện** | 1. Gọi API lấy dashboard |
| **Dữ liệu kiểm thử** | DriverID: D123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, trả về JSON tổng số chuyến, rating, doanh thu |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-011 |
| **Tên Test Case** | Xem Dashboard của tài xế khác |
| **Mã Yêu cầu** | FR-DRV-05 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế D123 đăng nhập |
| **Các bước thực hiện** | 1. Gọi API xem dashboard của D124 |
| **Dữ liệu kiểm thử** | DriverID: D124 |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden, unauthorized access |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-012 |
| **Tên Test Case** | Admin khóa tài xế |
| **Mã Yêu cầu** | FR-DRV-06 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Admin đăng nhập |
| **Các bước thực hiện** | 1. Admin chọn block tài xế |
| **Dữ liệu kiểm thử** | DriverID: D123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, DB isActive=false, socket bị ngắt |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-013 |
| **Tên Test Case** | Operator thử khóa tài xế |
| **Mã Yêu cầu** | FR-DRV-06 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Operator đăng nhập |
| **Các bước thực hiện** | 1. Operator gọi API block |
| **Dữ liệu kiểm thử** | DriverID: D123 |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden, yêu cầu quyền Admin |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-014 |
| **Tên Test Case** | Đăng ký xe thiếu số chỗ ngồi |
| **Mã Yêu cầu** | FR-DRV-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Tài xế đã đăng nhập |
| **Các bước thực hiện** | 1. Bỏ trống số chỗ ngồi |
| **Dữ liệu kiểm thử** | Seats: null |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, message thiếu số chỗ |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-DRV-015 |
| **Tên Test Case** | Tài xế bị khóa đổi Online |
| **Mã Yêu cầu** | FR-DRV-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế isActive=false |
| **Các bước thực hiện** | 1. Bật trạng thái hoạt động |
| **Dữ liệu kiểm thử** | Action: online |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden, message tài khoản bị khóa |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |
