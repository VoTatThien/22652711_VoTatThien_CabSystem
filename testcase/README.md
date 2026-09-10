# 📋 KẾ HOẠCH & DANH MỤC TEST CASES HỆ THỐNG CAB SYSTEM
## Nền tảng đặt xe trực tuyến (Online Cab Booking Platform)

- **Sinh viên thực hiện:** Võ Tất Thiện
- **Mã số sinh viên:** 22652711
- **Giai đoạn:** Buổi 3 – Thiết kế & Triển khai Kịch bản Kiểm thử Toàn diện (Comprehensive Test Cases)
- **Định dạng:** Chuẩn bảng ngang 8 cột (Excel Matrix) theo yêu cầu giảng viên
- **File xuất bảng tính:** [`TestCase_CAB_System.csv`](./TestCase_CAB_System.csv) *(Mở trực tiếp bằng Microsoft Excel UTF-8)*

---

### 📊 Thống kê Số lượng Test Cases theo Phân hệ (10 Phân hệ)

| Phân hệ | Tên Phân hệ | File Test Case | Số lượng TC |
|:---:|---|---|:---:|
| **Module 1** | **Xác thực & Người dùng** | [`TC01_Authentication.md`](./TC01_Authentication.md) | **35 TCs** *(Gồm 20 TC Login chuẩn + Register/Profile/Token)* |
| **Module 2** | **Quản lý Tài xế & Xe** | [`TC02_Driver_Management.md`](./TC02_Driver_Management.md) | **14 TCs** |
| **Module 3** | **Đặt xe & Vòng đời cuốc** | [`TC03_Ride_Lifecycle.md`](./TC03_Ride_Lifecycle.md) | **17 TCs** |
| **Module 4** | **Thuật toán Ghép nối** | [`TC04_Matching_Engine.md`](./TC04_Matching_Engine.md) | **12 TCs** |
| **Module 5** | **Tính cước & Thanh toán** | [`TC05_Payment_Pricing.md`](./TC05_Payment_Pricing.md) | **10 TCs** |
| **Module 6** | **Định vị & Giám sát GPS** | [`TC06_Tracking_GPS.md`](./TC06_Tracking_GPS.md) | **5 TCs** |
| **Module 7** | **Trung tâm Thông báo** | [`TC07_Notification.md`](./TC07_Notification.md) | **5 TCs** |
| **Module 8** | **Đánh giá & Phản hồi** | [`TC08_Rating_Review.md`](./TC08_Rating_Review.md) | **5 TCs** |
| **Module 9** | **Quản trị & Báo cáo** | [`TC09_Admin_Operations.md`](./TC09_Admin_Operations.md) | **7 TCs** |
| **Module 10** | **Bảo mật, RBAC & Audit** | [`TC10_Security_RBAC_Audit.md`](./TC10_Security_RBAC_Audit.md) | **7 TCs** |
| **TỔNG CỘNG** | **Toàn bộ 10 phân hệ** | **File tổng hợp CSV:** [`TestCase_CAB_System.csv`](./TestCase_CAB_System.csv) | **117 TCs** |

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
