const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

const streamifier = require('streamifier')

let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        )
        streamifier.createReadStream(buffer).pipe(stream);
    })

}

module.exports = async (buffer) => {
    let result = await streamUpload(buffer);
    return result.secure_url;
}