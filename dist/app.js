import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3000;
//EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use("/", (await import("./routes/auth.js")).default);
//Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
