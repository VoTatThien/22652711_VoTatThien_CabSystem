const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

/**
 * Middleware kiểm tra JWT token
 */
const authenticate = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Not authorized to access this route', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 'Not authorized, token failed', 401);
  }
};

/**
 * Middleware phân quyền (Role-based access control)
 * @param {Array} roles Mảng các role được phép truy cập
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 'User role is not authorized to access this route', 403);
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
