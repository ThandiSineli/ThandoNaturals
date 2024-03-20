import { checkuser } from '../models/database.js';
import bcrypt from 'bcryptjs';

// Authenticate user
 const authenticateUser = async (req, res, next) => {
  const { emailAdd, userPass } = req.body;

  const passwordMatch = await checkuser(emailAdd, userPass);

  if (passwordMatch) {
    next();
  } else {
    res.status(401).json({ msg: 'Authentication failed' });
  }
};


export{authenticateUser}

