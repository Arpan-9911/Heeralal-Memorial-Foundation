import jwt from "jsonwebtoken";

const generateRefreshToken = (adminId) => {
  return jwt.sign(
    {
      id: adminId,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default generateRefreshToken;