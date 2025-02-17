import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      console.log("❌ No token provided.");
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Authenticated User ID:", decoded.id); 
      req.user = decoded;
      next();
    } catch (error) {
      console.log("❌ Invalid token:", error);
      return res.status(403).json({ error: "Invalid token" });
    }
  };
  