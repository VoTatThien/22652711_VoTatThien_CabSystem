/**
 * Socket.IO handlers for Tracking
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
module.exports = (io, socket) => {
    // Driver updates location
    socket.on('driver:locationUpdate', async (data) => {
        // data: { lat, lng, bearing, speed }
        // TODO: Cập nhật DriverProfile.currentLocation trong DB
        // Phát lại vị trí cho khách hàng đang trong cùng room của chuyến đi
        // if (currentRideId) {
        //     socket.to(`ride_${currentRideId}`).emit('driver:location', data);
        // }
    });

    // Customer tracking a driver
    socket.on('customer:trackDriver', (rideId) => {
        // Tham gia vào phòng chuyến đi để nhận vị trí
        socket.join(`ride_${rideId}`);
    });

    // Driver goes online
    socket.on('driver:goOnline', () => {
        // Tham gia phòng tài xế khả dụng
        socket.join('available-drivers');
        // TODO: Cập nhật trạng thái trong DB
    });

    // Driver goes offline
    socket.on('driver:goOffline', () => {
        // Rời phòng tài xế khả dụng
        socket.leave('available-drivers');
        // TODO: Cập nhật trạng thái trong DB
    });
};
