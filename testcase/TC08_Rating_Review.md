# BẢNG TEST CASES - PHÂN HỆ 8: ĐÁNH GIÁ & PHẢN HỒI (RATING & REVIEW)

> Bao phủ: FR-RATE-01 đến FR-RATE-03 | AC-RAT-01 | BRULE-08 | EX-09 | Chuẩn 8 cột ngang Excel

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-RAT-001 | Đánh giá chuyến đi | Khách hàng gửi đánh giá 5 sao kèm nhận xét hợp lệ (BRULE-08) | Cuốc xe đã completed và thanh toán COMPLETED | 1. Mở màn hình Đánh giá<br>2. Chọn 5 sao<br>3. Nhập nhận xét<br>4. Bấm Gửi | rating = 5, comment = 'Tài xế lái xe an toàn, lịch sự' | Tạo bản ghi RatingReview, cập nhật rating trung bình tài xế, HTTP 201 Created | High |
| TC-RAT-002 | Đánh giá chuyến đi | Chặn gửi đánh giá với số sao nhỏ hơn 1 hoặc lớn hơn 5 | Cuốc xe đã hoàn thành | 1. Gửi request rating = 6 sao hoặc rating = 0 sao | rating = 6 | Báo lỗi validation HTTP 400: 'Điểm đánh giá phải từ 1 đến 5 sao' | High |
| TC-RAT-003 | Đánh giá chuyến đi | Chặn đánh giá 2 lần trên cùng 1 chuyến xe (EX-09) | Khách hàng đã đánh giá chuyến xe này trước đó | 1. Cố tình gửi lại đánh giá lần thứ 2 cho cùng rideId | rideId đã có đánh giá | Hệ thống từ chối HTTP 409 Conflict: 'Chuyến đi này đã được đánh giá' | High |
| TC-RAT-004 | Tính lại Rating tài xế | Tự động tính lại điểm trung bình tài xế theo công thức tích lũy (BRULE-08) | Tài xế đang có 4 lượt đánh giá, điểm TB 4.0. Lượt thứ 5 khách chấm 5 sao. | 1. Khách gửi đánh giá 5 sao | oldAvg = 4.0, totalReviews = 4, newScore = 5 | newAvg = (4.0 * 4 + 5) / 5 = 4.2★, totalReviews tăng lên 5 trong DriverProfile | High |
| TC-RAT-005 | Xem nhận xét | Tài xế xem danh sách phản hồi và nhận xét của khách hàng | Tài xế đã đăng nhập | 1. Gửi GET /api/v1/ratings/my-reviews | Driver Token | HTTP 200 OK, trả về danh sách số sao và lời nhận xét của khách hàng | Medium |
