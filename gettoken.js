import { CallbackService } from 'vk-io';
import { DirectAuthorization, officialAppCredentials } from '@vk-io/authorization';
import path from 'path';
import read from 'fs';

const callbackService = new CallbackService();

let key = JSON.parse(read.readFileSync(path.resolve() + "/keys.json"));

const direct = new DirectAuthorization({
	callbackService,

	scope: 'all',

	// Direct authorization is only available for official applications
	...officialAppCredentials.android, // { clientId: string; clientSecret: string; }

	// Or manually provide app credentials
	// clientId: process.env.CLIENT_ID,
	// clientSecret: process.env.CLIENT_SECRET,

	// login: process.env.LOGIN,
	// password: process.env.PASSWORD
	// here you may simple put your login and password
	login: key.login,
	password: key.password
});

async function main () {
    const response = direct.run();
    console.log((await response).token);
    // console.log(key);
}

main().catch(console.error);