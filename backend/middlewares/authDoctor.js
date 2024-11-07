import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dToken } = req.headers;

    //if user token not available
    if (!dToken) {
      return res.json(
        res.json({
          success: false,
          message: "Not Authorized Login again",
        })
      );
    }
    // decode token
    const decode_token = jwt.verify(dToken, process.env.JWT_SECRET);
    req.body.docId = decode_token.id;
    next();
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authDoctor;
