# Software Requirements Specification (SRS)

## CAB System – Nền tảng đặt xe trực tuyến

**Document Version:** 2.0  
**Date:** 2026-08-20  
**Author:** Vo Tat Thien – 22652711  
**Project Timeline:** 7 tuần  
**Client:** Công ty ABC  

---

## Mục lục

1. [Giai đoạn 1 – Phân tích yêu cầu sơ khởi](#giai-đoạn-1--phân-tích-yêu-cầu-sơ-khởi)
   - 1.1 [Business Context (Ngữ cảnh nghiệp vụ)](#11-business-context-ngữ-cảnh-nghiệp-vụ)
   - 1.2 [Business Problem (Vấn đề nghiệp vụ)](#12-business-problem-vấn-đề-nghiệp-vụ)
   - 1.3 [Stakeholders (Các bên liên quan)](#13-stakeholders-các-bên-liên-quan)
   - 1.4 [Business Objectives (Mục tiêu nghiệp vụ)](#14-business-objectives-mục-tiêu-nghiệp-vụ)
   - 1.5 [Phạm vi hệ thống (Scope)](#15-phạm-vi-hệ-thống-scope)
   - 1.6 [Các điểm chưa rõ cần xác nhận](#16-các-điểm-chưa-rõ-cần-xác-nhận-với-khách-hàng)

---

## Giai đoạn 1 – Phân tích yêu cầu sơ khởi

### 1.1 Business Context (Ngữ cảnh nghiệp vụ)

#### 1.1.1 Giới thiệu doanh nghiệp

Công ty ABC là một doanh nghiệp hoạt động trong lĩnh vực **cung cấp dịch vụ đặt xe trực tuyến**. Doanh nghiệp đã có sẵn:

- **Tổng đài điện thoại** để khách hàng gọi đặt xe.
- **Một ứng dụng đơn giản** cho phép khách hàng yêu cầu xe.
- **Đội ngũ tài xế** đang hoạt động.
- **Bộ phận vận hành** quản lý và điều phối xe.

#### 1.1.2 Hiện trạng hệ thống (AS-IS)

Quy trình vận hành hiện tại:

```
Khách hàng                  Tổng đài / App đơn giản             Bộ phận vận hành             Tài xế
    │                               │                                │                        │
    ├── Gọi điện / Dùng app ──────▶│                                │                        │
    │                               ├── Chuyển yêu cầu ───────────▶│                        │
    │                               │                                ├── THỦ CÔNG: Tìm và    │
    │                               │                                │   phân công tài xế ──▶│
    │                               │                                │                        ├── Nhận chuyến
    │                               │                                │                        │   (qua điện thoại)
    │◀──────────────────────────────│◀───────────────────────────────│◀───────────────────────│
    │     Thông báo tài xế đến     │                                │                        │
```

**Đặc điểm chính của hệ thống hiện tại:**
- Việc tiếp nhận yêu cầu qua **2 kênh**: tổng đài và app đơn giản.
- Phân công tài xế thực hiện **thủ công** bởi nhân viên vận hành.
- Thông tin chuyến đi **không được lưu trữ tập trung**.
- Thanh toán chủ yếu bằng **tiền mặt**, chưa quản lý tập trung.
- Không có công cụ **theo dõi chuyến đi** cho khách hàng.
- Dữ liệu vận hành **rời rạc**, khó báo cáo và phân tích.

#### 1.1.3 Bối cảnh thị trường

- Nhu cầu đặt xe trực tuyến ngày càng tăng.
- Khách hàng kỳ vọng trải nghiệm **nhanh, minh bạch, tiện lợi** (theo dõi real-time, thanh toán điện tử).
- Cạnh tranh từ các nền tảng đặt xe lớn đòi hỏi doanh nghiệp phải **số hóa và tự động hóa** quy trình.
- Doanh nghiệp muốn **mở rộng quy mô** phục vụ số lượng lớn khách hàng và tài xế.

---

### 1.2 Business Problem (Vấn đề nghiệp vụ)

Từ yêu cầu của khách hàng, xác định được **6 nhóm vấn đề chính** mà hệ thống hiện tại đang gặp phải:

#### Vấn đề 1: Phân công tài xế thủ công – Chậm, không hiệu quả

| Khía cạnh | Mô tả |
|-----------|-------|
| **Hiện trạng** | Nhân viên vận hành phải **tự tìm và gọi điện** cho tài xế để phân công chuyến |
| **Hậu quả** | Thời gian chờ của khách hàng **kéo dài**, phụ thuộc vào kinh nghiệm và tốc độ của nhân viên vận hành |
| **Tác động** | Khách hàng **không hài lòng**, tài xế gần có thể bị bỏ qua, doanh nghiệp **mất cơ hội doanh thu** |
| **Kỳ vọng** | Hệ thống **tự động tìm tài xế phù hợp** dựa trên vị trí, trạng thái và tiêu chí vận hành |

#### Vấn đề 2: Khách hàng không theo dõi được chuyến đi

| Khía cạnh | Mô tả |
|-----------|-------|
| **Hiện trạng** | Sau khi đặt xe, khách hàng **không biết** tài xế ở đâu, bao lâu sẽ đến, chuyến đi đang ở trạng thái nào |
| **Hậu quả** | Khách hàng **lo lắng, gọi lại tổng đài** liên tục để hỏi, tạo thêm tải cho bộ phận vận hành |
| **Tác động** | **Trải nghiệm khách hàng kém**, tốn chi phí nhân sự tổng đài |
| **Kỳ vọng** | Khách hàng có thể **theo dõi real-time** vị trí tài xế, biết trạng thái chuyến đi qua ứng dụng |

#### Vấn đề 3: Thanh toán chưa quản lý tập trung

| Khía cạnh | Mô tả |
|-----------|-------|
| **Hiện trạng** | Thanh toán chủ yếu bằng tiền mặt, **không có hệ thống ghi nhận tập trung** |
| **Hậu quả** | Khó kiểm soát doanh thu, **không đối soát** được giữa tài xế và công ty, khách hàng thiếu hóa đơn điện tử |
| **Tác động** | **Thất thoát doanh thu**, khó kiểm toán, không đáp ứng nhu cầu thanh toán điện tử |
| **Kỳ vọng** | Hỗ trợ **tiền mặt + thanh toán điện tử**, tích hợp cổng thanh toán bên ngoài, **không lưu thông tin nhạy cảm** |

#### Vấn đề 4: Khó mở rộng hệ thống

| Khía cạnh | Mô tả |
|-----------|-------|
| **Hiện trạng** | Hệ thống hiện tại **không có kiến trúc rõ ràng**, mọi thứ phụ thuộc vào quy trình thủ công |
| **Hậu quả** | Khi số lượng khách hàng/tài xế tăng, **bộ phận vận hành quá tải**, không thêm được tính năng mới |
| **Tác động** | **Không thể cạnh tranh** với các nền tảng lớn, giới hạn tăng trưởng doanh nghiệp |
| **Kỳ vọng** | Kiến trúc **linh hoạt, mở rộng độc lập** từng thành phần, triển khai tính năng mới **không ảnh hưởng** hệ thống đang chạy |

#### Vấn đề 5: Thiếu công cụ quản trị và báo cáo

| Khía cạnh | Mô tả |
|-----------|-------|
| **Hiện trạng** | Bộ phận vận hành **không có giao diện quản trị** tập trung, dữ liệu rời rạc |
| **Hậu quả** | Không nắm được **số liệu vận hành** (chuyến/ngày, doanh thu, tỷ lệ hủy), khó ra quyết định kinh doanh |
| **Tác động** | Ban lãnh đạo **thiếu dữ liệu** để đánh giá hiệu quả hoạt động và lập chiến lược |
| **Kỳ vọng** | Dashboard quản trị với **báo cáo**: số chuyến, doanh thu, tỷ lệ hoàn thành/hủy, hiệu quả tài xế |

#### Vấn đề 6: Bảo mật và kiểm soát truy cập yếu

| Khía cạnh | Mô tả |
|-----------|-------|
| **Hiện trạng** | Chưa có cơ chế **xác thực, phân quyền** rõ ràng, không ghi log các thao tác quan trọng |
| **Hậu quả** | **Rủi ro bảo mật** dữ liệu cá nhân, thông tin vị trí, giao dịch; không truy vết được khi có sự cố |
| **Tác động** | **Vi phạm quy định** bảo vệ dữ liệu, mất niềm tin khách hàng |
| **Kỳ vọng** | Xác thực người dùng, **phân quyền theo vai trò**, bảo vệ dữ liệu nhạy cảm, **audit log** các thao tác quan trọng |

---

### 1.3 Stakeholders (Các bên liên quan)

| # | Stakeholder | Vai trò | Mối quan tâm chính |
|---|------------|---------|-------------------|
| 1 | **Ban giám đốc** | Sponsor / Decision Maker | Mở rộng kinh doanh, tăng doanh thu, kiểm soát vận hành, báo cáo chiến lược |
| 2 | **Khách hàng (Customer)** | End User | Đặt xe nhanh, theo dõi chuyến đi, thanh toán tiện lợi, đánh giá dịch vụ |
| 3 | **Tài xế (Driver)** | End User | Nhận chuyến dễ dàng, quản lý trạng thái, xem thu nhập, thao tác đơn giản |
| 4 | **Nhân viên vận hành (Operator)** | Internal User | Quản lý tài xế/khách hàng/chuyến đi, xử lý sự cố, tra cứu giao dịch |
| 5 | **Bộ phận kỹ thuật (Dev Team)** | Builder | Kiến trúc rõ ràng, dễ bảo trì, mở rộng |
| 6 | **Nhà cung cấp thanh toán** | External Partner | Tích hợp API thanh toán, bảo mật giao dịch |
| 7 | **Nhà cung cấp bản đồ/GPS** | External Partner | Cung cấp dịch vụ định vị, tính khoảng cách, thời gian |

---

### 1.4 Business Objectives (Mục tiêu nghiệp vụ)

Từ phân tích vấn đề, xác định được các mục tiêu nghiệp vụ mà hệ thống mới cần đạt được:

| # | Mục tiêu | Đo lường (KPI) | Liên quan đến vấn đề |
|---|----------|----------------|---------------------|
| BO-01 | **Tự động hóa** quy trình tìm và phân công tài xế | Thời gian từ đặt xe → có tài xế < 2 phút | Vấn đề 1 |
| BO-02 | **Nâng cao trải nghiệm** khách hàng với theo dõi real-time | Giảm 80% cuộc gọi hỏi trạng thái vào tổng đài | Vấn đề 2 |
| BO-03 | **Số hóa thanh toán** và quản lý tập trung doanh thu | 100% giao dịch được ghi nhận trong hệ thống | Vấn đề 3 |
| BO-04 | **Xây dựng nền tảng mở rộng** phục vụ số lượng lớn người dùng | Hệ thống hoạt động ổn định khi tải tăng gấp 3 lần | Vấn đề 4 |
| BO-05 | **Cung cấp dữ liệu vận hành** cho ban lãnh đạo ra quyết định | Báo cáo tự động: chuyến/ngày, doanh thu, tỷ lệ hoàn thành | Vấn đề 5 |
| BO-06 | **Đảm bảo bảo mật** dữ liệu người dùng và giao dịch | 0 sự cố lộ dữ liệu, 100% thao tác nhạy cảm được ghi log | Vấn đề 6 |

---

### 1.5 Phạm vi hệ thống (Scope)

#### 1.5.1 Trong phạm vi (In Scope)

Hệ thống CAB mới sẽ bao gồm:

**Nhóm chức năng chính:**

| # | Nhóm chức năng | Mô tả tóm tắt |
|---|---------------|---------------|
| 1 | Quản lý tài khoản & Xác thực | Đăng ký, đăng nhập, cập nhật hồ sơ cho Customer, Driver, Admin/Operator |
| 2 | Đặt xe & Quản lý chuyến đi | Tạo yêu cầu, chọn loại xe, theo dõi trạng thái chuyến, hủy chuyến |
| 3 | Tìm & Phân công tài xế | Tự động tìm tài xế gần, cơ chế retry khi từ chối, thông báo khi không tìm được |
| 4 | Quản lý tài xế & Phương tiện | Hồ sơ tài xế, thông tin xe, trạng thái hoạt động (offline/available/busy) |
| 5 | Theo dõi vị trí real-time | GPS tracking tài xế, hiển thị vị trí trên bản đồ, dự kiến thời gian đến |
| 6 | Tính cước & Thanh toán | Tính tiền theo loại dịch vụ, hỗ trợ tiền mặt + thanh toán điện tử |
| 7 | Thông báo | Thông báo các sự kiện quan trọng cho Customer và Driver (in-app, email) |
| 8 | Đánh giá & Phản hồi | Customer đánh giá Driver sau chuyến |
| 9 | Quản trị hệ thống | Dashboard, quản lý người dùng, phương tiện, chuyến đi, báo cáo |
| 10 | Bảo mật & Phân quyền | Xác thực JWT, phân quyền theo vai trò (RBAC), audit log |

**Các actor (tác nhân):**

```
                          ┌──────────────────┐
                          │   CAB System     │
                          └────────┬─────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                     │
     ┌────────▼─────┐   ┌────────▼────────┐   ┌───────▼──────────┐
     │   Customer   │   │     Driver      │   │  Operator/Admin  │
     │  (Khách hàng)│   │   (Tài xế)     │   │ (Nhân viên VH)   │
     └──────────────┘   └─────────────────┘   └──────────────────┘

     External Systems:
     ┌──────────────────┐  ┌────────────────────┐
     │  Payment Gateway │  │  Map/GPS Service   │
     │  (Cổng TT)       │  │  (Dịch vụ bản đồ)  │
     └──────────────────┘  └────────────────────┘
```

#### 1.5.2 Ngoài phạm vi (Out of Scope) – Giai đoạn MVP

- Ứng dụng mobile native (iOS/Android) – chỉ làm web responsive
- Tích hợp tổng đài điện thoại (IVR)
- Chế độ chia sẻ chuyến (ride sharing / carpooling)
- Ví điện tử nội bộ (internal wallet)
- Surge pricing tự động theo thuật toán
- Đa ngôn ngữ (chỉ hỗ trợ tiếng Việt trong MVP)
- Tính năng chat giữa Customer và Driver

---

### 1.6 Các điểm chưa rõ cần xác nhận với khách hàng

Dựa trên mô tả yêu cầu, doanh nghiệp **chưa chốt** các vấn đề sau. Business Analyst cần làm rõ trước khi phát triển:

| # | Vấn đề | Câu hỏi cần xác nhận | Giả định tạm thời cho MVP |
|---|--------|----------------------|--------------------------|
| Q-01 | **Cách tính cước** | Công thức tính cước chi tiết? Có phụ thu giờ cao điểm không? Phụ thu đêm? | `Cước = Giá cơ bản + (Km × Đơn giá/km) + (Phút × Đơn giá/phút)` theo loại xe |
| Q-02 | **Tiêu chí ưu tiên tài xế** | Ngoài khoảng cách, có ưu tiên theo rating, số chuyến hoàn thành, thâm niên không? | Ưu tiên theo khoảng cách gần nhất, sau đó rating |
| Q-03 | **Thời gian phản hồi** | Tài xế có bao lâu để chấp nhận/từ chối chuyến? | 30 giây |
| Q-04 | **Số lần thử tài xế** | Tìm tối đa bao nhiêu tài xế trước khi báo "không tìm được"? | Tối đa 5 tài xế |
| Q-05 | **Bán kính tìm kiếm** | Bán kính tìm tài xế tối đa bao nhiêu km? | 5 km |
| Q-06 | **Chính sách hủy chuyến** | Khách/tài xế hủy chuyến bị phạt không? Hủy trước/sau khi match khác nhau? | Hủy miễn phí trước khi tài xế đến điểm đón |
| Q-07 | **Xử lý mất kết nối** | Khi tài xế/khách hàng mất mạng giữa chuyến thì xử lý thế nào? | Giữ trạng thái chuyến, chờ kết nối lại trong 5 phút |
| Q-08 | **Thời gian lưu trữ dữ liệu** | Dữ liệu chuyến đi, giao dịch lưu bao lâu? | Lưu vĩnh viễn (soft delete) |
| Q-09 | **Loại xe** | Doanh nghiệp có bao nhiêu loại xe? Tên gọi và mức giá? | 3 loại: Sedan (4 chỗ), SUV (7 chỗ), VAN (16 chỗ) |
| Q-10 | **Phương thức thanh toán điện tử** | Tích hợp cổng thanh toán nào? (VNPay, MoMo, ZaloPay?) | Mock gateway cho MVP |

---

*Document prepared by: Vo Tat Thien (22652711)*  
*Last updated: 2026-08-20*  
*Phase: Giai đoạn 1 – Phân tích yêu cầu sơ khởi*
