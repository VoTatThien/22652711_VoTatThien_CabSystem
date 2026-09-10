# 📋 KẾ HOẠCH & DANH MỤC TEST CASES HỆ THỐNG CAB SYSTEM
## Nền tảng đặt xe trực tuyến (Online Cab Booking Platform)

- **Sinh viên thực hiện:** Võ Tất Thiện
- **Mã số sinh viên:** 22652711
- **Giai đoạn:** Buổi 3 – Thiết kế & Triển khai Kịch bản Kiểm thử Toàn diện (Comprehensive Test Cases)
- **Định dạng:** Chuẩn bảng ngang 8 cột (Excel Matrix) theo yêu cầu giảng viên
- **File xuất bảng tính:** [`TestCase_CAB_System.csv`](./TestCase_CAB_System.csv) *(Mở trực tiếp bằng Microsoft Excel UTF-8)*

---

### 📊 Thống kê Số lượng Test Cases theo Phân hệ (10 Phân hệ - Tổng cộng 169 TCs)

| Phân hệ | Tên Phân hệ & Phạm vi | File Test Case | Số lượng TC | Đạt chuẩn Phủ |
|:---:|---|---|:---:|:---:|
| **Module 1** | **Xác thực & Người dùng** *(Đăng nhập 20 TCs, Đăng ký, Profile, Đổi pass, Token, Brute-force, NoSQL/XSS)* | [`TC01_Authentication.md`](./TC01_Authentication.md) | **38 TCs** | ✅ 100% Positive, Negative, Boundary, Security |
| **Module 2** | **Quản lý Tài xế & Xe** *(Khai báo xe, Online/Offline, Auto busy, Duyệt/Từ chối, Khóa xe, EX-09)* | [`TC02_Driver_Management.md`](./TC02_Driver_Management.md) | **17 TCs** | ✅ 100% Positive, Negative, Boundary, EX-09 |
| **Module 3** | **Đặt xe & Vòng đời cuốc** *(Geocode, Cước ước tính, Đặt cuốc, Đến đón, Bắt đầu, Hoàn thành, Hủy cuốc, No-Show, EX-04, 05, 06)* | [`TC03_Ride_Lifecycle.md`](./TC03_Ride_Lifecycle.md) | **23 TCs** | ✅ 100% Positive, Negative, Boundary, EX-04..06 |
| **Module 4** | **Thuật toán Ghép nối** *(Quét 5km, Ưu tiên gần/rating, Đếm ngược 30s, Atomic lock, Retry 5 lần, EX-01, 02, 08)* | [`TC04_Matching_Engine.md`](./TC04_Matching_Engine.md) | **18 TCs** | ✅ 100% Positive, Negative, Boundary, EX-01..03, 08 |
| **Module 5** | **Tính cước & Thanh toán** *(Cước thực tế GPS, Cấu hình giá, Tiền mặt, Ví điện tử, Hóa đơn VAT, EX-07)* | [`TC05_Payment_Pricing.md`](./TC05_Payment_Pricing.md) | **15 TCs** | ✅ 100% Positive, Negative, Boundary, EX-07 |
| **Module 6** | **Định vị GPS & Giám sát** *(GPS 5-10s, Khách theo dõi real-time, Tính lại ETA, Bản đồ Operator, EX-03)* | [`TC06_Tracking_GPS.md`](./TC06_Tracking_GPS.md) | **11 TCs** | ✅ 100% Positive, Negative, Boundary, EX-03 |
| **Module 7** | **Trung tâm Thông báo** *(In-app Socket, Email biên lai, Hộp thư, Đánh dấu đã đọc, EX-10 SMTP Outage)* | [`TC07_Notification.md`](./TC07_Notification.md) | **10 TCs** | ✅ 100% Positive, Negative, Boundary, EX-10 |
| **Module 8** | **Đánh giá & Phản hồi** *(Chấm 1-5 sao, Nhận xét 500 ký tự, Tính rating trung bình, EX-09)* | [`TC08_Rating_Review.md`](./TC08_Rating_Review.md) | **11 TCs** | ✅ 100% Positive, Negative, Boundary, BRULE-08 |
| **Module 9** | **Quản trị & Báo cáo** *(Dashboard, Tìm kiếm khách/tài xế, Can thiệp cuốc lỗi EX-06, Báo cáo Doanh thu)* | [`TC09_Admin_Operations.md`](./TC09_Admin_Operations.md) | **13 TCs** | ✅ 100% Positive, Negative, Boundary, EX-06 |
| **Module 10** | **Bảo mật, RBAC & Audit** *(Phân quyền 4 Roles, Chặn 403, Audit Log append-only, Bcrypt, EX-10 Circuit Breaker)* | [`TC10_Security_RBAC_Audit.md`](./TC10_Security_RBAC_Audit.md) | **13 TCs** | ✅ 100% Positive, Negative, Boundary, EX-10 |
| **TỔNG CỘNG** | **Toàn bộ 10 phân hệ** | **File tổng hợp CSV:** [`TestCase_CAB_System.csv`](./TestCase_CAB_System.csv) | **169 TCs** | **Độ phủ Toàn diện 100%** |

---

### 🛡️ Độ Phủ 10 Trường Hợp Ngoại Lệ (Exceptions EX-01 đến EX-10 từ SRS Giai đoạn 3)

| Mã Ngoại lệ | Tình huống ngoại lệ | Kịch bản Test Case kiểm chứng |
|:---:|---|---|
| **EX-01** | Không tìm thấy tài xế khả dụng trong 5km | `TC-MAT-015`, `TC-MAT-016` |
| **EX-02** | Tài xế không phản hồi trong 30 giây (Timeout) | `TC-MAT-012`, `TC-MAT-013` |
| **EX-03** | Mất kết nối mạng / Mất tín hiệu GPS | `TC-TRK-004`, `TC-TRK-005`, `TC-MAT-018` |
| **EX-04** | Khách hàng hủy chuyến khi tài xế đang đến | `TC-RID-015`, `TC-RID-017` |
| **EX-05** | Khách không xuất hiện tại điểm đón (No-Show >= 5p) | `TC-RID-018`, `TC-RID-019` |
| **EX-06** | Xe hỏng / Tai nạn giữa đường | `TC-RID-020`, `TC-ADM-005`, `TC-ADM-007` |
| **EX-07** | Thanh toán Điện tử thất bại (Cổng lỗi/hết tiền) | `TC-PAY-011`, `TC-PAY-012` |
| **EX-08** | Xung đột nhận cuốc đồng thời (Race Condition) | `TC-MAT-010` |
| **EX-09** | Khóa tài khoản khi đang có cuốc xe chạy | `TC-DRV-017`, `TC-RAT-006` |
| **EX-10** | Cổng dịch vụ ngoại vi ngừng hoạt động (Outage) | `TC-RID-003`, `TC-NOTIF-004`, `TC-SEC-013` |

---

### 📋 Cấu trúc Bảng Test Case chuẩn 8 cột (Excel Matrix)

| Cột | Tên trường | Diễn giải |
|:---:|---|---|
| 1 | **Test Case ID** | Mã định danh duy nhất (`TC-AUTH-001`, `TC-DRV-001`,...) |
| 2 | **Test Scenario** | Nhóm kịch bản kiểm thử (Người dùng đăng nhập, Đặt xe, Hủy chuyến,...) |
| 3 | **Test Case** | Tên hành vi kiểm thử cụ thể (hợp lệ, lỗi, biên) |
| 4 | **Preconditions** | Điều kiện tiên quyết của hệ thống / tài khoản |
| 5 | **Test Steps** | Các bước thực hiện từng bước rõ ràng |
| 6 | **Test Data** | Dữ liệu đầu vào thực tế (Username, Password, Tọa độ, Số tiền) |
| 7 | **Expected Result** | Kết quả kỳ vọng chi tiết (HTTP Code, Thông báo lỗi, Trạng thái DB) |
| 8 | **Priority** | Mức độ ưu tiên (`High` / `Medium` / `Low`) |
