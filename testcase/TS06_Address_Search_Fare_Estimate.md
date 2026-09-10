# TEST SCENARIO 06: TÌM KIẾM ĐỊA CHỈ & ƯỚC TÍNH CƯỚC PHÍ

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-EST-001 | Tìm kiếm địa chỉ & Ước tính cước phí | Tìm kiếm địa chỉ đón/trả trả về gợi ý vị trí | Đang ở màn hình Đặt xe | 1. Gõ địa chỉ vào ô tìm kiếm<br>2. Chọn từ danh sách gợi ý | Địa chỉ: 'Đại học Công Nghiệp TP.HCM' | Hiển thị địa chỉ chính xác kèm định vị điểm trên bản đồ | High |
| TC-EST-002 | Tìm kiếm địa chỉ & Ước tính cước phí | Tính cước ước tính theo loại xe Sedan và SUV | Đã chọn điểm đón và điểm đến cách nhau 10km | 1. Hệ thống tính toán dựa trên khoảng cách và thời gian | Quãng đường: 10km<br>Thời gian: 20 phút | Hiển thị rõ giá cước ước tính cho xe Sedan và xe SUV | High |
| TC-EST-003 | Tìm kiếm địa chỉ & Ước tính cước phí | Lộ trình ngắn dưới 1km tính giá mở cửa tối thiểu | Điểm đón và điểm đến cách nhau 300m | 1. Chọn lộ trình 300m<br>2. Xem cước hiển thị | Quãng đường: 0.3km | Cước hiển thị đúng bằng giá cước mở cửa cơ sở (BaseFare) | Medium |
| TC-EST-004 | Tìm kiếm địa chỉ & Ước tính cước phí | Tìm kiếm với ô địa chỉ để trống | Đang ở ô tìm kiếm | 1. Bấm tìm kiếm nhưng không nhập chữ nào | Địa chỉ: rỗng | Hiển thị nhắc nhở: Vui lòng nhập địa chỉ cần tìm | Low |
| TC-EST-005 | Tìm kiếm địa chỉ & Ước tính cước phí | Điểm đón và điểm trả trùng vị trí | Đang ở màn hình Đặt xe | 1. Chọn điểm đón và điểm trả cùng một địa chỉ | Điểm đón = Điểm trả | Cảnh báo: Điểm đón và điểm trả không được trùng nhau | Medium |
