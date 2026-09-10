# TEST SCENARIO 11: THANH TOÁN CƯỚC PHÍ

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-PAY-001 | Thanh toán cước phí | Tính toán cước thực tế khi hoàn thành chuyến | Chuyến xe vừa kết thúc với 8km di chuyển trong 18 phút | 1. Hệ thống tự động tính cước theo công thức | Khoảng cách: 8km<br>Thời gian: 18 phút<br>Xe: Sedan | Hiển thị đúng số tiền cước thực tế cần thanh toán trên cả máy tài xế và khách | High |
| TC-PAY-002 | Thanh toán cước phí | Tài xế xác nhận đã nhận đủ tiền mặt từ khách | Khách trả tiền mặt cho tài xế | 1. Tài xế nhấn nút 'Xác nhận đã nhận tiền mặt' | Phương thức: Tiền mặt<br>Số tiền: 120.000 VNĐ | Trạng thái thanh toán đổi sang Hoàn thành (Completed); chuyến xe kết thúc | High |
| TC-PAY-003 | Thanh toán cước phí | Thanh toán trực tuyến qua Thẻ / Ví điện tử thành công | Khách hàng chọn thanh toán qua Thẻ | 1. Nhấn nút 'Thanh toán ngay'<br>2. Hệ thống trừ tiền thành công | Phương thức: Thẻ ngân hàng | Giao dịch thành công; nhận mã giao dịch; cập nhật trạng thái Completed | High |
| TC-PAY-004 | Thanh toán cước phí | Thanh toán thẻ thất bại do tài khoản không đủ số dư | Thẻ ngân hàng của khách không đủ tiền | 1. Thực hiện thanh toán thẻ | Thẻ không đủ số dư | Báo lỗi thanh toán thất bại; hiển thị tùy chọn Chuyển sang trả Tiền mặt | High |
| TC-PAY-005 | Thanh toán cước phí | Chặn xác nhận tiền mặt 2 lần trên cùng một chuyến | Chuyến xe đã được tài xế xác nhận thu tiền xong | 1. Thử bấm lại nút xác nhận tiền mặt | Giao dịch đã Completed | Hệ thống từ chối: Chuyến xe này đã được thanh toán hoàn tất | Medium |
| TC-PAY-006 | Thanh toán cước phí | Xem chi tiết hóa đơn cước phí sau khi thanh toán | Chuyến xe đã thanh toán xong | 1. Mở xem chi tiết chuyến xe | Ride ID hợp lệ | Hiển thị đầy đủ biên lai gồm: tiền cước, quãng đường, thời gian và phương thức thanh toán | Medium |
