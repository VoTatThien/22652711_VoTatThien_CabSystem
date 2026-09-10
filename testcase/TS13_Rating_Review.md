# TEST SCENARIO 13: ĐÁNH GIÁ & PHẢN HỒI CHUYẾN ĐI

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-RAT-001 | Đánh giá & Phản hồi chuyến đi | Khách hàng gửi đánh giá 5 sao kèm nhận xét sau chuyến | Chuyến xe đã hoàn thành và thanh toán xong | 1. Chọn 5 sao<br>2. Nhập nhận xét: 'Tài xế lái xe an toàn'<br>3. Bấm Gửi | Rating: 5 sao<br>Comment: 'Lái xe rất an toàn, nhiệt tình' | Gửi đánh giá thành công; lưu nhận xét vào hồ sơ tài xế | High |
| TC-RAT-002 | Đánh giá & Phản hồi chuyến đi | Chặn gửi đánh giá với số sao bằng 0 hoặc lớn hơn 5 | Đang ở màn hình đánh giá | 1. Thử gửi đánh giá 0 sao hoặc 6 sao | Rating: 0 sao hoặc 6 sao | Báo lỗi: Điểm đánh giá phải từ 1 đến 5 sao | Medium |
| TC-RAT-003 | Đánh giá & Phản hồi chuyến đi | Chặn đánh giá 2 lần trên cùng một chuyến xe | Khách hàng đã đánh giá chuyến xe này | 1. Thử gửi lại đánh giá lần thứ 2 | Ride ID đã có đánh giá | Từ chối: Chuyến xe này đã được đánh giá trước đó | High |
| TC-RAT-004 | Đánh giá & Phản hồi chuyến đi | Tự động cập nhật điểm sao trung bình của tài xế | Tài xế có sẵn 4 lượt đánh giá (TB 4.0). Lượt này khách chấm 5 sao. | 1. Khách gửi đánh giá 5 sao | Old rating: 4.0<br>New review: 5 sao | Điểm trung bình mới của tài xế được tính lại chính xác thành 4.2 sao | High |
| TC-RAT-005 | Đánh giá & Phản hồi chuyến đi | Chặn gửi đánh giá khi chuyến xe chưa hoàn thành | Chuyến xe đang ở trạng thái In_Progress | 1. Cố tình gửi yêu cầu đánh giá | Ride status: In_Progress | Báo lỗi: Chỉ có thể đánh giá sau khi chuyến đi đã hoàn thành | Medium |
