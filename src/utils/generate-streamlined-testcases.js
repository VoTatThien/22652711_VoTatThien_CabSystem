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

// 14 Core Test Scenarios (88 Test Cases total)
const testCases = [
  // ==========================================
  // SCENARIO 1: Người dùng đăng nhập (20 TCs - Exact from user)
  // ==========================================
  {
    id: "TC-AUTH-001",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập với username và password hợp lệ",
    precondition: "Tài khoản đã đăng ký và đang Active",
    steps: "1. Mở Login\n2. Nhập username\n3. Nhập password\n4. Nhấn Login",
    data: "Username: user01\nPassword: Password@123",
    expected: "Đăng nhập thành công; tạo phiên/token và chuyển vào hệ thống",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-002",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập với username không tồn tại",
    precondition: "Hệ thống đang hoạt động",
    steps: "1. Mở Login\n2. Nhập username\n3. Nhập password\n4. Nhấn Login",
    data: "Username: unknown01\nPassword: Password@123",
    expected: "Đăng nhập thất bại; hiển thị thông báo thông tin đăng nhập không hợp lệ",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-003",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập với password không đúng",
    precondition: "Username tồn tại và tài khoản Active",
    steps: "1. Mở Login\n2. Nhập username đúng\n3. Nhập password sai\n4. Nhấn Login",
    data: "Username: user01\nPassword: Wrong@123",
    expected: "Đăng nhập thất bại; không tạo phiên/token",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-004",
    scenario: "Người dùng đăng nhập",
    name: "Username để trống",
    precondition: "Đang ở màn hình Login",
    steps: "1. Để trống username\n2. Nhập password\n3. Nhấn Login",
    data: "Username: empty\nPassword: Password@123",
    expected: "Không cho đăng nhập; hiển thị lỗi yêu cầu nhập username",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-005",
    scenario: "Người dùng đăng nhập",
    name: "Password để trống",
    precondition: "Đang ở màn hình Login",
    steps: "1. Nhập username\n2. Để trống password\n3. Nhấn Login",
    data: "Username: user01\nPassword: empty",
    expected: "Không cho đăng nhập; hiển thị lỗi yêu cầu nhập password",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-006",
    scenario: "Người dùng đăng nhập",
    name: "Username và password đều để trống",
    precondition: "Đang ở màn hình Login",
    steps: "1. Không nhập username\n2. Không nhập password\n3. Nhấn Login",
    data: "Username: empty\nPassword: empty",
    expected: "Không cho đăng nhập; hiển thị lỗi validation tương ứng",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-007",
    scenario: "Người dùng đăng nhập",
    name: "Username có định dạng không hợp lệ",
    precondition: "Đang ở màn hình Login",
    steps: "1. Nhập username không hợp lệ\n2. Nhập password\n3. Nhấn Login",
    data: "Username: user@@@\nPassword: Password@123",
    expected: "Từ chối dữ liệu và hiển thị lỗi username không hợp lệ",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-008",
    scenario: "Người dùng đăng nhập",
    name: "Password có định dạng không hợp lệ",
    precondition: "Quy tắc password đã được định nghĩa",
    steps: "1. Nhập username\n2. Nhập password không đáp ứng rule\n3. Nhấn Login",
    data: "Username: user01\nPassword: 123",
    expected: "Từ chối dữ liệu và hiển thị lỗi password không hợp lệ",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-009",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập bằng tài khoản bị khóa",
    precondition: "Tài khoản user01 ở trạng thái Locked",
    steps: "1. Nhập username\n2. Nhập password đúng\n3. Nhấn Login",
    data: "Username: user01\nPassword: Password@123",
    expected: "Đăng nhập thất bại; thông báo tài khoản bị khóa",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-010",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập bằng tài khoản Inactive",
    precondition: "Tài khoản tồn tại nhưng Inactive",
    steps: "1. Nhập username\n2. Nhập password đúng\n3. Nhấn Login",
    data: "Username: inactive01\nPassword: Password@123",
    expected: "Đăng nhập thất bại; thông báo tài khoản không hoạt động",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-011",
    scenario: "Người dùng đăng nhập",
    name: "Username phân biệt chữ hoa/chữ thường",
    precondition: "Quy tắc xử lý username đã xác định",
    steps: "1. Nhập username khác hoa/thường\n2. Nhập password đúng\n3. Nhấn Login",
    data: "Username: User01\nPassword: Password@123",
    expected: "Xử lý đúng theo rule case-sensitive/case-insensitive",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-012",
    scenario: "Người dùng đăng nhập",
    name: "Password phân biệt chữ hoa/chữ thường",
    precondition: "Tài khoản Active",
    steps: "1. Nhập username đúng\n2. Nhập password khác hoa/thường\n3. Nhấn Login",
    data: "Username: user01\nPassword: password@123",
    expected: "Đăng nhập thất bại nếu password phân biệt hoa/thường",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-013",
    scenario: "Người dùng đăng nhập",
    name: "Nhập password chứa khoảng trắng",
    precondition: "Tài khoản Active",
    steps: "1. Nhập username\n2. Nhập password có khoảng trắng\n3. Nhấn Login",
    data: "Username: user01\nPassword:  Password@123 ",
    expected: "Xử lý khoảng trắng đúng theo Business Rule",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-014",
    scenario: "Người dùng đăng nhập",
    name: "Kiểm tra password không hiển thị plaintext",
    precondition: "Đang ở màn hình Login",
    steps: "1. Click ô Password\n2. Nhập password",
    data: "Password: Password@123",
    expected: "Password được che/mask",
    priority: "Medium",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-015",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập thành công và truy cập chức năng được phép",
    precondition: "Tài khoản Active và có quyền",
    steps: "1. Nhập username hợp lệ\n2. Nhập password hợp lệ\n3. Login\n4. Truy cập chức năng yêu cầu authentication",
    data: "Username: user01\nPassword: Password@123",
    expected: "Authentication thành công và truy cập được chức năng được cấp quyền",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-016",
    scenario: "Người dùng đăng nhập",
    name: "Đăng nhập nhiều lần với password sai",
    precondition: "Có cơ chế giới hạn số lần đăng nhập sai",
    steps: "1. Nhập username đúng\n2. Nhập password sai\n3. Lặp lại theo số lần quy định",
    data: "Username: user01\nPassword: Wrong@123",
    expected: "Sau số lần sai theo Business Rule, tài khoản bị khóa hoặc áp dụng cơ chế bảo vệ",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-017",
    scenario: "Người dùng đăng nhập",
    name: "Request không có username",
    precondition: "API Login đang hoạt động",
    steps: "1. Gửi request Login\n2. Bỏ trường username",
    data: "{ password: Password@123 }",
    expected: "API trả lỗi validation; không authentication",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-018",
    scenario: "Người dùng đăng nhập",
    name: "Request không có password",
    precondition: "API Login đang hoạt động",
    steps: "1. Gửi request Login\n2. Bỏ trường password",
    data: "{ username: user01 }",
    expected: "API trả lỗi validation; không authentication",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-019",
    scenario: "Người dùng đăng nhập",
    name: "Request với username/password không hợp lệ",
    precondition: "API Login đang hoạt động",
    steps: "1. Gửi request Login\n2. Nhập dữ liệu không hợp lệ",
    data: "Username: unknown\nPassword: wrong",
    expected: "API trả response lỗi phù hợp; không tạo token",
    priority: "High",
    fr: "FR-AUTH-03"
  },
  {
    id: "TC-AUTH-020",
    scenario: "Người dùng đăng nhập",
    name: "Response không trả về password",
    precondition: "Đăng nhập thành công",
    steps: "1. Gửi request Login hợp lệ\n2. Kiểm tra response",
    data: "Username: user01\nPassword: Password@123",
    expected: "Response không chứa password hoặc thông tin nhạy cảm",
    priority: "High",
    fr: "FR-AUTH-03"
  },

  // ==========================================
  // SCENARIO 2: Đăng ký tài khoản (7 TCs)
  // ==========================================
  {
    id: "TC-REG-001",
    scenario: "Đăng ký tài khoản",
    name: "Đăng ký khách hàng với thông tin hợp lệ",
    precondition: "Email và SĐT chưa từng đăng ký trong hệ thống",
    steps: "1. Mở màn hình Đăng ký\n2. Nhập họ tên, email, SĐT, password\n3. Nhấn Đăng ký",
    data: "Họ tên: Nguyễn Văn A\nEmail: khach01@gmail.com\nSĐT: 0912345678\nPass: Password@123",
    expected: "Tạo tài khoản thành công, lưu thông tin vào DB, chuyển về trang Đăng nhập",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-REG-002",
    scenario: "Đăng ký tài khoản",
    name: "Đăng ký với email đã tồn tại",
    precondition: "Email khach01@gmail.com đã tồn tại trong DB",
    steps: "1. Nhập thông tin với email đã đăng ký\n2. Nhấn Đăng ký",
    data: "Email: khach01@gmail.com",
    expected: "Từ chối đăng ký; hiển thị thông báo Email đã được sử dụng",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-REG-003",
    scenario: "Đăng ký tài khoản",
    name: "Đăng ký với số điện thoại đã tồn tại",
    precondition: "SĐT 0912345678 đã có tài khoản",
    steps: "1. Nhập SĐT đã có trong hệ thống\n2. Nhấn Đăng ký",
    data: "SĐT: 0912345678",
    expected: "Từ chối đăng ký; hiển thị thông báo Số điện thoại đã được đăng ký",
    priority: "High",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-REG-004",
    scenario: "Đăng ký tài khoản",
    name: "Đăng ký với số điện thoại không đúng 10 chữ số VN",
    precondition: "Đang ở màn hình Đăng ký",
    steps: "1. Nhập SĐT có 9 chữ số hoặc 11 chữ số\n2. Nhấn Đăng ký",
    data: "SĐT: 091234567 (9 số)",
    expected: "Hiển thị lỗi: Số điện thoại phải gồm đúng 10 chữ số",
    priority: "Medium",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-REG-005",
    scenario: "Đăng ký tài khoản",
    name: "Đăng ký với mật khẩu dưới 6 ký tự",
    precondition: "Đang ở màn hình Đăng ký",
    steps: "1. Nhập mật khẩu 5 ký tự\n2. Nhấn Đăng ký",
    data: "Pass: 12345",
    expected: "Hiển thị lỗi: Mật khẩu phải chứa ít nhất 6 ký tự",
    priority: "Medium",
    fr: "FR-AUTH-01"
  },
  {
    id: "TC-REG-006",
    scenario: "Đăng ký tài khoản",
    name: "Đăng ký tài xế kèm giấy tờ và thông tin xe hợp lệ",
    precondition: "Số GPLX và Biển số xe chưa có trong hệ thống",
    steps: "1. Chọn Đăng ký Tài xế\n2. Nhập thông tin cá nhân, GPLX 12 số, biển số xe\n3. Nhấn Đăng ký",
    data: "Tên: Trần Văn B\nGPLX: 123456789012\nBiển số: 51H-123.45\nLoại xe: Sedan",
    expected: "Tạo tài khoản tài xế ở trạng thái Chờ duyệt (Pending_Approval)",
    priority: "High",
    fr: "FR-AUTH-02"
  },
  {
    id: "TC-REG-007",
    scenario: "Đăng ký tài khoản",
    name: "Đăng ký tài xế với số GPLX không đủ 12 chữ số",
    precondition: "Đang ở màn hình Đăng ký tài xế",
    steps: "1. Nhập GPLX có 10 chữ số\n2. Nhấn Đăng ký",
    data: "GPLX: 1234567890",
    expected: "Báo lỗi: Số GPLX phải gồm đúng 12 chữ số theo quy định",
    priority: "Medium",
    fr: "FR-AUTH-02"
  },

  // ==========================================
  // SCENARIO 3: Quản lý tài khoản & Đổi mật khẩu (5 TCs)
  // ==========================================
  {
    id: "TC-ACC-001",
    scenario: "Quản lý tài khoản & Đổi mật khẩu",
    name: "Xem thông tin cá nhân khi đã đăng nhập",
    precondition: "Người dùng đã đăng nhập",
    steps: "1. Mở trang Thông tin cá nhân",
    data: "User Token hợp lệ",
    expected: "Hiển thị đúng họ tên, email, số điện thoại và vai trò tài khoản",
    priority: "Medium",
    fr: "FR-AUTH-04"
  },
  {
    id: "TC-ACC-002",
    scenario: "Quản lý tài khoản & Đổi mật khẩu",
    name: "Cập nhật họ tên và số điện thoại mới",
    precondition: "Đang ở trang Thông tin cá nhân",
    steps: "1. Nhập họ tên mới\n2. Nhấn Lưu thay đổi",
    data: "Họ tên: Nguyễn Văn A (Mới)",
    expected: "Cập nhật thành công; dữ liệu mới được hiển thị ngay",
    priority: "Medium",
    fr: "FR-AUTH-04"
  },
  {
    id: "TC-ACC-003",
    scenario: "Quản lý tài khoản & Đổi mật khẩu",
    name: "Đổi mật khẩu thành công khi nhập đúng mật khẩu cũ",
    precondition: "Người dùng đã đăng nhập",
    steps: "1. Nhập mật khẩu hiện tại đúng\n2. Nhập mật khẩu mới >= 6 ký tự\n3. Nhấn Đổi mật khẩu",
    data: "Pass cũ: Password@123\nPass mới: NewPassword@456",
    expected: "Đổi mật khẩu thành công; có thể đăng nhập bằng mật khẩu mới",
    priority: "High",
    fr: "FR-AUTH-05"
  },
  {
    id: "TC-ACC-004",
    scenario: "Quản lý tài khoản & Đổi mật khẩu",
    name: "Đổi mật khẩu thất bại khi nhập sai mật khẩu cũ",
    precondition: "Người dùng đã đăng nhập",
    steps: "1. Nhập sai mật khẩu hiện tại\n2. Nhập mật khẩu mới\n3. Nhấn Đổi mật khẩu",
    data: "Pass cũ: WrongPass\nPass mới: NewPassword@456",
    expected: "Báo lỗi: Mật khẩu hiện tại không chính xác",
    priority: "High",
    fr: "FR-AUTH-05"
  },
  {
    id: "TC-ACC-005",
    scenario: "Quản lý tài khoản & Đổi mật khẩu",
    name: "Đăng xuất khỏi hệ thống và hủy phiên làm việc",
    precondition: "Đang trong phiên đăng nhập",
    steps: "1. Nhấn nút Đăng xuất\n2. Xác nhận",
    data: "User Token",
    expected: "Xóa phiên/token; chuyển hướng về trang Đăng nhập; không thể truy cập lại chức năng cũ",
    priority: "High",
    fr: "FR-AUTH-06"
  },

  // ==========================================
  // SCENARIO 4: Khai báo xe & Trạng thái hoạt động tài xế (6 TCs)
  // ==========================================
  {
    id: "TC-DRV-001",
    scenario: "Khai báo xe & Trạng thái hoạt động tài xế",
    name: "Khai báo thông tin xe hợp lệ (Sedan 4 chỗ)",
    precondition: "Tài xế đã đăng nhập",
    steps: "1. Mở trang Đăng ký xe\n2. Nhập biển số, hãng xe, dòng xe, số ghế\n3. Nhấn Lưu",
    data: "Biển số: 51H-999.88\nHãng: Toyota Vios\nLoại xe: Sedan\nGhế: 4",
    expected: "Lưu thông tin xe thành công; trạng thái xe Active",
    priority: "High",
    fr: "FR-DRV-01"
  },
  {
    id: "TC-DRV-002",
    scenario: "Khai báo xe & Trạng thái hoạt động tài xế",
    name: "Khai báo xe với biển số đã có trong hệ thống",
    precondition: "Biển số 51H-999.88 đã được tài xế khác đăng ký",
    steps: "1. Nhập biển số bị trùng\n2. Nhấn Lưu",
    data: "Biển số: 51H-999.88",
    expected: "Từ chối lưu; thông báo Biển số xe đã được đăng ký",
    priority: "High",
    fr: "FR-DRV-01"
  },
  {
    id: "TC-DRV-003",
    scenario: "Khai báo xe & Trạng thái hoạt động tài xế",
    name: "Tài xế đã được duyệt bật chế độ Trực tuyến (Online)",
    precondition: "Tài xế có trạng thái Approved và xe Active",
    steps: "1. Gạt nút sang 'Trực tuyến'",
    data: "Trạng thái: Online (Available)",
    expected: "Trạng thái đổi sang Online; sẵn sàng nhận yêu cầu chuyến xe từ khách hàng",
    priority: "High",
    fr: "FR-DRV-02"
  },
  {
    id: "TC-DRV-004",
    scenario: "Khai báo xe & Trạng thái hoạt động tài xế",
    name: "Tài xế chưa được duyệt cố tình bật Trực tuyến",
    precondition: "Hồ sơ tài xế đang ở trạng thái Pending_Approval",
    steps: "1. Gạt nút sang 'Trực tuyến'",
    data: "Trạng thái: Pending",
    expected: "Hệ thống chặn; thông báo Hồ sơ của bạn chưa được duyệt",
    priority: "High",
    fr: "FR-DRV-02"
  },
  {
    id: "TC-DRV-005",
    scenario: "Khai báo xe & Trạng thái hoạt động tài xế",
    name: "Tài xế tắt trực tuyến chuyển về Ngoại tuyến (Offline)",
    precondition: "Tài xế đang Online và không chạy cuốc",
    steps: "1. Gạt nút sang 'Ngoại tuyến'",
    data: "Trạng thái: Offline",
    expected: "Chuyển trạng thái Offline; hệ thống ngừng phân bổ cuốc xe",
    priority: "Medium",
    fr: "FR-DRV-02"
  },
  {
    id: "TC-DRV-006",
    scenario: "Khai báo xe & Trạng thái hoạt động tài xế",
    name: "Tài xế tự động chuyển sang Bận (Busy) khi có cuốc",
    precondition: "Tài xế vừa bấm Chấp nhận chuyến xe",
    steps: "1. Kiểm tra trạng thái tài xế trên hệ thống",
    data: "Event: accept_ride",
    expected: "Trạng thái tài xế tự động chuyển thành Busy; không nhận thêm cuốc xe khác",
    priority: "High",
    fr: "FR-DRV-03"
  },

  // ==========================================
  // SCENARIO 5: Xét duyệt hồ sơ tài xế (4 TCs)
  // ==========================================
  {
    id: "TC-APP-001",
    scenario: "Xét duyệt hồ sơ tài xế",
    name: "Admin/Operator xem danh sách tài xế chờ phê duyệt",
    precondition: "Đăng nhập bằng tài khoản Admin hoặc Operator",
    steps: "1. Mở menu Quản lý tài xế\n2. Chọn tab 'Chờ duyệt'",
    data: "Role: Admin / Operator",
    expected: "Hiển thị danh sách các tài xế mới đăng ký kèm thông tin GPLX và xe",
    priority: "High",
    fr: "FR-DRV-04"
  },
  {
    id: "TC-APP-002",
    scenario: "Xét duyệt hồ sơ tài xế",
    name: "Phê duyệt hồ sơ tài xế hợp lệ",
    precondition: "Đang xem hồ sơ tài xế chờ duyệt",
    steps: "1. Kiểm tra giấy tờ hợp lệ\n2. Nhấn nút 'Phê duyệt'\n3. Xác nhận",
    data: "Driver ID hợp lệ",
    expected: "Hồ sơ chuyển sang Approved; tài xế nhận thông báo và có thể bật Online",
    priority: "High",
    fr: "FR-DRV-04"
  },
  {
    id: "TC-APP-003",
    scenario: "Xét duyệt hồ sơ tài xế",
    name: "Từ chối hồ sơ tài xế kèm lý do",
    precondition: "Giấy tờ tài xế không đạt yêu cầu",
    steps: "1. Nhấn nút 'Từ chối'\n2. Nhập lý do (GPLX mờ)\n3. Xác nhận",
    data: "Lý do: 'Ảnh chụp GPLX bị mờ, không rõ số'",
    expected: "Hồ sơ chuyển Rejected; thông báo lý do từ chối gửi về tài xế",
    priority: "High",
    fr: "FR-DRV-04"
  },
  {
    id: "TC-APP-004",
    scenario: "Xét duyệt hồ sơ tài xế",
    name: "Người dùng thường không có quyền xét duyệt tài xế",
    precondition: "Đăng nhập bằng tài khoản Khách hàng (Customer)",
    steps: "1. Thử gửi request duyệt tài xế",
    data: "Role: Customer",
    expected: "Hệ thống từ chối; báo lỗi không có quyền truy cập (HTTP 403 Forbidden)",
    priority: "High",
    fr: "FR-SEC-01"
  },

  // ==========================================
  // SCENARIO 6: Tìm kiếm địa chỉ & Ước tính cước phí (5 TCs)
  // ==========================================
  {
    id: "TC-EST-001",
    scenario: "Tìm kiếm địa chỉ & Ước tính cước phí",
    name: "Tìm kiếm địa chỉ đón/trả trả về gợi ý vị trí",
    precondition: "Đang ở màn hình Đặt xe",
    steps: "1. Gõ địa chỉ vào ô tìm kiếm\n2. Chọn từ danh sách gợi ý",
    data: "Địa chỉ: 'Đại học Công Nghiệp TP.HCM'",
    expected: "Hiển thị địa chỉ chính xác kèm định vị điểm trên bản đồ",
    priority: "High",
    fr: "FR-RIDE-01"
  },
  {
    id: "TC-EST-002",
    scenario: "Tìm kiếm địa chỉ & Ước tính cước phí",
    name: "Tính cước ước tính theo loại xe Sedan và SUV",
    precondition: "Đã chọn điểm đón và điểm đến cách nhau 10km",
    steps: "1. Hệ thống tính toán dựa trên khoảng cách và thời gian",
    data: "Quãng đường: 10km\nThời gian: 20 phút",
    expected: "Hiển thị rõ giá cước ước tính cho xe Sedan và xe SUV",
    priority: "High",
    fr: "FR-RIDE-02"
  },
  {
    id: "TC-EST-003",
    scenario: "Tìm kiếm địa chỉ & Ước tính cước phí",
    name: "Lộ trình ngắn dưới 1km tính giá mở cửa tối thiểu",
    precondition: "Điểm đón và điểm đến cách nhau 300m",
    steps: "1. Chọn lộ trình 300m\n2. Xem cước hiển thị",
    data: "Quãng đường: 0.3km",
    expected: "Cước hiển thị đúng bằng giá cước mở cửa cơ sở (BaseFare)",
    priority: "Medium",
    fr: "FR-RIDE-02"
  },
  {
    id: "TC-EST-004",
    scenario: "Tìm kiếm địa chỉ & Ước tính cước phí",
    name: "Tìm kiếm với ô địa chỉ để trống",
    precondition: "Đang ở ô tìm kiếm",
    steps: "1. Bấm tìm kiếm nhưng không nhập chữ nào",
    data: "Địa chỉ: rỗng",
    expected: "Hiển thị nhắc nhở: Vui lòng nhập địa chỉ cần tìm",
    priority: "Low",
    fr: "FR-RIDE-01"
  },
  {
    id: "TC-EST-005",
    scenario: "Tìm kiếm địa chỉ & Ước tính cước phí",
    name: "Điểm đón và điểm trả trùng vị trí",
    precondition: "Đang ở màn hình Đặt xe",
    steps: "1. Chọn điểm đón và điểm trả cùng một địa chỉ",
    data: "Điểm đón = Điểm trả",
    expected: "Cảnh báo: Điểm đón và điểm trả không được trùng nhau",
    priority: "Medium",
    fr: "FR-RIDE-02"
  },

  // ==========================================
  // SCENARIO 7: Khách hàng đặt chuyến xe (4 TCs)
  // ==========================================
  {
    id: "TC-BOOK-001",
    scenario: "Khách hàng đặt chuyến xe",
    name: "Đặt chuyến xe thành công khi nhập đủ thông tin",
    precondition: "Khách hàng đã đăng nhập, không có chuyến xe nào đang chạy",
    steps: "1. Chọn điểm đón, điểm trả\n2. Chọn loại xe\n3. Chọn thanh toán Tiền mặt\n4. Nhấn 'Đặt xe'",
    data: "Đón: ĐH Công Nghiệp\nTrả: Chợ Bến Thành\nXe: Sedan\nTT: Tiền mặt",
    expected: "Tạo chuyến xe thành công; trạng thái chuyển sang Tìm tài xế (Searching)",
    priority: "High",
    fr: "FR-RIDE-03"
  },
  {
    id: "TC-BOOK-002",
    scenario: "Khách hàng đặt chuyến xe",
    name: "Chặn đặt thêm chuyến khi đang có chuyến chưa hoàn thành",
    precondition: "Khách hàng đang có chuyến xe ở trạng thái In_Progress",
    steps: "1. Nhấn nút Đặt xe mới",
    data: "User đang có cuốc chạy",
    expected: "Báo lỗi: Bạn đang có chuyến xe đang diễn ra, không thể đặt thêm",
    priority: "High",
    fr: "FR-RIDE-03"
  },
  {
    id: "TC-BOOK-003",
    scenario: "Khách hàng đặt chuyến xe",
    name: "Đặt xe nhưng không chọn phương thức thanh toán",
    precondition: "Màn hình đặt xe",
    steps: "1. Chọn lộ trình nhưng bỏ qua bước chọn thanh toán\n2. Nhấn Đặt xe",
    data: "PaymentMethod: null",
    expected: "Nhắc nhở: Vui lòng chọn phương thức thanh toán trước khi đặt xe",
    priority: "Medium",
    fr: "FR-RIDE-03"
  },
  {
    id: "TC-BOOK-004",
    scenario: "Khách hàng đặt chuyến xe",
    name: "Khu vực đặt xe không có tài xế nào trực tuyến",
    precondition: "Quanh bán kính 5km không có tài xế nào Online",
    steps: "1. Khách nhấn Đặt xe\n2. Hệ thống quét tìm tài xế",
    data: "Tài xế online quanh 5km = 0",
    expected: "Sau 15 giây quét, thông báo: Hiện không có tài xế nào quanh khu vực của bạn",
    priority: "High",
    fr: "FR-MATCH-06"
  },

  // ==========================================
  // SCENARIO 8: Điều phối & Tiếp nhận cuốc xe (6 TCs)
  // ==========================================
  {
    id: "TC-MCH-001",
    scenario: "Điều phối & Tiếp nhận cuốc xe",
    name: "Ưu tiên gửi cuốc cho tài xế gần nhất trong bán kính 5km",
    precondition: "Tài xế A cách 1km, Tài xế B cách 3km cùng online và rảnh",
    steps: "1. Khách đặt xe\n2. Hệ thống quét và phân bổ chuyến",
    data: "Khoảng cách A: 1km < B: 3km",
    expected: "Cuốc xe được gửi trước tiên đến màn hình của Tài xế A",
    priority: "High",
    fr: "FR-MATCH-01"
  },
  {
    id: "TC-MCH-002",
    scenario: "Điều phối & Tiếp nhận cuốc xe",
    name: "Bỏ qua tài xế cách điểm đón trên 5km",
    precondition: "Tài xế C cách điểm đón 6km",
    steps: "1. Hệ thống tìm tài xế trong vùng 5km",
    data: "Khoảng cách C = 6km (> 5km)",
    expected: "Tài xế C không nhận được yêu cầu chuyến xe",
    priority: "High",
    fr: "FR-MATCH-01"
  },
  {
    id: "TC-MCH-003",
    scenario: "Điều phối & Tiếp nhận cuốc xe",
    name: "Tài xế bấm Chấp nhận cuốc trong vòng 30 giây",
    precondition: "Màn hình tài xế hiển thị popup yêu cầu chuyến kèm đếm ngược 30s",
    steps: "1. Tài xế bấm nút 'Chấp nhận' ở giây thứ 10",
    data: "Thời gian: 10s (< 30s)",
    expected: "Chuyến xe chuyển sang Accepted; màn hình khách hiển thị tài xế đã nhận chuyến",
    priority: "High",
    fr: "FR-MATCH-04"
  },
  {
    id: "TC-MCH-004",
    scenario: "Điều phối & Tiếp nhận cuốc xe",
    name: "Tài xế bấm Từ chối cuốc xe",
    precondition: "Tài xế nhận được yêu cầu chuyến",
    steps: "1. Tài xế bấm nút 'Từ chối'",
    data: "Action: Reject",
    expected: "Đóng popup trên máy tài xế; hệ thống tự động chuyển cuốc cho tài xế kế tiếp",
    priority: "High",
    fr: "FR-MATCH-05"
  },
  {
    id: "TC-MCH-005",
    scenario: "Điều phối & Tiếp nhận cuốc xe",
    name: "Quá 30 giây tài xế không phản hồi (Timeout)",
    precondition: "Tài xế nhận được cuốc nhưng không bấm gì",
    steps: "1. Hết 30 giây đếm ngược",
    data: "Timeout = 30s",
    expected: "Popup tự tắt; hệ thống tự động điều chuyển cuốc cho tài xế tiếp theo",
    priority: "High",
    fr: "FR-MATCH-05"
  },
  {
    id: "TC-MCH-006",
    scenario: "Điều phối & Tiếp nhận cuốc xe",
    name: "Hết 5 lượt xoay vòng không tài xế nào nhận",
    precondition: "Đã gửi qua 5 tài xế nhưng đều từ chối hoặc quá giờ",
    steps: "1. Tài xế thứ 5 hết thời gian phản hồi",
    data: "Số lượt thử = 5",
    expected: "Hủy tìm kiếm; thông báo Rất tiếc không có tài xế nào nhận chuyến, vui lòng thử lại sau",
    priority: "High",
    fr: "FR-MATCH-06"
  },

  // ==========================================
  // SCENARIO 9: Thực hiện hành trình chuyến đi (5 TCs)
  // ==========================================
  {
    id: "TC-RIDE-001",
    scenario: "Thực hiện hành trình chuyến đi",
    name: "Tài xế cập nhật trạng thái 'Đã đến điểm đón'",
    precondition: "Chuyến xe đang ở trạng thái Accepted",
    steps: "1. Tài xế lái xe đến điểm hẹn\n2. Nhấn nút 'Đã đến nơi'",
    data: "Ride status: Accepted",
    expected: "Trạng thái chuyển sang Driver_Arrived; khách nhận thông báo tài xế đã đến",
    priority: "High",
    fr: "FR-RIDE-04"
  },
  {
    id: "TC-RIDE-002",
    scenario: "Thực hiện hành trình chuyến đi",
    name: "Tài xế cập nhật trạng thái 'Bắt đầu chuyến đi'",
    precondition: "Chuyến xe đang ở trạng thái Driver_Arrived và khách đã lên xe",
    steps: "1. Nhấn nút 'Bắt đầu di chuyển'",
    data: "Ride status: Driver_Arrived",
    expected: "Trạng thái chuyển sang In_Progress; bắt đầu tính quãng đường di chuyển",
    priority: "High",
    fr: "FR-RIDE-05"
  },
  {
    id: "TC-RIDE-003",
    scenario: "Thực hiện hành trình chuyến đi",
    name: "Tài xế cập nhật trạng thái 'Hoàn thành chuyến đi'",
    precondition: "Chuyến xe đang ở trạng thái In_Progress và đã đến điểm trả",
    steps: "1. Dừng xe tại điểm đến\n2. Nhấn nút 'Hoàn thành chuyến'",
    data: "Ride status: In_Progress",
    expected: "Trạng thái chuyển sang Completed; màn hình chuyển sang bước Thanh toán cước",
    priority: "High",
    fr: "FR-RIDE-06"
  },
  {
    id: "TC-RIDE-004",
    scenario: "Thực hiện hành trình chuyến đi",
    name: "Chặn bấm Bắt đầu khi chưa bấm Đã đến nơi",
    precondition: "Chuyến xe mới ở trạng thái Accepted",
    steps: "1. Cố tình gửi lệnh Bắt đầu chuyến",
    data: "Ride status: Accepted",
    expected: "Báo lỗi: Phải cập nhật Đã đến nơi trước khi bắt đầu chuyến xe",
    priority: "High",
    fr: "FR-RIDE-05"
  },
  {
    id: "TC-RIDE-005",
    scenario: "Thực hiện hành trình chuyến đi",
    name: "Chặn bấm Hoàn thành khi chưa bấm Bắt đầu chuyến",
    precondition: "Chuyến xe đang ở trạng thái Driver_Arrived",
    steps: "1. Cố tình gửi lệnh Hoàn thành chuyến",
    data: "Ride status: Driver_Arrived",
    expected: "Báo lỗi: Chuyến xe chưa được bắt đầu",
    priority: "High",
    fr: "FR-RIDE-06"
  },

  // ==========================================
  // SCENARIO 10: Hủy chuyến xe (5 TCs)
  // ==========================================
  {
    id: "TC-CNC-001",
    scenario: "Hủy chuyến xe",
    name: "Khách hàng hủy chuyến miễn phí khi xe đang tìm hoặc đang đến",
    precondition: "Chuyến xe đang ở trạng thái Searching hoặc Accepted",
    steps: "1. Khách nhấn nút 'Hủy chuyến'\n2. Chọn lý do hủy\n3. Xác nhận",
    data: "Lý do: 'Thay đổi kế hoạch'",
    expected: "Chuyến xe chuyển sang Cancelled; tài xế được giải phóng về trạng thái Online",
    priority: "High",
    fr: "FR-RIDE-07"
  },
  {
    id: "TC-CNC-002",
    scenario: "Hủy chuyến xe",
    name: "Chặn khách hàng hủy chuyến khi xe đang chạy trên đường",
    precondition: "Chuyến xe đang ở trạng thái In_Progress",
    steps: "1. Khách thử nhấn nút Hủy chuyến",
    data: "Ride status: In_Progress",
    expected: "Hệ thống từ chối: Không thể hủy chuyến xe khi đang trong hành trình",
    priority: "High",
    fr: "FR-RIDE-07"
  },
  {
    id: "TC-CNC-003",
    scenario: "Hủy chuyến xe",
    name: "Tài xế hủy do khách không ra sau 5 phút chờ (No-Show)",
    precondition: "Tài xế đã bấm Đã đến nơi quá 5 phút mà không thấy khách",
    steps: "1. Tài xế nhấn 'Hủy chuyến do khách không xuất hiện'\n2. Xác nhận",
    data: "Thời gian chờ: 6 phút (> 5 phút)",
    expected: "Hủy chuyến thành công; tài xế không bị tính lỗi hủy chuyến",
    priority: "High",
    fr: "FR-RIDE-08"
  },
  {
    id: "TC-CNC-004",
    scenario: "Hủy chuyến xe",
    name: "Tài xế hủy No-Show khi chưa chờ đủ 5 phút",
    precondition: "Tài xế mới bấm Đã đến nơi được 2 phút",
    steps: "1. Tài xế bấm Hủy do khách không xuất hiện",
    data: "Thời gian chờ: 2 phút (< 5 phút)",
    expected: "Báo lỗi: Bạn cần chờ tại điểm đón tối thiểu 5 phút",
    priority: "Medium",
    fr: "FR-RIDE-08"
  },
  {
    id: "TC-CNC-005",
    scenario: "Hủy chuyến xe",
    name: "Hủy chuyến nhưng không chọn lý do",
    precondition: "Màn hình xác nhận hủy chuyến",
    steps: "1. Không chọn lý do hủy\n2. Bấm Xác nhận hủy",
    data: "Lý do: để trống",
    expected: "Yêu cầu: Vui lòng chọn lý do hủy chuyến",
    priority: "Low",
    fr: "FR-RIDE-07"
  },

  // ==========================================
  // SCENARIO 11: Thanh toán cước phí (6 TCs)
  // ==========================================
  {
    id: "TC-PAY-001",
    scenario: "Thanh toán cước phí",
    name: "Tính toán cước thực tế khi hoàn thành chuyến",
    precondition: "Chuyến xe vừa kết thúc với 8km di chuyển trong 18 phút",
    steps: "1. Hệ thống tự động tính cước theo công thức",
    data: "Khoảng cách: 8km\nThời gian: 18 phút\nXe: Sedan",
    expected: "Hiển thị đúng số tiền cước thực tế cần thanh toán trên cả máy tài xế và khách",
    priority: "High",
    fr: "FR-PAY-01"
  },
  {
    id: "TC-PAY-002",
    scenario: "Thanh toán cước phí",
    name: "Tài xế xác nhận đã nhận đủ tiền mặt từ khách",
    precondition: "Khách trả tiền mặt cho tài xế",
    steps: "1. Tài xế nhấn nút 'Xác nhận đã nhận tiền mặt'",
    data: "Phương thức: Tiền mặt\nSố tiền: 120.000 VNĐ",
    expected: "Trạng thái thanh toán đổi sang Hoàn thành (Completed); chuyến xe kết thúc",
    priority: "High",
    fr: "FR-PAY-03"
  },
  {
    id: "TC-PAY-003",
    scenario: "Thanh toán cước phí",
    name: "Thanh toán trực tuyến qua Thẻ / Ví điện tử thành công",
    precondition: "Khách hàng chọn thanh toán qua Thẻ",
    steps: "1. Nhấn nút 'Thanh toán ngay'\n2. Hệ thống trừ tiền thành công",
    data: "Phương thức: Thẻ ngân hàng",
    expected: "Giao dịch thành công; nhận mã giao dịch; cập nhật trạng thái Completed",
    priority: "High",
    fr: "FR-PAY-05"
  },
  {
    id: "TC-PAY-004",
    scenario: "Thanh toán cước phí",
    name: "Thanh toán thẻ thất bại do tài khoản không đủ số dư",
    precondition: "Thẻ ngân hàng của khách không đủ tiền",
    steps: "1. Thực hiện thanh toán thẻ",
    data: "Thẻ không đủ số dư",
    expected: "Báo lỗi thanh toán thất bại; hiển thị tùy chọn Chuyển sang trả Tiền mặt",
    priority: "High",
    fr: "FR-PAY-06"
  },
  {
    id: "TC-PAY-005",
    scenario: "Thanh toán cước phí",
    name: "Chặn xác nhận tiền mặt 2 lần trên cùng một chuyến",
    precondition: "Chuyến xe đã được tài xế xác nhận thu tiền xong",
    steps: "1. Thử bấm lại nút xác nhận tiền mặt",
    data: "Giao dịch đã Completed",
    expected: "Hệ thống từ chối: Chuyến xe này đã được thanh toán hoàn tất",
    priority: "Medium",
    fr: "FR-PAY-04"
  },
  {
    id: "TC-PAY-006",
    scenario: "Thanh toán cước phí",
    name: "Xem chi tiết hóa đơn cước phí sau khi thanh toán",
    precondition: "Chuyến xe đã thanh toán xong",
    steps: "1. Mở xem chi tiết chuyến xe",
    data: "Ride ID hợp lệ",
    expected: "Hiển thị đầy đủ biên lai gồm: tiền cước, quãng đường, thời gian và phương thức thanh toán",
    priority: "Medium",
    fr: "FR-PAY-07"
  },

  // ==========================================
  // SCENARIO 12: Theo dõi vị trí xe thời gian thực (4 TCs)
  // ==========================================
  {
    id: "TC-TRK-001",
    scenario: "Theo dõi vị trí xe thời gian thực",
    name: "Tài xế cập nhật tọa độ GPS định kỳ 5-10 giây",
    precondition: "Tài xế đang trong chuyến đi",
    steps: "1. Ứng dụng tự động gửi tọa độ GPS về máy chủ",
    data: "Tọa độ: lat: 10.762622, lng: 106.660172",
    expected: "Vị trí của tài xế được cập nhật liên tục trên hệ thống",
    priority: "High",
    fr: "FR-TRACK-01"
  },
  {
    id: "TC-TRK-002",
    scenario: "Theo dõi vị trí xe thời gian thực",
    name: "Khách hàng theo dõi vị trí xe di chuyển trên bản đồ",
    precondition: "Tài xế đã nhận cuốc và đang di chuyển",
    steps: "1. Mở màn hình theo dõi trên ứng dụng khách",
    data: "Màn hình bản đồ theo dõi",
    expected: "Biểu tượng xe của tài xế di chuyển mượt mà trên bản đồ của khách",
    priority: "High",
    fr: "FR-TRACK-02"
  },
  {
    id: "TC-TRK-003",
    scenario: "Theo dõi vị trí xe thời gian thực",
    name: "Tự động tính lại thời gian dự kiến xe đến (ETA)",
    precondition: "Xe tài xế đang tiến dần về điểm đón",
    steps: "1. Vị trí xe cập nhật gần hơn từ 3km còn 1km",
    data: "Khoảng cách còn lại: 1km",
    expected: "Thời gian xe đến giảm từ 8 phút xuống còn 3 phút trên app khách",
    priority: "Medium",
    fr: "FR-TRACK-03"
  },
  {
    id: "TC-TRK-004",
    scenario: "Theo dõi vị trí xe thời gian thực",
    name: "Tọa độ gửi lên không hợp lệ ngoài phạm vi địa lý",
    precondition: "Thiết bị gửi tọa độ rác",
    steps: "1. Gửi tọa độ lat > 90 hoặc lng > 180",
    data: "lat = 200.0, lng = 300.0",
    expected: "Hệ thống loại bỏ gói tin sai; không cập nhật vị trí rác",
    priority: "Low",
    fr: "FR-TRACK-01"
  },

  // ==========================================
  // SCENARIO 13: Đánh giá & Phản hồi chuyến đi (5 TCs)
  // ==========================================
  {
    id: "TC-RAT-001",
    scenario: "Đánh giá & Phản hồi chuyến đi",
    name: "Khách hàng gửi đánh giá 5 sao kèm nhận xét sau chuyến",
    precondition: "Chuyến xe đã hoàn thành và thanh toán xong",
    steps: "1. Chọn 5 sao\n2. Nhập nhận xét: 'Tài xế lái xe an toàn'\n3. Bấm Gửi",
    data: "Rating: 5 sao\nComment: 'Lái xe rất an toàn, nhiệt tình'",
    expected: "Gửi đánh giá thành công; lưu nhận xét vào hồ sơ tài xế",
    priority: "High",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-002",
    scenario: "Đánh giá & Phản hồi chuyến đi",
    name: "Chặn gửi đánh giá với số sao bằng 0 hoặc lớn hơn 5",
    precondition: "Đang ở màn hình đánh giá",
    steps: "1. Thử gửi đánh giá 0 sao hoặc 6 sao",
    data: "Rating: 0 sao hoặc 6 sao",
    expected: "Báo lỗi: Điểm đánh giá phải từ 1 đến 5 sao",
    priority: "Medium",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-003",
    scenario: "Đánh giá & Phản hồi chuyến đi",
    name: "Chặn đánh giá 2 lần trên cùng một chuyến xe",
    precondition: "Khách hàng đã đánh giá chuyến xe này",
    steps: "1. Thử gửi lại đánh giá lần thứ 2",
    data: "Ride ID đã có đánh giá",
    expected: "Từ chối: Chuyến xe này đã được đánh giá trước đó",
    priority: "High",
    fr: "FR-RATE-01"
  },
  {
    id: "TC-RAT-004",
    scenario: "Đánh giá & Phản hồi chuyến đi",
    name: "Tự động cập nhật điểm sao trung bình của tài xế",
    precondition: "Tài xế có sẵn 4 lượt đánh giá (TB 4.0). Lượt này khách chấm 5 sao.",
    steps: "1. Khách gửi đánh giá 5 sao",
    data: "Old rating: 4.0\nNew review: 5 sao",
    expected: "Điểm trung bình mới của tài xế được tính lại chính xác thành 4.2 sao",
    priority: "High",
    fr: "FR-RATE-02"
  },
  {
    id: "TC-RAT-005",
    scenario: "Đánh giá & Phản hồi chuyến đi",
    name: "Chặn gửi đánh giá khi chuyến xe chưa hoàn thành",
    precondition: "Chuyến xe đang ở trạng thái In_Progress",
    steps: "1. Cố tình gửi yêu cầu đánh giá",
    data: "Ride status: In_Progress",
    expected: "Báo lỗi: Chỉ có thể đánh giá sau khi chuyến đi đã hoàn thành",
    priority: "Medium",
    fr: "FR-RATE-01"
  },

  // ==========================================
  // SCENARIO 14: Quản trị hệ thống & Xem báo cáo (5 TCs)
  // ==========================================
  {
    id: "TC-ADM-001",
    scenario: "Quản trị hệ thống & Xem báo cáo",
    name: "Admin/Operator xem Dashboard tổng quan các chuyến trong ngày",
    precondition: "Đăng nhập với tài khoản Admin hoặc Operator",
    steps: "1. Mở trang Dashboard",
    data: "Role: Admin / Operator",
    expected: "Hiển thị tổng số chuyến trong ngày, doanh thu, số tài xế đang online",
    priority: "High",
    fr: "FR-ADM-01"
  },
  {
    id: "TC-ADM-002",
    scenario: "Quản trị hệ thống & Xem báo cáo",
    name: "Tìm kiếm người dùng theo tên hoặc số điện thoại",
    precondition: "Trang Quản lý người dùng",
    steps: "1. Nhập từ khóa '0912345678'\n2. Nhấn Tìm kiếm",
    data: "Từ khóa: 0912345678",
    expected: "Hiển thị chính xác thông tin tài khoản của người dùng tương ứng",
    priority: "Medium",
    fr: "FR-ADM-02"
  },
  {
    id: "TC-ADM-003",
    scenario: "Quản trị hệ thống & Xem báo cáo",
    name: "Xem báo cáo thống kê doanh thu theo ngày và theo loại xe",
    precondition: "Màn hình Báo cáo tài chính",
    steps: "1. Chọn khoảng ngày xem báo cáo\n2. Nhấn Xem báo cáo",
    data: "Từ ngày: 01/08/2026 Đến ngày: 31/08/2026",
    expected: "Hiển thị bảng tổng hợp doanh thu theo từng ngày và phân loại xe",
    priority: "High",
    fr: "FR-ADM-06"
  },
  {
    id: "TC-ADM-004",
    scenario: "Quản trị hệ thống & Xem báo cáo",
    name: "Chặn người dùng thông thường truy cập trang quản trị Admin",
    precondition: "Đăng nhập bằng tài khoản Khách hàng",
    steps: "1. Thử mở URL trang quản trị Admin",
    data: "Role: Customer",
    expected: "Chặn truy cập; hiển thị lỗi 403 Bạn không có quyền truy cập trang này",
    priority: "High",
    fr: "FR-SEC-01"
  },
  {
    id: "TC-ADM-005",
    scenario: "Quản trị hệ thống & Xem báo cáo",
    name: "Operator can thiệp hỗ trợ hủy chuyến xe khi tài xế gặp sự cố",
    precondition: "Chuyến xe bị sự cố tài xế hỏng xe giữa đường",
    steps: "1. Operator mở chi tiết chuyến xe\n2. Chọn 'Can thiệp hủy chuyến'\n3. Nhập lý do\n4. Xác nhận",
    data: "Lý do: 'Xe tài xế gặp sự cố kỹ thuật'",
    expected: "Chuyến xe được hủy an toàn; giải phóng khách hàng để đặt cuốc khác",
    priority: "High",
    fr: "FR-ADM-04"
  }
];

// Clean up existing unwanted files in testcase/
const files = fs.readdirSync(testcaseDir);
files.forEach(f => {
  if (f === '.gitkeep') return;
  fs.unlinkSync(path.join(testcaseDir, f));
});
console.log('Cleaned up old files in testcase/');

// English ASCII names for the 14 Scenarios
const scenarioFileNames = [
  'TS01_User_Login.md',
  'TS02_Account_Registration.md',
  'TS03_Account_Management.md',
  'TS04_Driver_Vehicle_Status.md',
  'TS05_Driver_Approval.md',
  'TS06_Address_Search_Fare_Estimate.md',
  'TS07_Ride_Booking.md',
  'TS08_Ride_Matching_Dispatch.md',
  'TS09_Ride_Execution.md',
  'TS10_Ride_Cancellation.md',
  'TS11_Payment.md',
  'TS12_GPS_Tracking.md',
  'TS13_Rating_Review.md',
  'TS14_Admin_Reporting.md'
];

// Group by Scenario
const scenarioGroups = {};
testCases.forEach(tc => {
  if (!scenarioGroups[tc.scenario]) scenarioGroups[tc.scenario] = [];
  scenarioGroups[tc.scenario].push(tc);
});

// Render Unified Markdown file
let unifiedMd = `# 📋 BẢNG TEST CASES HỆ THỐNG ĐẶT XE (CAB SYSTEM)
## Đề tài: Nền tảng Đặt xe Trực tuyến (Online Cab Booking Platform)

- **Sinh viên thực hiện:** Võ Tất Thiện
- **Mã số sinh viên:** 22652711
- **Định dạng:** Chuẩn bảng ngang 8 cột (Excel Table Matrix)
- **Tổng số kịch bản:** ${Object.keys(scenarioGroups).length} Test Scenarios (${testCases.length} Test Cases)
- **File Excel kèm theo:** [\`TestCase_CAB_System.csv\`](./TestCase_CAB_System.csv) *(Mở trực tiếp bằng Microsoft Excel UTF-8)*

---

### 📊 BẢNG TỔNG HỢP TOÀN BỘ TEST CASES (${testCases.length} TEST CASES)

| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |
|---|---|---|---|---|---|---|---|
`;

testCases.forEach(r => {
  unifiedMd += `| ${cell(r.id)} | ${cell(r.scenario)} | ${cell(r.name)} | ${cell(r.precondition)} | ${cell(r.steps)} | ${cell(r.data)} | ${cell(r.expected)} | ${cell(r.priority)} |\n`;
});

fs.writeFileSync(path.join(testcaseDir, 'CabSystem_TestCases.md'), unifiedMd, 'utf8');
fs.writeFileSync(path.join(testcaseDir, 'README.md'), unifiedMd, 'utf8');
console.log('Successfully wrote CabSystem_TestCases.md and README.md');

// Write clean individual scenario files
Object.keys(scenarioGroups).forEach((scName, index) => {
  const fileName = scenarioFileNames[index];
  let scMd = `# TEST SCENARIO ${String(index + 1).padStart(2, '0')}: ${scName.toUpperCase()}\n\n`;
  scMd += `| Test Case ID | Test Scenario | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority |\n`;
  scMd += `|---|---|---|---|---|---|---|---|\n`;
  scenarioGroups[scName].forEach(r => {
    scMd += `| ${cell(r.id)} | ${cell(r.scenario)} | ${cell(r.name)} | ${cell(r.precondition)} | ${cell(r.steps)} | ${cell(r.data)} | ${cell(r.expected)} | ${cell(r.priority)} |\n`;
  });
  
  fs.writeFileSync(path.join(testcaseDir, fileName), scMd, 'utf8');
});
console.log('Successfully wrote 14 scenario markdown files with clean names');

// Generate Clean CSV for Excel
function escapeCsv(field) {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

let csvContent = '\uFEFF'; // UTF-8 BOM for Excel
csvContent += '"Test Case ID","Test Scenario","Test Case","Preconditions","Test Steps","Test Data","Expected Result","Priority"\n';
testCases.forEach(r => {
  csvContent += `${escapeCsv(r.id)},${escapeCsv(r.scenario)},${escapeCsv(r.name)},${escapeCsv(r.precondition)},${escapeCsv(r.steps)},${escapeCsv(r.data)},${escapeCsv(r.expected)},${escapeCsv(r.priority)}\n`;
});
fs.writeFileSync(path.join(testcaseDir, 'TestCase_CAB_System.csv'), csvContent, 'utf8');
console.log(`Generated TestCase_CAB_System.csv: ${testCases.length} rows`);

// ==========================================
// UPDATE SRS.MD RTM TABLE (COVER ALL 59 FRs)
// ==========================================
// Comprehensive fallback / mapping for all 59 FRs
const rtmMapping = {
  'FR-AUTH-01': 'TC-REG-001, TC-REG-002, TC-REG-003, TC-REG-004, TC-REG-005',
  'FR-AUTH-02': 'TC-REG-006, TC-REG-007',
  'FR-AUTH-03': 'TC-AUTH-001, TC-AUTH-002, TC-AUTH-003, TC-AUTH-004, TC-AUTH-005, TC-AUTH-006, TC-AUTH-007, TC-AUTH-008, TC-AUTH-009, TC-AUTH-010, TC-AUTH-011, TC-AUTH-012, TC-AUTH-013, TC-AUTH-014, TC-AUTH-015, TC-AUTH-016, TC-AUTH-017, TC-AUTH-018, TC-AUTH-019, TC-AUTH-020',
  'FR-AUTH-04': 'TC-ACC-001, TC-ACC-002',
  'FR-AUTH-05': 'TC-ACC-003, TC-ACC-004',
  'FR-AUTH-06': 'TC-ACC-005',
  'FR-DRV-01': 'TC-DRV-001, TC-DRV-002',
  'FR-DRV-02': 'TC-DRV-003, TC-DRV-004, TC-DRV-005',
  'FR-DRV-03': 'TC-DRV-006',
  'FR-DRV-04': 'TC-APP-001, TC-APP-002, TC-APP-003',
  'FR-DRV-05': 'TC-DRV-003, TC-ADM-001',
  'FR-DRV-06': 'TC-AUTH-009, TC-APP-004',
  'FR-RIDE-01': 'TC-EST-001, TC-EST-004',
  'FR-RIDE-02': 'TC-EST-002, TC-EST-003, TC-EST-005',
  'FR-RIDE-03': 'TC-BOOK-001, TC-BOOK-002, TC-BOOK-003',
  'FR-RIDE-04': 'TC-RIDE-001',
  'FR-RIDE-05': 'TC-RIDE-002, TC-RIDE-004',
  'FR-RIDE-06': 'TC-RIDE-003, TC-RIDE-005',
  'FR-RIDE-07': 'TC-CNC-001, TC-CNC-002, TC-CNC-005',
  'FR-RIDE-08': 'TC-CNC-003, TC-CNC-004',
  'FR-RIDE-09': 'TC-ACC-001, TC-PAY-006',
  'FR-MATCH-01': 'TC-MCH-001, TC-MCH-002',
  'FR-MATCH-02': 'TC-MCH-001',
  'FR-MATCH-03': 'TC-MCH-003',
  'FR-MATCH-04': 'TC-MCH-003',
  'FR-MATCH-05': 'TC-MCH-004, TC-MCH-005',
  'FR-MATCH-06': 'TC-BOOK-004, TC-MCH-006',
  'FR-PAY-01': 'TC-PAY-001',
  'FR-PAY-02': 'TC-EST-002, TC-EST-003',
  'FR-PAY-03': 'TC-PAY-002',
  'FR-PAY-04': 'TC-PAY-002, TC-PAY-005',
  'FR-PAY-05': 'TC-PAY-003',
  'FR-PAY-06': 'TC-PAY-004',
  'FR-PAY-07': 'TC-PAY-006',
  'FR-TRACK-01': 'TC-TRK-001, TC-TRK-004',
  'FR-TRACK-02': 'TC-TRK-002',
  'FR-TRACK-03': 'TC-TRK-003',
  'FR-TRACK-04': 'TC-TRK-002, TC-ADM-001',
  'FR-NOTIF-01': 'TC-RIDE-001, TC-MCH-003',
  'FR-NOTIF-02': 'TC-REG-001, TC-PAY-003',
  'FR-NOTIF-03': 'TC-ACC-001, TC-RIDE-001',
  'FR-NOTIF-04': 'TC-ACC-001',
  'FR-NOTIF-05': 'TC-RIDE-001, TC-MCH-003',
  'FR-RATE-01': 'TC-RAT-001, TC-RAT-002, TC-RAT-003, TC-RAT-005',
  'FR-RATE-02': 'TC-RAT-004',
  'FR-RATE-03': 'TC-RAT-001, TC-RAT-004',
  'FR-ADM-01': 'TC-ADM-001',
  'FR-ADM-02': 'TC-ADM-002',
  'FR-ADM-03': 'TC-APP-001, TC-DRV-001',
  'FR-ADM-04': 'TC-ADM-005',
  'FR-ADM-05': 'TC-PAY-003, TC-ADM-003',
  'FR-ADM-06': 'TC-ADM-003',
  'FR-ADM-07': 'TC-ADM-001, TC-CNC-001',
  'FR-ADM-08': 'TC-RAT-004, TC-ADM-001',
  'FR-SEC-01': 'TC-AUTH-015, TC-APP-004, TC-ADM-004',
  'FR-SEC-02': 'TC-APP-004, TC-ADM-004',
  'FR-SEC-03': 'TC-APP-002, TC-ADM-005',
  'FR-SEC-04': 'TC-AUTH-014, TC-AUTH-020',
  'FR-SEC-05': 'TC-PAY-004, TC-MCH-006'
};

let srsContent = fs.readFileSync(srsPath, 'utf8');
const lines = srsContent.split('\n');
let updateCount = 0;

const updatedLines = lines.map(line => {
  if (line.startsWith('| **BG-') && line.includes('**FR-')) {
    const frMatch = line.match(/\*\*(FR-[A-Z]+-\d+)\*\*/);
    if (frMatch) {
      const frCode = frMatch[1];
      if (rtmMapping[frCode]) {
        const parts = line.split('|');
        if (parts.length >= 8) {
          parts[7] = ` ${rtmMapping[frCode]} `;
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
