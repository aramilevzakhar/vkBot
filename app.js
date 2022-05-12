// import { CallbackService, Context } from 'vk-io';
// import { DirectAuthorization, officialAppCredentials } from '@vk-io/authorization';
import { getRandomId, MessageContext, VK } from 'vk-io';
// import { SessionManager } from '@vk-io/session';
// import { readlien } from 'readline';
// import readline from 'readline';
import read  from 'fs';
// import { MessageContext } from 'vk-io';

// import { pg } from 'pg';
// const callbackService = new CallbackService();
import pg from 'pg'

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import path from 'path';
// import { send } from 'process';
// import { continueSession } from 'pg/lib/sasl';
// import { nextTick } from 'process';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log(dirname.)


/*
const direct = new DirectAuthorization({
	callbackService,

	scope: 'all',

	// Direct authorization is only available for official applications
	...officialAppCredentials.android, // { clientId: string; clientSecret: string; }

	// Or manually provide app credentials
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,

	login: process.env.LOGIN,
	password: process.env.PASSWORD
});
*/



async function groupedit(vk, group_id, title) {
	await vk.api.groups.edit({
		group_id: group_id,
		title: title
	});
}
async function messages_delete(vk, message_ids, peer_id) {
	await vk.api.messages.delete({
		message_ids: message_ids,
		peer_id: peer_id
	});
}

async function getmessage(vk) {
	let lstMessages = await vk.api.messages.get({
		// count: 100,
		// count: 200,
		// offset: 3,
		// filters: 8,

		preview_length: 0

	});
	return lstMessages;
}
async function sendmessage(vk, id, message) {
	let resutl = await vk.api.messages.send({
		// peer_id: 2000000000 + 15,
		// peer_id: 326813811,
		// peer_id: 2000000000 + 124,
		peer_id: id,
		random_id: getRandomId(),
		
		message: message
	})
}
async function getgroups(vk) {
	let lstusersgroup = await vk.api.groups.get({
		extended: 1,
		
	})
}
async function getfriends(vk, user_id, fields, order, lang=0) {
	let lstmyfriends = await vk.api.friends.get({
			user_id: user_id,
			fields: fields,
			order: order,
			lang: lang
	})
	return lstmyfriends;
}
async function getchatusers(vk, id, fields, lang='ru') {
	let idUsersMessage = await vk.api.messages.getChatUsers({
		chat_id: id,
		fields: fields,
		lang: lang
	});
	return idUsersMessage;
}
async function getsettings(vk, group_id) {
	let groupsSettings = await vk.api.groups.getSettings({
		group_id: group_id
	});
	return groupsSettings;
}
async function setstatus(vk, id, text) {
	let result = await vk.api.status.set({
		group_id: id,
		text: text
	});

	return result;
}
async function getPollConnection() {
	const pool = new pg.Pool({
		user: 'postgres',
		host: 'localhost',
		database: 'postgres',
		password: 'anime',
		port: 6666,
	})
	pool.connect();
	return pool;

}

async function main() {
	// const response = await direct.run();

	const __dirname = path.resolve();
	console.log("App running...");
	const obj_token = JSON.parse(read.readFileSync(__dirname + "/token.json"));
	const first_group_id = obj_token.first_group_id;
	const token = obj_token.token;
	const my_uid = obj_token.my_number_page;

	const vk = new VK({
		// token: response.token
		token: token
	});




	
	let tmp = 2000000000;
	// let id = tmp + 15;
	let delay = 500;
	// let result = await getchatusers(vk, 15);
	// console.log(result);

	let status = `(今は${new Date().getHours()}時だ) Now ${Date.now()} seconds`;
	let title_for_my_group = "愚かな名前達の墓地";
	let fields = 'screen_name,sex,status';

	// let lstFriends = await getfriends(vk, my_uid, fields 'hints');






	// console.log(lstFriends['items']);
	// console.log(lstmygroup['items']);
	// console.log(my_uid);
	// const client = new pg.Client();

	// console.log(lstmygroup);






	let text = '';
	vk.updates.on('message', async (context, next) => {

		console.log(context);
		// if (context.peerId == )
		let content;
		let message;
		let reply_message;

		if (context.senderId == my_uid || context.senderId == context.peerId) {

			if (context.text != undefined) {
				message = context.text.split(' ');
			

				switch (message[0]) {

					case '/crypt':
						if (context.hasReplyMessage) {
							await context.loadMessagePayload();
							console.log('After', Buffer.from(context.payload.message.text, 'utf-8').toString('hex'));
							reply_message = context.payload.message.reply_message.text;			
							await sendmessage(vk, context.peerId, Buffer.from(reply_message).toString('base64'));


						} else {
							content = message.slice(1).join(' ');
							await sendmessage(vk, context.peerId, Buffer.from(content).toString('base64'));
							await messages_delete(vk, context.id, context.peerId);


						}
						break;
				
					case '/decrypt':
						if (context.hasReplyMessage) {
							await context.loadMessagePayload();
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

					case '/getTimeNow':
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
						// res = Number(message[1]) + Number(message[2]);

						await sendmessage(vk, context.peerId, res);
						break;
					case '/getgovno':
						const pool = await getPollConnection();

						let tablename = 'status_people';
						let request_select = `select status from ${tablename} where id=(SELECT floor(random()*((select COUNT(*) from ${tablename})-1+1))+1)`;
						let res11;
						// vk.setCaptchaHandler(async ({ src }, retry) => {
						// 	const response = await fetch(src);
						// 	const buffer = await response.buffer();
						
						// 	const base64Captcha = `data:${response.headers.get('content-type')};base64,${buffer.toString('base64')}`;
						
						// 	const key = await myAwesomeCaptchaHandler(base64Captcha);
						
						// 	try {
						// 		await retry(key);
						
						// 		console.log('Капча успешно решена');
						// 	} catch (error) {
						// 		console.log('Капча неверная');
						// 	}
						// });
						// for (let i=0;i<Number(message[1]);i++) {
						pool.query(request_select, async (err, res) => {
							console.log(res);
							sendmessage(vk, context.peerId, res.rows[0].status);
						});
						// }
						// console.log(res11);


						
						
						/*
						let lstusers = await getchatusers(vk, 115, fields);

						let tablename = 'table1';

						let lastname;
						let firstname;
						let id_page;
						let screenname;
						let age;
						let user_status;
						let sex;
						let column;
											
						
						
						lstusers.forEach(element => {
							lastname = element.last_name;
							firstname = element.first_name;
							id_page = element.id;
							screenname = element.screen_name;
							user_status = element.status;
							sex = element.sex;
					
							
							let request_insert = `
							insert into ${tablename} (
								firstname, 
								lastname, 
								id_page, 
								screenname,
								status,
								sex
							) values (
								'${firstname}', 
								'${lastname}', 
								${id_page}, 
								'${screenname}',
								'${user_status}',
								${sex}
							);`;

							let request_update = `update ${tablename} set sex=${sex} where id_page=${id_page};`;
							console.log(request_insert);
				
							pool.query(request_insert,	(res, err) => {
								console.log(`result is: ${res}\nError is: ${err}`);
							});
						});
						*/


						break;
				}



			}

			// vk.updates.stop();
		}
	});
	
	// console.log("Hello123");
	// vk.updates.startPolling();
	vk.updates.start();


	// console.log("")
	/*
	lst_name.forEach(element => {
		lastname = element.last_name;
		firstname = element.first_name;
		id_page = element.id;
		screenname = element.screen_name;
		user_status = element.status;
		sex = element.sex;

		
		

		
		let request_update = `
		update ${tablename} 
		set sex=${sex} 
		where id_page=${id_page};`

		
		console.log(request_insert);

		pool.query(request_insert,	(res, err) => {
			console.log(`result is: ${res}\nError is: ${err}`);
		});

		


		
		// pool.query(request_insert, (res, err) => {
		// 	console.log(`result is: ${res}\nError is: ${err}`);
		// });
		
	});
	*/

	
	// await vk.updates.start();
	// vk.updates.startPolling();
	// while (true) {
	// 	// console.log('hello')
	// 	// vk.updates.on('message', (context) => {
	// 	// 	console.log(context.type);
	// 	// })
	// 	vk.updates.on('message', (context, next) => {
	// 		if (!context.isOutbox) {
	// 			return;
	// 		}
		
	// 		return next();
	// 	});
	// }	

	// setInterval(sendmessage, delay, vk, id, "Привет мой друг!");
	
}

main().catch(console.error);







// console.log('Token:', response.token);
// console.log('Expires:', response.expires);
// console.log('Email:', response.email);
// console.log('User ID:', response.userId);
// const answer = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// })
// const b = answer.question('Who are you?', name => {
// 	console.log(`Hey there ${name}!`);
// 	answer.close();
// });
// console.log(b)
// Orokana namae-tachi bochi.
// console.table(idUsersMessage);
// console.table(lstMyFriends['items']);
// res = res['items']
// let p1 = res['id']
// let p2 = res['screen_name']
// console.log(p1)
// res['items'].forEach(element => {
// 	console.table({id: element.id, name: element.name, screen_name: element.screen_name}, [id]);
// });
// console.log(res.items)
// var result = [];
// res = res.items;
// delete res.photo_50;
// for (var i = 0; i < res.length; i++) {
// 		var item = res[i];
// 		result.push({id: item.id, screen_name: item.screen_name, name: item.name})
// 		// console.log(item);
// 		// for (var key in item) {
// 		// 	// console.log(item)
// 		// 	if (!(key in result)) {
// 		// 		// console.log(key);
// 		// 		result[key] = [];
// 		// 	}
// 		// 	result[key].push(item[key]);
// 		// }
// }
// console.table(result);
// let result = {res};
// Object.keys(res).forEach(e => typeof res[e] === 'id' ? result.push(res[e]) : null);
// console.info(result);
// for (let i=0;i<res.count;i++)
// res['items'].forEach(elem => {
// 	// console.group(`${elem['id']} ${elem['screen_name']} ${elem['name']}`);
// 	// [id, screen_name, name] = [elem[id, screen_name, name]]
// })
// let elem = res['items'].filter();
// console.log(elem)
// console.table([elem['id'], elem['screen_name'], elem['name']]);
// console.group()
// officialAppCredentials.vkMe.clientId

// async function run() {
// 	// const upload_photo = await vk.api.photos.getWallUploadServer({
// 	// 	group_id: -my_gid
// 	// })
// 	// const data = {
// 	// 	method: "POST",
// 	// 	photo: "./1321.jpg",
// 	// 	method: 'POST',
// 	// 	output_format: 'multipart/form-data'
// 	// }


// 	const result = await vk.api.messages.send({
// 		peer_id: 2000000000 + 15,
// 		random_id: getRandomId(),
	
// 		message: 'Hello!'
// 	});
	// const res = await vk.api.messages.getChat({
		
	// })
	// console.log(res);
	// await vk.message.send({
	// 	text: "Hello",
	// 	user: 137407791
	// });
	// vk.upload.album({
	// 	album_id: -212972585,
	// 	source: [
	// 		/* Загрузка через ReadStream */
	// 		fs.createReadStream(__dirname+'/image/1321.jpg'),

	// 	]
	// })
	// .then((photos) => {
	// 	console.log('Загруженные фотографии:',photos);
	// })
	// .catch((error) => {
	// 	console.error(error);
	// })
	// let res = await vk.upload.ownerPhoto({
  //   owner_id: -my_gid,
  //   source: {
  //       value: "./1321.jpg"
  //   }
	// });
	// console.log(res);
	// const result = await request.post({
	// 	headers: {
	// 		'content-type': 'multipart/form-data',
	
	// 	},
	// 	url: upload_photo['upload_url'],
	// 	photo: [fs.readFileSync(__dirname + '/1321.jpg')]
	// });
	// console.log(upload_photo['upload_url'])
	
// }
// run().catch(console.log);








