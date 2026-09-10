const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..', '..');
const testcaseDir = path.join(projectDir, 'testcase');
const srsPath = path.join(projectDir, 'srs.md');

// Helper to escape table cell
function cell(str) {
  if (!str) return '';
  return str.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
}

// Function to render markdown table from array of rows
function renderMarkdownTable(title, description, rows) {
  let md = `# ${title}\n\n`;
  if (description) {
    md += `> ${description}\n\n`;
  }
  md += `| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |\n`;
  md += `|---|---|---|---|---|---|---|---|\n`;

  rows.forEach(r => {
    md += `| ${cell(r.id)} | ${cell(r.scenario)} | ${cell(r.name)} | ${cell(r.precondition)} | ${cell(r.steps)} | ${cell(r.data)} | ${cell(r.expected)} | ${cell(r.priority)} |\n`;
  });

  return md;
}

const allTestCases = [];

// ==========================================
// MODULE 1: AUTHENTICATION (38 TCs)
// ==========================================
const m1Rows = [
  // User's exact 20 Login test cases
  {
    id: "TC-AUTH-001",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập với username và password hợp lệ (Positive)",
    precondition: "Tài khoản đã đăng ký và đang Active",
    steps: "1. Mở Login\n2. Nhập username\n3. Nhập password\n4. Nhấn Login",
    data: "Username: user01\nPassword: Password@123",
    expected: "Đăng nhập thành công; tạo phiên/token và chuyển vào hệ thống (HTTP 200)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-002",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập với username không tồn tại (Negative)",
    precondition: "Hệ thống đang hoạt động",
    steps: "1. Mở Login\n2. Nhập username\n3. Nhập password\n4. Nhấn Login",
    data: "Username: unknown01\nPassword: Password@123",
    expected: "Đăng nhập thất bại; hiển thị thông báo thông tin đăng nhập không hợp lệ (HTTP 401)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-003",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập với password không đúng (Negative)",
    precondition: "Username tồn tại và tài khoản Active",
    steps: "1. Mở Login\n2. Nhập username đúng\n3. Nhập password sai\n4. Nhấn Login",
    data: "Username: user01\nPassword: Wrong@123",
    expected: "Đăng nhập thất bại; không tạo phiên/token (HTTP 401)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-004",
    scenario: "Người dùng đăng nhập",
    name: "Username để trống (Negative)",
    precondition: "Đang ở màn hình Login",
    steps: "1. Để trống username\n2. Nhập password\n3. Nhấn Login",
    data: "Username: empty\nPassword: Password@123",
    expected: "Không cho đăng nhập; hiển thị lỗi yêu cầu nhập username (HTTP 400)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-005",
    scenario: "Người dùng đăng nhập",
    name: "Password để trống (Negative)",
    precondition: "Đang ở màn hình Login",
    steps: "1. Nhập username\n2. Để trống password\n3. Nhấn Login",
    data: "Username: user01\nPassword: empty",
    expected: "Không cho đăng nhập; hiển thị lỗi yêu cầu nhập password (HTTP 400)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-006",
    scenario: "Người dùng đăng nhập",
    name: "Username và password đều để trống (Negative)",
    precondition: "Đang ở màn hình Login",
    steps: "1. Không nhập username\n2. Không nhập password\n3. Nhấn Login",
    data: "Username: empty\nPassword: empty",
    expected: "Không cho đăng nhập; hiển thị lỗi validation tương ứng (HTTP 400)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-007",
    scenario: "Người dùng đăng nhập",
    name: "Username có định dạng không hợp lệ (Negative)",
    precondition: "Đang ở màn hình Login",
    steps: "1. Nhập username không hợp lệ\n2. Nhập password\n3. Nhấn Login",
    data: "Username: user@@@\nPassword: Password@123",
    expected: "Từ chối dữ liệu và hiển thị lỗi username không hợp lệ (HTTP 400)",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-008",
    scenario: "Người dùng đăng nhập",
    name: "Password có định dạng không hợp lệ (Negative)",
    precondition: "Quy tắc password đã được định nghĩa (tối thiểu 6 ký tự)",
    steps: "1. Nhập username\n2. Nhập password không đáp ứng rule\n3. Nhấn Login",
    data: "Username: user01\nPassword: 123",
    expected: "Từ chối dữ liệu và hiển thị lỗi password không hợp lệ (HTTP 400)",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-009",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập bằng tài khoản bị khóa (Negative)",
    precondition: "Tài khoản user01 ở trạng thái Locked (isActive = false)",
    steps: "1. Nhập username\n2. Nhập password đúng\n3. Nhấn Login",
    data: "Username: user01\nPassword: Password@123",
    expected: "Đăng nhập thất bại; thông báo tài khoản bị khóa (HTTP 403 Forbidden)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-010",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập bằng tài khoản Inactive (Negative)",
    precondition: "Tài khoản tồn tại nhưng Inactive",
    steps: "1. Nhập username\n2. Nhập password đúng\n3. Nhấn Login",
    data: "Username: inactive01\nPassword: Password@123",
    expected: "Đăng nhập thất bại; thông báo tài khoản không hoạt động (HTTP 403)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-011",
    scenario: "Người dùng đăng nhập",
    name: "Username phân biệt chữ hoa/chữ thường (Positive)",
    precondition: "Quy tắc xử lý username case-insensitive (email lowercase)",
    steps: "1. Nhập username khác hoa/thường\n2. Nhập password đúng\n3. Nhấn Login",
    data: "Username: User01@Mail.Com\nPassword: Password@123",
    expected: "Hệ thống tự động lowercase và đăng nhập thành công (HTTP 200)",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-012",
    scenario: "Người dùng đăng nhập",
    name: "Password phân biệt chữ hoa/chữ thường (Negative)",
    precondition: "Tài khoản Active",
    steps: "1. Nhập username đúng\n2. Nhập password khác hoa/thường\n3. Nhấn Login",
    data: "Username: user01\nPassword: password@123",
    expected: "Đăng nhập thất bại do password phân biệt hoa/thường (HTTP 401)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-013",
    scenario: "Người dùng đăng nhập",
    name: "Nhập password chứa khoảng trắng (Boundary)",
    precondition: "Tài khoản Active",
    steps: "1. Nhập username\n2. Nhập password có khoảng trắng đầu/cuối\n3. Nhấn Login",
    data: "Username: user01\nPassword:  Password@123 ",
    expected: "Xử lý đúng theo rule bảo mật (không tự trim password, báo sai mật khẩu nếu pass gốc không có space)",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-014",
    scenario: "Người dùng đăng nhập",
    name: "Kiểm tra password không hiển thị plaintext (Positive)",
    precondition: "Đang ở màn hình Login",
    steps: "1. Click ô Password\n2. Nhập password",
    data: "Password: Password@123",
    expected: "Password được che/mask (type='password'), có nút toggle ẩn/hiện",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-015",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập thành công và truy cập chức năng được phép (Positive)",
    precondition: "Tài khoản Active và có quyền customer",
    steps: "1. Nhập username hợp lệ\n2. Nhập password hợp lệ\n3. Login\n4. Truy cập chức năng yêu cầu authentication",
    data: "Username: user01\nPassword: Password@123",
    expected: "Authentication thành công và truy cập được chức năng được cấp quyền (HTTP 200 kèm Bearer Token)",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-016",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập nhiều lần với password sai - Chống Brute-force (Exception / Security)",
    precondition: "Cơ chế Rate Limit NFR-SEC-06 hoạt động (tối đa 5 lần thử sai)",
    steps: "1. Nhập username đúng\n2. Nhập password sai 5 lần liên tiếp\n3. Gửi lần đăng nhập thứ 6",
    data: "Username: user01\nPassword: Wrong@123 (x5)",
    expected: "Hệ thống chặn tạm thời 15 phút, trả về HTTP 429 Too Many Requests",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-017",
    scenario: "Người dùng đăng nhập",
    name: "Request không có username (Negative)",
    precondition: "API Login đang hoạt động (POST /api/v1/auth/login)",
    steps: "1. Gửi request Login\n2. Bỏ trường email/username",
    data: "{ \"password\": \"Password@123\" }",
    expected: "API trả lỗi validation HTTP 400 Bad Request; không xác thực",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-018",
    scenario: "Người dùng đăng nhập",
    name: "Request không có password (Negative)",
    precondition: "API Login đang hoạt động",
    steps: "1. Gửi request Login\n2. Bỏ trường password",
    data: "{ \"email\": \"user01@mail.com\" }",
    expected: "API trả lỗi validation HTTP 400 Bad Request; không xác thực",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-019",
    scenario: "Người dùng đăng nhập",
    name: "Request với username/password không hợp lệ (Negative)",
    precondition: "API Login đang hoạt động",
    steps: "1. Gửi request Login\n2. Nhập dữ liệu không hợp lệ",
    data: "{ \"email\": \"unknown@mail.com\", \"password\": \"wrongpass\" }",
    expected: "API trả response lỗi HTTP 401 Unauthorized; không tạo token",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-020",
    scenario: "Người dùng đăng nhập",
    name: "Response không trả về password hoặc hash (Security)",
    precondition: "Đăng nhập thành công",
    steps: "1. Gửi request Login hợp lệ\n2. Kiểm tra response JSON",
    data: "{ \"email\": \"user01@mail.com\", \"password\": \"Password@123\" }",
    expected: "Response HTTP 200 không chứa passwordHash hoặc thông tin nhạy cảm của người dùng",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  // Register Customer (FR-AUTH-01)
  {
    id: "TC-AUTH-021",
    scenario: "Đăng ký Khách hàng",
    name: "Đăng ký tài khoản khách hàng với thông tin hợp lệ (Positive)",
    precondition: "Email và SĐT chưa tồn tại trong hệ thống",
    steps: "1. Mở màn hình Đăng ký\n2. Nhập họ tên, email, SĐT, mật khẩu hợp lệ\n3. Nhấn Đăng ký",
    data: "Họ tên: Nguyễn Văn A\nEmail: khach1@gmail.com\nSĐT: 0912345678\nMật khẩu: Password@123",
    expected: "Đăng ký thành công, tạo User role 'customer', isActive=true, trả về HTTP 201 Created",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-AUTH-022",
    scenario: "Đăng ký Khách hàng",
    name: "Đăng ký với email trùng lặp (Negative)",
    precondition: "Email khach1@gmail.com đã tồn tại trong DB",
    steps: "1. Nhập thông tin với email đã tồn tại\n2. Nhấn Đăng ký",
    data: "Email: khach1@gmail.com, SĐT: 0987654321",
    expected: "Hệ thống từ chối, trả về HTTP 409 Conflict: 'Email đã được sử dụng'",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-AUTH-023",
    scenario: "Đăng ký Khách hàng",
    name: "Đăng ký với số điện thoại trùng lặp (Negative)",
    precondition: "SĐT 0912345678 đã tồn tại trong DB",
    steps: "1. Nhập email mới nhưng SĐT trùng\n2. Nhấn Đăng ký",
    data: "Email: khachmoi@gmail.com, SĐT: 0912345678",
    expected: "Hệ thống từ chối, trả về HTTP 409 Conflict: 'Số điện thoại đã được sử dụng'",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-AUTH-024",
    scenario: "Đăng ký Khách hàng",
    name: "Đăng ký với SĐT không đủ 10 chữ số VN (Negative / Boundary)",
    precondition: "Đang ở màn hình Đăng ký",
    steps: "1. Nhập SĐT 9 chữ số hoặc 11 chữ số\n2. Nhấn Đăng ký",
    data: "SĐT: 091234567 (9 số) hoặc 09123456789 (11 số)",
    expected: "Hệ thống báo lỗi validation HTTP 400: 'SĐT phải gồm đúng 10 chữ số'",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-AUTH-025",
    scenario: "Đăng ký Khách hàng",
    name: "Đăng ký với mật khẩu đúng 6 ký tự - Giá trị biên (Boundary)",
    precondition: "Đang ở màn hình Đăng ký",
    steps: "1. Nhập mật khẩu đúng 6 ký tự\n2. Nhấn Đăng ký",
    data: "Password: 'Pass01' (đúng 6 ký tự)",
    expected: "Hợp lệ, hệ thống chấp nhận tạo tài khoản thành công HTTP 201",
    priority: "Medium",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-AUTH-026",
    scenario: "Đăng ký Khách hàng",
    name: "Đăng ký với mật khẩu 5 ký tự - Dưới ngưỡng biên (Boundary / Negative)",
    precondition: "Đang ở màn hình Đăng ký",
    steps: "1. Nhập mật khẩu 5 ký tự\n2. Nhấn Đăng ký",
    data: "Password: '12345' (5 ký tự)",
    expected: "Từ chối HTTP 400: 'Mật khẩu phải chứa ít nhất 6 ký tự'",
    priority: "Medium",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-AUTH-027",
    scenario: "Đăng ký Khách hàng",
    name: "Tấn công NoSQL Injection trong trường email đăng ký (Negative / Security)",
    precondition: "Hệ thống nhận JSON body",
    steps: "1. Gửi request đăng ký với payload NoSQL",
    data: "{ \"email\": { \"$gt\": \"\" }, \"password\": \"Password@123\" }",
    expected: "Hệ thống sanitize dữ liệu, từ chối type không phải string, HTTP 400",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-AUTH-028",
    scenario: "Đăng ký Khách hàng",
    name: "Tấn công XSS trong trường họ tên (Negative / Security)",
    precondition: "Đang đăng ký",
    steps: "1. Nhập fullName chứa thẻ script",
    data: "fullName: '<script>alert(1)</script>'",
    expected: "Hệ thống escape/strip HTML tags, không thực thi mã độc trên giao diện",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  // Register Driver (FR-AUTH-02)
  {
    id: "TC-AUTH-029",
    scenario: "Đăng ký Đối tác Tài xế",
    name: "Đăng ký tài xế đầy đủ thông tin GPLX và xe hợp lệ (Positive)",
    precondition: "Số GPLX và Biển số xe chưa tồn tại trong hệ thống",
    steps: "1. Chọn Đăng ký Tài xế\n2. Nhập thông tin cá nhân, GPLX 12 số, hạng B2, thông tin xe\n3. Nhấn Đăng ký",
    data: "Họ tên: Trần Văn Tài\nEmail: taixe1@gmail.com\nSĐT: 0977112233\nGPLX: 123456789012 (hạng B2)\nBiển số: 51G-888.88\nLoại xe: sedan",
    expected: "Tạo User role 'driver', DriverProfile với isApproved=false, status='offline', HTTP 201 Created",
    priority: "High",
    fr: "FR-AUTH-02"
  },
  {
    id: "TC-AUTH-030",
    scenario: "Đăng ký Đối tác Tài xế",
    name: "Đăng ký với GPLX không đúng 12 chữ số (Negative / Boundary)",
    precondition: "Đang ở màn hình đăng ký tài xế",
    steps: "1. Nhập GPLX có 11 chữ số hoặc 13 chữ số\n2. Nhấn Đăng ký",
    data: "GPLX: 12345678901 (11 số)",
    expected: "Báo lỗi validation HTTP 400: 'Số GPLX phải đúng 12 chữ số'",
    priority: "High",
    fr: "FR-AUTH-02"
  },
  {
    id: "TC-AUTH-031",
    scenario: "Đăng ký Đối tác Tài xế",
    name: "Đăng ký với GPLX hoặc Biển số xe bị trùng (Negative)",
    precondition: "Biển số 51G-888.88 đã đăng ký trong hệ thống",
    steps: "1. Nhập thông tin với biển số đã có\n2. Nhấn Đăng ký",
    data: "Biển số: 51G-888.88",
    expected: "Hệ thống từ chối HTTP 409 Conflict: 'Biển số xe đã được đăng ký'",
    priority: "High",
    fr: "FR-AUTH-02"
  },
  // Profile (FR-AUTH-04)
  {
    id: "TC-AUTH-032",
    scenario: "Quản lý Hồ sơ",
    name: "Xem thông tin cá nhân khi đã đăng nhập (Positive)",
    precondition: "Đã có Bearer Access Token hợp lệ",
    steps: "1. Gửi request GET /api/v1/auth/profile kèm Header Authorization",
    data: "Header: Authorization: Bearer <valid_token>",
    expected: "HTTP 200 OK, trả về thông tin họ tên, email, SĐT, role",
    priority: "Medium",
    fr: "FR-AUTH-04"
  },
  {
    id: "TC-AUTH-033",
    scenario: "Quản lý Hồ sơ",
    name: "Cập nhật họ tên và số điện thoại mới hợp lệ (Positive)",
    precondition: "Đã đăng nhập",
    steps: "1. Gửi PUT /api/v1/auth/profile với họ tên mới và SĐT mới",
    data: "{ \"fullName\": \"Nguyễn Văn A (Cập nhật)\", \"phone\": \"0912345699\" }",
    expected: "HTTP 200 OK, dữ liệu profile trong DB được cập nhật",
    priority: "Medium",
    fr: "FR-AUTH-04"
  },
  // Change Password (FR-AUTH-05)
  {
    id: "TC-AUTH-034",
    scenario: "Đổi Mật khẩu",
    name: "Đổi mật khẩu thành công với mật khẩu cũ chính xác (Positive)",
    precondition: "Đã đăng nhập, biết mật khẩu hiện tại",
    steps: "1. Nhập mật khẩu cũ đúng\n2. Nhập mật khẩu mới >= 6 ký tự\n3. Nhấn Đổi mật khẩu",
    data: "currentPassword: Password@123\nnewPassword: NewPassword@456",
    expected: "HTTP 200 OK: 'Đổi mật khẩu thành công', hash bcrypt mới được lưu vào DB",
    priority: "High",
    fr: "FR-AUTH-05"
  },
  {
    id: "TC-AUTH-035",
    scenario: "Đổi Mật khẩu",
    name: "Đổi mật khẩu với mật khẩu cũ không đúng (Negative)",
    precondition: "Đang đăng nhập",
    steps: "1. Nhập mật khẩu cũ sai\n2. Nhấn Đổi mật khẩu",
    data: "currentPassword: WrongOldPassword\nnewPassword: NewPassword@456",
    expected: "HTTP 400 Bad Request: 'Mật khẩu hiện tại không đúng'",
    priority: "High",
    fr: "FR-AUTH-05"
  },
  // Logout & Refresh Token (FR-AUTH-06)
  {
    id: "TC-AUTH-036",
    scenario: "Đăng xuất & Token",
    name: "Đăng xuất hệ thống và thu hồi Refresh Token (Positive)",
    precondition: "Đang có phiên đăng nhập active",
    steps: "1. Gửi POST /api/v1/auth/logout kèm Bearer Token",
    data: "Bearer Token hợp lệ",
    expected: "HTTP 200 OK, trường refreshToken trong DB bị xóa thành null",
    priority: "High",
    fr: "FR-AUTH-06"
  },
  {
    id: "TC-AUTH-037",
    scenario: "Đăng xuất & Token",
    name: "Cấp mới Access Token bằng Refresh Token hợp lệ (Positive)",
    precondition: "Có Refresh Token còn hạn (<= 7 ngày)",
    steps: "1. Gửi POST /api/v1/auth/refresh-token kèm refreshToken",
    data: "{ \"refreshToken\": \"<valid_refresh_token>\" }",
    expected: "HTTP 200 OK, trả về cặp accessToken mới (15 phút) và refreshToken mới",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-038",
    scenario: "Đăng xuất & Token",
    name: "Cố tình dùng lại Refresh Token đã thu hồi (Negative / Security)",
    precondition: "User đã bấm logout",
    steps: "1. Gửi POST /api/v1/auth/refresh-token với token cũ",
    data: "{ \"refreshToken\": \"<revoked_token>\" }",
    expected: "HTTP 401 Unauthorized: 'Refresh token không hợp lệ hoặc đã hết hạn'",
    priority: "High",
    fr: "FR-AUTH-03"
  }
];

allTestCases.push(...m1Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC01_Authentication.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 1: XÁC THỰC & NGƯỜI DÙNG (AUTHENTICATION)',
    'Bao phủ: FR-AUTH-01 đến FR-AUTH-06 | AC-AUTH-01, AC-AUTH-02 | Positive, Negative, Boundary, Security',
    m1Rows
  ),
  'utf8'
);
console.log(`Generated TC01_Authentication.md: ${m1Rows.length} test cases`);

// ==========================================
// MODULE 2: DRIVER MANAGEMENT (17 TCs)
// ==========================================
const m2Rows = [
  {
    id: "TC-DRV-001",
    scenario: "Khai báo phương tiện",
    name: "Khai báo xe mới hợp lệ - Sedan 4 chỗ (Positive)",
    precondition: "Tài xế đã đăng nhập, chưa có xe hoạt động",
    steps: "1. Mở màn hình Khai báo xe\n2. Nhập biển số, hãng, mẫu, màu, loại xe sedan, số ghế\n3. Nhấn Lưu",
    data: "Biển số: 51H-123.45, Loại xe: sedan, Hãng: Toyota, Mẫu: Vios, Số ghế: 4",
    expected: "Tạo bản ghi Vehicle thành công, isActive=true, HTTP 201 Created",
    priority: "High",
    fr: "FR-DRV-01"
  },
  {
    id: "TC-DRV-002",
    scenario: "Khai báo phương tiện",
    name: "Khai báo xe với loại xe không thuộc danh mục (Negative)",
    precondition: "Tài xế đã đăng nhập",
    steps: "1. Nhập loại xe không hợp lệ (ví dụ: 'truck', 'motorbike')\n2. Nhấn Lưu",
    data: "Biển số: 51H-999.99, Loại xe: truck",
    expected: "Từ chối dữ liệu, HTTP 400: 'Loại xe phải thuộc [sedan, suv, van]'",
    priority: "High",
    fr: "FR-DRV-01"
  },
  {
    id: "TC-DRV-003",
    scenario: "Khai báo phương tiện",
    name: "Khai báo xe với biển số bị trùng lặp (Negative)",
    precondition: "Biển số 51H-123.45 đã được đăng ký bởi tài xế khác",
    steps: "1. Nhập biển số đã tồn tại\n2. Nhấn Lưu",
    data: "Biển số: 51H-123.45",
    expected: "Báo lỗi HTTP 409 Conflict: 'Biển số xe đã tồn tại trong hệ thống'",
    priority: "High",
    fr: "FR-DRV-01"
  },
  {
    id: "TC-DRV-004",
    scenario: "Khai báo phương tiện",
    name: "Biển số xe đúng chuẩn định dạng Việt Nam (Boundary)",
    precondition: "Màn hình khai báo xe",
    steps: "1. Nhập biển số chuẩn 51G-123.45\n2. Nhấn Lưu",
    data: "Biển số: 51G-123.45",
    expected: "Regex kiểm tra biển số hợp lệ, lưu DB thành công",
    priority: "Medium",
    fr: "FR-DRV-01"
  },
  {
    id: "TC-DRV-005",
    scenario: "Trạng thái trực tuyến",
    name: "Tài xế đã duyệt bật Online thành công (Positive)",
    precondition: "Tài xế có isApproved=true, isActive=true, xe active",
    steps: "1. Mở app Tài xế\n2. Gạt công tắc sang 'Trực tuyến' (available)",
    data: "{ \"status\": \"available\" }",
    expected: "Trạng thái DB chuyển 'available', kết nối WebSocket sẵn sàng nhận cuốc, HTTP 200 OK",
    priority: "High",
    fr: "FR-DRV-02"
  },
  {
    id: "TC-DRV-006",
    scenario: "Trạng thái trực tuyến",
    name: "Tài xế chưa được duyệt cố tình bật Online (Negative)",
    precondition: "Tài xế mới đăng ký, isApproved = false",
    steps: "1. Gạt công tắc sang 'Trực tuyến'",
    data: "{ \"status\": \"available\" }",
    expected: "Hệ thống chặn HTTP 403 Forbidden: 'Hồ sơ chưa được phê duyệt bởi Operator'",
    priority: "High",
    fr: "FR-DRV-02"
  },
  {
    id: "TC-DRV-007",
    scenario: "Trạng thái trực tuyến",
    name: "Tài xế tắt trực tuyến chuyển về Offline (Positive)",
    precondition: "Tài xế đang ở trạng thái available và không có cuốc chạy",
    steps: "1. Gạt công tắc sang 'Ngoại tuyến' (offline)",
    data: "{ \"status\": \"offline\" }",
    expected: "Trạng thái chuyển 'offline', ngắt khỏi pool tìm kiếm tài xế 5km, HTTP 200 OK",
    priority: "Medium",
    fr: "FR-DRV-02"
  },
  {
    id: "TC-DRV-008",
    scenario: "Trạng thái trực tuyến",
    name: "Tài xế chưa có phương tiện nào cố tình bật Online (Negative)",
    precondition: "Tài xế được duyệt nhưng chưa đăng ký xe",
    steps: "1. Bấm bật trực tuyến",
    data: "Vehicles = []",
    expected: "Hệ thống báo lỗi HTTP 400: 'Vui lòng đăng ký phương tiện trước khi trực tuyến'",
    priority: "High",
    fr: "FR-DRV-02"
  },
  {
    id: "TC-DRV-009",
    scenario: "Trạng thái Bận",
    name: "Tự động chuyển trạng thái Bận (busy) khi chấp nhận cuốc (Positive)",
    precondition: "Tài xế đang available, có cuốc xe được phân bổ",
    steps: "1. Tài xế bấm 'Chấp nhận cuốc' trong 30 giây",
    data: "Ride ID: RIDE_001, Driver ID: DRV_01",
    expected: "Trạng thái DriverProfile tự động chuyển sang 'busy', không nhận thêm cuốc xe mới",
    priority: "High",
    fr: "FR-DRV-03"
  },
  {
    id: "TC-DRV-010",
    scenario: "Trạng thái Bận",
    name: "Tài xế đang busy bị loại khỏi danh sách quét tìm xe (Negative)",
    precondition: "Tài xế đang chở khách (status = busy)",
    steps: "1. Khách hàng B đặt chuyến gần vị trí tài xế (< 1km)\n2. Hệ thống quét tìm xe",
    data: "Khoảng cách: 800m, Driver status: busy",
    expected: "Thuật toán loại trừ tài xế đang busy, không gửi thông báo cuốc mới",
    priority: "High",
    fr: "FR-DRV-03"
  },
  {
    id: "TC-DRV-011",
    scenario: "Xét duyệt hồ sơ",
    name: "Operator xem danh sách tài xế chờ phê duyệt (Positive)",
    precondition: "Đăng nhập với quyền operator/admin",
    steps: "1. Gửi GET /api/v1/drivers/pending?page=1&limit=10",
    data: "Role: operator, Token hợp lệ",
    expected: "HTTP 200 OK, trả về danh sách hồ sơ có isApproved=false kèm thông tin xe và GPLX",
    priority: "High",
    fr: "FR-DRV-04"
  },
  {
    id: "TC-DRV-012",
    scenario: "Xét duyệt hồ sơ",
    name: "Operator phê duyệt hồ sơ tài xế hợp lệ (Positive)",
    precondition: "Hồ sơ tài xế đang isApproved=false",
    steps: "1. Operator kiểm tra hồ sơ\n2. Bấm nút 'Phê duyệt'\n3. Xác nhận",
    data: "Driver User ID: 60b8d295f1d2c72b8c5e6f3e",
    expected: "isApproved đổi thành true, approvedAt lưu timestamp, gửi email thông báo chúc mừng, ghi AuditLog",
    priority: "High",
    fr: "FR-DRV-04"
  },
  {
    id: "TC-DRV-013",
    scenario: "Xét duyệt hồ sơ",
    name: "Operator từ chối hồ sơ kèm theo lý do cụ thể (Negative)",
    precondition: "Hồ sơ tài xế có ảnh GPLX mờ không đạt",
    steps: "1. Operator bấm 'Từ chối'\n2. Nhập lý do từ chối\n3. Bấm Xác nhận",
    data: "{ \"reason\": \"Ảnh giấy phép lái xe mờ, không nhận diện được số GPLX\" }",
    expected: "isApproved giữ false, gửi email thông báo lý do cho tài xế để nộp lại, HTTP 200 OK",
    priority: "High",
    fr: "FR-DRV-04"
  },
  {
    id: "TC-DRV-014",
    scenario: "Dashboard tài xế",
    name: "Tài xế xem tổng kết cuốc xe, rating và thu nhập (Positive)",
    precondition: "Tài xế đã hoàn thành các cuốc xe trong hệ thống",
    steps: "1. Mở tab Hồ sơ / Thu nhập trên app tài xế",
    data: "Driver Token",
    expected: "HTTP 200 OK, hiển thị đúng tổng số cuốc (totalTrips), điểm rating trung bình, tổng tiền kiếm được",
    priority: "Medium",
    fr: "FR-DRV-05"
  },
  {
    id: "TC-DRV-015",
    scenario: "Khóa tài khoản tài xế",
    name: "Admin khóa tài khoản tài xế có hành vi gian lận (Positive)",
    precondition: "Đăng nhập với quyền Admin",
    steps: "1. Admin tìm kiếm tài xế vi phạm\n2. Bấm 'Khóa tài khoản'\n3. Xác nhận lý do",
    data: "Driver ID: 60b8d295f1d2c72b8c5e6f3e",
    expected: "isActive đổi thành false, ngắt kết nối socket lập tức, tài xế không thể đăng nhập nhận cuốc",
    priority: "High",
    fr: "FR-DRV-06"
  },
  {
    id: "TC-DRV-016",
    scenario: "Khóa tài khoản tài xế",
    name: "Operator không có quyền khóa tài khoản tài xế (Negative)",
    precondition: "Đăng nhập tài khoản role operator",
    steps: "1. Gửi request PUT /api/v1/drivers/:id/block",
    data: "Role: operator",
    expected: "Hệ thống chặn HTTP 403 Forbidden: 'Chỉ Admin mới có quyền khóa tài khoản'",
    priority: "High",
    fr: "FR-DRV-06"
  },
  {
    id: "TC-DRV-017",
    scenario: "Khóa tài khoản khi đang chở khách",
    name: "Admin khóa tài khoản khi tài xế đang trong chuyến đi (Exception EX-09)",
    precondition: "Tài xế đang chở khách (status = in_progress)",
    steps: "1. Admin bấm Khóa tài khoản\n2. Hệ thống kiểm tra cuốc xe đang chạy",
    data: "Driver status: busy, Ride: in_progress",
    expected: "Hệ thống cho phép chuyến đi hoàn thành bình thường, sau khi trả khách tài khoản mới bị khóa hoàn toàn",
    priority: "High",
    fr: "FR-DRV-06"
  }
];

allTestCases.push(...m2Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC02_Driver_Management.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 2: QUẢN LÝ TÀI XẾ & PHƯƠNG TIỆN (DRIVER ONBOARDING)',
    'Bao phủ: FR-DRV-01 đến FR-DRV-06 | AC-DRV-01, AC-DRV-02, AC-TRK-01 | EX-09 | Chuẩn 8 cột ngang Excel',
    m2Rows
  ),
  'utf8'
);
console.log(`Generated TC02_Driver_Management.md: ${m2Rows.length} test cases`);

// ==========================================
// MODULE 3: RIDE BOOKING & LIFECYCLE (23 TCs)
// ==========================================
const m3Rows = [
  {
    id: "TC-RID-001",
    scenario: "Tìm kiếm địa chỉ Geocoding",
    name: "Tìm kiếm địa chỉ hợp lệ trả về tọa độ GPS (Positive)",
    precondition: "Hệ thống Geocoding đang hoạt động",
    steps: "1. Nhập từ khóa địa chỉ vào ô tìm kiếm đón/trả\n2. Chọn từ danh sách gợi ý",
    data: "address = 'Dai hoc Cong Nghiep TPHCM'",
    expected: "HTTP 200 OK, trả về danh sách gợi ý kèm tọa độ chính xác [106.6881, 10.8222]",
    priority: "High",
    fr: "FR-RIDE-01"
  },
  {
    id: "TC-RID-002",
    scenario: "Tìm kiếm địa chỉ Geocoding",
    name: "Tìm kiếm với địa chỉ để trống (Negative)",
    precondition: "Màn hình đặt xe",
    steps: "1. Gửi request tìm kiếm với chuỗi rỗng",
    data: "address = ''",
    expected: "HTTP 400 Bad Request: 'Vui lòng cung cấp địa chỉ tìm kiếm'",
    priority: "Medium",
    fr: "FR-RIDE-01"
  },
  {
    id: "TC-RID-003",
    scenario: "Tìm kiếm địa chỉ Geocoding",
    name: "Máy chủ bản đồ bên ngoài bị lỗi thời gian chờ (Exception EX-10)",
    precondition: "OpenStreetMap API bị timeout > 5s",
    steps: "1. Khách hàng gõ tìm địa chỉ\n2. Hệ thống bắt lỗi timeout",
    data: "External Map Timeout",
    expected: "Kích hoạt Circuit Breaker, fallback sang danh sách địa danh phổ biến lưu sẵn trong cache, không crash",
    priority: "High",
    fr: "FR-RIDE-01"
  },
  {
    id: "TC-RID-004",
    scenario: "Ước tính cước phí",
    name: "Tính cước ước tính xe Sedan theo khoảng cách và thời gian (Positive / BRULE-01)",
    precondition: "Bảng giá Sedan: Base 15k, 12k/km, 1k/phút",
    steps: "1. Nhập điểm đón và điểm đến cách nhau 10km, dự kiến 20 phút\n2. Chọn xe Sedan\n3. Xem cước ước tính",
    data: "Khoảng cách: 10.0km, Thời gian: 20 phút, Loại xe: sedan",
    expected: "Cước ước tính = 15.000 + (10 * 12.000) + (20 * 1.000) = 155.000 VNĐ, HTTP 200 OK",
    priority: "High",
    fr: "FR-RIDE-02"
  },
  {
    id: "TC-RID-005",
    scenario: "Ước tính cước phí",
    name: "Tính cước lộ trình cực ngắn (< 1km) áp dụng Giá mở cửa (Boundary / BRULE-01)",
    precondition: "Bảng giá BaseFare = 15.000 VNĐ",
    steps: "1. Nhập lộ trình 0.3km, chạy 2 phút\n2. Xem cước hiển thị",
    data: "Khoảng cách: 0.3km, Thời gian: 2 phút",
    expected: "Áp dụng giá tối thiểu BaseFare = 15.000 VNĐ theo BRULE-01",
    priority: "Medium",
    fr: "FR-RIDE-02"
  },
  {
    id: "TC-RID-006",
    scenario: "Ước tính cước phí",
    name: "Ước tính cước lộ trình dài liên tỉnh 100km (Boundary)",
    precondition: "Bảng giá Sedan hợp lệ",
    steps: "1. Nhập khoảng cách 100.0km, thời gian 150 phút\n2. Xem cước",
    data: "d = 100.0km, t = 150 phút",
    expected: "Cước = 15.000 + (100 * 12.000) + (150 * 1.000) = 1.365.000 VNĐ, tính toán chính xác không tràn số",
    priority: "Medium",
    fr: "FR-RIDE-02"
  },
  {
    id: "TC-RID-007",
    scenario: "Ước tính cước phí",
    name: "Ước tính cước với tọa độ điểm đón và điểm trả trùng nhau (Negative)",
    precondition: "Màn hình tính giá",
    steps: "1. Chọn điểm đón và điểm trả cùng 1 vị trí (khoảng cách = 0)",
    data: "pickupLocation = dropoffLocation = [106.6881, 10.8222]",
    expected: "Hệ thống cảnh báo lỗi: 'Điểm đón và điểm trả không được trùng nhau' (HTTP 400)",
    priority: "High",
    fr: "FR-RIDE-02"
  },
  {
    id: "TC-RID-008",
    scenario: "Khởi tạo đặt xe",
    name: "Khách hàng tạo cuốc xe mới khi không có cuốc nào đang chạy (Positive)",
    precondition: "Khách hàng đã đăng nhập, không có chuyến xe chưa hoàn thành",
    steps: "1. Chọn điểm đón, điểm trả, loại xe, phương thức thanh toán\n2. Nhấn 'Xác nhận đặt xe'",
    data: "Pickup: 12 Nguyễn Văn Bảo, Dropoff: Chợ Bến Thành, Xe: sedan, PT: cash",
    expected: "Bản ghi Ride được tạo với status='searching', retryCount=0, kích hoạt tìm xe 5km, HTTP 201",
    priority: "High",
    fr: "FR-RIDE-03"
  },
  {
    id: "TC-RID-009",
    scenario: "Khởi tạo đặt xe",
    name: "Chặn đặt thêm cuốc mới khi đang có chuyến xe chưa hoàn tất (Negative / AC-BOOK-02)",
    precondition: "Khách hàng đang có chuyến xe ở trạng thái 'in_progress'",
    steps: "1. Cố tình gửi yêu cầu POST /api/v1/rides/book tạo chuyến xe mới",
    data: "Khách hàng ID có cuốc active",
    expected: "Hệ thống từ chối HTTP 400: 'Bạn đang có một chuyến xe đang diễn ra, không thể đặt thêm cuốc mới'",
    priority: "High",
    fr: "FR-RIDE-03"
  },
  {
    id: "TC-RID-010",
    scenario: "Vòng đời chuyến đi",
    name: "Tài xế cập nhật trạng thái 'Đã đến điểm đón' (Positive)",
    precondition: "Chuyến xe đang ở trạng thái 'accepted'",
    steps: "1. Tài xế di chuyển tới điểm đón\n2. Bấm nút 'Đã đến nơi'",
    data: "Ride ID hợp lệ, Driver Token",
    expected: "Trạng thái Ride chuyển 'driver_arrived', arrivedAt lưu timestamp, gửi push notification cho khách",
    priority: "High",
    fr: "FR-RIDE-04"
  },
  {
    id: "TC-RID-011",
    scenario: "Vòng đời chuyến đi",
    name: "Chặn cập nhật 'Đã đến nơi' khi cuốc xe chưa được accepted (Negative / BRULE-05)",
    precondition: "Chuyến xe đang ở trạng thái 'searching'",
    steps: "1. Gửi request PUT /api/v1/rides/:id/arrived",
    data: "Ride status: searching",
    expected: "Hệ thống từ chối chuyển trạng thái không hợp lệ, HTTP 400 Bad Request",
    priority: "High",
    fr: "FR-RIDE-04"
  },
  {
    id: "TC-RID-012",
    scenario: "Vòng đời chuyến đi",
    name: "Tài xế bấm 'Bắt đầu chuyến đi' khi khách đã lên xe (Positive)",
    precondition: "Chuyến xe đang ở trạng thái 'driver_arrived'",
    steps: "1. Khách lên xe\n2. Tài xế bấm nút 'Bắt đầu di chuyển'",
    data: "Ride ID hợp lệ",
    expected: "Ride status chuyển 'in_progress', ghi nhận startedAt, bắt đầu tính đồng hồ cước",
    priority: "High",
    fr: "FR-RIDE-05"
  },
  {
    id: "TC-RID-013",
    scenario: "Vòng đời chuyến đi",
    name: "Chặn bắt đầu chuyến khi tài xế chưa bấm 'Đã đến nơi' (Negative / BRULE-05)",
    precondition: "Chuyến xe đang ở 'accepted'",
    steps: "1. Gửi request PUT /api/v1/rides/:id/start",
    data: "Ride status: accepted",
    expected: "Báo lỗi HTTP 400: 'Phải bấm đã đến điểm đón trước khi bắt đầu hành trình'",
    priority: "High",
    fr: "FR-RIDE-05"
  },
  {
    id: "TC-RID-014",
    scenario: "Vòng đời chuyến đi",
    name: "Tài xế bấm 'Hoàn thành chuyến đi' khi tới điểm trả (Positive)",
    precondition: "Chuyến xe đang ở trạng thái 'in_progress'",
    steps: "1. Xe dừng tại đích\n2. Tài xế bấm 'Hoàn thành chuyến'\n3. Hệ thống chốt số km và thời gian",
    data: "actualDistance = 10.2km, actualDuration = 24 phút",
    expected: "Ride status chuyển 'completed', completedAt lưu timestamp, kích hoạt module tính cước thực tế",
    priority: "High",
    fr: "FR-RIDE-06"
  },
  {
    id: "TC-RID-015",
    scenario: "Hủy chuyến đi",
    name: "Khách hàng hủy chuyến miễn phí khi xe đang tìm hoặc đang tới (Positive / BRULE-06)",
    precondition: "Chuyến xe đang ở trạng thái 'searching' hoặc 'accepted'",
    steps: "1. Khách hàng bấm nút 'Hủy chuyến'\n2. Chọn lý do hủy\n3. Xác nhận",
    data: "Lý do: 'Thay đổi lịch trình cá nhân'",
    expected: "Ride chuyển 'cancelled_by_customer', tài xế giải phóng về available, không phạt phí hủy",
    priority: "High",
    fr: "FR-RIDE-07"
  },
  {
    id: "TC-RID-016",
    scenario: "Hủy chuyến đi",
    name: "Chặn khách hàng hủy chuyến khi xe đang di chuyển (Negative / BRULE-06)",
    precondition: "Chuyến xe đang chạy trên đường (in_progress)",
    steps: "1. Khách bấm hủy chuyến trên app",
    data: "Ride status: in_progress",
    expected: "Hệ thống từ chối HTTP 400: 'Không thể hủy chuyến xe khi đang trong hành trình'",
    priority: "High",
    fr: "FR-RIDE-07"
  },
  {
    id: "TC-RID-017",
    scenario: "Hủy chuyến khi xe đang đến",
    name: "Khách hủy khi tài xế đang chạy đến đón (Exception EX-04)",
    precondition: "Tài xế đang chạy đến đón (status = accepted)",
    steps: "1. Khách bấm Hủy cuốc\n2. Server xử lý thông báo tài xế",
    data: "Khách bấm Hủy",
    expected: "Tài xế nhận âm thanh báo khách hủy kèm lý do, tự động chuyển về available ngay lập tức",
    priority: "High",
    fr: "FR-RIDE-07"
  },
  {
    id: "TC-RID-018",
    scenario: "Khách không xuất hiện No-Show",
    name: "Tài xế hủy do khách không ra sau đúng 5 phút 01 giây (Positive / Boundary / EX-05)",
    precondition: "Tài xế đã bấm driver_arrived được 5 phút 01 giây (>= 5 phút)",
    steps: "1. Bấm 'Hủy cuốc do khách không xuất hiện'\n2. Xác nhận",
    data: "Thời gian chờ = 301 giây",
    expected: "Ride chuyển 'cancelled_by_driver (No-Show)', tài xế không bị phạt tỷ lệ hủy, chuyển về available",
    priority: "High",
    fr: "FR-RIDE-08"
  },
  {
    id: "TC-RID-019",
    scenario: "Khách không xuất hiện No-Show",
    name: "Tài xế cố hủy No-Show ở mốc 4 phút 59 giây - Dưới ngưỡng (Negative / Boundary / EX-05)",
    precondition: "Tài xế bấm driver_arrived được 4 phút 59 giây (< 5 phút)",
    steps: "1. Bấm 'Hủy cuốc do khách không xuất hiện'",
    data: "Thời gian chờ = 299 giây",
    expected: "Hệ thống từ chối HTTP 400: 'Bạn cần chờ tối thiểu 5 phút (còn 1 giây)'",
    priority: "High",
    fr: "FR-RIDE-08"
  },
  {
    id: "TC-RID-020",
    scenario: "Sự cố tai nạn giữa đường",
    name: "Xe hỏng / va chạm giữa hành trình, tài xế báo sự cố khẩn (Exception EX-06)",
    precondition: "Chuyến xe đang ở in_progress",
    steps: "1. Tài xế bấm 'Báo cáo sự cố khẩn cấp'\n2. Chọn 'Xe hỏng hóc giữa đường'",
    data: "Incident: Vehicle Breakdown",
    expected: "Ride chuyển 'interrupted_by_incident', tính tiền đoạn đã đi, gửi cảnh báo ưu tiên điều xe khác cho khách",
    priority: "High",
    fr: "FR-RIDE-08"
  },
  {
    id: "TC-RID-021",
    scenario: "Lịch sử chuyến đi",
    name: "Khách hàng xem danh sách lịch sử các chuyến xe đã đi (Positive)",
    precondition: "Khách hàng đã đăng nhập, đã hoàn thành nhiều chuyến xe",
    steps: "1. Gửi request GET /api/v1/rides/history?page=1&limit=10",
    data: "Customer Token",
    expected: "HTTP 200 OK, phân trang danh sách các chuyến xe có điểm đón, điểm trả, giá tiền, ngày giờ",
    priority: "Medium",
    fr: "FR-RIDE-09"
  },
  {
    id: "TC-RID-022",
    scenario: "Lịch sử chuyến đi",
    name: "Xem chi tiết một chuyến xe cụ thể của mình (Positive)",
    precondition: "Chuyến xe tồn tại trong hệ thống",
    steps: "1. Gửi request GET /api/v1/rides/:id",
    data: "Ride ID hợp lệ",
    expected: "HTTP 200 OK, trả về chi tiết lộ trình, thông tin tài xế, biển số xe và cước phí",
    priority: "Medium",
    fr: "FR-RIDE-09"
  },
  {
    id: "TC-RID-023",
    scenario: "Lịch sử chuyến đi",
    name: "Khách hàng cố tình xem chi tiết chuyến xe của người khác (Negative / Security)",
    precondition: "Khách A đăng nhập, lấy ID cuốc xe của Khách B",
    steps: "1. Khách A gọi GET /api/v1/rides/{rideId_of_Khach_B}",
    data: "Token Khách A, Ride của Khách B",
    expected: "Hệ thống chặn HTTP 403 Forbidden: 'Bạn không có quyền truy cập thông tin chuyến đi này'",
    priority: "High",
    fr: "FR-RIDE-09"
  }
];

allTestCases.push(...m3Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC03_Ride_Lifecycle.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 3: ĐẶT XE & VÒNG ĐỜI CHUYẾN ĐI (RIDE LIFECYCLE)',
    'Bao phủ: FR-RIDE-01 đến FR-RIDE-09 | AC-BOOK, AC-RIDE, AC-CNC | BRULE-01, 05, 06 | EX-04, 05, 06, 10',
    m3Rows
  ),
  'utf8'
);
console.log(`Generated TC03_Ride_Lifecycle.md: ${m3Rows.length} test cases`);

// ==========================================
// MODULE 4: MATCHING ENGINE (18 TCs)
// ==========================================
const m4Rows = [
  {
    id: "TC-MAT-001",
    scenario: "Quét tài xế 5km",
    name: "Tìm thấy tài xế available trong bán kính 5km cùng loại xe (Positive / BRULE-02)",
    precondition: "Tài xế A đang available, cách điểm đón 2km, xe sedan",
    steps: "1. Khách đặt xe sedan\n2. Hệ thống thực hiện quét tìm kiếm không gian 2dsphere",
    data: "Khoảng cách: 2km (<= 5km), Driver status: available, Loại xe: sedan",
    expected: "Tài xế A được đưa vào danh sách ứng viên ghép nối, HTTP 200",
    priority: "High",
    fr: "FR-MATCH-01"
  },
  {
    id: "TC-MAT-002",
    scenario: "Quét tài xế 5km",
    name: "Tài xế ở khoảng cách đúng biên 4.99km (Positive / Boundary)",
    precondition: "Tài xế ở cách điểm đón 4.99km (< 5.0km)",
    steps: "1. Hệ thống quét 2dsphere",
    data: "Distance = 4.99km",
    expected: "Hợp lệ, tài xế được đưa vào pool phân bổ cuốc",
    priority: "High",
    fr: "FR-MATCH-01"
  },
  {
    id: "TC-MAT-003",
    scenario: "Quét tài xế 5km",
    name: "Loại bỏ tài xế ở khoảng cách 5.01km ngoài bán kính (Negative / Boundary)",
    precondition: "Tài xế cách 5.01km (> 5.0km)",
    steps: "1. Hệ thống quét 2dsphere",
    data: "Distance = 5.01km",
    expected: "Bị loại trừ, không nhận được thông báo cuốc xe",
    priority: "High",
    fr: "FR-MATCH-01"
  },
  {
    id: "TC-MAT-004",
    scenario: "Quét tài xế 5km",
    name: "Loại bỏ tài xế khác loại xe yêu cầu (Negative)",
    precondition: "Khách đặt xe SUV 7 chỗ, Tài xế C cách 1km nhưng chạy xe Sedan 4 chỗ",
    steps: "1. Hệ thống lọc danh sách tài xế theo loại xe",
    data: "Khách yêu cầu: SUV, Xe tài xế: Sedan",
    expected: "Tài xế C bị loại, không nhận được thông báo cuốc",
    priority: "High",
    fr: "FR-MATCH-01"
  },
  {
    id: "TC-MAT-005",
    scenario: "Xếp hạng ưu tiên",
    name: "Ưu tiên gửi cuốc cho tài xế có khoảng cách gần nhất (Positive / BRULE-02)",
    precondition: "Tài xế A cách 1.2km (4.8★), Tài xế B cách 3.0km (5.0★)",
    steps: "1. Hệ thống tính điểm xếp hạng theo khoảng cách\n2. Phân bổ cuốc",
    data: "Khoảng cách A: 1.2km < B: 3.0km",
    expected: "Cuốc xe được gửi duy nhất tới máy Tài xế A trước",
    priority: "High",
    fr: "FR-MATCH-02"
  },
  {
    id: "TC-MAT-006",
    scenario: "Xếp hạng ưu tiên",
    name: "Khi khoảng cách bằng nhau, ưu tiên tài xế có rating cao hơn (Boundary / BRULE-02)",
    precondition: "Tài xế A cách 2.0km (4.5★), Tài xế B cách 2.0km (4.9★)",
    steps: "1. So sánh khoảng cách (bằng nhau)\n2. So sánh Rating",
    data: "Distance A = B = 2.0km; Rating B (4.9) > A (4.5)",
    expected: "Tài xế B được chọn gửi yêu cầu trước Tài xế A",
    priority: "Medium",
    fr: "FR-MATCH-02"
  },
  {
    id: "TC-MAT-007",
    scenario: "Đếm ngược 30 giây",
    name: "Hiển thị popup nhận cuốc kèm đồng hồ đếm ngược 30s trên app tài xế (Positive)",
    precondition: "Cuốc xe được phân bổ cho tài xế",
    steps: "1. Server phát sự kiện socket tới tài xế\n2. App tài xế hiển thị popup",
    data: "Thời gian đếm ngược: 30 giây",
    expected: "Popup rung chuông, đếm ngược từ 30 về 0, hiển thị điểm đón và giá cước",
    priority: "High",
    fr: "FR-MATCH-03"
  },
  {
    id: "TC-MAT-008",
    scenario: "Chấp nhận cuốc (Atomic Lock)",
    name: "Tài xế chấp nhận cuốc xe thành công trong vòng 30 giây (Positive / EX-08)",
    precondition: "Đồng hồ đang đếm ở giây thứ 15",
    steps: "1. Tài xế bấm nút 'Chấp nhận'",
    data: "Thời gian phản hồi: 15s (< 30s)",
    expected: "Ride status='accepted', driverId được gán, tài xế chuyển status='busy', thông báo cho khách trong < 1s",
    priority: "High",
    fr: "FR-MATCH-04"
  },
  {
    id: "TC-MAT-009",
    scenario: "Chấp nhận cuốc (Atomic Lock)",
    name: "Tài xế bấm nhận ở giây thứ 29.9 - Sát ngưỡng biên (Positive / Boundary)",
    precondition: "Đồng hồ đếm ngược còn 0.1 giây",
    steps: "1. Tài xế bấm Chấp nhận",
    data: "Thời gian = 29.9 giây",
    expected: "Yêu cầu đến trước khi timer server đóng, nhận cuốc thành công",
    priority: "Medium",
    fr: "FR-MATCH-04"
  },
  {
    id: "TC-MAT-010",
    scenario: "Chấp nhận cuốc (Atomic Lock)",
    name: "Chống tranh chấp cuốc xe đồng thời - Race Condition (Negative / Concurrency / EX-08)",
    precondition: "Hai tài xế bấm nhận cùng 1 mili-giây",
    steps: "1. Sử dụng Atomic Update FindOneAndUpdate có điều kiện status='searching'",
    data: "Concurrent requests",
    expected: "Chỉ duy nhất 1 tài xế nhận thành công, tài xế còn lại nhận thông báo 'Cuốc xe đã được tài xế khác tiếp nhận'",
    priority: "High",
    fr: "FR-MATCH-04"
  },
  {
    id: "TC-MAT-011",
    scenario: "Timeout & Xoay vòng",
    name: "Tài xế chủ động bấm từ chối cuốc xe (Positive)",
    precondition: "Tài xế 1 bấm 'Từ chối'",
    steps: "1. Tài xế 1 bấm từ chối\n2. Hệ thống ghi nhận và xoay vòng",
    data: "Tài xế 1: Bấm Từ chối, retryCount tăng 1",
    expected: "Popup trên máy 1 đóng lại, yêu cầu chuyển ngay sang Tài xế 2 trong danh sách",
    priority: "High",
    fr: "FR-MATCH-05"
  },
  {
    id: "TC-MAT-012",
    scenario: "Timeout & Xoay vòng",
    name: "Tài xế không phản hồi sau 30 giây - Timeout (Exception EX-02)",
    precondition: "Tài xế không bấm gì, đồng hồ đếm về 0",
    steps: "1. Hết 30 giây timeout",
    data: "Timeout = 30s",
    expected: "Hệ thống tự động hủy lượt trên máy tài xế đó, retryCount tăng 1, gửi sang tài xế tiếp theo",
    priority: "High",
    fr: "FR-MATCH-05"
  },
  {
    id: "TC-MAT-013",
    scenario: "Timeout & Xoay vòng",
    name: "Tài xế bấm nhận ở giây thứ 31 sau khi đã timeout (Negative / Boundary)",
    precondition: "Đã quá 30 giây trên server",
    steps: "1. Tài xế bấm Chấp nhận muộn",
    data: "Thời gian = 31 giây",
    expected: "Server từ chối HTTP 400: 'Đã hết thời gian chấp nhận cuốc xe này'",
    priority: "High",
    fr: "FR-MATCH-05"
  },
  {
    id: "TC-MAT-014",
    scenario: "Số lần thử lại",
    name: "Hệ thống xoay vòng ở lượt thử thứ 4 (Boundary / BRULE-03)",
    precondition: "Đã có 3 tài xế từ chối (retryCount = 3)",
    steps: "1. Xoay vòng tiếp",
    data: "retryCount = 4 (< 5)",
    expected: "Tiếp tục gửi yêu cầu cho tài xế thứ 4 trong khu vực",
    priority: "Medium",
    fr: "FR-MATCH-05"
  },
  {
    id: "TC-MAT-015",
    scenario: "Hết lượt tìm kiếm",
    name: "Kết thúc tìm kiếm và báo không có tài xế sau 5 lượt thử thất bại (Positive / Exception EX-01 / EX-02)",
    precondition: "Đã thử qua 5 tài xế (retryCount = 5) đều từ chối hoặc timeout",
    steps: "1. Tài xế thứ 5 timeout\n2. Hệ thống kiểm tra retryCount >= 5",
    data: "retryCount = 5",
    expected: "Ride status chuyển 'no_driver', gửi thông báo xin lỗi khách hàng, dừng tiến trình tìm xe",
    priority: "High",
    fr: "FR-MATCH-06"
  },
  {
    id: "TC-MAT-016",
    scenario: "Không có tài xế ban đầu",
    name: "Khu vực đặt xe không có tài xế nào trực tuyến trong 5km (Positive / Exception EX-01)",
    precondition: "Không có tài xế nào online trong bán kính 5km",
    steps: "1. Khách xác nhận đặt xe\n2. Hệ thống quét 2dsphere",
    data: "Số tài xế tìm thấy = 0",
    expected: "Sau thời gian chờ quét 15s, chuyển status 'no_driver', thông báo: 'Hiện không có xe gần bạn'",
    priority: "High",
    fr: "FR-MATCH-06"
  },
  {
    id: "TC-MAT-017",
    scenario: "Thuật toán ghép xe",
    name: "Tài xế đã từ chối không bị gửi lại cuốc trong cùng 1 phiên tìm kiếm (Negative)",
    precondition: "Tài xế A vừa bấm từ chối cuốc RIDE_01",
    steps: "1. Hệ thống tiếp tục xoay vòng",
    data: "ExcludedDrivers: [Driver_A]",
    expected: "Tài xế A nằm trong danh sách loại trừ của cuốc RIDE_01, không bị spam lại",
    priority: "Medium",
    fr: "FR-MATCH-05"
  },
  {
    id: "TC-MAT-018",
    scenario: "Thuật toán ghép xe",
    name: "Tài xế mất sóng mạng đột ngột khi cuốc xe vừa gửi tới (Exception EX-03)",
    precondition: "Socket tài xế disconnect ngay lúc nhận cuốc",
    steps: "1. Socket emit error / disconnect",
    data: "Socket disconnected",
    expected: "Server nhận diện ngắt kết nối trong 3s, lập tức chuyển sang tài xế kế tiếp",
    priority: "High",
    fr: "FR-MATCH-05"
  }
];

allTestCases.push(...m4Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC04_Matching_Engine.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 4: THUẬT TOÁN GHÉP NỐI TÀI XẾ (MATCHING ENGINE)',
    'Bao phủ: FR-MATCH-01 đến FR-MATCH-06 | AC-MCH-01, 02, 03 | BRULE-02, 03 | EX-01, 02, 03, 08',
    m4Rows
  ),
  'utf8'
);
console.log(`Generated TC04_Matching_Engine.md: ${m4Rows.length} test cases`);

// ==========================================
// MODULE 5: PAYMENT & PRICING (15 TCs)
// ==========================================
const m5Rows = [
  {
    id: "TC-PAY-001",
    scenario: "Tính cước thực tế",
    name: "Tính cước thực tế theo quãng đường và thời gian di chuyển GPS (Positive / BRULE-01)",
    precondition: "Chuyến xe vừa hoàn thành, Sedan (Base 15k, 12k/km, 1k/min)",
    steps: "1. Hệ thống chốt số liệu GPS thực tế: 8.5km và 22 phút\n2. Áp dụng công thức BRULE-01",
    data: "d = 8.5km, t = 22 phút, xe: sedan",
    expected: "Cước = 15.000 + (8.5 * 12.000) + (22 * 1.000) = 139.000 VNĐ, lưu vào actualFare của Ride",
    priority: "High",
    fr: "FR-PAY-01"
  },
  {
    id: "TC-PAY-002",
    scenario: "Tính cước thực tế",
    name: "Tính cước thực tế cuốc xe tắc đường - thời gian di chuyển dài (Positive)",
    precondition: "Lộ trình ngắn 3km nhưng kẹt xe mất 45 phút",
    steps: "1. Tính cước xe Sedan",
    data: "d = 3.0km, t = 45 phút",
    expected: "Cước = 15.000 + (3 * 12.000) + (45 * 1.000) = 96.000 VNĐ, tính đủ phí thời gian chờ kẹt xe",
    priority: "Medium",
    fr: "FR-PAY-01"
  },
  {
    id: "TC-PAY-003",
    scenario: "Tính cước thực tế",
    name: "Cước thực tế quãng đường siêu ngắn làm tròn lên giá BaseFare (Boundary / BRULE-01)",
    precondition: "Khách đi 200m thì xuống xe, thời gian 1 phút",
    steps: "1. Tính cước",
    data: "d = 0.2km, t = 1 phút",
    expected: "Cước tính toán < 15.000 -> Tự động làm tròn lên đúng BaseFare = 15.000 VNĐ",
    priority: "Medium",
    fr: "FR-PAY-01"
  },
  {
    id: "TC-PAY-004",
    scenario: "Cấu hình giá cước",
    name: "Admin cập nhật biểu phí xe SUV thành công (Positive)",
    precondition: "Đăng nhập tài khoản role Admin",
    steps: "1. Vào Quản trị Giá cước\n2. Nhập biểu phí mới cho SUV\n3. Nhấn Lưu",
    data: "{ \"baseFare\": 20000, \"pricePerKm\": 15000, \"pricePerMin\": 1500 }",
    expected: "Bảng PricingConfigs được cập nhật, ghi 1 bản ghi vào AuditLogs (BRULE-10), HTTP 200 OK",
    priority: "High",
    fr: "FR-PAY-02"
  },
  {
    id: "TC-PAY-005",
    scenario: "Cấu hình giá cước",
    name: "Chặn cập nhật giá cước với số tiền âm hoặc bằng 0 (Negative / Boundary)",
    precondition: "Đăng nhập Admin",
    steps: "1. Nhập baseFare = -5000\n2. Nhấn Lưu",
    data: "baseFare = -5000",
    expected: "Báo lỗi validation HTTP 400: 'Giá cước cơ sở phải lớn hơn 0'",
    priority: "High",
    fr: "FR-PAY-02"
  },
  {
    id: "TC-PAY-006",
    scenario: "Cấu hình giá cước",
    name: "Operator cố tình sửa giá cước bị chặn phân quyền (Negative / Security / BRULE-09)",
    precondition: "Đăng nhập tài khoản role Operator",
    steps: "1. Gửi request PUT /api/v1/payments/pricing/sedan",
    data: "Role: operator",
    expected: "Hệ thống chặn HTTP 403 Forbidden: 'Chỉ Admin mới có quyền cập nhật biểu phí'",
    priority: "High",
    fr: "FR-PAY-02"
  },
  {
    id: "TC-PAY-007",
    scenario: "Thanh toán Tiền mặt",
    name: "Tài xế xác nhận đã nhận đủ tiền mặt từ khách (Positive / BRULE-07)",
    precondition: "Cuốc xe hoàn thành cước phí 100.000 VNĐ, phương thức tiền mặt",
    steps: "1. Khách trả tiền mặt cho tài xế\n2. Tài xế bấm nút 'Xác nhận đã nhận tiền'",
    data: "Ride ID hợp lệ, Driver Token",
    expected: "Payment status chuyển 'COMPLETED', ghi nhận paidAt, tài xế chuyển về available, mở màn hình đánh giá",
    priority: "High",
    fr: "FR-PAY-03"
  },
  {
    id: "TC-PAY-008",
    scenario: "Thanh toán Tiền mặt",
    name: "Tài xế cố xác nhận tiền mặt cho cuốc thanh toán điện tử (Negative)",
    precondition: "Cuốc xe cấu hình thanh toán thẻ",
    steps: "1. Tài xế gửi API cash-confirm",
    data: "Ride paymentMethod = 'e_payment'",
    expected: "Từ chối HTTP 400: 'Cuốc xe này được thanh toán qua thẻ/ví điện tử'",
    priority: "High",
    fr: "FR-PAY-04"
  },
  {
    id: "TC-PAY-009",
    scenario: "Thanh toán Tiền mặt",
    name: "Chặn xác nhận tiền mặt 2 lần trên cùng 1 cuốc xe (Negative)",
    precondition: "Giao dịch đã ở trạng thái COMPLETED",
    steps: "1. Tài xế bấm lại nút xác nhận tiền mặt",
    data: "Payment status: COMPLETED",
    expected: "Hệ thống từ chối HTTP 400: 'Giao dịch này đã được thanh toán hoàn tất'",
    priority: "Medium",
    fr: "FR-PAY-04"
  },
  {
    id: "TC-PAY-010",
    scenario: "Thanh toán Điện tử",
    name: "Khách hàng thanh toán qua Cổng thanh toán điện tử thành công (Positive)",
    precondition: "Khách chọn thanh toán qua Thẻ/Ví, cuốc xe completed",
    steps: "1. Nhấn nút 'Thanh toán ngay'\n2. Cổng thanh toán xử lý thành công",
    data: "Số tiền: 139.000 VNĐ, Cổng trả về transactionId: TXN_20260910_01",
    expected: "Payment status chuyển 'COMPLETED', lưu transactionId, gửi email biên lai, HTTP 200 OK",
    priority: "High",
    fr: "FR-PAY-05"
  },
  {
    id: "TC-PAY-011",
    scenario: "Sự cố Thanh toán",
    name: "Xử lý thanh toán điện tử thất bại do tài khoản không đủ số dư (Exception EX-07)",
    precondition: "Thẻ khách hàng không đủ tiền thanh toán",
    steps: "1. Cổng thanh toán trả về lỗi 'Insufficient Balance'",
    data: "Mã lỗi cổng: ERR_BALANCE",
    expected: "Payment status chuyển 'FAILED', app hiển thị lựa chọn cho khách: 'Nhập thẻ khác' hoặc 'Đổi sang Tiền mặt'",
    priority: "High",
    fr: "FR-PAY-06"
  },
  {
    id: "TC-PAY-012",
    scenario: "Sự cố Thanh toán",
    name: "Chuyển sang tiền mặt khi thanh toán thẻ thất bại (Positive / Exception EX-07)",
    precondition: "Payment vừa FAILED ở bước thanh toán thẻ",
    steps: "1. Khách bấm 'Chuyển sang trả Tiền mặt'\n2. Tài xế nhận tiền và bấm xác nhận",
    data: "Chuyển method: cash",
    expected: "Payment cập nhật method sang 'cash', chuyển COMPLETED khi tài xế xác nhận thu tiền",
    priority: "High",
    fr: "FR-PAY-06"
  },
  {
    id: "TC-PAY-013",
    scenario: "Hóa đơn điện tử",
    name: "Xuất hóa đơn điện tử cho chuyến đi đã thanh toán (Positive)",
    precondition: "Chuyến đi đã hoàn thành và thanh toán COMPLETED",
    steps: "1. Gửi request GET /api/v1/payments/:rideId/invoice",
    data: "Ride ID hợp lệ",
    expected: "HTTP 200 OK, trả về chi tiết hóa đơn gồm tiền cước, thuế VAT 10%, mã giao dịch, thông tin xe",
    priority: "Medium",
    fr: "FR-PAY-07"
  },
  {
    id: "TC-PAY-014",
    scenario: "Hóa đơn điện tử",
    name: "Yêu cầu xuất hóa đơn cho cuốc xe chưa hoàn thành (Negative)",
    precondition: "Cuốc xe đang in_progress",
    steps: "1. Gửi request lấy hóa đơn",
    data: "Ride status: in_progress",
    expected: "Từ chối HTTP 400: 'Chuyến xe chưa hoàn thành và chưa thanh toán, không thể xuất hóa đơn'",
    priority: "Medium",
    fr: "FR-PAY-07"
  },
  {
    id: "TC-PAY-015",
    scenario: "Bảo mật thanh toán",
    name: "Kiểm tra hệ thống không lưu số thẻ và CVV (Security / NFR-SEC-04)",
    precondition: "Giao dịch thanh toán thẻ vừa hoàn tất",
    steps: "1. Truy vấn trực tiếp bản ghi Payment trong MongoDB",
    data: "Payment Record",
    expected: "Chỉ lưu transactionId, amount, method, status. Hoàn toàn không có card_number, cvv",
    priority: "High",
    fr: "FR-PAY-05"
  }
];

allTestCases.push(...m5Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC05_Payment_Pricing.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 5: TÍNH CƯỚC & THANH TOÁN (PAYMENT & PRICING)',
    'Bao phủ: FR-PAY-01 đến FR-PAY-07 | AC-PAY-01, AC-PAY-02, AC-ADM-02 | BRULE-01, 07 | EX-07',
    m5Rows
  ),
  'utf8'
);
console.log(`Generated TC05_Payment_Pricing.md: ${m5Rows.length} test cases`);

// ==========================================
// MODULE 6: TRACKING & GPS (11 TCs)
// ==========================================
const m6Rows = [
  {
    id: "TC-TRK-001",
    scenario: "Cập nhật GPS",
    name: "Tài xế gửi tọa độ GPS định kỳ 5-10s hợp lệ (Positive)",
    precondition: "Tài xế đang online hoặc đang trong cuốc xe",
    steps: "1. Thiết bị tài xế phát sự kiện socket 'driver:locationUpdate'",
    data: "{ \"lat\": 10.762622, \"lng\": 106.660172, \"bearing\": 90, \"speed\": 35 }",
    expected: "currentLocation trong DriverProfile được cập nhật dạng GeoJSON Point, độ trễ < 1.5s",
    priority: "High",
    fr: "FR-TRACK-01"
  },
  {
    id: "TC-TRK-002",
    scenario: "Cập nhật GPS",
    name: "Chặn cập nhật GPS với tọa độ ngoài giới hạn địa lý (Negative / Boundary)",
    precondition: "Tài xế phát socket",
    steps: "1. Gửi tọa độ lat > 90 hoặc lng > 180",
    data: "{ \"lat\": 195.0, \"lng\": 250.0 }",
    expected: "Hệ thống từ chối cập nhật tọa độ không hợp lệ, ngắt packet rác",
    priority: "Medium",
    fr: "FR-TRACK-01"
  },
  {
    id: "TC-TRK-003",
    scenario: "Cập nhật GPS",
    name: "Tọa độ GPS tại các mốc biên cực hạn địa cầu (Boundary)",
    precondition: "Tọa độ hợp lệ ở cận biên",
    steps: "1. Gửi tọa độ lat = 90.0 (Bắc Cực), lng = 180.0",
    data: "{ \"lat\": 90.0, \"lng\": 180.0 }",
    expected: "Dữ liệu hợp lệ theo chuẩn GeoJSON WGS84, lưu DB không lỗi",
    priority: "Low",
    fr: "FR-TRACK-01"
  },
  {
    id: "TC-TRK-004",
    scenario: "Mất sóng GPS",
    name: "Mất tín hiệu GPS / Mạng trong 3 phút, client đệm tọa độ (Exception EX-03)",
    precondition: "Tài xế đi vào hầm đường bộ mất mạng 3 phút",
    steps: "1. Mất mạng 3 phút (< 5 phút grace period)\n2. Xe ra khỏi hầm có mạng trở lại\n3. Client gửi sync bù tọa độ",
    data: "Offline duration: 3 phút",
    expected: "Hệ thống nhận gói tin bù, vẽ lại lộ trình liên tục, cuốc xe không bị gián đoạn",
    priority: "High",
    fr: "FR-TRACK-01"
  },
  {
    id: "TC-TRK-005",
    scenario: "Mất sóng GPS",
    name: "Mất tín hiệu GPS quá 5 phút, cảnh báo trên Operator Dashboard (Exception EX-03)",
    precondition: "Không có tín hiệu GPS từ tài xế trong suốt 5 phút 30 giây",
    steps: "1. Server kiểm tra lastLocationUpdate > 5 phút",
    data: "Last ping: 330 giây trước",
    expected: "Cuốc xe được gắn cờ cảnh báo đỏ trên Dashboard Operator để nhân viên gọi điện hỗ trợ",
    priority: "High",
    fr: "FR-TRACK-01"
  },
  {
    id: "TC-TRK-006",
    scenario: "Theo dõi xe trực tuyến",
    name: "Khách hàng nhận tọa độ xe di chuyển real-time trên bản đồ (Positive / AC-TRK-02)",
    precondition: "Khách hàng tham gia room socket 'ride_{rideId}'",
    steps: "1. Tài xế phát locationUpdate\n2. Server broadcast tới room chuyến xe",
    data: "Room: ride_60b8d295f1d2c72b8c5e6f50",
    expected: "App khách hàng nhận sự kiện và biểu tượng xe di chuyển mượt mà trên bản đồ",
    priority: "High",
    fr: "FR-TRACK-02"
  },
  {
    id: "TC-TRK-007",
    scenario: "Theo dõi xe trực tuyến",
    name: "Khách hàng cố tình nghe trộm room socket cuốc xe của người khác (Negative / Security)",
    precondition: "Khách A kết nối socket",
    steps: "1. Khách A emit 'customer:trackDriver' với rideId của Khách B",
    data: "Token Khách A, Ride Khách B",
    expected: "Server kiểm tra quyền sở hữu chuyến đi, từ chối cho join room",
    priority: "High",
    fr: "FR-TRACK-02"
  },
  {
    id: "TC-TRK-008",
    scenario: "Tính lại ETA",
    name: "Tự động tính lại thời gian dự kiến đến (ETA) theo vị trí mới (Positive)",
    precondition: "Tài xế đang di chuyển tới điểm đón khách",
    steps: "1. Vị trí xe cập nhật tiến gần điểm đón từ 3km còn 1km\n2. Hệ thống tính lại ETA",
    data: "Khoảng cách còn lại: 1.0km",
    expected: "ETA cập nhật giảm từ 8 phút xuống còn 3 phút trên app khách hàng",
    priority: "Medium",
    fr: "FR-TRACK-03"
  },
  {
    id: "TC-TRK-009",
    scenario: "Tính lại ETA",
    name: "ETA tăng do tài xế đi lạc hoặc gặp tắc đường (Positive)",
    precondition: "Tài xế đi lệch khỏi lộ trình đề xuất",
    steps: "1. Xe đi xa điểm đón hơn\n2. Tính lại ETA",
    data: "Distance tăng từ 1km lên 2km",
    expected: "ETA tự động tăng và hiển thị cảnh báo tài xế đang đi đường vòng",
    priority: "Low",
    fr: "FR-TRACK-03"
  },
  {
    id: "TC-TRK-010",
    scenario: "Bản đồ Operator",
    name: "Operator xem toàn bộ xe online trên bản đồ giám sát trung tâm (Positive / AC-ADM-03)",
    precondition: "Đăng nhập tài khoản role Operator/Admin",
    steps: "1. Gửi GET /api/v1/tracking/live",
    data: "Role: operator",
    expected: "HTTP 200 OK, trả về danh sách tất cả tài xế online kèm tọa độ GPS và trạng thái (available/busy)",
    priority: "High",
    fr: "FR-TRACK-04"
  },
  {
    id: "TC-TRK-011",
    scenario: "Bản đồ Operator",
    name: "Người dùng thường cố tình gọi API theo dõi toàn cảnh xe (Negative / Security)",
    precondition: "Đăng nhập tài khoản role Customer",
    steps: "1. Gửi GET /api/v1/tracking/live",
    data: "Role: customer",
    expected: "Hệ thống chặn HTTP 403 Forbidden: 'Chỉ Operator hoặc Admin mới có quyền xem bản đồ trực tuyến'",
    priority: "High",
    fr: "FR-TRACK-04"
  }
];

allTestCases.push(...m6Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC06_Tracking_GPS.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 6: ĐỊNH VỊ GPS & THEO DÕI REAL-TIME (TRACKING)',
    'Bao phủ: FR-TRACK-01 đến FR-TRACK-04 | AC-TRK-01, AC-TRK-02, AC-ADM-03 | EX-03 | Chuẩn 8 cột ngang',
    m6Rows
  ),
  'utf8'
);
console.log(`Generated TC06_Tracking_GPS.md: ${m6Rows.length} test cases`);

// ==========================================
// MODULE 7: NOTIFICATION (10 TCs)
// ==========================================
const m7Rows = [
  {
    id: "TC-NOTIF-001",
    scenario: "Thông báo In-App",
    name: "Bắn thông báo đẩy In-app khi tài xế chấp nhận cuốc (Positive)",
    precondition: "Tài xế vừa bấm nhận cuốc xe",
    steps: "1. Server kích hoạt sự kiện thông báo\n2. App khách hàng nhận socket",
    data: "Tiêu đề: 'Đã tìm thấy tài xế!'",
    expected: "Khách hàng nhận popup thông báo tên tài xế, biển số xe và thời gian đến dự kiến",
    priority: "High",
    fr: "FR-NOTIF-01"
  },
  {
    id: "TC-NOTIF-002",
    scenario: "Thông báo In-App",
    name: "Bắn thông báo khi tài xế đến điểm đón và khi cuốc hoàn thành (Positive)",
    precondition: "Cuốc xe đổi trạng thái",
    steps: "1. Đổi status sang driver_arrived và completed",
    data: "Event: ride_update",
    expected: "Khách nhận push notification tương ứng từng mốc sự kiện",
    priority: "Medium",
    fr: "FR-NOTIF-01"
  },
  {
    id: "TC-NOTIF-003",
    scenario: "Thông báo Email",
    name: "Gửi email hóa đơn tự động sau khi thanh toán thành công (Positive)",
    precondition: "Cuốc xe thanh toán hoàn tất",
    steps: "1. Hệ thống tạo hóa đơn\n2. Kích hoạt hàng đợi gửi email nền",
    data: "Email nhận: customer@example.com",
    expected: "Khách hàng nhận được email chứa chi tiết biên lai cước phí trong vòng 30 giây",
    priority: "Medium",
    fr: "FR-NOTIF-02"
  },
  {
    id: "TC-NOTIF-004",
    scenario: "Thông báo Email",
    name: "Máy chủ gửi Email SMTP bị gián đoạn hoạt động (Exception EX-10)",
    precondition: "SMTP mail server bị lỗi kết nối",
    steps: "1. Thanh toán cuốc xe xong\n2. Hệ thống gửi email nhưng SMTP báo lỗi",
    data: "SMTP error",
    expected: "Hệ thống ghi log lỗi ngầm, quy trình thanh toán vẫn hoàn tất 100%, không báo lỗi cho người dùng",
    priority: "High",
    fr: "FR-NOTIF-02"
  },
  {
    id: "TC-NOTIF-005",
    scenario: "Hộp thư thông báo",
    name: "Người dùng xem danh sách thông báo cá nhân (Positive)",
    precondition: "Đã đăng nhập",
    steps: "1. Mở màn hình Chuông thông báo (GET /api/v1/notifications)",
    data: "User Token",
    expected: "HTTP 200 OK, trả về danh sách thông báo phân trang, hiển thị rõ tin chưa đọc (isRead=false)",
    priority: "Medium",
    fr: "FR-NOTIF-03"
  },
  {
    id: "TC-NOTIF-006",
    scenario: "Hộp thư thông báo",
    name: "Phân trang thông báo ở trang không có dữ liệu (Boundary)",
    precondition: "Tổng cộng có 15 thông báo, mỗi trang 10 tin",
    steps: "1. Gọi GET /api/v1/notifications?page=99&limit=10",
    data: "page = 99",
    expected: "HTTP 200 OK, trả về mảng rỗng data: [], không bị crash lỗi server",
    priority: "Low",
    fr: "FR-NOTIF-03"
  },
  {
    id: "TC-NOTIF-007",
    scenario: "Đánh dấu đã đọc",
    name: "Đánh dấu 1 thông báo cụ thể là đã đọc (Positive)",
    precondition: "Có thông báo chưa đọc",
    steps: "1. Bấm vào thông báo để xem chi tiết",
    data: "PUT /api/v1/notifications/:id/read",
    expected: "isRead chuyển sang true, số lượng badge thông báo chưa đọc giảm 1, HTTP 200 OK",
    priority: "Low",
    fr: "FR-NOTIF-04"
  },
  {
    id: "TC-NOTIF-008",
    scenario: "Đánh dấu đã đọc",
    name: "Đánh dấu tất cả thông báo là đã đọc (Positive)",
    precondition: "Có nhiều thông báo chưa đọc",
    steps: "1. Nhấn nút 'Đánh dấu đã đọc tất cả'",
    data: "PUT /api/v1/notifications/read-all",
    expected: "Toàn bộ thông báo của user chuyển isRead=true, badge về 0, HTTP 200 OK",
    priority: "Low",
    fr: "FR-NOTIF-04"
  },
  {
    id: "TC-NOTIF-009",
    scenario: "Đánh dấu đã đọc",
    name: "Cố tình đánh dấu đã đọc thông báo của người khác (Negative / Security)",
    precondition: "User A đăng nhập, gửi request đọc thông báo của User B",
    steps: "1. Gửi PUT /api/v1/notifications/{id_cua_user_B}/read",
    data: "Token User A, Notif ID của User B",
    expected: "Hệ thống từ chối HTTP 403 / 404: 'Không tìm thấy thông báo thuộc về bạn'",
    priority: "High",
    fr: "FR-NOTIF-04"
  },
  {
    id: "TC-NOTIF-010",
    scenario: "Kênh thông báo mở rộng",
    name: "Kiểm tra kiến trúc kênh thông báo hỗ trợ gắn Provider mới (Positive)",
    precondition: "Hệ thống Notification Service",
    steps: "1. Kiểm tra cấu trúc module notification hỗ trợ adapter (Socket, Email, SMS)",
    data: "Type: system",
    expected: "Module điều phối đúng kênh thông báo theo cấu hình",
    priority: "Low",
    fr: "FR-NOTIF-05"
  }
];

allTestCases.push(...m7Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC07_Notification.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 7: TRUNG TÂM THÔNG BÁO (NOTIFICATION)',
    'Bao phủ: FR-NOTIF-01 đến FR-NOTIF-05 | AC-AUTH-01, AC-MCH-02, AC-RIDE-01 | EX-10 | Chuẩn 8 cột ngang',
    m7Rows
  ),
  'utf8'
);
console.log(`Generated TC07_Notification.md: ${m7Rows.length} test cases`);

// ==========================================
// MODULE 8: RATING & REVIEW (11 TCs)
// ==========================================
const m8Rows = [
  {
    id: "TC-RAT-001",
    scenario: "Đánh giá chuyến đi",
    name: "Khách hàng gửi đánh giá 5 sao kèm nhận xét hợp lệ (Positive / BRULE-08)",
    precondition: "Cuốc xe đã completed và thanh toán COMPLETED",
    steps: "1. Mở màn hình Đánh giá\n2. Chọn 5 sao\n3. Nhập nhận xét\n4. Bấm Gửi",
    data: "rating = 5, comment = 'Tài xế lái xe an toàn, lịch sự'",
    expected: "Tạo bản ghi RatingReview, cập nhật rating trung bình tài xế, HTTP 201 Created",
    priority: "High",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-002",
    scenario: "Đánh giá chuyến đi",
    name: "Khách hàng đánh giá 1 sao - Mức thấp nhất hợp lệ (Positive / Boundary)",
    precondition: "Cuốc xe đã hoàn thành",
    steps: "1. Chọn 1 sao\n2. Nhập nhận xét phản ánh\n3. Bấm Gửi",
    data: "rating = 1, comment = 'Tài xế hút thuốc trên xe'",
    expected: "Hệ thống ghi nhận 1 sao, kéo giảm điểm trung bình tài xế, HTTP 201",
    priority: "High",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-003",
    scenario: "Đánh giá chuyến đi",
    name: "Chặn gửi đánh giá với số sao bằng 0 hoặc 6 (Negative / Boundary)",
    precondition: "Cuốc xe đã hoàn thành",
    steps: "1. Gửi request rating = 6 sao hoặc rating = 0 sao",
    data: "rating = 6 (hoặc 0)",
    expected: "Báo lỗi validation HTTP 400: 'Điểm đánh giá phải là số nguyên từ 1 đến 5 sao'",
    priority: "High",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-004",
    scenario: "Đánh giá chuyến đi",
    name: "Độ dài nhận xét đúng 500 ký tự - Cận trên biên (Positive / Boundary)",
    precondition: "Màn hình đánh giá",
    steps: "1. Nhập nhận xét đúng 500 ký tự\n2. Bấm Gửi",
    data: "comment: chuỗi 500 ký tự",
    expected: "Hợp lệ, lưu trọn vẹn nhận xét vào DB, HTTP 201",
    priority: "Medium",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-005",
    scenario: "Đánh giá chuyến đi",
    name: "Nhận xét vượt quá 500 ký tự (Negative / Boundary)",
    precondition: "Màn hình đánh giá",
    steps: "1. Nhập nhận xét 501 ký tự\n2. Bấm Gửi",
    data: "comment: chuỗi 501 ký tự",
    expected: "Báo lỗi validation HTTP 400: 'Nhận xét không được vượt quá 500 ký tự'",
    priority: "Medium",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-006",
    scenario: "Đánh giá chuyến đi",
    name: "Chặn đánh giá 2 lần trên cùng 1 chuyến xe (Negative / BRULE-08 / EX-09)",
    precondition: "Khách hàng đã đánh giá chuyến xe này trước đó",
    steps: "1. Cố tình gửi lại đánh giá lần thứ 2 cho cùng rideId",
    data: "rideId đã có đánh giá",
    expected: "Hệ thống từ chối HTTP 409 Conflict: 'Chuyến đi này đã được đánh giá'",
    priority: "High",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-007",
    scenario: "Đánh giá chuyến đi",
    name: "Chặn gửi đánh giá khi cuốc xe chưa hoàn thành hoặc chưa thanh toán (Negative)",
    precondition: "Cuốc xe đang in_progress",
    steps: "1. Gửi request POST /api/v1/ratings",
    data: "Ride status: in_progress",
    expected: "Từ chối HTTP 400: 'Chỉ được đánh giá sau khi chuyến đi đã hoàn thành và thanh toán'",
    priority: "High",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-008",
    scenario: "Tính lại Rating tài xế",
    name: "Tự động tính lại điểm trung bình tài xế theo công thức tích lũy (Positive / BRULE-08)",
    precondition: "Tài xế đang có 4 lượt đánh giá, điểm TB 4.0. Lượt thứ 5 khách chấm 5 sao.",
    steps: "1. Khách gửi đánh giá 5 sao",
    data: "oldAvg = 4.0, totalReviews = 4, newScore = 5",
    expected: "newAvg = (4.0 * 4 + 5) / 5 = 4.2★, totalReviews tăng lên 5 trong DriverProfile",
    priority: "High",
    fr: "FR-RATE-02"
  },
  {
    id: "TC-RAT-009",
    scenario: "Tính lại Rating tài xế",
    name: "Lượt đánh giá đầu tiên của tài xế mới (Boundary / BRULE-08)",
    precondition: "Tài xế mới tinh, totalReviews = 0, rating = 0",
    steps: "1. Khách đầu tiên đánh giá 5 sao",
    data: "totalReviews = 0, newScore = 5",
    expected: "rating = 5.0★, totalReviews = 1, cập nhật chính xác không bị lỗi chia cho 0",
    priority: "High",
    fr: "FR-RATE-02"
  },
  {
    id: "TC-RAT-010",
    scenario: "Xem nhận xét",
    name: "Tài xế xem danh sách phản hồi và nhận xét của khách hàng (Positive)",
    precondition: "Tài xế đã đăng nhập",
    steps: "1. Gửi GET /api/v1/ratings/my-reviews",
    data: "Driver Token",
    expected: "HTTP 200 OK, trả về danh sách số sao và lời nhận xét của khách hàng",
    priority: "Medium",
    fr: "FR-RATE-03"
  },
  {
    id: "TC-RAT-011",
    scenario: "Xem nhận xét",
    name: "Khách hàng xem điểm rating công khai của tài xế trước khi lên xe (Positive)",
    precondition: "Cuốc xe đã accepted",
    steps: "1. Gửi GET /api/v1/ratings/driver/:driverId",
    data: "driverId hợp lệ",
    expected: "HTTP 200 OK, hiển thị rating 4.8★ và số cuốc đã phục vụ để tạo sự tin tưởng",
    priority: "Low",
    fr: "FR-RATE-03"
  }
];

allTestCases.push(...m8Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC08_Rating_Review.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 8: ĐÁNH GIÁ & PHẢN HỒI (RATING & REVIEW)',
    'Bao phủ: FR-RATE-01 đến FR-RATE-03 | AC-RAT-01 | BRULE-08 | EX-09 | Chuẩn 8 cột ngang Excel',
    m8Rows
  ),
  'utf8'
);
console.log(`Generated TC08_Rating_Review.md: ${m8Rows.length} test cases`);

// ==========================================
// MODULE 9: ADMIN & OPERATIONS (13 TCs)
// ==========================================
const m9Rows = [
  {
    id: "TC-ADM-001",
    scenario: "Dashboard vận hành",
    name: "Admin/Operator xem dashboard chỉ số vận hành ngày (Positive / AC-ADM-03)",
    precondition: "Đăng nhập quyền Admin hoặc Operator",
    steps: "1. Truy cập trang chủ Dashboard (GET /api/v1/admin/dashboard)",
    data: "Admin Token",
    expected: "HTTP 200 OK, hiển thị đúng tổng doanh thu ngày, số cuốc thành công, số tài xế online",
    priority: "High",
    fr: "FR-ADM-01"
  },
  {
    id: "TC-ADM-002",
    scenario: "Quản lý Khách hàng",
    name: "Tìm kiếm khách hàng theo tên hoặc số điện thoại (Positive)",
    precondition: "Trang Quản lý người dùng",
    steps: "1. Nhập từ khóa tìm kiếm '0912345678'\n2. Bấm Tìm kiếm",
    data: "search = '0912345678'",
    expected: "HTTP 200 OK, trả về danh sách khách hàng khớp thông tin",
    priority: "Medium",
    fr: "FR-ADM-02"
  },
  {
    id: "TC-ADM-003",
    scenario: "Quản lý Khách hàng",
    name: "Tìm kiếm với payload SQL/NoSQL Injection độc hại (Negative / Security)",
    precondition: "Trang tìm kiếm khách hàng",
    steps: "1. Nhập payload injection vào ô search",
    data: "search = \"' OR '1'='1\" hoặc { \"$regex\": \".*\" }",
    expected: "Hệ thống sanitize input, xử lý an toàn dưới dạng chuỗi thuần túy, không để lộ dữ liệu",
    priority: "High",
    fr: "FR-ADM-02"
  },
  {
    id: "TC-ADM-004",
    scenario: "Quản lý Tài xế",
    name: "Lọc tài xế theo trạng thái hoạt động available/busy/offline (Positive)",
    precondition: "Trang Quản lý tài xế",
    steps: "1. Chọn bộ lọc status = 'available'\n2. Bấm Lọc",
    data: "GET /api/v1/admin/drivers?status=available",
    expected: "HTTP 200 OK, chỉ hiển thị danh sách các tài xế đang trực tuyến sẵn sàng",
    priority: "Medium",
    fr: "FR-ADM-03"
  },
  {
    id: "TC-ADM-005",
    scenario: "Can thiệp chuyến đi",
    name: "Operator can thiệp hủy chuyến xe lỗi khi tài xế gặp tai nạn (Positive / Exception EX-06)",
    precondition: "Cuốc xe đang in_progress nhưng tài xế gặp sự cố xe hỏng",
    steps: "1. Operator mở chi tiết cuốc xe\n2. Chọn 'Can thiệp: Hủy cưỡng chế'\n3. Nhập lý do\n4. Xác nhận",
    data: "{ \"action\": \"cancel\", \"reason\": \"Tài xế gặp sự cố va chạm giao thông\" }",
    expected: "Ride status chuyển 'cancelled', giải phóng khách hàng đặt xe khác, ghi log AuditLog",
    priority: "High",
    fr: "FR-ADM-04"
  },
  {
    id: "TC-ADM-006",
    scenario: "Can thiệp chuyến đi",
    name: "Can thiệp cuốc xe nhưng không nhập lý do bắt buộc (Negative)",
    precondition: "Màn hình can thiệp cuốc",
    steps: "1. Chọn Hủy cưỡng chế\n2. Bỏ trống ô lý do\n3. Bấm Xác nhận",
    data: "{ \"action\": \"cancel\", \"reason\": \"\" }",
    expected: "Báo lỗi HTTP 400: 'Lý do can thiệp là bắt buộc để lưu kiểm toán'",
    priority: "High",
    fr: "FR-ADM-04"
  },
  {
    id: "TC-ADM-007",
    scenario: "Can thiệp chuyến đi",
    name: "Operator điều phối chuyển cuốc xe sang tài xế khác (Positive / Exception EX-06)",
    precondition: "Cuốc xe bị kẹt do tài xế cũ không di chuyển",
    steps: "1. Operator chọn 'Điều phối lại cuốc xe'\n2. Chọn tài xế mới gần đó",
    data: "{ \"action\": \"reassign\", \"newDriverId\": \"DRV_99\" }",
    expected: "Chuyển driverId sang tài xế mới, thông báo lại cho khách hàng, ghi AuditLog",
    priority: "High",
    fr: "FR-ADM-04"
  },
  {
    id: "TC-ADM-008",
    scenario: "Tra cứu giao dịch",
    name: "Tra cứu đối soát giao dịch thanh toán thành công (Positive)",
    precondition: "Có giao dịch trong tháng",
    steps: "1. Lọc theo status = 'COMPLETED'\n2. Bấm Tra cứu",
    data: "GET /api/v1/admin/payments?status=COMPLETED",
    expected: "HTTP 200 OK, trả về bảng đối soát tài chính chi tiết từng mã thanh toán",
    priority: "Medium",
    fr: "FR-ADM-05"
  },
  {
    id: "TC-ADM-009",
    scenario: "Báo cáo Doanh thu",
    name: "Xuất báo cáo doanh thu tài chính theo khoảng thời gian và loại xe (Positive / AC-ADM-03)",
    precondition: "Có dữ liệu chuyến xe đã thanh toán trong tháng 08/2026",
    steps: "1. Chọn Từ ngày 2026-08-01 đến 2026-08-31\n2. Nhóm theo Ngày\n3. Bấm 'Xem báo cáo'",
    data: "startDate=2026-08-01, endDate=2026-08-31, groupBy=day",
    expected: "HTTP 200 OK, trả về biểu đồ và bảng tổng hợp doanh thu theo từng ngày và phân loại xe",
    priority: "High",
    fr: "FR-ADM-06"
  },
  {
    id: "TC-ADM-010",
    scenario: "Báo cáo Doanh thu",
    name: "Lọc báo cáo với khoảng ngày bắt đầu đúng bằng ngày kết thúc (Positive / Boundary)",
    precondition: "Màn hình Báo cáo",
    steps: "1. Chọn startDate = endDate = '2026-08-15'",
    data: "startDate = '2026-08-15', endDate = '2026-08-15'",
    expected: "Hệ thống tổng hợp chuẩn xác doanh thu riêng trong đúng 1 ngày đó, HTTP 200 OK",
    priority: "Medium",
    fr: "FR-ADM-06"
  },
  {
    id: "TC-ADM-011",
    scenario: "Báo cáo Doanh thu",
    name: "Chặn lọc báo cáo với khoảng thời gian không hợp lệ (Negative)",
    precondition: "Màn hình Báo cáo",
    steps: "1. Chọn startDate = '2026-08-31', endDate = '2026-08-01'\n2. Bấm Xem",
    data: "startDate > endDate",
    expected: "Hệ thống cảnh báo: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc' (HTTP 400)",
    priority: "Medium",
    fr: "FR-ADM-06"
  },
  {
    id: "TC-ADM-012",
    scenario: "Báo cáo Vận hành",
    name: "Xem tỷ lệ hoàn thành cuốc và phân tích lý do hủy cuốc (Positive)",
    precondition: "Màn hình Báo cáo vận hành",
    steps: "1. Gửi GET /api/v1/admin/reports/operations",
    data: "Admin Token",
    expected: "HTTP 200 OK, trả về tỷ lệ hoàn thành %, tỷ lệ hủy bởi khách vs tài xế",
    priority: "High",
    fr: "FR-ADM-07"
  },
  {
    id: "TC-ADM-013",
    scenario: "Hiệu suất tài xế",
    name: "Xem bảng xếp hạng Top 10 tài xế có doanh thu cao nhất (Positive / Boundary)",
    precondition: "Màn hình Báo cáo tài xế",
    steps: "1. Gửi GET /api/v1/admin/reports/drivers?limit=10",
    data: "limit = 10 (cận biên)",
    expected: "HTTP 200 OK, trả về danh sách 10 tài xế có tổng tiền cước cao nhất",
    priority: "Medium",
    fr: "FR-ADM-08"
  }
];

allTestCases.push(...m9Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC09_Admin_Operations.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 9: QUẢN TRỊ VẬN HÀNH & BÁO CÁO (ADMIN & ANALYTICS)',
    'Bao phủ: FR-ADM-01 đến FR-ADM-08 | AC-ADM-01, AC-ADM-03 | EX-06 | Chuẩn 8 cột ngang Excel',
    m9Rows
  ),
  'utf8'
);
console.log(`Generated TC09_Admin_Operations.md: ${m9Rows.length} test cases`);

// ==========================================
// MODULE 10: SECURITY, RBAC & AUDIT (13 TCs)
// ==========================================
const m10Rows = [
  {
    id: "TC-SEC-001",
    scenario: "Phân quyền RBAC",
    name: "Admin truy cập endpoint quản trị cấp cao thành công (Positive / BRULE-09)",
    precondition: "Tài khoản có role = 'admin'",
    steps: "1. Gửi GET /api/v1/admin/audit-logs",
    data: "Token Admin",
    expected: "HTTP 200 OK, truy cập thành công nhật ký kiểm toán",
    priority: "High",
    fr: "FR-SEC-01"
  },
  {
    id: "TC-SEC-002",
    scenario: "Phân quyền RBAC",
    name: "Khách hàng cố tình gọi API Admin bị chặn 403 Forbidden (Negative / Security)",
    precondition: "Tài khoản có role = 'customer'",
    steps: "1. Khách gửi request GET /api/v1/admin/dashboard",
    data: "Token Customer",
    expected: "Hệ thống từ chối HTTP 403 Forbidden: 'Bạn không có quyền truy cập chức năng này'",
    priority: "High",
    fr: "FR-SEC-01"
  },
  {
    id: "TC-SEC-003",
    scenario: "Phân quyền RBAC",
    name: "Tài xế cố tình gọi API duyệt tài xế khác (Negative / Security)",
    precondition: "Tài khoản có role = 'driver'",
    steps: "1. Gọi PUT /api/v1/drivers/{id}/approve",
    data: "Token Driver",
    expected: "Hệ thống chặn HTTP 403 Forbidden: 'Không đủ thẩm quyền phê duyệt'",
    priority: "High",
    fr: "FR-SEC-01"
  },
  {
    id: "TC-SEC-004",
    scenario: "Phân tách quyền",
    name: "Phân tách quyền nghiêm ngặt giữa Operator và Admin (Negative / BRULE-09)",
    precondition: "Tài khoản có role = 'operator'",
    steps: "1. Operator cố tình gọi PUT /api/v1/admin/users/:id/role để đổi quyền",
    data: "Token Operator",
    expected: "Hệ thống chặn HTTP 403 Forbidden: 'Chỉ Super Admin mới có quyền phân quyền người dùng'",
    priority: "High",
    fr: "FR-SEC-02"
  },
  {
    id: "TC-SEC-005",
    scenario: "Phân tách quyền",
    name: "Operator cố tình xem báo cáo doanh thu tài chính mật (Negative / BRULE-09)",
    precondition: "Tài khoản role Operator",
    steps: "1. Gọi GET /api/v1/admin/reports/revenue",
    data: "Token Operator",
    expected: "Hệ thống chặn HTTP 403 Forbidden: 'Chỉ Admin mới có quyền xem báo cáo tài chính'",
    priority: "High",
    fr: "FR-SEC-02"
  },
  {
    id: "TC-SEC-006",
    scenario: "Audit Log bất biến",
    name: "Tự động ghi vết Audit Log khi duyệt hồ sơ tài xế (Positive / BRULE-10)",
    precondition: "Operator bấm duyệt tài xế A",
    steps: "1. Hoàn tất duyệt tài xế\n2. Kiểm tra collection AuditLogs trong DB",
    data: "action: 'APPROVE_DRIVER', entity: 'DriverProfile'",
    expected: "1 bản ghi mới được tạo trong AuditLogs chứa operatorId, timestamp, dữ liệu cũ và mới",
    priority: "High",
    fr: "FR-SEC-03"
  },
  {
    id: "TC-SEC-007",
    scenario: "Audit Log bất biến",
    name: "Tự động ghi vết Audit Log khi Admin cập nhật giá cước (Positive / BRULE-10)",
    precondition: "Admin thay đổi biểu phí",
    steps: "1. Lưu biểu phí mới\n2. Kiểm tra AuditLog",
    data: "action: 'UPDATE_PRICING', entity: 'PricingConfig'",
    expected: "Ghi nhận 1 bản ghi mới lưu rõ oldPrice, newPrice, adminId, timestamp",
    priority: "High",
    fr: "FR-SEC-03"
  },
  {
    id: "TC-SEC-008",
    scenario: "Audit Log bất biến",
    name: "Đảm bảo Audit Log không thể bị xóa hoặc sửa - Append-Only (Negative / Security / BRULE-10)",
    precondition: "Cơ sở dữ liệu MongoDB",
    steps: "1. Cố tình gọi hàm delete/update trên model AuditLog",
    data: "AuditLog.deleteOne()",
    expected: "Model hoặc API chặn thao tác, không cho phép chỉnh sửa nhật ký đã ghi",
    priority: "High",
    fr: "FR-SEC-03"
  },
  {
    id: "TC-SEC-009",
    scenario: "Mã hóa bảo mật",
    name: "Mật khẩu người dùng bắt buộc được mã hóa bằng bcrypt trước khi lưu (Positive / Security)",
    precondition: "Đăng ký tài khoản mới",
    steps: "1. Đăng ký với pass 'Password@123'\n2. Mở trực tiếp MongoDB kiểm tra trường passwordHash",
    data: "Password gốc: Password@123",
    expected: "Trường passwordHash là chuỗi mã hóa $2a$10$... không thể dịch ngược thành plaintext",
    priority: "High",
    fr: "FR-SEC-04"
  },
  {
    id: "TC-SEC-010",
    scenario: "Mã hóa bảo mật",
    name: "Tuyệt đối không lưu trữ thông tin số thẻ tín dụng hoặc mã CVV (Positive / Security / NFR-SEC-04)",
    precondition: "Khách hàng thanh toán online",
    steps: "1. Nhập thông tin thẻ trên Mock Gateway\n2. Kiểm tra DB Payment",
    data: "Card Number, CVV",
    expected: "Database chỉ lưu transactionId của cổng, không có bất kỳ trường nào lưu số thẻ hoặc CVV",
    priority: "High",
    fr: "FR-SEC-04"
  },
  {
    id: "TC-SEC-011",
    scenario: "Bảo mật Token",
    name: "Gọi API với Access Token hết hạn sau 15 phút 01 giây (Negative / Boundary)",
    precondition: "Token được cấp cách đây 15 phút 01 giây (> 15m)",
    steps: "1. Gửi request kèm token hết hạn",
    data: "Expired Access Token",
    expected: "Hệ thống từ chối HTTP 401 Unauthorized: 'Token expired'",
    priority: "High",
    fr: "FR-SEC-01"
  },
  {
    id: "TC-SEC-012",
    scenario: "Bảo mật Token",
    name: "Gọi API với Token bị giả mạo chữ ký (Negative / Security)",
    precondition: "Token bị sửa payload hoặc ký bằng secret key khác",
    steps: "1. Gửi request kèm token giả mạo",
    data: "Tampered JWT",
    expected: "Hệ thống phát hiện chữ ký không khớp, từ chối HTTP 401: 'Invalid token signature'",
    priority: "High",
    fr: "FR-SEC-01"
  },
  {
    id: "TC-SEC-013",
    scenario: "Cách ly lỗi thành phần",
    name: "Cơ chế Circuit Breaker cách ly lỗi cổng thanh toán bên ngoài (Exception EX-10)",
    precondition: "Cổng thanh toán bị sập liên tục 5 request",
    steps: "1. Hệ thống phát hiện lỗi liên tiếp\n2. Trip Circuit Breaker sang OPEN",
    data: "Gateway Outage",
    expected: "Circuit chuyển OPEN, tự động trả lỗi nhanh và ép khách chọn tiền mặt, không làm treo server",
    priority: "High",
    fr: "FR-SEC-05"
  }
];

allTestCases.push(...m10Rows);

fs.writeFileSync(
  path.join(testcaseDir, 'TC10_Security_RBAC_Audit.md'),
  renderMarkdownTable(
    'BẢNG TEST CASES - PHÂN HỆ 10: BẢO MẬT, PHÂN QUYỀN RBAC & AUDIT LOG',
    'Bao phủ: FR-SEC-01 đến FR-SEC-05 | AC-ADM-01, 02 | BRULE-09, 10 | EX-10 | Chuẩn 8 cột ngang Excel',
    m10Rows
  ),
  'utf8'
);
console.log(`Generated TC10_Security_RBAC_Audit.md: ${m10Rows.length} test cases`);

// ==========================================
// EXPORT TO CSV (FOR EXCEL OPENING WITH UTF-8 BOM)
// ==========================================
function escapeCsv(field) {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

let csvContent = '\uFEFF'; // UTF-8 BOM for Excel
csvContent += '"Test Case ID","Test Scenario","Test Case","Preconditions","Test Steps","Test Data","Expected Result","Priority"\n';

allTestCases.forEach(r => {
  csvContent += `${escapeCsv(r.id)},${escapeCsv(r.scenario)},${escapeCsv(r.name)},${escapeCsv(r.precondition)},${escapeCsv(r.steps)},${escapeCsv(r.data)},${escapeCsv(r.expected)},${escapeCsv(r.priority)}\n`;
});

fs.writeFileSync(path.join(testcaseDir, 'TestCase_CAB_System.csv'), csvContent, 'utf8');
console.log(`Generated TestCase_CAB_System.csv: ${allTestCases.length} rows`);

// ==========================================
// UPDATE README.MD
// ==========================================
const readmeContent = `# 📋 KẾ HOẠCH & DANH MỤC TEST CASES HỆ THỐNG CAB SYSTEM
## Nền tảng đặt xe trực tuyến (Online Cab Booking Platform)

- **Sinh viên thực hiện:** Võ Tất Thiện
- **Mã số sinh viên:** 22652711
- **Giai đoạn:** Buổi 3 – Thiết kế & Triển khai Kịch bản Kiểm thử Toàn diện (Comprehensive Test Cases)
- **Định dạng:** Chuẩn bảng ngang 8 cột (Excel Matrix) theo yêu cầu giảng viên
- **File xuất bảng tính:** [\`TestCase_CAB_System.csv\`](./TestCase_CAB_System.csv) *(Mở trực tiếp bằng Microsoft Excel UTF-8)*

---

### 📊 Thống kê Số lượng Test Cases theo Phân hệ (10 Phân hệ - Tổng cộng ${allTestCases.length} TCs)

| Phân hệ | Tên Phân hệ & Phạm vi | File Test Case | Số lượng TC | Đạt chuẩn Phủ |
|:---:|---|---|:---:|:---:|
| **Module 1** | **Xác thực & Người dùng** *(Đăng nhập 20 TCs, Đăng ký, Profile, Đổi pass, Token, Brute-force, NoSQL/XSS)* | [\`TC01_Authentication.md\`](./TC01_Authentication.md) | **38 TCs** | ✅ 100% Positive, Negative, Boundary, Security |
| **Module 2** | **Quản lý Tài xế & Xe** *(Khai báo xe, Online/Offline, Auto busy, Duyệt/Từ chối, Khóa xe, EX-09)* | [\`TC02_Driver_Management.md\`](./TC02_Driver_Management.md) | **17 TCs** | ✅ 100% Positive, Negative, Boundary, EX-09 |
| **Module 3** | **Đặt xe & Vòng đời cuốc** *(Geocode, Cước ước tính, Đặt cuốc, Đến đón, Bắt đầu, Hoàn thành, Hủy cuốc, No-Show, EX-04, 05, 06)* | [\`TC03_Ride_Lifecycle.md\`](./TC03_Ride_Lifecycle.md) | **23 TCs** | ✅ 100% Positive, Negative, Boundary, EX-04..06 |
| **Module 4** | **Thuật toán Ghép nối** *(Quét 5km, Ưu tiên gần/rating, Đếm ngược 30s, Atomic lock, Retry 5 lần, EX-01, 02, 08)* | [\`TC04_Matching_Engine.md\`](./TC04_Matching_Engine.md) | **18 TCs** | ✅ 100% Positive, Negative, Boundary, EX-01..03, 08 |
| **Module 5** | **Tính cước & Thanh toán** *(Cước thực tế GPS, Cấu hình giá, Tiền mặt, Ví điện tử, Hóa đơn VAT, EX-07)* | [\`TC05_Payment_Pricing.md\`](./TC05_Payment_Pricing.md) | **15 TCs** | ✅ 100% Positive, Negative, Boundary, EX-07 |
| **Module 6** | **Định vị GPS & Giám sát** *(GPS 5-10s, Khách theo dõi real-time, Tính lại ETA, Bản đồ Operator, EX-03)* | [\`TC06_Tracking_GPS.md\`](./TC06_Tracking_GPS.md) | **11 TCs** | ✅ 100% Positive, Negative, Boundary, EX-03 |
| **Module 7** | **Trung tâm Thông báo** *(In-app Socket, Email biên lai, Hộp thư, Đánh dấu đã đọc, EX-10 SMTP Outage)* | [\`TC07_Notification.md\`](./TC07_Notification.md) | **10 TCs** | ✅ 100% Positive, Negative, Boundary, EX-10 |
| **Module 8** | **Đánh giá & Phản hồi** *(Chấm 1-5 sao, Nhận xét 500 ký tự, Tính rating trung bình, EX-09)* | [\`TC08_Rating_Review.md\`](./TC08_Rating_Review.md) | **11 TCs** | ✅ 100% Positive, Negative, Boundary, BRULE-08 |
| **Module 9** | **Quản trị & Báo cáo** *(Dashboard, Tìm kiếm khách/tài xế, Can thiệp cuốc lỗi EX-06, Báo cáo Doanh thu)* | [\`TC09_Admin_Operations.md\`](./TC09_Admin_Operations.md) | **13 TCs** | ✅ 100% Positive, Negative, Boundary, EX-06 |
| **Module 10** | **Bảo mật, RBAC & Audit** *(Phân quyền 4 Roles, Chặn 403, Audit Log append-only, Bcrypt, EX-10 Circuit Breaker)* | [\`TC10_Security_RBAC_Audit.md\`](./TC10_Security_RBAC_Audit.md) | **13 TCs** | ✅ 100% Positive, Negative, Boundary, EX-10 |
| **TỔNG CỘNG** | **Toàn bộ 10 phân hệ** | **File tổng hợp CSV:** [\`TestCase_CAB_System.csv\`](./TestCase_CAB_System.csv) | **${allTestCases.length} TCs** | **Độ phủ Toàn diện 100%** |

---

### 🛡️ Độ Phủ 10 Trường Hợp Ngoại Lệ (Exceptions EX-01 đến EX-10 từ SRS Giai đoạn 3)

| Mã Ngoại lệ | Tình huống ngoại lệ | Kịch bản Test Case kiểm chứng |
|:---:|---|---|
| **EX-01** | Không tìm thấy tài xế khả dụng trong 5km | \`TC-MAT-015\`, \`TC-MAT-016\` |
| **EX-02** | Tài xế không phản hồi trong 30 giây (Timeout) | \`TC-MAT-012\`, \`TC-MAT-013\` |
| **EX-03** | Mất kết nối mạng / Mất tín hiệu GPS | \`TC-TRK-004\`, \`TC-TRK-005\`, \`TC-MAT-018\` |
| **EX-04** | Khách hàng hủy chuyến khi tài xế đang đến | \`TC-RID-015\`, \`TC-RID-017\` |
| **EX-05** | Khách không xuất hiện tại điểm đón (No-Show >= 5p) | \`TC-RID-018\`, \`TC-RID-019\` |
| **EX-06** | Xe hỏng / Tai nạn giữa đường | \`TC-RID-020\`, \`TC-ADM-005\`, \`TC-ADM-007\` |
| **EX-07** | Thanh toán Điện tử thất bại (Cổng lỗi/hết tiền) | \`TC-PAY-011\`, \`TC-PAY-012\` |
| **EX-08** | Xung đột nhận cuốc đồng thời (Race Condition) | \`TC-MAT-010\` |
| **EX-09** | Khóa tài khoản khi đang có cuốc xe chạy | \`TC-DRV-017\`, \`TC-RAT-006\` |
| **EX-10** | Cổng dịch vụ ngoại vi ngừng hoạt động (Outage) | \`TC-RID-003\`, \`TC-NOTIF-004\`, \`TC-SEC-013\` |

---

### 📋 Cấu trúc Bảng Test Case chuẩn 8 cột (Excel Matrix)

| Cột | Tên trường | Diễn giải |
|:---:|---|---|
| 1 | **Test Case ID** | Mã định danh duy nhất (\`TC-AUTH-001\`, \`TC-DRV-001\`,...) |
| 2 | **Test Scenario** | Nhóm kịch bản kiểm thử (Người dùng đăng nhập, Đặt xe, Hủy chuyến,...) |
| 3 | **Test Case** | Tên hành vi kiểm thử cụ thể (hợp lệ, lỗi, biên) |
| 4 | **Preconditions** | Điều kiện tiên quyết của hệ thống / tài khoản |
| 5 | **Test Steps** | Các bước thực hiện từng bước rõ ràng |
| 6 | **Test Data** | Dữ liệu đầu vào thực tế (Username, Password, Tọa độ, Số tiền) |
| 7 | **Expected Result** | Kết quả kỳ vọng chi tiết (HTTP Code, Thông báo lỗi, Trạng thái DB) |
| 8 | **Priority** | Mức độ ưu tiên (\`High\` / \`Medium\` / \`Low\`) |
`;

fs.writeFileSync(path.join(testcaseDir, 'README.md'), readmeContent, 'utf8');
console.log('Updated testcase/README.md');

// ==========================================
// UPDATE SRS.MD RTM TABLE
// ==========================================
// Group test case IDs by FR
const frMap = {};
allTestCases.forEach(tc => {
  if (tc.fr) {
    if (!frMap[tc.fr]) frMap[tc.fr] = [];
    frMap[tc.fr].push(tc.id);
  }
});

let srsContent = fs.readFileSync(srsPath, 'utf8');
const lines = srsContent.split('\n');
let updateCount = 0;

const updatedLines = lines.map(line => {
  if (line.startsWith('| **BG-') && line.includes('**FR-')) {
    const frMatch = line.match(/\*\*(FR-[A-Z]+-\d+)\*\*/);
    if (frMatch) {
      const frCode = frMatch[1];
      if (frMap[frCode] && frMap[frCode].length > 0) {
        const parts = line.split('|');
        if (parts.length >= 8) {
          parts[7] = ` ${frMap[frCode].join(', ')} `;
          updateCount++;
          return parts.join('|');
        }
      }
    }
  }
  return line;
});

fs.writeFileSync(srsPath, updatedLines.join('\n'), 'utf8');
console.log(`Updated ${updateCount} rows in srs.md RTM table!`);
