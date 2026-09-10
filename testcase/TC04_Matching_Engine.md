# Test Cases - Module 4: Matching Engine

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-001 |
| **Tên Test Case** | Tìm tài xế trong bán kính 5km với đúng loại xe |
| **Mã Yêu cầu** | FR-MATCH-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Hệ thống có tài xế A online, cách khách hàng 2km, cùng loại xe yêu cầu (Sedan). |
| **Các bước thực hiện** | 1. Khách hàng tạo chuyến đi với loại xe Sedan.<br>2. Hệ thống quét tài xế trong khu vực. |
| **Dữ liệu kiểm thử** | Khách hàng: (lat: 10.762622, lng: 106.660172), Loại xe: Sedan.<br>Tài xế A: (lat: 10.765, lng: 106.662), trạng thái ONLINE. |
| **Kết quả kỳ vọng** | Hệ thống trả về danh sách có tài xế A. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-002 |
| **Tên Test Case** | Bỏ qua tài xế ngoài bán kính 5km |
| **Mã Yêu cầu** | FR-MATCH-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế B online, đúng loại xe nhưng cách khách hàng 6km. |
| **Các bước thực hiện** | 1. Khách hàng tạo chuyến đi.<br>2. Hệ thống quét tài xế. |
| **Dữ liệu kiểm thử** | Tài xế B ở khoảng cách 6.0km. |
| **Kết quả kỳ vọng** | Tài xế B không xuất hiện trong danh sách ghép nối. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-003 |
| **Tên Test Case** | Bỏ qua tài xế đang offline hoặc bận |
| **Mã Yêu cầu** | FR-MATCH-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế C cách 1km, đúng xe nhưng trạng thái OFFLINE. Tài xế D trạng thái BUSY. |
| **Các bước thực hiện** | 1. Khách hàng tạo chuyến đi.<br>2. Hệ thống quét tài xế. |
| **Dữ liệu kiểm thử** | Trạng thái tài xế C: OFFLINE. Tài xế D: BUSY. |
| **Kết quả kỳ vọng** | Cả C và D đều không được ghép chuyến. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-004 |
| **Tên Test Case** | Bỏ qua tài xế có loại xe không khớp |
| **Mã Yêu cầu** | FR-MATCH-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Yêu cầu chuyến đi là SUV. Tài xế E (Sedan) đang online, cách 1km. |
| **Các bước thực hiện** | 1. Khách hàng tạo chuyến đi SUV.<br>2. Hệ thống tìm tài xế. |
| **Dữ liệu kiểm thử** | Req: SUV. Tài xế E: Sedan. |
| **Kết quả kỳ vọng** | Tài xế E không được ghép nối. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-005 |
| **Tên Test Case** | Quét tài xế ở chính xác biên 5.0km |
| **Mã Yêu cầu** | FR-MATCH-01 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Tài xế F cách chính xác 5.0km, online, đúng loại xe. |
| **Các bước thực hiện** | 1. Khách hàng đặt xe.<br>2. Kiểm tra danh sách ghép nối. |
| **Dữ liệu kiểm thử** | Khoảng cách tài xế F đến điểm đón: 5.0km. |
| **Kết quả kỳ vọng** | F vẫn nằm trong danh sách ghép nối. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-006 |
| **Tên Test Case** | Thuật toán xếp hạng: Ưu tiên khoảng cách sau đó đến rating |
| **Mã Yêu cầu** | FR-MATCH-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Có 3 tài xế thỏa mãn: TX1(1km, 4.8), TX2(2km, 5.0), TX3(1.5km, 4.9). |
| **Các bước thực hiện** | 1. Khách hàng đặt xe.<br>2. Kiểm tra thứ tự danh sách tài xế do thuật toán trả về. |
| **Dữ liệu kiểm thử** | Danh sách TX1, TX2, TX3. |
| **Kết quả kỳ vọng** | Thứ tự ưu tiên: TX1 (1km) -> TX3 (1.5km) -> TX2 (2km). |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-007 |
| **Tên Test Case** | Thuật toán xếp hạng với hai tài xế cùng khoảng cách |
| **Mã Yêu cầu** | FR-MATCH-02 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | TX_A (1km, rating 4.5) và TX_B (1km, rating 4.9). |
| **Các bước thực hiện** | 1. Khách hàng đặt xe.<br>2. Hệ thống xếp hạng. |
| **Dữ liệu kiểm thử** | TX_A: 1km/4.5; TX_B: 1km/4.9. |
| **Kết quả kỳ vọng** | Thứ tự: TX_B (vì rating cao hơn) -> TX_A. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-008 |
| **Tên Test Case** | Gửi yêu cầu đến tài xế đầu tiên kèm đếm ngược 30s |
| **Mã Yêu cầu** | FR-MATCH-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách đặt xe, hệ thống tìm được tài xế phù hợp. |
| **Các bước thực hiện** | 1. Hệ thống gửi yêu cầu qua WebSocket đến ứng dụng tài xế đầu tiên.<br>2. Giao diện tài xế hiển thị popup yêu cầu đón khách. |
| **Dữ liệu kiểm thử** | ID chuyến đi, thông tin đón/trả. |
| **Kết quả kỳ vọng** | App tài xế nhận event `ride_request`, hiển thị đồng hồ đếm ngược 30 giây. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-009 |
| **Tên Test Case** | Tài xế chấp nhận chuyến trong 30s |
| **Mã Yêu cầu** | FR-MATCH-04, EX-08 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế nhận được yêu cầu chuyến đi. |
| **Các bước thực hiện** | 1. Tài xế bấm "Chấp nhận" ở giây thứ 15.<br>2. Khách hàng nhận thông báo. |
| **Dữ liệu kiểm thử** | Nút "Accept" được trigger. |
| **Kết quả kỳ vọng** | HTTP 200. Trạng thái chuyến đi: ACCEPTED. Trạng thái tài xế: BUSY. Khách nhận event qua WS < 1s. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-010 |
| **Tên Test Case** | Kiểm soát đồng thời: Hai tài xế không thể nhận cùng một chuyến |
| **Mã Yêu cầu** | FR-MATCH-04, EX-08 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | (Giả lập do lỗi hoặc thủ thuật) Hai tài xế nhận được ID chuyến đi và gửi request "Accept" đồng thời. |
| **Các bước thực hiện** | 1. Gửi đồng thời 2 API request từ 2 tài xế khác nhau để nhận cùng 1 ride ID. |
| **Dữ liệu kiểm thử** | Cùng `rideId`. |
| **Kết quả kỳ vọng** | Một request thành công (HTTP 200). Request còn lại thất bại (HTTP 409 Conflict), chuyến đi đã được nhận. DB chỉ gán cho 1 tài xế. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-011 |
| **Tên Test Case** | Tài xế từ chối, chuyển ngay cho tài xế tiếp theo |
| **Mã Yêu cầu** | FR-MATCH-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Có sẵn tài xế 1 và tài xế 2 trong hàng đợi. |
| **Các bước thực hiện** | 1. Tài xế 1 nhận được popup, bấm "Từ chối".<br>2. Hệ thống kiểm tra tài xế tiếp theo. |
| **Dữ liệu kiểm thử** | Hành động "Reject" từ tài xế 1. |
| **Kết quả kỳ vọng** | Yêu cầu ngay lập tức được gửi tới tài xế 2. `retryCount` tăng lên 1. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-012 |
| **Tên Test Case** | Hết 30s tài xế không phản hồi, tự động chuyển tài xế |
| **Mã Yêu cầu** | FR-MATCH-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế 1 nhận popup và bỏ mặc thiết bị. |
| **Các bước thực hiện** | 1. Đợi quá 30 giây.<br>2. Hệ thống xử lý timeout. |
| **Dữ liệu kiểm thử** | Thời gian chờ = 31s. |
| **Kết quả kỳ vọng** | Yêu cầu trên app tài xế 1 bị hủy. Yêu cầu tự động gửi sang tài xế 2. `retryCount` tăng 1. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-013 |
| **Tên Test Case** | Tài xế chấp nhận ở sát giới hạn thời gian (giây thứ 29.9) |
| **Mã Yêu cầu** | FR-MATCH-05 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Đồng hồ đếm ngược sắp hết. |
| **Các bước thực hiện** | 1. Tài xế bấm Accept đúng lúc giây cuối cùng (29.9s). |
| **Dữ liệu kiểm thử** | Timestamp gửi accept sát với thời gian hết hạn. |
| **Kết quả kỳ vọng** | Yêu cầu vẫn được xử lý thành công, chuyến đi thuộc về tài xế đó, không chuyển sang tài xế khác. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-014 |
| **Tên Test Case** | Vòng lặp tìm tài xế thành công ở lần thử thứ 3 |
| **Mã Yêu cầu** | FR-MATCH-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Có 3 tài xế. TX1 từ chối. TX2 timeout (30s). TX3 chấp nhận. |
| **Các bước thực hiện** | 1. TX1 từ chối. -> Chuyển TX2.<br>2. TX2 hết 30s. -> Chuyển TX3.<br>3. TX3 bấm chấp nhận. |
| **Dữ liệu kiểm thử** | Kịch bản chuỗi 3 tài xế. |
| **Kết quả kỳ vọng** | Chuyến đi gán cho TX3. `retryCount` cuối cùng là 2. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-015 |
| **Tên Test Case** | Quá 5 lần thử (max retries) vẫn không có tài xế nhận |
| **Mã Yêu cầu** | FR-MATCH-06, BRULE-03, EX-02 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Có ít nhất 5 tài xế nhưng tất cả đều từ chối hoặc timeout. |
| **Các bước thực hiện** | 1. Lần lượt 5 tài xế không nhận chuyến. |
| **Dữ liệu kiểm thử** | `retryCount` đạt giới hạn 5. |
| **Kết quả kỳ vọng** | Chuyến đi chuyển trạng thái `NO_DRIVER`. Hệ thống gửi thông báo xin lỗi khách hàng. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-MAT-016 |
| **Tên Test Case** | Không có tài xế nào trong khu vực ngay từ đầu |
| **Mã Yêu cầu** | FR-MATCH-06 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng đặt xe ở khu vực hoàn toàn trống tài xế (hoặc tài xế offline hết). |
| **Các bước thực hiện** | 1. Khách tạo chuyến đi. |
| **Dữ liệu kiểm thử** | Số lượng tài xế trả về từ bước quét = 0. |
| **Kết quả kỳ vọng** | Hệ thống lập tức trả về `NO_DRIVER` cho khách hàng mà không cần chờ đợi. |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |
