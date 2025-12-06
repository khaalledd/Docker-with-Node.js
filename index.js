import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config/config.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL,REDIS_PORT, SESSION_SECRET } = config;

import session from 'express-session';
import {RedisStore} from "connect-redis"
import {createClient} from "redis"


// Initialize client.
let redisClient = createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`
});
redisClient.connect().catch(console.error);


// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
})


const app = express();

app.use(express.json());
app.use(cors());



const port = process.env.PORT || 4000;

const connectwithRetry = () => {
    mongoose
    .connect(
        `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    )   
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
        setTimeout(connectwithRetry, 5000);
    });

};

connectwithRetry();

app.enable('trust proxy');
app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3000000
    }
  })
);



app.get('/api', (req, res) => {
    res.send('Hello World!!');
});

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});