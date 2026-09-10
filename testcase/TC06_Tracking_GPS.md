# Test Cases - Module 6: Tracking & GPS

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-001 |
| **Tên Test Case** | Tài xế cập nhật GPS thành công định kỳ |
| **Mã Yêu cầu** | FR-TRACK-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | App tài xế đang chạy ở trạng thái Online. |
| **Các bước thực hiện** | 1. App tài xế phát sự kiện WebSocket `locationUpdate` kèm tọa độ.<br>2. Hệ thống nhận và cập nhật vào DB (DriverProfile `currentLocation`). |
| **Dữ liệu kiểm thử** | lat: 10.762622, lng: 106.660172 |
| **Kết quả kỳ vọng** | DB được cập nhật index 2dsphere mới. Không sinh lỗi. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-002 |
| **Tên Test Case** | Tọa độ vĩ độ (lat) vượt quá +90 |
| **Mã Yêu cầu** | FR-TRACK-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Kết nối WS tài xế ổn định. |
| **Các bước thực hiện** | 1. Gửi payload cập nhật tọa độ với lat không hợp lệ. |
| **Dữ liệu kiểm thử** | lat: 91.0, lng: 106.0 |
| **Kết quả kỳ vọng** | Server reject thông báo (Validation Error), không cập nhật DB. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-003 |
| **Tên Test Case** | Tọa độ vĩ độ (lat) dưới mức -90 |
| **Mã Yêu cầu** | FR-TRACK-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Kết nối WS tài xế ổn định. |
| **Các bước thực hiện** | 1. Gửi payload lat < -90. |
| **Dữ liệu kiểm thử** | lat: -95.5, lng: 100.0 |
| **Kết quả kỳ vọng** | Server reject, log lỗi validation. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-004 |
| **Tên Test Case** | Tọa độ kinh độ (lng) vượt quá +180 |
| **Mã Yêu cầu** | FR-TRACK-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Kết nối WS tài xế. |
| **Các bước thực hiện** | 1. Gửi payload lng > 180. |
| **Dữ liệu kiểm thử** | lat: 10.0, lng: 181.5 |
| **Kết quả kỳ vọng** | Server từ chối cập nhật do vượt chuẩn địa lý. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-005 |
| **Tên Test Case** | Tọa độ kinh độ (lng) dưới mức -180 |
| **Mã Yêu cầu** | FR-TRACK-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Kết nối WS tài xế. |
| **Các bước thực hiện** | 1. Gửi payload lng < -180. |
| **Dữ liệu kiểm thử** | lat: 10.0, lng: -200.0 |
| **Kết quả kỳ vọng** | Server từ chối cập nhật tọa độ. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-006 |
| **Tên Test Case** | Tọa độ giới hạn chính xác tại các biên |
| **Mã Yêu cầu** | FR-TRACK-01 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Thấp |
| **Điều kiện tiên quyết** | Tài xế online. |
| **Các bước thực hiện** | 1. Gửi tọa độ ngay tại điểm biên lớn nhất. |
| **Dữ liệu kiểm thử** | lat: 90.0, lng: 180.0 |
| **Kết quả kỳ vọng** | Server chấp nhận và lưu DB bình thường (vì đây là giá trị hợp lệ). |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-007 |
| **Tên Test Case** | Khách hàng live tracking tọa độ xe với độ trễ thấp |
| **Mã Yêu cầu** | FR-TRACK-02, AC-TRK-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng có một chuyến đi đang hoạt động. |
| **Các bước thực hiện** | 1. Khách hàng join socket room `ride_{rideId}`.<br>2. Tài xế phát location mới.<br>3. Khách hàng nhận được gói tin vị trí. |
| **Dữ liệu kiểm thử** | `rideId` = 1001. Tài xế di chuyển. |
| **Kết quả kỳ vọng** | Gói tin đến App khách < 1.5s. App khách hiển thị biểu tượng xe di chuyển. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-008 |
| **Tên Test Case** | Khách hàng cố gắng theo dõi chuyến đi của người khác |
| **Mã Yêu cầu** | FR-TRACK-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng A đang đăng nhập. |
| **Các bước thực hiện** | 1. Khách A gửi lệnh join socket room `ride_{rideId_cua_khach_B}`. |
| **Dữ liệu kiểm thử** | `rideId` thuộc về người khác. |
| **Kết quả kỳ vọng** | Socket server phát hiện authorization mismatch, từ chối join room hoặc disconnect. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-009 |
| **Tên Test Case** | Tự động reconnect socket khi rớt mạng |
| **Mã Yêu cầu** | FR-TRACK-02 |
| **Loại kiểm thử** | Positive/Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | App khách đang xem live tracking. |
| **Các bước thực hiện** | 1. Tắt Wifi/4G của điện thoại giả lập.<br>2. Bật lại mạng sau 5s. |
| **Dữ liệu kiểm thử** | Thao tác mạng thiết bị. |
| **Kết quả kỳ vọng** | App tự động reconnect vào socket server và tiếp tục nhận được luồng GPS của chuyến đi mà không cần khởi động lại. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-010 |
| **Tên Test Case** | Cập nhật lại ETA khi tài xế di chuyển |
| **Mã Yêu cầu** | FR-TRACK-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế đang trên đường đến đón khách. |
| **Các bước thực hiện** | 1. Tọa độ xe thay đổi đáng kể (tiến gần hơn).<br>2. Dịch vụ ETA chạy lại để tính quãng đường còn lại. |
| **Dữ liệu kiểm thử** | Quãng đường ban đầu 2km (ETA 6p). Sau đó xe di chuyển còn 1km. |
| **Kết quả kỳ vọng** | Socket bắn về client thông tin ETA mới (vd: 3 phút). |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-011 |
| **Tên Test Case** | ETA không thay đổi hoặc tăng khi tài xế kẹt xe (đứng yên) |
| **Mã Yêu cầu** | FR-TRACK-03 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Xe đang di chuyển nhưng đứng yên lâu ở 1 tọa độ. |
| **Các bước thực hiện** | 1. Gửi cùng 1 tọa độ liên tục trong 3 phút. |
| **Dữ liệu kiểm thử** | lat/lng không đổi trong 3 phút. |
| **Kết quả kỳ vọng** | Hệ thống nhận diện tốc độ chậm, ETA được giữ nguyên hoặc cộng thêm thời gian dự kiến kẹt xe. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-012 |
| **Tên Test Case** | Operator xem được bản đồ toàn bộ tài xế |
| **Mã Yêu cầu** | FR-TRACK-04, AC-ADM-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Admin/Operator đăng nhập vào dashboard. Có 5 tài xế đang online. |
| **Các bước thực hiện** | 1. Mở trang Live Map.<br>2. App gọi API/Socket lấy danh sách xe online. |
| **Dữ liệu kiểm thử** | Token của Operator. |
| **Kết quả kỳ vọng** | Cả 5 xe hiển thị đúng vị trí trên bản đồ, update liên tục. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-013 |
| **Tên Test Case** | Khách hàng cố truy cập Live Map của Operator |
| **Mã Yêu cầu** | FR-TRACK-04 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | User đăng nhập vai trò Customer. |
| **Các bước thực hiện** | 1. Gọi API GET `/api/admin/live-map` hoặc join room admin. |
| **Dữ liệu kiểm thử** | Token của Customer. |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden. Socket ngắt kết nối với mã lỗi "Unauthorized Role". |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-TRK-014 |
| **Tên Test Case** | Xe biến mất khỏi Live Map khi tài xế offline |
| **Mã Yêu cầu** | FR-TRACK-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Operator đang mở bản đồ. Tài xế T đang có mặt trên bản đồ. |
| **Các bước thực hiện** | 1. Tài xế T bấm "Go Offline".<br>2. Operator quan sát màn hình. |
| **Dữ liệu kiểm thử** | Driver state update -> OFFLINE. |
| **Kết quả kỳ vọng** | Event gửi về dashboard Operator, icon tài xế T bị xóa khỏi bản đồ lập tức. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |
