export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

export const validateUsername = (username) => {
    // 3-20 characters, letters, numbers, underscores
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};

export const validateRecipeTitle = (title) => {
    return title.length >= 3 && title.length <= 100;
};

export const validateRecipeDescription = (description) => {
    return description.length >= 10 && description.length <= 1000;
};

export const validateRecipeInstructions = (instructions) => {
    return instructions.length >= 20;
};

export const validateReviewContent = (content) => {
    return content.length >= 10 && content.length <= 500;
};

export const validateRating = (rating) => {
    return rating >= 1 && rating <= 5;
};

export const getValidationMessages = {
    email: {
        required: 'Email is required',
        invalid: 'Please enter a valid email address'
    },
    password: {
        required: 'Password is required',
        invalid: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
    },
    username: {
        required: 'Username is required',
        invalid: 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores'
    },
    recipeTitle: {
        required: 'Recipe title is required',
        invalid: 'Title must be between 3 and 100 characters long'
    },
    recipeDescription: {
        required: 'Recipe description is required',
        invalid: 'Description must be between 10 and 1000 characters long'
    },
    recipeInstructions: {
        required: 'Recipe instructions are required',
        invalid: 'Instructions must be at least 20 characters long'
    },
    reviewContent: {
        required: 'Review content is required',
        invalid: 'Review must be between 10 and 500 characters long'
    },
    rating: {
        required: 'Rating is required',
        invalid: 'Rating must be between 1 and 5'
    }
};

export const validateForm = (formData, validationRules) => {
    const errors = {};
    
    for (const [field, rules] of Object.entries(validationRules)) {
        const value = formData[field];
        
        if (rules.required && !value) {
            errors[field] = getValidationMessages[field].required;
            continue;
        }
        
        if (value) {
            switch (field) {
                case 'email':
                    if (!validateEmail(value)) {
                        errors[field] = getValidationMessages.email.invalid;
                    }
                    break;
                case 'password':
                    if (!validatePassword(value)) {
                        errors[field] = getValidationMessages.password.invalid;
                    }
                    break;
                case 'username':
                    if (!validateUsername(value)) {
                        errors[field] = getValidationMessages.username.invalid;
                    }
                    break;
                case 'title':
                    if (!validateRecipeTitle(value)) {
                        errors[field] = getValidationMessages.recipeTitle.invalid;
                    }
                    break;
                case 'description':
                    if (!validateRecipeDescription(value)) {
                        errors[field] = getValidationMessages.recipeDescription.invalid;
                    }
                    break;
                case 'instructions':
                    if (!validateRecipeInstructions(value)) {
                        errors[field] = getValidationMessages.recipeInstructions.invalid;
                    }
                    break;
                case 'content':
                    if (!validateReviewContent(value)) {
                        errors[field] = getValidationMessages.reviewContent.invalid;
                    }
                    break;
                case 'rating':
                    if (!validateRating(value)) {
                        errors[field] = getValidationMessages.rating.invalid;
                    }
                    break;
            }
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}; 