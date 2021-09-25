import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

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
            isVerified: false
        });
        const { insertedId } = result;
        
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