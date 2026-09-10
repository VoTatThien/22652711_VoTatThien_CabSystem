# TEST SCENARIO 08: ĐIỀU PHỐI & TIẾP NHẬN CUỐC XE

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-MCH-001 | Điều phối & Tiếp nhận cuốc xe | Ưu tiên gửi cuốc cho tài xế gần nhất trong bán kính 5km | Tài xế A cách 1km, Tài xế B cách 3km cùng online và rảnh | 1. Khách đặt xe<br>2. Hệ thống quét và phân bổ chuyến | Khoảng cách A: 1km < B: 3km | Cuốc xe được gửi trước tiên đến màn hình của Tài xế A | High |
| TC-MCH-002 | Điều phối & Tiếp nhận cuốc xe | Bỏ qua tài xế cách điểm đón trên 5km | Tài xế C cách điểm đón 6km | 1. Hệ thống tìm tài xế trong vùng 5km | Khoảng cách C = 6km (> 5km) | Tài xế C không nhận được yêu cầu chuyến xe | High |
| TC-MCH-003 | Điều phối & Tiếp nhận cuốc xe | Tài xế bấm Chấp nhận cuốc trong vòng 30 giây | Màn hình tài xế hiển thị popup yêu cầu chuyến kèm đếm ngược 30s | 1. Tài xế bấm nút 'Chấp nhận' ở giây thứ 10 | Thời gian: 10s (< 30s) | Chuyến xe chuyển sang Accepted; màn hình khách hiển thị tài xế đã nhận chuyến | High |
| TC-MCH-004 | Điều phối & Tiếp nhận cuốc xe | Tài xế bấm Từ chối cuốc xe | Tài xế nhận được yêu cầu chuyến | 1. Tài xế bấm nút 'Từ chối' | Action: Reject | Đóng popup trên máy tài xế; hệ thống tự động chuyển cuốc cho tài xế kế tiếp | High |
| TC-MCH-005 | Điều phối & Tiếp nhận cuốc xe | Quá 30 giây tài xế không phản hồi (Timeout) | Tài xế nhận được cuốc nhưng không bấm gì | 1. Hết 30 giây đếm ngược | Timeout = 30s | Popup tự tắt; hệ thống tự động điều chuyển cuốc cho tài xế tiếp theo | High |
| TC-MCH-006 | Điều phối & Tiếp nhận cuốc xe | Hết 5 lượt xoay vòng không tài xế nào nhận | Đã gửi qua 5 tài xế nhưng đều từ chối hoặc quá giờ | 1. Tài xế thứ 5 hết thời gian phản hồi | Số lượt thử = 5 | Hủy tìm kiếm; thông báo Rất tiếc không có tài xế nào nhận chuyến, vui lòng thử lại sau | High |
