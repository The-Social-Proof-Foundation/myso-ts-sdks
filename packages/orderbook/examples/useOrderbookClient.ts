// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { Transaction } from '@socialproof/myso/transactions';
import { config } from 'dotenv';

import { OrderbookMarketMaker } from './orderbookMarketMaker.js';

// Load private key from .env file
config();

(async () => {
	const privateKey = process.env.PRIVATE_KEY;
	if (!privateKey) {
		throw new Error('Private key not found. Set PRIVATE_KEY environment variable.');
	}

	// Initialize with balance managers if created
	const balanceManagers = {
		MANAGER_1: {
			address: '0x6149bfe6808f0d6a9db1c766552b7ae1df477f5885493436214ed4228e842393',
			tradeCap: '',
		},
	};
	const mmClient = new OrderbookMarketMaker(
		privateKey,
		'testnet',
		balanceManagers,
		process.env.ADMIN_CAP,
	);

	const tx = new Transaction();

	// Read only calls - access via client.orderbook
	console.log(await mmClient.client.orderbook.checkManagerBalance('MANAGER_1', 'MYSO'));
	console.log(await mmClient.client.orderbook.getLevel2Range('MYSO_DBUSDC', 0.1, 100, true));

	// // Balance manager contract call
	// mmClient.client.orderbook.balanceManager.depositIntoManager('MANAGER_1', 'MYSO', 10)(tx);

	// // Example PTB call
	// mmClient.placeLimitOrderExample(tx);
	// mmClient.flashLoanExample(tx);

	const res = await mmClient.signAndExecute(tx);

	console.dir(res, { depth: null });
})();
