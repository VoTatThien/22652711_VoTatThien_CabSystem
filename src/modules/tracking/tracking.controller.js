/**
 * Controller cho Module Tracking
 */

/**
 * Lấy danh sách tài xế đang online
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getLiveDrivers = async (req, res) => {
    try {
        // TODO: Lấy danh sách tài xế đang online (cùng với vị trí, trạng thái, currentRideId)
        const mockData = [
            { driverId: 'd1', location: { lat: 10.762622, lng: 106.660172 }, status: 'available', currentRideId: null }
        ];
        
        return res.status(200).json({
            success: true,
            data: mockData,
            message: 'Lấy danh sách tài xế online thành công'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Lỗi server'
        });
    }
};
