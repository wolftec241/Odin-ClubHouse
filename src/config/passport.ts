import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import controller from '../controllers/controllerdb.ts'

const db = await controller();

export function configurePassport(){
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                // 1. Find the user by username
                const user = await db.getUserByUsername(username);
                // 2. If user not found, return false
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                // 3. Compare the provided password with the stored hash
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            // 4. Handle errors
            } catch (err) {
                return done(err);
            }
        }
    ));

    // Serialize user to store in session
    passport.serializeUser((user:any, done: any) => {
        done(null, user.id);
    });


    // Deserialize user from session
    passport.deserializeUser(async (id: number, done:any) => {
        const user = await db.getUserById(id);
        if (!user) {
            return done(new Error('User not found'));
        }
        return done(null, await db.getUserById(id));
    });
}
export default configurePassport;