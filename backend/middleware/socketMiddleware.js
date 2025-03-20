export const socketMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token; // Frontend se token bhejna hoga
    if (!token) return next(new Error("Authentication error"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // Socket mein user info
        next();
    } catch (error) {
        next(new Error("Invalid token"));
    }
};