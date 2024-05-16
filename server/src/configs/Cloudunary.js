const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dmdr5dwt0',
    api_key: '895798225777245',
    api_secret: '***************************',
});

module.exports = cloudinary;
