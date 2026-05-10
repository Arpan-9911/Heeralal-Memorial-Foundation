const csrfProtection = (req, res, next) => {
  const csrfToken = req.headers["x-csrf-token"];

  if (
    req.method !== "GET" &&
    req.method !== "HEAD" &&
    !csrfToken
  ) {
    return res.status(403).json({
      success: false,
      message: "CSRF token missing",
    });
  }

  next();
};

export default csrfProtection;