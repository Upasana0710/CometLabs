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

  export const updateQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const question = req.body;
  
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthenticated.' });
      }
  
      // Validate the post ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid question ID' });
      }
  
      // Find the post by ID
      const existingQuestion = await Question.findById(id);
  
      // Check if the post exists
      if (!existingQuestion) {
        return res.status(404).json({ message: 'Question not found.' });
      }
  
      // Check if the user is authorized to update the post
      if (existingQuestion.creator._id.toString() !== req.user) {
        return res.status(403).json({ message: 'Not authorized to update this question.' });
      }
  
      // Check if the content of req and existing question is the same
      if (
        question.question === existingQuestion.question
      ) {
        return res.status(400).json({ message: 'The provided content is the same as the existing  question.' });
      }
  
      // Update the post
      const updatedQuestion = await Question.findByIdAndUpdate(
        id,
        { ...question, id, updatedAt: new Date() },
        { new: true }
      );
  
      res.status(200).json(updatedQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };