import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => app.listen(PORT, () => {
    console.log(`Comet server is running on port ${PORT}`);
  }))
  .catch((err) => console.log(err));