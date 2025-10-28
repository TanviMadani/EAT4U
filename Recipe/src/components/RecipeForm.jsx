import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/api';

const RecipeForm = ({ recipe = null }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: recipe?.title || '',
        description: recipe?.description || '',
        ingredients: recipe?.ingredients || [{ name: '', amount: '', unit: '' }],
        instructions: recipe?.instructions || [''],
        prepTime: recipe?.prepTime || '',
        cookTime: recipe?.cookTime || '',
        difficulty: recipe?.difficulty || 'Easy',
        category: recipe?.category || '',
        tags: recipe?.tags || [],
        image: null
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index][field] = value;
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const addIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [...formData.ingredients, { name: '', amount: '', unit: '' }]
        });
    };

    const removeIngredient = (index) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...formData.instructions];
        newInstructions[index] = value;
        setFormData({ ...formData, instructions: newInstructions });
    };

    const addInstruction = () => {
        setFormData({
            ...formData,
            instructions: [...formData.instructions, '']
        });
    };

    const removeInstruction = (index) => {
        const newInstructions = formData.instructions.filter((_, i) => i !== index);
        setFormData({ ...formData, instructions: newInstructions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (recipe) {
                await recipeAPI.updateRecipe(recipe._id, formData);
            } else {
                await recipeAPI.createRecipe(formData);
            }
            navigate('/recipes');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error saving recipe');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ingredients</label>
                {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Name"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            className="flex-1 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            value={ingredient.amount}
                            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                            className="w-24 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Unit"
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            className="w-24 p-2 border rounded"
                        />
                        <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addIngredient}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add Ingredient
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Instructions</label>
                {formData.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <textarea
                            value={instruction}
                            onChange={(e) => handleInstructionChange(index, e.target.value)}
                            className="flex-1 p-2 border rounded"
                            placeholder={`Step ${index + 1}`}
                        />
                        <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addInstruction}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add Step
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 mb-2">Prep Time</label>
                    <input
                        type="text"
                        name="prepTime"
                        value={formData.prepTime}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Cook Time</label>
                    <input
                        type="text"
                        name="cookTime"
                        value={formData.cookTime}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 mb-2">Difficulty</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded"
            >
                {recipe ? 'Update Recipe' : 'Create Recipe'}
            </button>
        </form>
    );
};

export default RecipeForm; 