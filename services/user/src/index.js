const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
//const AWS = require("aws-sdk");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//Middleware to validate Auth0 JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: `${process.env.AUTH_API_AUDIENCE}`, // API ID
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ["RS256"],
});

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello from your User Service!");
});

// protected endpoint to get user info
app.get("/users/me", checkJwt, (req, res) => {
  const { sub: userId, email } = req.user;
  res.json({ userId, email });
});

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
