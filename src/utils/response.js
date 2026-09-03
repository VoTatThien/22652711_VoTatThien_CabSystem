/**
 * Trả về response thành công theo format chuẩn
 * @param {Object} res - Express response object
 * @param {any} data - Dữ liệu trả về
 * @param {string} message - Thông báo thành công
 * @param {number} statusCode - HTTP Status code (mặc định 200)
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Trả về response lỗi theo format chuẩn
 * @param {Object} res - Express response object
 * @param {string} message - Thông báo lỗi
 * @param {number} statusCode - HTTP Status code (mặc định 500)
 * @param {any} errors - Chi tiết lỗi (nếu có)
 */
const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse
};
