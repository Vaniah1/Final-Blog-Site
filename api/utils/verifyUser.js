import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    // Return next with error handler for unauthorized access
    return next(errorHandler(401, 'Unauthorized'));
  }
  // Verify the token using the JWT_SECRET from process.env
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Return next with error handler for unauthorized access
      return next(errorHandler(401, 'Unauthorized'));
    }
    // Set the user object to the request object
    req.user = user;
     // Continue to the next middleware
    next();
  });
};
