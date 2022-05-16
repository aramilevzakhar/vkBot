import { getRandomId } from 'vk-io';


export async function groupedit (vk, group_id, title) {
	await vk.api.groups.edit({
		group_id: group_id,
		title: title
	});
}

export async function messages_delete(vk, message_ids, peer_id) {
	await vk.api.messages.delete({
		message_ids: message_ids,
		peer_id: peer_id
	});
}

export async function getmessage (vk) {
	let lstMessages = await vk.api.messages.get({
		// count: 100,
		// count: 200,
		// offset: 3,
		// filters: 8,

		preview_length: 0

	});
	return lstMessages;
}



export async function sendmessage (vk, id, message) {
	let resutl = await vk.api.messages.send({
		// peer_id: 2000000000 + 15,
		// peer_id: 326813811,
		// peer_id: 2000000000 + 124,
		peer_id: id,
		random_id: getRandomId(),
		
		message: message
	})
}


export async function getgroups (vk) {
	let lstusersgroup = await vk.api.groups.get({
		extended: 1,
		
	})
}


export async function getfriends (vk, user_id, fields, order, lang=0) {
	let lstmyfriends = await vk.api.friends.get({
			user_id: user_id,
			fields: fields,
			order: order,
			lang: lang
	})
	return lstmyfriends;
}

export async function getchatusers (vk, id, fields, lang='ru') {
	let idUsersMessage = await vk.api.messages.getChatUsers({
		chat_id: id,
		fields: fields,
		lang: lang
	});
	return idUsersMessage;
}

export async function getsettings (vk, group_id) {
	let groupsSettings = await vk.api.groups.getSettings({
		group_id: group_id
	});
	return groupsSettings;
}


export async function setstatus (vk, id, text) {
	let result = await vk.api.status.set({
		group_id: id,
		text: text
	});

	return result;
}


export async function getPollConnection () {
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
