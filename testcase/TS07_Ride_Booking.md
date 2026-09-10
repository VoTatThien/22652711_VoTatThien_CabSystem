# TEST SCENARIO 07: KHÁCH HÀNG ĐẶT CHUYẾN XE

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-BOOK-001 | Khách hàng đặt chuyến xe | Đặt chuyến xe thành công khi nhập đủ thông tin | Khách hàng đã đăng nhập, không có chuyến xe nào đang chạy | 1. Chọn điểm đón, điểm trả<br>2. Chọn loại xe<br>3. Chọn thanh toán Tiền mặt<br>4. Nhấn 'Đặt xe' | Đón: ĐH Công Nghiệp<br>Trả: Chợ Bến Thành<br>Xe: Sedan<br>TT: Tiền mặt | Tạo chuyến xe thành công; trạng thái chuyển sang Tìm tài xế (Searching) | High |
| TC-BOOK-002 | Khách hàng đặt chuyến xe | Chặn đặt thêm chuyến khi đang có chuyến chưa hoàn thành | Khách hàng đang có chuyến xe ở trạng thái In_Progress | 1. Nhấn nút Đặt xe mới | User đang có cuốc chạy | Báo lỗi: Bạn đang có chuyến xe đang diễn ra, không thể đặt thêm | High |
| TC-BOOK-003 | Khách hàng đặt chuyến xe | Đặt xe nhưng không chọn phương thức thanh toán | Màn hình đặt xe | 1. Chọn lộ trình nhưng bỏ qua bước chọn thanh toán<br>2. Nhấn Đặt xe | PaymentMethod: null | Nhắc nhở: Vui lòng chọn phương thức thanh toán trước khi đặt xe | Medium |
| TC-BOOK-004 | Khách hàng đặt chuyến xe | Khu vực đặt xe không có tài xế nào trực tuyến | Quanh bán kính 5km không có tài xế nào Online | 1. Khách nhấn Đặt xe<br>2. Hệ thống quét tìm tài xế | Tài xế online quanh 5km = 0 | Sau 15 giây quét, thông báo: Hiện không có tài xế nào quanh khu vực của bạn | High |
