# 📋 KẾ HOẠCH & DANH MỤC TEST CASES HỆ THỐNG CAB SYSTEM
## Nền tảng đặt xe trực tuyến (Online Cab Booking Platform)

- **Sinh viên thực hiện:** Võ Tất Thiện
- **Mã số sinh viên:** 22652711
- **Giai đoạn:** Buổi 3 – Thiết kế & Triển khai Kịch bản Kiểm thử Toàn diện (Comprehensive Test Cases)
- **Tài liệu căn cứ:** SRS Document (`srs.md`), Tiêu chí chấp nhận AC (`Phase 7`), Quy tắc nghiệp vụ BRULE, Xử lý ngoại lệ EX

---

## 1. TỔNG QUAN KẾ HOẠCH KIỂM THỬ (TEST PLAN SUMMARY)

### 1.1 Mục tiêu kiểm thử
- Kiểm thử xác nhận (Verification) và kiểm thử nghiệm thu (Acceptance Testing) dựa trên 59 Yêu cầu chức năng (FRs), 20 Tiêu chí chấp nhận (ACs), 10 Quy tắc nghiệp vụ (BRULEs), và 10 Kịch bản ngoại lệ (EXs).
- Bao phủ 100% cả trường hợp hợp lệ (**Positive / Happy Path**), không hợp lệ (**Negative / Error Flow**), và trường hợp biên (**Boundary / Edge Cases**).

### 1.2 Thống kê số lượng Test Cases

| Phân hệ | File tài liệu | Số lượng TC | Positive | Negative | Boundary |
|:---:|---|:---:|:---:|:---:|:---:|
| **Module 1** | [`TC01_Authentication.md`](./TC01_Authentication.md) | 19 | 7 | 11 | 1 |
| **Module 2** | [`TC02_Driver_Management.md`](./TC02_Driver_Management.md) | 15 | 7 | 8 | 0 |
| **Module 3** | [`TC03_Ride_Lifecycle.md`](./TC03_Ride_Lifecycle.md) | 20 | 9 | 9 | 2 |
| **Module 4** | [`TC04_Matching_Engine.md`](./TC04_Matching_Engine.md) | 16 | 7 | 7 | 2 |
| **Module 5** | [`TC05_Payment_Pricing.md`](./TC05_Payment_Pricing.md) | 18 | 8 | 8 | 2 |
| **Module 6** | [`TC06_Tracking_GPS.md`](./TC06_Tracking_GPS.md) | 14 | 7 | 6 | 1 |
| **Module 7** | [`TC07_Notification.md`](./TC07_Notification.md) | 12 | 7 | 5 | 0 |
| **Module 8** | [`TC08_Rating_Review.md`](./TC08_Rating_Review.md) | 12 | 5 | 6 | 1 |
| **Module 9** | [`TC09_Admin_Operations.md`](./TC09_Admin_Operations.md) | 18 | 10 | 7 | 1 |
| **Module 10** | [`TC10_Security_RBAC_Audit.md`](./TC10_Security_RBAC_Audit.md) | 13 | 6 | 7 | 0 |
| **TỔNG CỘNG** | **10 Phân hệ** | **157 TCs** | **82** | **66** | **9** |

---

## 2. QUY CHUẨN ĐỊNH DẠNG TEST CASE (STANDARDIZED TEMPLATE)

Mỗi kịch bản kiểm thử tuân thủ bảng đặc tả chuẩn IEEE 829 / ISTQB:

| Trường thông tin | Ý nghĩa nghiệp vụ |
|---|---|
| **Mã Test Case** | Định danh duy nhất theo cú pháp `TC-[MODULE]-[STT]` (ví dụ: `TC-AUTH-001`) |
| **Tên Test Case** | Tóm tắt hành vi cần kiểm tra |
| **Mã Yêu cầu liên quan** | Ánh xạ trực tiếp tới FR, AC, BRULE, EX trong tài liệu `srs.md` |
| **Loại kiểm thử** | `Positive` (luồng chuẩn), `Negative` (luồng lỗi), `Boundary` (giá trị biên) |
| **Độ ưu tiên** | `Cao` (Critical/High), `Trung bình` (Medium), `Thấp` (Low) |
| **Điều kiện tiên quyết** | Trạng thái hệ thống, dữ liệu nền cần có trước khi test |
| **Các bước thực hiện** | Các thao tác tuần tự từng bước |
| **Dữ liệu kiểm thử** | Input data thực tế (Email, Tọa độ GPS, Biển số, Tiền cước) |
| **Kết quả kỳ vọng** | HTTP status code, JSON response payload, trạng thái cập nhật trong Database |
| **Trạng thái** | ⬜ Chưa thực hiện / ✅ Đạt / ❌ Không đạt |

---

## 3. DANH MỤC CÁC FILE TEST CASE CHI TIẾT

1. 🔐 [Module 1: Authentication & Account](./TC01_Authentication.md) (19 TCs)
2. 🚗 [Module 2: Driver Onboarding & Management](./TC02_Driver_Management.md) (15 TCs)
3. 🗺️ [Module 3: Ride Booking & Lifecycle](./TC03_Ride_Lifecycle.md) (20 TCs)
4. ⚡ [Module 4: Matching Engine & Dispatch](./TC04_Matching_Engine.md) (16 TCs)
5. 💳 [Module 5: Fare Pricing & Payments](./TC05_Payment_Pricing.md) (18 TCs)
6. 📡 [Module 6: Real-time GPS Tracking](./TC06_Tracking_GPS.md) (14 TCs)
7. 🔔 [Module 7: In-app & Email Notification](./TC07_Notification.md) (12 TCs)
8. ⭐ [Module 8: Rating & Review](./TC08_Rating_Review.md) (12 TCs)
9. 👑 [Module 9: Admin & Operation Dashboard](./TC09_Admin_Operations.md) (18 TCs)
10. 🛡️ [Module 10: Security, RBAC & Audit Log](./TC10_Security_RBAC_Audit.md) (13 TCs)

---
*Tài liệu được chuẩn bị bởi: Võ Tất Thiện (22652711) - Buổi 3: Kiểm thử phần mềm*
