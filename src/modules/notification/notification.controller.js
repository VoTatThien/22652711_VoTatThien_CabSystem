/**
 * Controller cho Module Notification
 */

exports.getNotifications = async (req, res) => {
    try {
        // TODO: Lấy danh sách thông báo của user (phân trang, lọc theo isRead)
        return res.status(200).json({
            success: true,
            data: [],
            message: 'Lấy danh sách thông báo thành công'
        });
    } catch (error) {
        return res.status(500).json({ success: false, data: null, message: 'Lỗi server' });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        // TODO: Đánh dấu thông báo theo id là đã đọc
        return res.status(200).json({
            success: true,
            data: {},
            message: 'Đã đánh dấu thông báo là đã đọc'
        });
    } catch (error) {
        return res.status(500).json({ success: false, data: null, message: 'Lỗi server' });
    }
};

exports.markAllAsRead = async (req, res) => {
    try {
        // TODO: Đánh dấu tất cả thông báo của user là đã đọc
        return res.status(200).json({
            success: true,
            data: {},
            message: 'Đã đánh dấu tất cả thông báo là đã đọc'
        });
    } catch (error) {
        return res.status(500).json({ success: false, data: null, message: 'Lỗi server' });
    }
};
