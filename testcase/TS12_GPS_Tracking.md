# TEST SCENARIO 12: THEO DÕI VỊ TRÍ XE THỜI GIAN THỰC

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-TRK-001 | Theo dõi vị trí xe thời gian thực | Tài xế cập nhật tọa độ GPS định kỳ 5-10 giây | Tài xế đang trong chuyến đi | 1. Ứng dụng tự động gửi tọa độ GPS về máy chủ | Tọa độ: lat: 10.762622, lng: 106.660172 | Vị trí của tài xế được cập nhật liên tục trên hệ thống | High |
| TC-TRK-002 | Theo dõi vị trí xe thời gian thực | Khách hàng theo dõi vị trí xe di chuyển trên bản đồ | Tài xế đã nhận cuốc và đang di chuyển | 1. Mở màn hình theo dõi trên ứng dụng khách | Màn hình bản đồ theo dõi | Biểu tượng xe của tài xế di chuyển mượt mà trên bản đồ của khách | High |
| TC-TRK-003 | Theo dõi vị trí xe thời gian thực | Tự động tính lại thời gian dự kiến xe đến (ETA) | Xe tài xế đang tiến dần về điểm đón | 1. Vị trí xe cập nhật gần hơn từ 3km còn 1km | Khoảng cách còn lại: 1km | Thời gian xe đến giảm từ 8 phút xuống còn 3 phút trên app khách | Medium |
| TC-TRK-004 | Theo dõi vị trí xe thời gian thực | Tọa độ gửi lên không hợp lệ ngoài phạm vi địa lý | Thiết bị gửi tọa độ rác | 1. Gửi tọa độ lat > 90 hoặc lng > 180 | lat = 200.0, lng = 300.0 | Hệ thống loại bỏ gói tin sai; không cập nhật vị trí rác | Low |
