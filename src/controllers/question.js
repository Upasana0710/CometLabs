import mongoose from 'mongoose';
import Question from '../models/question.js';
import User from '../models/user.js';

export const createQuestion = async (req, res) => {   

    try {
      // Validate whether the user is authorized
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthenticated.' });
      }
  
      const { question } = req.body;
  
      // Create a new post with encrypted data
      const newQuestion = new Question({
        question: question,
        creator: req.user,
      });
  
      // Save the new post
      await newQuestion.save();
  
      res.status(201).json(newQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };