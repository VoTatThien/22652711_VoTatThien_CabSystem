# 📑 TÀI LIỆU ĐẶC TẢ API THEO TỪNG NHÓM (API SPECIFICATIONS BY MODULE)
## CAB System – Nền tảng đặt xe trực tuyến

- **Sinh viên:** Võ Tất Thiện – MSSV: 22652711
- **Base URL:** `http://localhost:3000/api/v1`
- **Swagger UI (Docker):** `http://localhost:8080`
- **Swagger UI (Node.js):** `http://localhost:3000/api-docs`

---

### Danh mục các file đặc tả API phân tách theo từng nhóm:

| # | Phân hệ API | File YAML (OpenAPI 3.0) | Dải Yêu cầu (FR) | Tiêu chí Chấp nhận (AC) | Số Endpoints |
|:---:|---|---|:---:|:---:|:---:|
| 1 | **Xác thực & Người dùng** | [`01_auth_api.yaml`](./01_auth_api.yaml) | `FR-AUTH-01..06` | `AC-AUTH-01, 02` | 8 |
| 2 | **Quản lý Tài xế & Xe** | [`02_driver_api.yaml`](./02_driver_api.yaml) | `FR-DRV-01..06` | `AC-DRV-01, 02, AC-TRK-01` | 8 |
| 3 | **Đặt xe & Vòng đời cuốc** | [`03_ride_api.yaml`](./03_ride_api.yaml) | `FR-RIDE-01..09` | `AC-BOOK-01, 02, AC-RIDE-01, AC-CNC-01, 02` | 9 |
| 4 | **Tính cước & Thanh toán** | [`04_payment_api.yaml`](./04_payment_api.yaml) | `FR-PAY-01..07` | `AC-PAY-01, 02, AC-ADM-02` | 6 |
| 5 | **Định vị & Giám sát** | [`05_tracking_api.yaml`](./05_tracking_api.yaml) | `FR-TRACK-01..04` | `AC-TRK-01, 02, AC-ADM-03` | 1 REST + 4 Socket |
| 6 | **Quản lý Thông báo** | [`06_notification_api.yaml`](./06_notification_api.yaml) | `FR-NOTIF-01..05` | `AC-AUTH-01` | 3 |
| 7 | **Đánh giá & Phản hồi** | [`07_rating_api.yaml`](./07_rating_api.yaml) | `FR-RATE-01..03` | `AC-RAT-01` | 3 |
| 8 | **Quản trị & Báo cáo** | [`08_admin_api.yaml`](./08_admin_api.yaml) | `FR-ADM-01..08, FR-SEC-01..05` | `AC-ADM-01..03` | 11 |
| * | **Toàn bộ hệ thống (Tổng hợp)** | [`openapi.yaml`](./openapi.yaml) | `Đầy đủ 59 FRs` | `Đầy đủ ACs` | 47+ REST |
| * | **Bản đọc chi tiết Markdown** | [`API_Specification.md`](./API_Specification.md) | `Đầy đủ 59 FRs` | `Đầy đủ ACs` | Toàn văn |

---

### Hướng dẫn kiểm thử và nộp bài:
1. Mỗi file `.yaml` ở trên đều tuân thủ chuẩn OpenAPI 3.0, có thể nhập (Import) trực tiếp vào:
   - **Postman**: Chọn `Import` -> Chọn bất kỳ file `.yaml` nào trong thư mục này để tự động tạo Collection gọi API.
   - **Swagger Editor**: [editor.swagger.io](https://editor.swagger.io/) để xem và test giao diện.
2. File `API_Specification.md`: Định dạng Markdown có sẵn bảng biểu, Schema JSON để giảng viên đọc trực tiếp trên giao diện GitHub.
