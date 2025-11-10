import { Router } from "express";
import passport from "passport";
const router = Router();
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { user: req.user });
    }
    else {
        res.render("index", { user: null });
    }
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}));
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});
export default router;
