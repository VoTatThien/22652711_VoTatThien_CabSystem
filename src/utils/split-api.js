const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const projectDir = path.resolve(__dirname, '..', '..');
process.chdir(projectDir);

const swaggerSpec = require('../config/swagger');

const targetDir = path.join(projectDir, 'API specification');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 8 groups definition
const groups = [
  {
    prefix: '01_auth_api',
    name: 'Phân hệ 1: Xác thực & Người dùng (Authentication & Users)',
    tag: 'Auth',
    pathMatch: (p) => p.startsWith('/auth'),
    frs: 'FR-AUTH-01 -> FR-AUTH-06',
    acs: 'AC-AUTH-01, AC-AUTH-02',
    desc: 'Đăng ký tài khoản khách hàng, tài xế, đăng nhập cấp JWT, đổi mật khẩu, refresh token.'
  },
  {
    prefix: '02_driver_api',
    name: 'Phân hệ 2: Quản lý Tài xế & Phương tiện (Driver Management)',
    tag: 'Driver',
    pathMatch: (p) => p.startsWith('/drivers'),
    frs: 'FR-DRV-01 -> FR-DRV-06',
    acs: 'AC-DRV-01, AC-DRV-02, AC-TRK-01',
    desc: 'Khai báo phương tiện, bật/tắt Online, xét duyệt/từ chối hồ sơ tài xế, khóa tài xế.'
  },
  {
    prefix: '03_ride_api',
    name: 'Phân hệ 3: Đặt xe & Vòng đời Chuyến đi (Ride Booking & Lifecycle)',
    tag: 'Ride',
    pathMatch: (p) => p.startsWith('/rides'),
    frs: 'FR-RIDE-01 -> FR-RIDE-09',
    acs: 'AC-BOOK-01, AC-BOOK-02, AC-RIDE-01, AC-CNC-01, AC-CNC-02',
    desc: 'Tìm địa chỉ geocode, ước tính cước, tạo cuốc xe, cập nhật các mốc đón/chở, hủy chuyến.'
  },
  {
    prefix: '04_payment_api',
    name: 'Phân hệ 4: Tính cước & Thanh toán (Payment & Pricing)',
    tag: 'Payment',
    pathMatch: (p) => p.startsWith('/payments'),
    frs: 'FR-PAY-01 -> FR-PAY-07',
    acs: 'AC-PAY-01, AC-PAY-02, AC-ADM-02',
    desc: 'Tính cước phí thực tế, quản lý biểu phí giá xe, thu tiền mặt, thanh toán thẻ điện tử, xuất hóa đơn.'
  },
  {
    prefix: '05_tracking_api',
    name: 'Phân hệ 5: Định vị & Giám sát Real-time (Tracking & Socket.IO)',
    tag: 'Tracking',
    pathMatch: (p) => p.startsWith('/tracking'),
    frs: 'FR-TRACK-01 -> FR-TRACK-04',
    acs: 'AC-TRK-01, AC-TRK-02, AC-ADM-03',
    desc: 'API lấy vị trí xe online cho Operator, Socket.IO phát sóng tọa độ GPS và theo dõi xe real-time.'
  },
  {
    prefix: '06_notification_api',
    name: 'Phân hệ 6: Quản lý Thông báo (Notification)',
    tag: 'Notification',
    pathMatch: (p) => p.startsWith('/notifications'),
    frs: 'FR-NOTIF-01 -> FR-NOTIF-05',
    acs: 'AC-AUTH-01',
    desc: 'Danh sách thông báo in-app, đánh dấu đã đọc, đánh dấu tất cả đã đọc.'
  },
  {
    prefix: '07_rating_api',
    name: 'Phân hệ 7: Đánh giá & Phản hồi sau chuyến (Rating & Review)',
    tag: 'Rating',
    pathMatch: (p) => p.startsWith('/ratings'),
    frs: 'FR-RATE-01 -> FR-RATE-03',
    acs: 'AC-RAT-01',
    desc: 'Khách hàng chấm sao 1-5 và nhận xét sau chuyến đi, tính rating trung bình tài xế.'
  },
  {
    prefix: '08_admin_api',
    name: 'Phân hệ 8: Quản trị Vận hành & Báo cáo (Admin & Analytics)',
    tag: 'Admin',
    pathMatch: (p) => p.startsWith('/admin'),
    frs: 'FR-ADM-01 -> FR-ADM-08, FR-SEC-01 -> FR-SEC-05',
    acs: 'AC-ADM-01, AC-ADM-02, AC-ADM-03',
    desc: 'Dashboard chỉ số ngày, quản lý khách/tài xế/cuốc xe, can thiệp sự cố, báo cáo doanh thu, audit log, phân quyền RBAC.'
  }
];

// Split into YAML files
groups.forEach(group => {
  const groupPaths = {};
  for (const [routePath, methods] of Object.entries(swaggerSpec.paths)) {
    if (group.pathMatch(routePath)) {
      groupPaths[routePath] = methods;
    }
  }

  const groupSpec = {
    openapi: '3.0.0',
    info: {
      title: \`CAB System - \${group.name}\`,
      version: '1.0.0',
      description: \`Tài liệu đặc tả API cho \${group.name}. Phục vụ yêu cầu \${group.frs} và tiêu chí chấp nhận \${group.acs}.\\nTác giả: Võ Tất Thiện (22652711)\`
    },
    servers: swaggerSpec.servers,
    components: swaggerSpec.components,
    security: swaggerSpec.security,
    tags: [
      {
        name: group.tag,
        description: group.desc
      }
    ],
    paths: groupPaths
  };

  const yamlStr = YAML.stringify(groupSpec);
  const yamlPath = path.join(targetDir, \`\${group.prefix}.yaml\`);
  fs.writeFileSync(yamlPath, yamlStr, 'utf8');
  console.log(\`Generated: \${group.prefix}.yaml (\${Object.keys(groupPaths).length} paths)\`);
});

// Generate README.md in API specification folder
let readmeContent = \`# 📑 TÀI LIỆU ĐẶC TẢ API THEO TỪNG NHÓM (API SPECIFICATIONS BY MODULE)
## CAB System – Nền tảng đặt xe trực tuyến
**Sinh viên:** Võ Tất Thiện – MSSV: 22652711  
**Base URL:** \\\`http://localhost:3000/api/v1\\\`  
**Swagger UI:** \\\`http://localhost:3000/api-docs\\\` hoặc \\\`http://localhost:8080\\\` (qua Docker)

---

### Danh mục các file đặc tả API theo từng nhóm:

| # | Phân hệ API | File YAML (OpenAPI 3.0) | Dải Yêu cầu (FR) | Tiêu chí Chấp nhận (AC) | Số Endpoints |
|:---:|---|---|:---:|:---:|:---:|
| 1 | **Xác thực & Người dùng** | [\`01_auth_api.yaml\`](./01_auth_api.yaml) | \`FR-AUTH-01..06\` | \`AC-AUTH-01, 02\` | 8 |
| 2 | **Quản lý Tài xế & Xe** | [\`02_driver_api.yaml\`](./02_driver_api.yaml) | \`FR-DRV-01..06\` | \`AC-DRV-01, 02\` | 8 |
| 3 | **Đặt xe & Vòng đời cuốc** | [\`03_ride_api.yaml\`](./03_ride_api.yaml) | \`FR-RIDE-01..09\` | \`AC-BOOK-01, 02\` | 9 |
| 4 | **Tính cước & Thanh toán** | [\`04_payment_api.yaml\`](./04_payment_api.yaml) | \`FR-PAY-01..07\` | \`AC-PAY-01, 02\` | 6 |
| 5 | **Định vị & Giám sát** | [\`05_tracking_api.yaml\`](./05_tracking_api.yaml) | \`FR-TRACK-01..04\` | \`AC-TRK-01, 02\` | 1 REST + 4 Socket |
| 6 | **Quản lý Thông báo** | [\`06_notification_api.yaml\`](./06_notification_api.yaml) | \`FR-NOTIF-01..05\` | \`AC-AUTH-01\` | 3 |
| 7 | **Đánh giá & Phản hồi** | [\`07_rating_api.yaml\`](./07_rating_api.yaml) | \`FR-RATE-01..03\` | \`AC-RAT-01\` | 3 |
| 8 | **Quản trị & Báo cáo** | [\`08_admin_api.yaml\`](./08_admin_api.yaml) | \`FR-ADM-01..08, FR-SEC-01..05\` | \`AC-ADM-01..03\` | 11 |
| * | **Toàn bộ hệ thống (Tổng hợp)** | [\`openapi.yaml\`](./openapi.yaml) | \`Đầy đủ 59 FRs\` | \`Đầy đủ ACs\` | 47+ REST |

---

### Hướng dẫn sử dụng:
1. Mỗi file \\\`.yaml\\\` ở trên có thể mở trực tiếp bằng bất kỳ công cụ OpenAPI nào:
   - [Swagger Editor](https://editor.swagger.io/)
   - Postman (Import file \\\`.yaml\\\)
   - VS Code extension (OpenAPI (Swagger) Editor)
2. File tổng hợp:
   - [\`openapi.yaml\`](./openapi.yaml): Dùng để mount trực tiếp vào Docker container Swagger UI.
   - [\`API_Specification.md\`](./API_Specification.md): Bản Markdown chi tiết để xem trực tiếp trên GitHub.
\`;

fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent, 'utf8');
console.log('Generated: README.md');
