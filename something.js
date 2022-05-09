import { VK } from 'vk-io';
import  read  from 'fs';
import path from 'path'

const __dirname = path.resolve();

let token = JSON.parse(read.readFileSync(__dirname + "/token.json")).token_group;


const vk = new VK({
  token: token
})

vk.updates.on('message', (context) => {

  console.log(context)
  
});

vk.updates.start().catch(console.error);