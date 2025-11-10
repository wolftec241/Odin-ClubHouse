import { Router } from "express";
import passport from "passport";
import controller from "../controllers/controllerdb.ts";

const router = Router();
const db = await controller();




router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { user: req.user });
    } else {
        res.render("index", { user: null });
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res,next)
});

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

router.get('/register', (req,res) =>{
    res.render('register');
})


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const existingUser = await db.getUserByUsername(username);
        if (existingUser) {
            return res.render('register', { error: 'Username already taken' });
        }
        if (password && password.length < 6) {
            return res.render('register', { error: 'Password must be at least 6 characters long' });
        }

        await db.createUser(username, password);
        console.log(`User: ${username} registered successfully`);
        res.redirect('/login');

    } catch (err) {
        console.error(err);
        res.render('register', { error: 'An error occurred. Please try again.' });
    }
});

router.get('/chat', async (req, res) =>{
    try{
        if(req.isAuthenticated()){
            const chatData = await db.getAllpostsWithUser(); // Placeholder for future chat data retrieval
            res.render('chat', {user: req.user, messages: chatData});
        } else {
            const chatData = await db.getAllpostsWihtoutUser(); // Placeholder for future chat data retrieval
            res.render('chat', {user: null, messages: chatData});
        }
    } catch(err){
        console.error(err);
        res.render('chat', {error: 'An error occurred. Please try again.'});
    }
});

router.post('/chat', async (req, res) =>{
    try{
        if(req.isAuthenticated()){
            const content = req.body.message;
            await db.sendMessage(req.user.id, content);
            res.redirect('/chat');
        }
    }
    catch(err){
        console.error(err);
        res.render('chat', {error: 'An error occurred. Please try again.'});
    }
});

export default router;