# BẢNG TEST CASES - PHÂN HỆ 6: ĐỊNH VỊ GPS & THEO DÕI REAL-TIME (TRACKING)

> Bao phủ: FR-TRACK-01 đến FR-TRACK-04 | AC-TRK-01, AC-TRK-02, AC-ADM-03 | Chuẩn 8 cột ngang Excel

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-TRK-001 | Cập nhật GPS | Tài xế gửi tọa độ GPS định kỳ 5-10s hợp lệ | Tài xế đang online hoặc đang trong cuốc xe | 1. Thiết bị tài xế phát sự kiện socket 'driver:locationUpdate' | { "lat": 10.762622, "lng": 106.660172, "bearing": 90, "speed": 35 } | currentLocation trong DriverProfile được cập nhật dạng GeoJSON Point, độ trễ < 1.5s | High |
| TC-TRK-002 | Cập nhật GPS | Chặn cập nhật GPS với tọa độ ngoài giới hạn địa lý | Tài xế phát socket | 1. Gửi tọa độ lat > 90 hoặc lng > 180 | { "lat": 195.0, "lng": 250.0 } | Hệ thống từ chối cập nhật tọa độ không hợp lệ, ngắt packet rác | Medium |
| TC-TRK-003 | Theo dõi xe trực tuyến | Khách hàng nhận tọa độ xe di chuyển real-time trên bản đồ | Khách hàng tham gia room socket 'ride_{rideId}' | 1. Tài xế phát locationUpdate<br>2. Server broadcast tới room chuyến xe | Room: ride_60b8d295f1d2c72b8c5e6f50 | App khách hàng nhận sự kiện và biểu tượng xe di chuyển mượt mà trên bản đồ | High |
| TC-TRK-004 | Tính lại ETA | Tự động tính lại thời gian dự kiến đến (ETA) theo vị trí mới | Tài xế đang di chuyển tới điểm đón khách | 1. Vị trí xe cập nhật tiến gần điểm đón từ 3km còn 1km<br>2. Hệ thống tính lại ETA | Khoảng cách còn lại: 1.0km | ETA cập nhật giảm từ 8 phút xuống còn 3 phút trên app khách hàng | Medium |
| TC-TRK-005 | Bản đồ Operator | Operator xem toàn bộ xe online trên bản đồ giám sát trung tâm | Đăng nhập tài khoản role Operator/Admin | 1. Gửi GET /api/v1/tracking/live | Role: operator | HTTP 200 OK, trả về danh sách tất cả tài xế online kèm tọa độ GPS và trạng thái (available/busy) | High |
