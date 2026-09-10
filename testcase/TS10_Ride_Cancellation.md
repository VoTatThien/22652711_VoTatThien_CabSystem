# TEST SCENARIO 10: HỦY CHUYẾN XE

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-CNC-001 | Hủy chuyến xe | Khách hàng hủy chuyến miễn phí khi xe đang tìm hoặc đang đến | Chuyến xe đang ở trạng thái Searching hoặc Accepted | 1. Khách nhấn nút 'Hủy chuyến'<br>2. Chọn lý do hủy<br>3. Xác nhận | Lý do: 'Thay đổi kế hoạch' | Chuyến xe chuyển sang Cancelled; tài xế được giải phóng về trạng thái Online | High |
| TC-CNC-002 | Hủy chuyến xe | Chặn khách hàng hủy chuyến khi xe đang chạy trên đường | Chuyến xe đang ở trạng thái In_Progress | 1. Khách thử nhấn nút Hủy chuyến | Ride status: In_Progress | Hệ thống từ chối: Không thể hủy chuyến xe khi đang trong hành trình | High |
| TC-CNC-003 | Hủy chuyến xe | Tài xế hủy do khách không ra sau 5 phút chờ (No-Show) | Tài xế đã bấm Đã đến nơi quá 5 phút mà không thấy khách | 1. Tài xế nhấn 'Hủy chuyến do khách không xuất hiện'<br>2. Xác nhận | Thời gian chờ: 6 phút (> 5 phút) | Hủy chuyến thành công; tài xế không bị tính lỗi hủy chuyến | High |
| TC-CNC-004 | Hủy chuyến xe | Tài xế hủy No-Show khi chưa chờ đủ 5 phút | Tài xế mới bấm Đã đến nơi được 2 phút | 1. Tài xế bấm Hủy do khách không xuất hiện | Thời gian chờ: 2 phút (< 5 phút) | Báo lỗi: Bạn cần chờ tại điểm đón tối thiểu 5 phút | Medium |
| TC-CNC-005 | Hủy chuyến xe | Hủy chuyến nhưng không chọn lý do | Màn hình xác nhận hủy chuyến | 1. Không chọn lý do hủy<br>2. Bấm Xác nhận hủy | Lý do: để trống | Yêu cầu: Vui lòng chọn lý do hủy chuyến | Low |
