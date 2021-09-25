import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';
import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        //check if there is a user in the database already with that email 
        const user = await db.collection('users').findOne({ email });

        if (user) {
            //email is already used
            res.sendStatus(409);
        }

        //encrypt the password -> 2nd argument is number of itterations
        const passwordHash = await bcrypt.hash(password, 10);

        const verificationString = uuid();

        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: ''
        };

        //when inserted in the database we get the id
        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
            verificationString
        });
        const { insertedId } = result;

        try {
            await sendEmail({
                to: email,
                from: 'tigara2000@abv.bg',
                subject: 'Please verify your email',
                text: `
                    Thanks for signing up! To verify your email, click here:
                    http://localhost:3000/verify-email/${verificationString}
                `
            });
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
        
        //data + secret from the env variables + options + callback, called when token is ready(async)
        jwt.sign({
            id: insertedId,
            email,
            info: startingInfo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d'
        },
        (err, token) => {
            if (err)
                return res.status(500).send(err);
            res.status(200).json({ token });
        }
        );
    },
};