import { getRandomId, MessageContext, VK } from 'vk-io';
import read  from 'fs';
import {sendmessage} from './functions.js';
// import { request_select, request_update} from './requests.js';
import pg from 'pg'
import path from 'path';

async function main() {
	console.log("App running...");
	const keys = JSON.parse(read.readFileSync(path.resolve() + "/keys.json"));

	const first_group_id = keys.first_group_id;
	const token = keys.token;
	const my_uid = keys.my_number_page;

	const vk = new VK({
		token: token
	});

	let tmp = 2000000000;
	let delay = 500;

	let status = `(今は${new Date().getHours()}時だ) Now ${Date.now()} seconds`;
	let title_for_my_group = "愚かな名前達の墓地";
	let fields = 'screen_name,sex,status';
	// let lstFriends = await getfriends(vk, my_uid, fields 'hints');

	vk.updates.on('message', async (context, next) => {
		await context.loadMessagePayload();
		let content;
		let message;
		let reply_message;

		if (context.senderId == my_uid || context.senderId == context.peerId) {
			if (context.text != undefined) {
				message = context.text.split(' ');
				switch (message[0]) {
					case '/crypt':
						if (context.hasReplyMessage) {
							if (message[1] == 'base64' ||
							 	message[1] == 'hex') {

								reply_message = context.payload.message.reply_message.text;		
								await sendmessage(vk, context.peerId, Buffer.from(reply_message).toString(message[1]));
							} else {
								reply_message = context.payload.message.reply_message.text;		
								await sendmessage(vk, context.peerId, Buffer.from(reply_message).toString('base64url'));
							}

						} else {
							content = message.slice(1).join(' ');
							await sendmessage(vk, context.peerId, Buffer.from(content).toString('base64'));
							await messages_delete(vk, context.id, context.peerId);

						}
						break;
					case '/decrypt':
						if (context.hasReplyMessage) {
							console.log('After', context.payload.message);
							reply_message = context.payload.message.reply_message.text;		
							await sendmessage(vk, context.peerId, Buffer.from(reply_message, 'base64').toString('utf8'));
						
						} else {
							content = message.slice(1).join(' ');
							await sendmessage(vk, context.peerId, Buffer.from(content, 'base64').toString('utf8'));
							await messages_delete(vk, context.id, context.peerId);
						}
						break;
					case '/sendImage':
						context.sendPhotos({
							value: './cat.jpg',
							filename: 'cat.jpg',
							contentType: 'image/jpeg',
							// contentLength: ...
						});
						break;
					case '/sendaudio':
						
						break;
					case '/get_time':
						sendmessage(vk, context.peerId, `${Date.now()} seconds
						${new Date()}
						${new Date().getDate()}
						${new Date().getUTCDate()}
						${new Date().getFullYear()}`);
						break;
					case '/calc':
						let res;
						switch (message[2]) {
							case '*':
								res = Number(message[1]) * Number(message[3]);
								break;
							case '+':
								res = Number(message[1]) + Number(message[3]);
								break;
							case '/':
								res = Number(message[1]) / Number(message[3]);
								break;
							case '-':
								res = Number(message[1]) - Number(message[3]);
								break;
						}


						await sendmessage(vk, context.peerId, res);
						break;

				}

			}

		}

	});
	vk.updates.start();

}

main().catch(console.error);





