import express from "express";
import session from "express-session";
import passport from "passport";
import { configurePassport } from './config/passport.ts';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import flash from "connect-flash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const app = express();
  const PORT = 3000;

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  app.use(express.urlencoded({ extended: true }));
  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,           // 🔒 Set to true if using HTTPS
        maxAge: 1000 * 60 * 60   // ⏱ Session expires after 1 hour
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Passport strategies
  configurePassport();

  //Flash middleware
  app.use(flash());
  app.use((req, res, next) => {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      next();
  });
  
  // Routes

  const authRoutes = (await import("./routes/auth.ts")).default;
  app.use("/", authRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main().catch(err => {
  console.error("Failed to start server:", err);
});
