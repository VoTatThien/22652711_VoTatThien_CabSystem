# TEST SCENARIO 09: THỰC HIỆN HÀNH TRÌNH CHUYẾN ĐI

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-RIDE-001 | Thực hiện hành trình chuyến đi | Tài xế cập nhật trạng thái 'Đã đến điểm đón' | Chuyến xe đang ở trạng thái Accepted | 1. Tài xế lái xe đến điểm hẹn<br>2. Nhấn nút 'Đã đến nơi' | Ride status: Accepted | Trạng thái chuyển sang Driver_Arrived; khách nhận thông báo tài xế đã đến | High |
| TC-RIDE-002 | Thực hiện hành trình chuyến đi | Tài xế cập nhật trạng thái 'Bắt đầu chuyến đi' | Chuyến xe đang ở trạng thái Driver_Arrived và khách đã lên xe | 1. Nhấn nút 'Bắt đầu di chuyển' | Ride status: Driver_Arrived | Trạng thái chuyển sang In_Progress; bắt đầu tính quãng đường di chuyển | High |
| TC-RIDE-003 | Thực hiện hành trình chuyến đi | Tài xế cập nhật trạng thái 'Hoàn thành chuyến đi' | Chuyến xe đang ở trạng thái In_Progress và đã đến điểm trả | 1. Dừng xe tại điểm đến<br>2. Nhấn nút 'Hoàn thành chuyến' | Ride status: In_Progress | Trạng thái chuyển sang Completed; màn hình chuyển sang bước Thanh toán cước | High |
| TC-RIDE-004 | Thực hiện hành trình chuyến đi | Chặn bấm Bắt đầu khi chưa bấm Đã đến nơi | Chuyến xe mới ở trạng thái Accepted | 1. Cố tình gửi lệnh Bắt đầu chuyến | Ride status: Accepted | Báo lỗi: Phải cập nhật Đã đến nơi trước khi bắt đầu chuyến xe | High |
| TC-RIDE-005 | Thực hiện hành trình chuyến đi | Chặn bấm Hoàn thành khi chưa bấm Bắt đầu chuyến | Chuyến xe đang ở trạng thái Driver_Arrived | 1. Cố tình gửi lệnh Hoàn thành chuyến | Ride status: Driver_Arrived | Báo lỗi: Chuyến xe chưa được bắt đầu | High |
