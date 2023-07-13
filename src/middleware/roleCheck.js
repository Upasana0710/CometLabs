import User from '../models/user.js';
export const checkAdmin = async (req, res, next) => {
    // Check if the user is an admin
    const user = await User.findById(req.user);
    if (user.role === "Admin") {
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Unauthorized. Admin access required.' });
    }
  };