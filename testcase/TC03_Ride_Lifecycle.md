# Test Cases Module 3: Ride Lifecycle

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-001 |
| **Tên Test Case** | Geocoding địa chỉ hợp lệ |
| **Mã Yêu cầu** | FR-RIDE-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Hệ thống Google Maps API active |
| **Các bước thực hiện** | 1. Nhập địa chỉ tìm kiếm |
| **Dữ liệu kiểm thử** | Address: 12 Nguyễn Văn Bảo, Gò Vấp |
| **Kết quả kỳ vọng** | HTTP 200 OK, JSON trả về tọa độ [lng, lat] |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-002 |
| **Tên Test Case** | Geocoding địa chỉ trống |
| **Mã Yêu cầu** | FR-RIDE-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Như trên |
| **Các bước thực hiện** | 1. Bỏ trống địa chỉ |
| **Dữ liệu kiểm thử** | Address: "" |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, message yêu cầu địa chỉ |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-003 |
| **Tên Test Case** | Geocoding ngoài vùng hoạt động |
| **Mã Yêu cầu** | FR-RIDE-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Như trên |
| **Các bước thực hiện** | 1. Nhập địa chỉ ở nước ngoài |
| **Dữ liệu kiểm thử** | Address: New York, USA |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, message ngoài khu vực phục vụ |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-004 |
| **Tên Test Case** | Tính giá cước chuẩn (Sedan/SUV) |
| **Mã Yêu cầu** | FR-RIDE-02, BRULE-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Đã có tọa độ đi và đến |
| **Các bước thực hiện** | 1. Gọi API estimate fare |
| **Dữ liệu kiểm thử** | Distance: 5km, Duration: 15m, Type: Sedan |
| **Kết quả kỳ vọng** | HTTP 200 OK, JSON giá tiền tính theo công thức BRULE-01 |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-005 |
| **Tên Test Case** | Tính giá cước Boundary (0.5km) |
| **Mã Yêu cầu** | FR-RIDE-02 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Như trên |
| **Các bước thực hiện** | 1. Khoảng cách dưới mức tối thiểu |
| **Dữ liệu kiểm thử** | Distance: 0.5km |
| **Kết quả kỳ vọng** | HTTP 200 OK, áp dụng Base Fare (giá tối thiểu) |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-006 |
| **Tên Test Case** | Đặt xe thành công |
| **Mã Yêu cầu** | FR-RIDE-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng không có chuyến nào đang active |
| **Các bước thực hiện** | 1. Khách hàng bấm Đặt xe |
| **Dữ liệu kiểm thử** | Pickup, Dropoff, VehicleType |
| **Kết quả kỳ vọng** | HTTP 201 Created, DB Ride status=searching |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-007 |
| **Tên Test Case** | Đặt xe khi đang có chuyến active |
| **Mã Yêu cầu** | FR-RIDE-03, AC-BOOK-02 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng đang trong chuyến đi (in_progress) |
| **Các bước thực hiện** | 1. Khách hàng tiếp tục đặt chuyến mới |
| **Dữ liệu kiểm thử** | Pickup, Dropoff |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, báo lỗi AC-BOOK-02 |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-008 |
| **Tên Test Case** | Đặt xe thiếu tọa độ |
| **Mã Yêu cầu** | FR-RIDE-03 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Khách hàng bình thường |
| **Các bước thực hiện** | 1. Bỏ trống tọa độ đón |
| **Dữ liệu kiểm thử** | Pickup: null |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, message thiếu tọa độ |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-009 |
| **Tên Test Case** | Tài xế đến điểm đón |
| **Mã Yêu cầu** | FR-RIDE-04 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế đã accept chuyến |
| **Các bước thực hiện** | 1. Bấm Đã đến điểm đón |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, Ride status=driver_arrived, gửi Noti cho khách |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-010 |
| **Tên Test Case** | Đổi status từ searching sang arrived |
| **Mã Yêu cầu** | FR-RIDE-04, BRULE-05 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến xe đang searching |
| **Các bước thực hiện** | 1. Cố tình gọi API arrived |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, vi phạm BRULE-05 chuyển trạng thái sai |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-011 |
| **Tên Test Case** | Bắt đầu chuyến đi |
| **Mã Yêu cầu** | FR-RIDE-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến xe status=driver_arrived |
| **Các bước thực hiện** | 1. Tài xế bấm Bắt đầu chuyến |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, Ride status=in_progress, DB ghi nhận startedAt |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-012 |
| **Tên Test Case** | Bắt đầu chuyến khi chưa tới điểm đón |
| **Mã Yêu cầu** | FR-RIDE-05 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến xe status=accepted |
| **Các bước thực hiện** | 1. Bấm Bắt đầu chuyến |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, state transition invalid |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-013 |
| **Tên Test Case** | Hoàn thành chuyến đi |
| **Mã Yêu cầu** | FR-RIDE-06 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến xe status=in_progress |
| **Các bước thực hiện** | 1. Bấm Hoàn thành chuyến |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, Ride status=completed, DB lưu giờ kết thúc và chốt giá tiền |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-014 |
| **Tên Test Case** | Hoàn thành chuyến sai trạng thái |
| **Mã Yêu cầu** | FR-RIDE-06 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến xe status=searching |
| **Các bước thực hiện** | 1. Bấm Hoàn thành chuyến |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-015 |
| **Tên Test Case** | Khách hàng hủy chuyến miễn phí |
| **Mã Yêu cầu** | FR-RIDE-07 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến xe status=searching hoặc accepted |
| **Các bước thực hiện** | 1. Khách bấm Hủy chuyến |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, Ride status=cancelled, Giải phóng tài xế (free) |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-016 |
| **Tên Test Case** | Khách hàng hủy chuyến khi đang chạy |
| **Mã Yêu cầu** | FR-RIDE-07, BRULE-06 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Chuyến xe status=in_progress |
| **Các bước thực hiện** | 1. Khách bấm Hủy chuyến |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 400 Bad Request, vi phạm BRULE-06 |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-017 |
| **Tên Test Case** | Tài xế hủy do khách không xuất hiện (>= 5p) |
| **Mã Yêu cầu** | FR-RIDE-08, EX-05 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Tài xế chờ >= 5 phút |
| **Các bước thực hiện** | 1. Bấm Hủy chuyến No-Show |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, Ride status=cancelled, không bị phạt (EX-05) |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-018 |
| **Tên Test Case** | Tài xế hủy chuyến sớm (< 5p) |
| **Mã Yêu cầu** | FR-RIDE-08 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết** | Tài xế chờ < 5 phút |
| **Các bước thực hiện** | 1. Bấm Hủy chuyến |
| **Dữ liệu kiểm thử** | RideID: R123 |
| **Kết quả kỳ vọng** | HTTP 200 OK, chuyến bị hủy, tài xế bị áp dụng penalty |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-019 |
| **Tên Test Case** | Xem lịch sử chuyến đi |
| **Mã Yêu cầu** | FR-RIDE-09 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Đã có nhiều chuyến hoàn thành |
| **Các bước thực hiện** | 1. Gọi API xem lịch sử |
| **Dữ liệu kiểm thử** | Filter: status=completed, Page: 1 |
| **Kết quả kỳ vọng** | HTTP 200 OK, trả về danh sách phân trang |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RIDE-020 |
| **Tên Test Case** | Xem chi tiết chuyến đi của người khác |
| **Mã Yêu cầu** | FR-RIDE-09 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Khách hàng KH1 |
| **Các bước thực hiện** | 1. Gọi API xem chi tiết R999 của KH2 |
| **Dữ liệu kiểm thử** | RideID: R999 |
| **Kết quả kỳ vọng** | HTTP 403 Forbidden |
| **Kết quả thực tế** | *(Chưa thực hiện)* |
| **Trạng thái** | ⬜ Chưa thực hiện |
