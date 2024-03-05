const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

function createBlobService(accountName, accountKey){
    const SharedCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const blobService = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        SharedCredential
        );
    return blobService;
}

async function getImage(accountName, accountKey, imagePath){
    const blobService = createBlobService(accountName, accountKey);
    const containerName = 'philosophers';
    const containeClient = blobService.getContainerClient(containerName);
    const blobClient = containeClient.getBlobClient(imagePath);
    const properties = await blobClient.getProperties();
    const response = await blobClient.download();
    return [response, properties]
}

module.exports = {getImage};