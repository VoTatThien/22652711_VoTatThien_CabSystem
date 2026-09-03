/**
 * Các hằng số Enum sử dụng trong hệ thống
 */

const UserRoles = {
  CUSTOMER: 'CUSTOMER',
  DRIVER: 'DRIVER',
  ADMIN: 'ADMIN'
};

const DriverStatus = {
  OFFLINE: 'OFFLINE',
  ONLINE: 'ONLINE', // Sẵn sàng nhận chuyến
  BUSY: 'BUSY'      // Đang trong chuyến đi
};

const RideStatus = {
  PENDING: 'PENDING',       // Đang tìm tài xế
  ACCEPTED: 'ACCEPTED',     // Tài xế đã nhận
  ARRIVING: 'ARRIVING',     // Tài xế đang đến đón
  IN_PROGRESS: 'IN_PROGRESS', // Đang trong chuyến đi
  COMPLETED: 'COMPLETED',   // Hoàn thành
  CANCELLED: 'CANCELLED'    // Đã hủy
};

const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

const PaymentMethod = {
  CASH: 'CASH',
  CREDIT_CARD: 'CREDIT_CARD',
  WALLET: 'WALLET'
};

const VehicleType = {
  CAR_4_SEAT: 'CAR_4_SEAT',
  CAR_7_SEAT: 'CAR_7_SEAT',
  BIKE: 'BIKE',
  LUXURY: 'LUXURY'
};

module.exports = {
  UserRoles,
  DriverStatus,
  RideStatus,
  PaymentStatus,
  PaymentMethod,
  VehicleType
};
