const mongoose = require('mongoose');

const CATEGORIES = [
  'Algebra',
  'Geometry',
  'Calculus',
  'Statistics',
  'Probability',
  'Trigonometry',
  'Linear Algebra',
  'Number Theory' ,
  'Discrete Math'
];
const termsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    example: {
      type: String,
      required: true,
      min: 0,
    },
   category: {
  type: String,
  enum: CATEGORIES,
  required: true

    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Terms = mongoose.model('Terms', termsSchema);

module.exports = Terms;