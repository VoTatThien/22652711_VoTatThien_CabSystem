# TEST SCENARIO 04: KHAI BÁO XE & TRẠNG THÁI HOẠT ĐỘNG TÀI XẾ

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-DRV-001 | Khai báo xe & Trạng thái hoạt động tài xế | Khai báo thông tin xe hợp lệ (Sedan 4 chỗ) | Tài xế đã đăng nhập | 1. Mở trang Đăng ký xe<br>2. Nhập biển số, hãng xe, dòng xe, số ghế<br>3. Nhấn Lưu | Biển số: 51H-999.88<br>Hãng: Toyota Vios<br>Loại xe: Sedan<br>Ghế: 4 | Lưu thông tin xe thành công; trạng thái xe Active | High |
| TC-DRV-002 | Khai báo xe & Trạng thái hoạt động tài xế | Khai báo xe với biển số đã có trong hệ thống | Biển số 51H-999.88 đã được tài xế khác đăng ký | 1. Nhập biển số bị trùng<br>2. Nhấn Lưu | Biển số: 51H-999.88 | Từ chối lưu; thông báo Biển số xe đã được đăng ký | High |
| TC-DRV-003 | Khai báo xe & Trạng thái hoạt động tài xế | Tài xế đã được duyệt bật chế độ Trực tuyến (Online) | Tài xế có trạng thái Approved và xe Active | 1. Gạt nút sang 'Trực tuyến' | Trạng thái: Online (Available) | Trạng thái đổi sang Online; sẵn sàng nhận yêu cầu chuyến xe từ khách hàng | High |
| TC-DRV-004 | Khai báo xe & Trạng thái hoạt động tài xế | Tài xế chưa được duyệt cố tình bật Trực tuyến | Hồ sơ tài xế đang ở trạng thái Pending_Approval | 1. Gạt nút sang 'Trực tuyến' | Trạng thái: Pending | Hệ thống chặn; thông báo Hồ sơ của bạn chưa được duyệt | High |
| TC-DRV-005 | Khai báo xe & Trạng thái hoạt động tài xế | Tài xế tắt trực tuyến chuyển về Ngoại tuyến (Offline) | Tài xế đang Online và không chạy cuốc | 1. Gạt nút sang 'Ngoại tuyến' | Trạng thái: Offline | Chuyển trạng thái Offline; hệ thống ngừng phân bổ cuốc xe | Medium |
| TC-DRV-006 | Khai báo xe & Trạng thái hoạt động tài xế | Tài xế tự động chuyển sang Bận (Busy) khi có cuốc | Tài xế vừa bấm Chấp nhận chuyến xe | 1. Kiểm tra trạng thái tài xế trên hệ thống | Event: accept_ride | Trạng thái tài xế tự động chuyển thành Busy; không nhận thêm cuốc xe khác | High |
