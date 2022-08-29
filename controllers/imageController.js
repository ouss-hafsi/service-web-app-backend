// require('dotenv').config()
// const crypto = require('crypto');
// const express = require("express");
// const router = express.Router();
// const Employee = require("../models/Employee");


// const multer = require('multer')
// const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// // random images names
// const randomName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex')



// // DOTENV Variables
// const bucketName = process.env.BUCKET_NAME
// const region = process.env.BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY

// const s3 = new S3Client({
//     credentials: {
//       accessKeyId: accessKeyId,
//       secretAccessKey: secretAccessKey
//     },
//     region: region
//   })

  
// // MEMORY storage for multer
// const memoryStorage = multer.memoryStorage()
// const upload = multer({storage: memoryStorage})


// router.post('/', upload.single('image'), async (req,res) => {
//     console.log(req.file)
//     console.log(req.body)

//     const randomImageKey = randomName()

//     const params = {
//         Bucket: bucketName,
//         Key: randomImageKey,
//         Body: req.body.buffer,
//         ContentType: req.file.minetype
//     }

//     const command = new PutObjectCommand(params)
//     await s3.send(command)

//     const employeeImage = await Employee.create({...req.body, imageKey: randomImageKey})
//     // const populate = await employeeImage.populate('employee')
//     res.sendStatus(201)
// })


// router.get('/', async(req,res) => {
//     const employeeImage = await Employee.find({});
//     console.log(employeeImage)

//  for (const image of employeeImage) {
// console.log(image.imageKey)
//      const getObjectParams = {
//          Bucket: bucketName,
//          Key: image.imageKey
//      }
 
//      const command = new GetObjectCommand(getObjectParams);
//      const url = await getSignedUrl(s3, command, {expiresIn:3600})
//      image.pictureUrl = url
//  }   
// // console.log(employeeImage)
//     res.send(employeeImage)

// })


// module.exports = router
