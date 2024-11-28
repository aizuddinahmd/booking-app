import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const token = bearerToken.split(" ")[1];

  // check if token is provided

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const secretKey = "supersecret";
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    // pass user id to the next middleware
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  });
};
export default isAuth;
