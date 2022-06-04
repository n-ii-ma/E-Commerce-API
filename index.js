// Inject environment variables
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

// Express App
const express = require("express");
const app = express();

// CORS
const cors = require("cors");
const options = {
  credentials: true,
  origin: isProduction
    ? [process.env.ADDRESS1, process.env.ADDRESS2]
    : "http://localhost:3001",
};

app.use(cors(options));

// Helmet
const helmet = require("helmet");
app.use(helmet());

// Gzip compression
const compression = require("compression");
app.use(compression());

// Body parser
app.use(express.json());

// Logger with Morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// Trust first proxy (Required for Heroku)
app.set("trust proxy", 1);

// Session
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./db/index");

app.use(
  session({
    secret: process.env.SECRET,
    name: "pg.sessionId",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1209600000, // 14 days
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    },
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
  })
);

// Passport
const passport = require("passport");
const initialize = require("./configs/passport");

initialize(passport);
app.use(passport.initialize());
app.use(passport.session());

// Rate Limiter
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 100, // 100 requests per minute
  standardHeaders: true,
});

app.use(limiter);

// Swagger Docs
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./openApi.yaml");

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customSiteTitle: "E-Commerce API" })
);

// Routes
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const cartsRouter = require("./routes/carts");
const ordersRouter = require("./routes/orders");
const paymentRouter = require("./routes/payment");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/carts", cartsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/payment", paymentRouter);

// Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      status,
      message: err.message || "Internal Server Error",
    },
  });
});

// Port
const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`));
