# 📑 TÀI LIỆU ĐẶC TẢ API (API SPECIFICATION)
## CAB System – Nền tảng đặt xe trực tuyến

- **Phiên bản:** 1.0.0
- **Tác giả:** Võ Tất Thiện – MSSV: 22652711
- **Base URL:** `http://localhost:3000/api/v1`
- **Interactive Swagger UI:** `http://localhost:3000/api-docs`
- **Tiêu chuẩn:** RESTful API, JSON Payload, JWT Bearer Authentication

---

## I. QUY CHUẨN CHUNG (GENERAL CONVENTIONS)

### 1. Chuẩn hóa Định dạng Dữ liệu phản hồi (Response Format)
Mọi API trong hệ thống đều trả về cấu trúc JSON đồng nhất:

#### Phản hồi thành công (Success Response):
```json
{
  "success": true,
  "data": { ... },
  "message": "Thông điệp mô tả kết quả xử lý"
}
```

#### Phản hồi thất bại (Error Response):
```json
{
  "success": false,
  "message": "Mô tả nguyên nhân lỗi",
  "errors": [ ... ]
}
```

### 2. Các mã trạng thái HTTP (HTTP Status Codes)
- `200 OK`: Xử lý thành công yêu cầu GET, PUT, DELETE.
- `201 Created`: Tạo mới tài nguyên thành công (POST).
- `400 Bad Request`: Dữ liệu gửi lên không hợp lệ hoặc thiếu trường bắt buộc.
- `401 Unauthorized`: Chưa đăng nhập hoặc Token JWT không hợp lệ / hết hạn.
- `403 Forbidden`: Không có quyền truy cập vào tài nguyên (vi phạm RBAC).
- `404 Not Found`: Không tìm thấy tài nguyên theo ID.
- `409 Conflict`: Xung đột dữ liệu (Email/SĐT/Biển số xe đã tồn tại).
- `429 Too Many Requests`: Vượt quá giới hạn tần suất gọi API (Rate Limiting).
- `500 Internal Server Error`: Lỗi máy chủ không mong muốn.

### 3. Cơ chế Xác thực (Authentication)
Các API yêu cầu đăng nhập cần truyền header:
```
Authorization: Bearer <access_token>
```

---

## II. DANH MỤC CÁC ENDPOINTS CHI TIẾT

### 1. Phân hệ Xác thực (Authentication Module)

#### 1.1 Đăng ký tài khoản Khách hàng
- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Truy xuất:** `FR-AUTH-01` | `AC-AUTH-01`
- **Quyền truy cập:** Công khai (Public)
- **Request Body:**
```json
{
  "fullName": "Nguyễn Văn A",
  "email": "customer@example.com",
  "phone": "0912345678",
  "password": "Password123"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "60b8d295f1d2c72b8c5e6f3d",
    "fullName": "Nguyễn Văn A",
    "email": "customer@example.com",
    "phone": "0912345678",
    "role": "customer",
    "isActive": true
  },
  "message": "Đăng ký tài khoản thành công"
}
```

#### 1.2 Đăng ký tài khoản Đối tác Tài xế
- **Method:** `POST`
- **Endpoint:** `/auth/register/driver`
- **Truy xuất:** `FR-AUTH-02`, `FR-DRV-01` | `AC-DRV-01`
- **Request Body:**
```json
{
  "fullName": "Trần Văn Tài",
  "email": "driver@example.com",
  "phone": "0987654321",
  "password": "Driver123",
  "licenseNumber": "123456789012",
  "licenseClass": "B2",
  "plateNumber": "51G-888.88",
  "vehicleType": "sedan",
  "brand": "Toyota",
  "model": "Vios",
  "color": "Trắng"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "userId": "60b8d295f1d2c72b8c5e6f3e",
    "driverProfileId": "60b8d295f1d2c72b8c5e6f3f",
    "isApproved": false,
    "status": "offline"
  },
  "message": "Đăng ký hồ sơ tài xế thành công, đang chờ phê duyệt"
}
```

#### 1.3 Đăng nhập hệ thống
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Truy xuất:** `FR-AUTH-03` | `AC-AUTH-02`
- **Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "Password123"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "refreshToken": "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4...",
    "user": {
      "_id": "60b8d295f1d2c72b8c5e6f3d",
      "fullName": "Nguyễn Văn A",
      "email": "customer@example.com",
      "role": "customer"
    }
  },
  "message": "Đăng nhập thành công"
}
```

#### 1.4 Lấy thông tin cá nhân
- **Method:** `GET`
- **Endpoint:** `/auth/profile`
- **Truy xuất:** `FR-AUTH-04` | `AC-AUTH-01`
- **Headers:** `Authorization: Bearer <token>`

#### 1.5 Cập nhật hồ sơ cá nhân
- **Method:** `PUT`
- **Endpoint:** `/auth/profile`
- **Truy xuất:** `FR-AUTH-04` | `AC-AUTH-01`
- **Request Body:**
```json
{
  "fullName": "Nguyễn Văn A (Cập nhật)",
  "phone": "0912345679"
}
```

#### 1.6 Đổi mật khẩu
- **Method:** `PUT`
- **Endpoint:** `/auth/change-password`
- **Truy xuất:** `FR-AUTH-05` | `AC-AUTH-02`
- **Request Body:**
```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456"
}
```

#### 1.7 Đăng xuất
- **Method:** `POST`
- **Endpoint:** `/auth/logout`
- **Truy xuất:** `FR-AUTH-06` | `AC-AUTH-02`

#### 1.8 Cấp mới Token
- **Method:** `POST`
- **Endpoint:** `/auth/refresh-token`
- **Truy xuất:** `FR-AUTH-03` | `AC-AUTH-02`
- **Request Body:** `{ "refreshToken": "..." }`

---

### 2. Phân hệ Quản lý Tài xế & Phương tiện (Driver Module)

#### 2.1 Đăng ký / Khai báo phương tiện
- **Method:** `POST`
- **Endpoint:** `/drivers/vehicle`
- **Truy xuất:** `FR-DRV-01` | `AC-DRV-01`
- **Quyền:** `driver`
- **Request Body:**
```json
{
  "plateNumber": "51H-123.45",
  "vehicleType": "suv",
  "brand": "Honda",
  "model": "CR-V",
  "color": "Đen",
  "seats": 7
}
```

#### 2.2 Bật / Tắt trạng thái trực tuyến
- **Method:** `PUT`
- **Endpoint:** `/drivers/status`
- **Truy xuất:** `FR-DRV-02` | `AC-TRK-01`
- **Quyền:** `driver`
- **Request Body:**
```json
{
  "status": "available"
}
```

#### 2.3 Danh sách hồ sơ tài xế chờ xét duyệt
- **Method:** `GET`
- **Endpoint:** `/drivers/pending?page=1&limit=10`
- **Truy xuất:** `FR-DRV-04` | `AC-DRV-02`
- **Quyền:** `operator`, `admin`

#### 2.4 Phê duyệt hồ sơ tài xế
- **Method:** `PUT`
- **Endpoint:** `/drivers/:id/approve`
- **Truy xuất:** `FR-DRV-04` | `AC-DRV-02`
- **Quyền:** `operator`, `admin`

#### 2.5 Từ chối hồ sơ tài xế
- **Method:** `PUT`
- **Endpoint:** `/drivers/:id/reject`
- **Truy xuất:** `FR-DRV-04` | `AC-DRV-02`
- **Quyền:** `operator`, `admin`
- **Request Body:** `{ "reason": "Ảnh giấy phép lái xe mờ không rõ số" }`

#### 2.6 Xem dashboard & thu nhập tài xế
- **Method:** `GET`
- **Endpoint:** `/drivers/profile`
- **Truy xuất:** `FR-DRV-05` | `AC-RAT-01`
- **Quyền:** `driver`

#### 2.7 Khóa tài khoản tài xế vi phạm
- **Method:** `PUT`
- **Endpoint:** `/drivers/:id/block`
- **Truy xuất:** `FR-DRV-06` | `AC-ADM-01`
- **Quyền:** `admin`

---

### 3. Phân hệ Đặt xe & Vòng đời chuyến đi (Ride Module)

#### 3.1 Geocoding tìm kiếm địa chỉ
- **Method:** `GET`
- **Endpoint:** `/rides/geocode?address=Dai+hoc+Cong+Nghiep+TPHCM`
- **Truy xuất:** `FR-RIDE-01` | `AC-BOOK-01`

#### 3.2 Ước tính cước phí chuyến đi
- **Method:** `POST`
- **Endpoint:** `/rides/estimate`
- **Truy xuất:** `FR-RIDE-02` | `AC-BOOK-01` | `BRULE-01`
- **Request Body:**
```json
{
  "pickupLocation": [106.6881, 10.8222],
  "dropoffLocation": [106.7009, 10.7769],
  "vehicleType": "sedan"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "distanceKm": 8.5,
    "durationMin": 22,
    "vehicleType": "sedan",
    "estimatedFare": 139000,
    "fareBreakdown": {
      "baseFare": 15000,
      "distanceFare": 102000,
      "timeFare": 22000
    }
  },
  "message": "Ước tính cước thành công"
}
```

#### 3.3 Khởi tạo đặt chuyến xe trực tuyến
- **Method:** `POST`
- **Endpoint:** `/rides/book`
- **Truy xuất:** `FR-RIDE-03` | `AC-BOOK-02`
- **Quyền:** `customer`
- **Request Body:**
```json
{
  "pickupAddress": "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP.HCM",
  "pickupLocation": [106.6881, 10.8222],
  "dropoffAddress": "Chợ Bến Thành, Quận 1, TP.HCM",
  "dropoffLocation": [106.7009, 10.7769],
  "vehicleType": "sedan",
  "paymentMethod": "cash"
}
```

#### 3.4 Cập nhật mốc: Tài xế đã đến điểm đón
- **Method:** `PUT`
- **Endpoint:** `/rides/:id/arrived`
- **Truy xuất:** `FR-RIDE-04` | `AC-RIDE-01`
- **Quyền:** `driver`

#### 3.5 Cập nhật mốc: Bắt đầu chuyến đi
- **Method:** `PUT`
- **Endpoint:** `/rides/:id/start`
- **Truy xuất:** `FR-RIDE-05` | `AC-RIDE-01`
- **Quyền:** `driver`

#### 3.6 Cập nhật mốc: Hoàn thành chuyến đi
- **Method:** `PUT`
- **Endpoint:** `/rides/:id/complete`
- **Truy xuất:** `FR-RIDE-06` | `AC-RIDE-01`
- **Quyền:** `driver`

#### 3.7 Hủy chuyến đi
- **Method:** `PUT`
- **Endpoint:** `/rides/:id/cancel`
- **Truy xuất:** `FR-RIDE-07/08` | `AC-CNC-01/02` | `BRULE-06`
- **Request Body:**
```json
{
  "reason": "Thay đổi lịch trình cá nhân"
}
```

#### 3.8 Tra cứu lịch sử chuyến đi
- **Method:** `GET`
- **Endpoint:** `/rides/history?page=1&limit=10&status=completed`
- **Truy xuất:** `FR-RIDE-09` | `AC-BOOK-02`

#### 3.9 Xem chi tiết chuyến đi
- **Method:** `GET`
- **Endpoint:** `/rides/:id`
- **Truy xuất:** `FR-RIDE-09` | `AC-BOOK-02`

---

### 4. Phân hệ Tính cước & Thanh toán (Payment Module)

#### 4.1 Tính cước phí thực tế cuối cùng
- **Method:** `POST`
- **Endpoint:** `/payments/:rideId/calculate`
- **Truy xuất:** `FR-PAY-01` | `AC-PAY-01` | `BRULE-01`

#### 4.2 Lấy bảng giá cước hệ thống
- **Method:** `GET`
- **Endpoint:** `/payments/pricing`
- **Truy xuất:** `FR-PAY-02` | `AC-ADM-02`

#### 4.3 Cập nhật cấu hình biểu phí xe
- **Method:** `PUT`
- **Endpoint:** `/payments/pricing/:vehicleType`
- **Truy xuất:** `FR-PAY-02` | `AC-ADM-02`
- **Quyền:** `admin`
- **Request Body:**
```json
{
  "baseFare": 16000,
  "pricePerKm": 13000,
  "pricePerMin": 1200
}
```

#### 4.4 Xác nhận đã nhận tiền mặt
- **Method:** `POST`
- **Endpoint:** `/payments/:rideId/cash-confirm`
- **Truy xuất:** `FR-PAY-03/04` | `AC-PAY-01`
- **Quyền:** `driver`

#### 4.5 Xử lý thanh toán điện tử
- **Method:** `POST`
- **Endpoint:** `/payments/:rideId/e-payment`
- **Truy xuất:** `FR-PAY-05` | `AC-PAY-02`
- **Quyền:** `customer`

#### 4.6 Xuất hóa đơn / biên lai điện tử
- **Method:** `GET`
- **Endpoint:** `/payments/:rideId/invoice`
- **Truy xuất:** `FR-PAY-07` | `AC-PAY-02`

---

### 5. Phân hệ Định vị & Giám sát (Tracking Module & Socket.IO)

#### 5.1 Giám sát toàn cảnh xe online
- **Method:** `GET`
- **Endpoint:** `/tracking/live`
- **Truy xuất:** `FR-TRACK-04` | `AC-ADM-03`
- **Quyền:** `operator`, `admin`

#### 5.2 Các sự kiện thời gian thực (Socket.IO Events)
- **Tài xế phát tọa độ GPS:**
  - Event: `driver:locationUpdate`
  - Payload: `{ "lat": 10.7626, "lng": 106.6601, "bearing": 90, "speed": 35 }`
- **Khách hàng theo dõi tài xế:**
  - Event: `customer:trackDriver`
  - Payload: `rideId`
- **Tài xế quản lý trạng thái socket:**
  - Event: `driver:goOnline` / `driver:goOffline`

---

### 6. Phân hệ Thông báo & Đánh giá (Notification & Rating)

#### 6.1 Lấy danh sách thông báo
- **Method:** `GET`
- **Endpoint:** `/notifications?page=1&limit=10&isRead=false`
- **Truy xuất:** `FR-NOTIF-03`

#### 6.2 Đánh dấu đã đọc thông báo
- **Method:** `PUT`
- **Endpoint:** `/notifications/:id/read`
- **Truy xuất:** `FR-NOTIF-04`

#### 6.3 Đánh dấu tất cả thông báo đã đọc
- **Method:** `PUT`
- **Endpoint:** `/notifications/read-all`
- **Truy xuất:** `FR-NOTIF-04`

#### 6.4 Gửi đánh giá sau chuyến đi
- **Method:** `POST`
- **Endpoint:** `/ratings`
- **Truy xuất:** `FR-RATE-01` | `AC-RAT-01` | `BRULE-08`
- **Quyền:** `customer`
- **Request Body:**
```json
{
  "rideId": "60b8d295f1d2c72b8c5e6f50",
  "rating": 5,
  "comment": "Tài xế lái xe an toàn, lịch sự"
}
```

#### 6.5 Xem đánh giá của tài xế
- **Method:** `GET`
- **Endpoint:** `/ratings/driver/:driverId?page=1&limit=10`
- **Truy xuất:** `FR-RATE-03`

#### 6.6 Tài xế xem đánh giá của mình
- **Method:** `GET`
- **Endpoint:** `/ratings/my-reviews`
- **Truy xuất:** `FR-RATE-03`
- **Quyền:** `driver`

---

### 7. Phân hệ Quản trị & Báo cáo (Admin Module)

#### 7.1 Dashboard tổng quan hệ thống
- **Method:** `GET`
- **Endpoint:** `/admin/dashboard`
- **Truy xuất:** `FR-ADM-01` | `AC-ADM-03`
- **Quyền:** `admin`, `operator`

#### 7.2 Quản lý danh sách khách hàng
- **Method:** `GET`
- **Endpoint:** `/admin/customers?page=1&limit=10&search=Nguyen`
- **Truy xuất:** `FR-ADM-02` | `AC-ADM-01`
- **Quyền:** `admin`, `operator`

#### 7.3 Quản lý danh sách tài xế
- **Method:** `GET`
- **Endpoint:** `/admin/drivers?page=1&limit=10&status=available`
- **Truy xuất:** `FR-ADM-03` | `AC-DRV-02`
- **Quyền:** `admin`, `operator`

#### 7.4 Quản lý danh sách chuyến xe
- **Method:** `GET`
- **Endpoint:** `/admin/rides?page=1&limit=10&status=in_progress`
- **Truy xuất:** `FR-ADM-04` | `AC-ADM-01`
- **Quyền:** `admin`, `operator`

#### 7.5 Can thiệp xử lý chuyến xe lỗi
- **Method:** `PUT`
- **Endpoint:** `/admin/rides/:id/intervene`
- **Truy xuất:** `FR-ADM-04` | `AC-ADM-01`
- **Quyền:** `admin`, `operator`
- **Request Body:**
```json
{
  "action": "cancel",
  "reason": "Tài xế gặp sự cố tai nạn giữa đường"
}
```

#### 7.6 Tra cứu nhật ký giao dịch thanh toán
- **Method:** `GET`
- **Endpoint:** `/admin/payments?page=1&limit=10&status=COMPLETED`
- **Truy xuất:** `FR-ADM-05` | `AC-ADM-03`
- **Quyền:** `admin`

#### 7.7 Báo cáo doanh thu tài chính
- **Method:** `GET`
- **Endpoint:** `/admin/reports/revenue?startDate=2026-08-01&endDate=2026-08-31&groupBy=day`
- **Truy xuất:** `FR-ADM-06` | `AC-ADM-03`
- **Quyền:** `admin`

#### 7.8 Báo cáo vận hành (Tỷ lệ hoàn thành / hủy)
- **Method:** `GET`
- **Endpoint:** `/admin/reports/operations?startDate=2026-08-01&endDate=2026-08-31`
- **Truy xuất:** `FR-ADM-07` | `AC-ADM-03`
- **Quyền:** `admin`

#### 7.9 Báo cáo hiệu suất tài xế (Top Rating / Doanh thu)
- **Method:** `GET`
- **Endpoint:** `/admin/reports/drivers?startDate=2026-08-01&endDate=2026-08-31&limit=10`
- **Truy xuất:** `FR-ADM-08` | `AC-ADM-03`
- **Quyền:** `admin`

#### 7.10 Tra cứu nhật ký kiểm toán (Audit Logs)
- **Method:** `GET`
- **Endpoint:** `/admin/audit-logs?page=1&limit=20&entity=PricingConfig`
- **Truy xuất:** `FR-SEC-03` | `AC-ADM-02` | `BRULE-10`
- **Quyền:** `admin`

#### 7.11 Phân quyền vai trò người dùng (RBAC)
- **Method:** `PUT`
- **Endpoint:** `/admin/users/:id/role`
- **Truy xuất:** `FR-SEC-01/02` | `AC-ADM-01` | `BRULE-09`
- **Quyền:** `admin`
- **Request Body:**
```json
{
  "role": "operator"
}
```

---

*Document prepared by: Vo Tat Thien (22652711)*  
*Last updated: 2026-09-03*
