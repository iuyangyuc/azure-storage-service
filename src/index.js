require('dotenv').config();
const express = require('express');
const {getImage} = require('./file-storage');

if(!process.env.PORT || !process.env.STORAGE_ACCOUNT_NAME || !process.env.STORAGE_ACCESS_KEY){
    console.error('Missing environment variables. Please check the .env file');
    process.exit(1);
}

const PORT = process.env.PORT;
const accountName = process.env.STORAGE_ACCOUNT_NAME;
const accountKey = process.env.STORAGE_ACCESS_KEY;
const app = express();

app.get('/image', async (req, res) => {
    const imagePath = req.query.path;
    const [response, properties] = await getImage(accountName, accountKey, imagePath);
    res.writeHead(200, {
        'Content-Length': properties.contentLength,
        'Content-Type': "image/jpg"
    });
    response.readableStreamBody.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});