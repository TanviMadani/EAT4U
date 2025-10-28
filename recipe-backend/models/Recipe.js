const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=No+Image'
  },
  ingredients: [{
    name: {
      type: String,
      required: [true, 'Ingredient name is required']
    },
    amount: {
      type: String,
      required: [true, 'Amount is required']
    },
    unit: {
      type: String,
      required: [true, 'Unit is required']
    }
  }],
  instructions: [{
    type: String,
    required: [true, 'Instructions are required'],
    minlength: [10, 'Each instruction must be at least 10 characters long']
  }],
  prepTime: {
    type: String,
    required: [true, 'Preparation time is required']
  },
  cookTime: {
    type: String,
    required: [true, 'Cooking time is required']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink'],
      message: 'Category must be Breakfast, Lunch, Dinner, Dessert, Snack, or Drink'
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required for rating']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    review: {
      type: String,
      trim: true
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for search functionality
recipeSchema.index({ title: 'text', description: 'text', ingredients: 'text' });

// Virtual for total time
recipeSchema.virtual('totalTime').get(function() {
  return `${this.prepTime} + ${this.cookTime}`;
});

// Method to update average rating
recipeSchema.methods.updateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
    return;
  }
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  this.averageRating = sum / this.ratings.length;
};

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
