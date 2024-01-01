const fs = require('fs');
const path = require('path');

const imagePath = `C:\\Users\\mahes\\Documents\\Learning\\MERN\\Week7_Vite_Course_Selling_App_Recoil\\src\\assets\\2.jpg`; // Replace with your image path
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = imageBuffer.toString('base64');

console.log(base64Image);