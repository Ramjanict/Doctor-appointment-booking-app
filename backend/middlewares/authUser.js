import jwt from "jsonwebtoken";

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    //if user token not available
    if (!token) {
      return res.json(
        res.json({
          success: false,
          message: "Not Authorized Login again",
        })
      );
    }
    // decode token
    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decode_token.id;
    next();
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
