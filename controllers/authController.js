import User from "../models/User.js";
import bcrypt from "bcrypt";


// Register a new user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ username, password: hashedPassword });
        await user.save();
        // Create a session
        req.session.user = {
            id: user._id,
            username: user.username
        };

        // Save session then send response
        req.session.save(() => {
            res.status(200).json({ message: "Registration successful" ,data: user });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Login a user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Create a session
        req.session.user = {
            id: user._id,
            username: user.username
        };

        // Save session then send response
        req.session.save(() => {
            res.status(200).json({ message: "Login successful" });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
