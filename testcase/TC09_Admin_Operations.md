# BẢNG TEST CASES - PHÂN HỆ 9: QUẢN TRỊ VẬN HÀNH & BÁO CÁO (ADMIN & ANALYTICS)

> Bao phủ: FR-ADM-01 đến FR-ADM-08 | AC-ADM-01, AC-ADM-03 | EX-06 | Chuẩn 8 cột ngang Excel

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
| TC-ADM-001 | Dashboard vận hành | Admin/Operator xem dashboard chỉ số vận hành ngày | Đăng nhập quyền Admin hoặc Operator | 1. Truy cập trang chủ Dashboard (GET /api/v1/admin/dashboard) | Admin Token | HTTP 200 OK, hiển thị đúng tổng doanh thu ngày, số cuốc thành công, số tài xế online | High |
| TC-ADM-002 | Quản lý Khách hàng | Tìm kiếm khách hàng theo tên hoặc số điện thoại | Trang Quản lý người dùng | 1. Nhập từ khóa tìm kiếm '0912345678'<br>2. Bấm Tìm kiếm | search = '0912345678' | HTTP 200 OK, trả về danh sách khách hàng khớp thông tin | Medium |
| TC-ADM-003 | Can thiệp chuyến đi | Operator can thiệp hủy chuyến xe lỗi khi tài xế gặp tai nạn (EX-06) | Cuốc xe đang in_progress nhưng tài xế gặp sự cố xe hỏng | 1. Operator mở chi tiết cuốc xe<br>2. Chọn 'Can thiệp: Hủy cưỡng chế'<br>3. Nhập lý do<br>4. Xác nhận | { "action": "cancel", "reason": "Tài xế gặp sự cố va chạm giao thông" } | Ride status chuyển 'cancelled', giải phóng khách hàng đặt xe khác, ghi log AuditLog | High |
| TC-ADM-004 | Báo cáo Doanh thu | Xuất báo cáo doanh thu tài chính theo khoảng thời gian và loại xe | Có dữ liệu chuyến xe đã thanh toán trong tháng 08/2026 | 1. Chọn Từ ngày 2026-08-01 đến 2026-08-31<br>2. Nhóm theo Ngày<br>3. Bấm 'Xem báo cáo' | startDate=2026-08-01, endDate=2026-08-31, groupBy=day | HTTP 200 OK, trả về biểu đồ và bảng tổng hợp doanh thu theo từng ngày và phân loại xe | High |
| TC-ADM-005 | Báo cáo Doanh thu | Chặn lọc báo cáo với khoảng thời gian không hợp lệ (Ngày bắt đầu > Ngày kết thúc) | Màn hình Báo cáo | 1. Chọn startDate = '2026-08-31', endDate = '2026-08-01'<br>2. Bấm Xem | startDate > endDate | Hệ thống cảnh báo: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc' (HTTP 400) | Medium |
| TC-ADM-006 | Báo cáo Vận hành | Xem tỷ lệ hoàn thành cuốc và phân tích lý do hủy cuốc | Màn hình Báo cáo vận hành | 1. Gửi GET /api/v1/admin/reports/operations | Admin Token | HTTP 200 OK, trả về tỷ lệ hoàn thành %, tỷ lệ hủy bởi khách vs tài xế | High |
| TC-ADM-007 | Hiệu suất tài xế | Xem bảng xếp hạng Top 10 tài xế có doanh thu cao nhất | Màn hình Báo cáo tài xế | 1. Gửi GET /api/v1/admin/reports/drivers?limit=10 | limit = 10 | HTTP 200 OK, trả về danh sách 10 tài xế có tổng tiền cước cao nhất | Medium |
