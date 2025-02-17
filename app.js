import createError from "http-errors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath
import cookieParser from "cookie-parser";
import logger from "morgan";

// import indexRouter from './routes/index';
// import usersRouter from './routes/users';
import loginRouter from "./routes/Controller/Auth.js";
// import authRouter from './routes/Controller/protectedRoutes';

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = path.dirname(__filename); // Get the directory name

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use("/api", loginRouter);
// app.use('/authRouter', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
