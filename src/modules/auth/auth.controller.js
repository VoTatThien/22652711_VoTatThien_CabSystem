/**
 * Controller for Auth module
 */

// Đăng ký khách hàng
exports.registerCustomer = async (req, res) => {
    // TODO: Xử lý đăng ký khách hàng, validate dữ liệu, hash password, lưu database
    return res.status(201).json({ success: true, data: null, message: 'Customer registered successfully' });
};

// Đăng ký tài xế
exports.registerDriver = async (req, res) => {
    // TODO: Xử lý đăng ký tài xế, lưu thông tin xe và giấy phép
    return res.status(201).json({ success: true, data: null, message: 'Driver registered successfully' });
};

// Đăng nhập
exports.login = async (req, res) => {
    // TODO: Kiểm tra email/password, tạo accessToken và refreshToken
    return res.status(200).json({ success: true, data: { accessToken: 'token', refreshToken: 'refresh_token', user: {} }, message: 'Logged in successfully' });
};

// Lấy thông tin cá nhân
exports.getProfile = async (req, res) => {
    // TODO: Lấy thông tin user từ database dựa vào req.user (được set bởi middleware auth)
    return res.status(200).json({ success: true, data: null, message: 'Profile retrieved successfully' });
};

// Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
    // TODO: Cập nhật thông tin cơ bản của user
    return res.status(200).json({ success: true, data: null, message: 'Profile updated successfully' });
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
    // TODO: So sánh mật khẩu cũ, hash và lưu mật khẩu mới
    return res.status(200).json({ success: true, data: null, message: 'Password changed successfully' });
};

// Đăng xuất
exports.logout = async (req, res) => {
    // TODO: Xử lý blacklist token hoặc xoá session
    return res.status(200).json({ success: true, data: null, message: 'Logged out successfully' });
};

// Cấp lại token mới
exports.refreshToken = async (req, res) => {
    // TODO: Verify refresh token và trả về token mới
    return res.status(200).json({ success: true, data: { accessToken: 'new_token', refreshToken: 'new_refresh_token' }, message: 'Tokens refreshed successfully' });
};
