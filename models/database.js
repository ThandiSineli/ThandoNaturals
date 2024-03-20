import { pool } from '../Config/config.js';
import bcrypt from 'bcryptjs';

// Items logic

const getproducts = async () => {
    const [result] = await pool.query(`SELECT * FROM products`);
    return result;
};

const getproduct = async (prodID) => {
    const [result] = await pool.query(`SELECT * FROM products WHERE prodID = ?`, [prodID]);
    return result;
};

const addproduct = async (prodID, prodName, quantity, amount, category, prodUrl) => {
    await pool.query(
        "INSERT INTO products (prodID, prodName, quantity, amount, Category, prodUrl) VALUES (?,?,?,?,?,?)",
        [prodID, prodName, quantity, amount, category, prodUrl]
    );
    return getproducts();
};

const deleteproduct = async (prodID) => {
    await pool.query(`DELETE FROM products WHERE prodID = ?`, [prodID]);
    return getproducts();
};

const updateproduct = async (prodName, prodUrl, quantity, amount, category, prodID) => {
    await pool.query(`
        UPDATE products
        SET prodName=?, prodUrl=?, quantity=?, amount=?, category=?
        WHERE prodID=?
    `, [prodName, prodUrl, quantity, amount, category, prodID]);
    return getproducts();
};

// Users logic

const adduser = async (idusers, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userPass, 10);

    await pool.query(
        "INSERT INTO users (idusers, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) VALUES (?,?,?,?,?,?,?,?,?)",
        [idusers, firstName, lastName, userAge, Gender, userRole, emailAdd, hashedPassword, userProfile]
    );

    return getusers();
};

const getusers = async () => {
    const [result] = await pool.query(`SELECT * FROM users`);
    return result;
};

const getuser = async (idusers) => {
    const [result] = await pool.query(`SELECT * FROM users WHERE idusers = ?`, [idusers]);
    return result;
};

const deleteuser = async (idusers) => {
    await pool.query(`DELETE FROM users WHERE idusers = ?`, [idusers]);
    return getusers();
};

const updateuser = async (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, idusers) => {
    await pool.query(`
        UPDATE users 
        SET firstName=?, lastName=?, userAge=?, Gender=?, userRole=?, emailAdd=?, userPass=?, userProfile=?
        WHERE idusers=?
    `, [firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, idusers]);
    return getusers();
};

const checkuser = async (emailAdd, userPass) => {
    try {
        const [result] = await pool.query(`SELECT userPass FROM users WHERE emailAdd = ?`, [emailAdd]);

        if (result.length === 0) {
            // User not found
            return false;
        }

        const hashedPassword = result[0].userPass;

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(userPass, hashedPassword);

        return passwordMatch;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export {
    getproducts,
    getproduct,
    addproduct,
    deleteproduct,
    updateproduct,
    adduser,
    checkuser,
    getusers,
    getuser,
    deleteuser,
    updateuser,
};