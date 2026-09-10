# Module 8: Đánh giá & Nhận xét (Rating & Review)

## FR-RATE-01: Submit rating 1-5 stars & comment

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-001 |
| **Tên Test Case** | Đánh giá 5 sao kèm bình luận hợp lệ |
| **Mã yêu cầu liên quan** | FR-RATE-01 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng vừa hoàn thành chuyến xe `RIDE_111`. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `POST /api/rides/RIDE_111/rate`<br>2. Truyền payload đánh giá. |
| **Dữ liệu kiểm thử (Test Data)** | `{"score": 5, "comment": "Tài xế rất thân thiện và lái xe an toàn."}` |
| **Kết quả mong đợi (Expected Result)** | HTTP 201 Created. Lưu record vào bảng Review thành công. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-002 |
| **Tên Test Case** | Từ chối đánh giá có điểm < 1 |
| **Mã yêu cầu liên quan** | FR-RATE-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng vừa hoàn thành chuyến xe. |
| **Các bước thực hiện (Test Steps)** | 1. Gửi request đánh giá với `score = 0`. |
| **Dữ liệu kiểm thử (Test Data)** | `{"score": 0}` |
| **Kết quả mong đợi (Expected Result)** | HTTP 400 Bad Request, message lỗi "Score must be between 1 and 5". |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-003 |
| **Tên Test Case** | Từ chối đánh giá có điểm > 5 |
| **Mã yêu cầu liên quan** | FR-RATE-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng vừa hoàn thành chuyến xe. |
| **Các bước thực hiện (Test Steps)** | 1. Gửi request đánh giá với `score = 6`. |
| **Dữ liệu kiểm thử (Test Data)** | `{"score": 6}` |
| **Kết quả mong đợi (Expected Result)** | HTTP 400 Bad Request. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-004 |
| **Tên Test Case** | Từ chối đánh giá khi chuyến xe chưa hoàn thành |
| **Mã yêu cầu liên quan** | FR-RATE-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Chuyến xe `RIDE_222` đang ở trạng thái IN_PROGRESS. |
| **Các bước thực hiện (Test Steps)** | 1. Gửi request đánh giá. |
| **Dữ liệu kiểm thử (Test Data)** | `RIDE_222`, `{"score": 4}` |
| **Kết quả mong đợi (Expected Result)** | HTTP 400 Bad Request. Lỗi "Ride must be COMPLETED to rate". |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-005 |
| **Tên Test Case** | Chặn đánh giá một chuyến xe 2 lần |
| **Mã yêu cầu liên quan** | FR-RATE-01, BRULE-08, EX-09 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng đã đánh giá chuyến `RIDE_111` trước đó. |
| **Các bước thực hiện (Test Steps)** | 1. Gửi request đánh giá lại chuyến `RIDE_111`. |
| **Dữ liệu kiểm thử (Test Data)** | `RIDE_111`, `{"score": 3}` |
| **Kết quả mong đợi (Expected Result)** | HTTP 409 Conflict. Lỗi "Ride has already been rated". |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-006 |
| **Tên Test Case** | Từ chối bình luận quá dài (> 500 ký tự) |
| **Mã yêu cầu liên quan** | FR-RATE-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Chuyến xe hoàn thành. |
| **Các bước thực hiện (Test Steps)** | 1. Gửi request đánh giá với bình luận 501 ký tự. |
| **Dữ liệu kiểm thử (Test Data)** | `comment`: Chuỗi dài 501 ký tự. |
| **Kết quả mong đợi (Expected Result)** | HTTP 400 Bad Request. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-RATE-02: Recalculate driver average rating (BRULE-08)

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-007 |
| **Tên Test Case** | Tính lại điểm trung bình cho đánh giá đầu tiên |
| **Mã yêu cầu liên quan** | FR-RATE-02, BRULE-08 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Tài xế `DRV_02` chưa có đánh giá nào (totalReviews = 0). |
| **Các bước thực hiện (Test Steps)** | 1. Khách hàng đánh giá 4 sao cho `DRV_02`.<br>2. Lấy thông tin Profile Tài xế. |
| **Dữ liệu kiểm thử (Test Data)** | `score`: 4 |
| **Kết quả mong đợi (Expected Result)** | Average rating của tài xế cập nhật thành 4.0, `totalReviews` = 1. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-008 |
| **Tên Test Case** | Tính toán cập nhật lại điểm trung bình chính xác |
| **Mã yêu cầu liên quan** | FR-RATE-02, BRULE-08 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Tài xế `DRV_03` có rating trung bình = 4.0, số đánh giá = 3. |
| **Các bước thực hiện (Test Steps)** | 1. Khách hàng đánh giá thêm 5 sao.<br>2. Công thức: `(4.0 * 3 + 5) / 4 = 17 / 4 = 4.25`.<br>3. Kiểm tra thông tin tài xế. |
| **Dữ liệu kiểm thử (Test Data)** | `score`: 5 |
| **Kết quả mong đợi (Expected Result)** | Average rating cập nhật thành 4.25 (hoặc làm tròn theo hệ thống 4.3), `totalReviews` = 4. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-009 |
| **Tên Test Case** | Đánh giá điểm cực trị (1 sao) |
| **Mã yêu cầu liên quan** | FR-RATE-02 |
| **Loại kiểm thử** | Boundary |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Tài xế `DRV_03` có rating trung bình = 5.0, số đánh giá = 1. |
| **Các bước thực hiện (Test Steps)** | 1. Đánh giá 1 sao. |
| **Dữ liệu kiểm thử (Test Data)** | `score`: 1 |
| **Kết quả mong đợi (Expected Result)** | Average rating giảm xuống `(5*1 + 1)/2 = 3.0`. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

## FR-RATE-03: View reviews

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-010 |
| **Tên Test Case** | Tài xế xem danh sách đánh giá của chính mình |
| **Mã yêu cầu liên quan** | FR-RATE-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Trung bình |
| **Điều kiện tiên quyết (Preconditions)** | Tài xế đăng nhập, đã có nhiều đánh giá. |
| **Các bước thực hiện (Test Steps)** | 1. Gọi API `GET /api/drivers/me/reviews?page=1` |
| **Dữ liệu kiểm thử (Test Data)** | Token của Tài xế |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, trả về danh sách đánh giá, có phân trang, được sort mới nhất lên đầu. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-011 |
| **Tên Test Case** | Người dùng public xem danh sách đánh giá của tài xế |
| **Mã yêu cầu liên quan** | FR-RATE-03 |
| **Loại kiểm thử** | Positive |
| **Độ ưu tiên** | Thấp |
| **Điều kiện tiên quyết (Preconditions)** | Khách hàng chuẩn bị đặt xe hoặc đang trong chuyến. |
| **Các bước thực hiện (Test Steps)** | 1. Khách hàng gọi API `GET /api/drivers/{driverID}/reviews` |
| **Dữ liệu kiểm thử (Test Data)** | `driverID`: `DRV_03` |
| **Kết quả mong đợi (Expected Result)** | HTTP 200, trả về danh sách đánh giá công khai (chỉ tên KH, số sao, comment, ngày tháng). Không lộ thông tin cá nhân KH. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |

| Trường | Nội dung |
|---|---|
| **Mã Test Case** | TC-RATE-012 |
| **Tên Test Case** | Không hiển thị thông tin nhạy cảm của người đánh giá |
| **Mã yêu cầu liên quan** | FR-RATE-03, NFR-SEC-01 |
| **Loại kiểm thử** | Negative |
| **Độ ưu tiên** | Cao |
| **Điều kiện tiên quyết (Preconditions)** | Có API xem review. |
| **Các bước thực hiện (Test Steps)** | 1. Truy vấn danh sách đánh giá.<br>2. Kiểm tra JSON response. |
| **Dữ liệu kiểm thử (Test Data)** | Không cần |
| **Kết quả mong đợi (Expected Result)** | Response tuyệt đối KHÔNG chứa email, số điện thoại, mật khẩu của người đã đánh giá. |
| **Kết quả thực tế (Actual Result)** | *(Chưa thực hiện)* |
| **Trạng thái (Status)** | ⬜ Chưa thực hiện |
