import jwt from 'jsonwebtoken';
const JWT_SECRET="3f2c1e95a5e063e1f5c8b7c9c1f0c1e9e9f3b0e7e93d2b8d9e89b7c3b5c0d8f3";
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(1);

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }
    console.log(token);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};


export default authMiddleware;