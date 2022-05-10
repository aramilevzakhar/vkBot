//import { VK } from 'vk-io';
//import  read  from 'fs';
//import path from 'path'
//
//const __dirname = path.resolve();
//
//let token = JSON.parse(read.readFileSync(__dirname + "/token.json")).token_group;
//
//
//const vk = new VK({
//  token: token
//})
//
//vk.updates.on('message', (context) => {
//
//  console.log(context)
//  
//});
//
//vk.updates.start().catch(console.error);



import QRCode from 'qrcode';
import fs from 'fs';
let text = 'Hello gay!';


// QRCode.toDataURL('I am a pony ddfsdao owe ow weo rwo wwe rwo oweriwerw !', function (err, url) {
//   console.log(url)
//   url = url.toString('ASCII')
//   console.log(url)
//   fs.writeFile('output.png', url, (err) => {
//     console.log(err);
//   });
 
// })

// const QRCode = require('qrcode')

// QRCode.toFile('filename.png', 'Some text', {
//   color: {
//     dark: '#00F',  // Blue dots
//     light: '#0000' // Transparent background
//   }
// }, function (err) {
//   if (err) throw err
//   console.log('done')
// })


QRCode.toFile('filename.png', 'Some text', function (err) {
  if (err) throw err
  console.log('done')
})

// QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
//   console.log(url)
// })
