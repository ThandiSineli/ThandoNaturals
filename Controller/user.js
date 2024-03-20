import {
 adduser,
  getusers,
  getuser,
  deleteuser,
  updateuser,
} from '../models/database.js';
import bcrypt from 'bcryptjs';

// Add a user
 const addUser = async (req, res) => {
  const { idusers, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(userPass, 10);

  await adduser(idusers, firstName, lastName, userAge, Gender, userRole, emailAdd, hashedPassword, userProfile);

  res.json({ msg: 'User added successfully!' });
};

// Get all users
 const getUsers = async (req, res) => {
  res.send(await getusers());
};

// Get user by ID
const getUser = async (req, res) => {
  res.send(await getuser(+req.params.idusers));
};

// Delete a user
 const deleteUser = async (req, res) => {
  res.send(await deleteuser(req.params.idusers));
};

// Update a user
 const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body;
    await updateuser(firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, +req.params.idusers);
    res.json(await getuser(+req.params.idusers));
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};



export{updateUser,addUser,deleteUser,getUser,getUsers,adduser,deleteuser,getuser}

