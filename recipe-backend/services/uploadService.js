const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloud = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'recipe-images',
            resource_type: 'auto'
        });

        // Delete the file from local storage
        fs.unlinkSync(file.path);

        return result.secure_url;
    } catch (error) {
        // Delete the file from local storage in case of error
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        throw new Error('Failed to upload image to cloud storage');
    }
};

module.exports = {
    uploadToCloud
};
