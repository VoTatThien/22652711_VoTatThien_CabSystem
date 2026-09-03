/**
 * Controller cho Module Rating
 */

exports.submitRating = async (req, res) => {
    try {
        // TODO: Lưu đánh giá mới vào DB (auth: customer)
        return res.status(201).json({
            success: true,
            data: {},
            message: 'Gửi đánh giá thành công'
        });
    } catch (error) {
        return res.status(500).json({ success: false, data: null, message: 'Lỗi server' });
    }
};

exports.getDriverReviews = async (req, res) => {
    try {
        // TODO: Lấy các đánh giá của driver theo driverId với phân trang
        return res.status(200).json({
            success: true,
            data: [],
            message: 'Lấy đánh giá tài xế thành công'
        });
    } catch (error) {
        return res.status(500).json({ success: false, data: null, message: 'Lỗi server' });
    }
};

exports.getMyReviews = async (req, res) => {
    try {
        // TODO: Lấy đánh giá của chính tài xế đang đăng nhập
        return res.status(200).json({
            success: true,
            data: [],
            message: 'Lấy đánh giá của tôi thành công'
        });
    } catch (error) {
        return res.status(500).json({ success: false, data: null, message: 'Lỗi server' });
    }
};
