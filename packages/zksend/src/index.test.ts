// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoGrpcClient } from '@socialproof/myso/grpc';
import type { Keypair } from '@socialproof/myso/cryptography';
import { getFaucetHost, requestMySoFromFaucetV2 } from '@socialproof/myso/faucet';
import { Ed25519Keypair } from '@socialproof/myso/keypairs/ed25519';
import { Transaction } from '@socialproof/myso/transactions';
import { MIST_PER_MYSO } from '@socialproof/myso/utils';
import { beforeAll, describe, expect, test } from 'vitest';

import { zksend } from './index.js';

export const DEMO_BEAR_CONFIG = {
	packageId: '0xab8ed19f16874f9b8b66b0b6e325ee064848b1a7fdcb1c2f0478b17ad8574e65',
	type: '0xab8ed19f16874f9b8b66b0b6e325ee064848b1a7fdcb1c2f0478b17ad8574e65::demo_bear::DemoBear',
};

const client = new MySoGrpcClient({
	baseUrl: 'https://fullnode.testnet.mysocial.network:443',
	network: 'testnet',
}).$extend(zksend());

// address:  0x8ab2b2a5cfa538db19062b79622abe28f3171c8b8048c5957b01846d57574630
const keypair = Ed25519Keypair.fromSecretKey(
	'mysoprivkey1qz3v0pjxalg3z3p9p6lp4x84y74g0qt2y2q36amvkgfh9zzmm4q66y6ccdz',
);

// Automatically get gas from testnet is not working reliably, manually request gas via discord,
// or uncomment the beforeAll and gas function below
beforeAll(async () => {
	const balance = await client.core.getBalance({
		owner: keypair.toMySoAddress(),
	});

	if (Number(balance.balance.balance) < Number(MIST_PER_MYSO) * 0.02) {
		await getMySoFromFaucet(keypair);
	}
}, 30_000);

async function getMySoFromFaucet(keypair: Keypair) {
	const faucetHost = getFaucetHost('testnet');
	await requestMySoFromFaucetV2({
		host: faucetHost,
		recipient: keypair.toMySoAddress(),
	});
}

describe('Contract links', () => {
	test('create and claim link', async () => {
		const link = client.zksend.linkBuilder({
			sender: keypair.toMySoAddress(),
		});

		const bears = await createBears(3);

		for (const bear of bears) {
			link.addClaimableObject(bear.objectId);
		}

		link.addClaimableMist(100n);

		const linkUrl = link.getLink();

		await link.create({
			signer: keypair,
			waitForTransaction: true,
		});

		const claimLink = await client.zksend.loadLinkFromUrl(linkUrl);

		const claimableAssets = claimLink.assets!;

		expect(claimLink.claimed).toEqual(false);
		expect(claimableAssets.nfts.length).toEqual(3);
		expect(claimableAssets.balances).toMatchInlineSnapshot(`
				[
				  {
				    "amount": 100n,
				    "coinType": "0x0000000000000000000000000000000000000000000000000000000000000002::myso::MYSO",
				  },
				]
			`);

		const claim = await claimLink.claimAssets(keypair.toMySoAddress());

		const res = await client.core.waitForTransaction({
			result: claim,
			include: {
				effects: true,
			},
		});

		expect(res.Transaction?.effects?.changedObjects.length).toBeGreaterThanOrEqual(
			3 + // bears,
				1 + // coin
				1 + // gas
				1, // bag
		);

		const link2 = await client.zksend.loadLinkFromUrl(linkUrl);
		expect(link2.assets).toBeUndefined();
		expect(link2.claimed).toEqual(true);
	}, 30_000);

	test('regenerate links', async () => {
		const linkKp = new Ed25519Keypair();

		const link = client.zksend.linkBuilder({
			keypair: linkKp,
			sender: keypair.toMySoAddress(),
		});

		const bears = await createBears(3);

		for (const bear of bears) {
			link.addClaimableObject(bear.objectId);
		}

		link.addClaimableMist(100n);

		const createResult = await link.create({
			signer: keypair,
			waitForTransaction: true,
		});

		await client.core.waitForTransaction({ result: createResult });

		const lostLink = await client.zksend.loadLink({
			address: linkKp.toMySoAddress(),
		});

		const { url, transaction } = await lostLink.createRegenerateTransaction(
			keypair.toMySoAddress(),
			{ client },
		);

		const result = await keypair.signAndExecuteTransaction({
			transaction,
			client,
		});

		await client.core.waitForTransaction({ digest: result.Transaction!.digest });

		const claimLink = await client.zksend.loadLinkFromUrl(url);

		expect(claimLink.assets?.nfts.length).toEqual(3);
		expect(claimLink.assets?.balances).toMatchInlineSnapshot(`
				[
				  {
				    "amount": 100n,
				    "coinType": "0x0000000000000000000000000000000000000000000000000000000000000002::myso::MYSO",
				  },
				]
			`);

		const claim = await claimLink.claimAssets(keypair.toMySoAddress());

		const res = await client.core.waitForTransaction({
			result: claim,
			include: {
				effects: true,
			},
		});

		expect(res.Transaction?.effects?.changedObjects.length).toBeGreaterThanOrEqual(
			3 + // bears,
				1 + // coin
				1 + // gas
				1, // bag
		);
		const link2 = await client.zksend.loadLinkFromUrl(url);
		expect(link2.assets).toBeUndefined();
		expect(link2.claimed).toEqual(true);
	}, 30_000);

	test('reclaim links', async () => {
		const linkKp = new Ed25519Keypair();

		const link = client.zksend.linkBuilder({
			keypair: linkKp,
			sender: keypair.toMySoAddress(),
		});

		const bears = await createBears(3);

		for (const bear of bears) {
			link.addClaimableObject(bear.objectId);
		}

		link.addClaimableMist(100n);

		const createResult = await link.create({
			signer: keypair,
			waitForTransaction: true,
		});

		await client.core.waitForTransaction({ result: createResult });

		const lostLink = await client.zksend.loadLink({
			address: linkKp.toMySoAddress(),
		});

		const { Transaction: claimTx } = await lostLink.claimAssets(keypair.toMySoAddress(), {
			reclaim: true,
			sign: async (tx) => (await keypair.signTransaction(tx)).signature,
		});

		const result = await client.core.waitForTransaction({
			digest: claimTx!.digest,
			include: {
				effects: true,
			},
		});

		expect(result.Transaction?.effects?.changedObjects.length).toBeGreaterThanOrEqual(
			3 + // bears,
				1 + // coin
				1 + // gas
				1, // bag
		);
	}, 30_000);

	test('bulk link creation', async () => {
		const bears = await createBears(3);

		const links = [];
		for (const bear of bears) {
			const link = client.zksend.linkBuilder({
				sender: keypair.toMySoAddress(),
			});

			link.addClaimableMist(100n);
			link.addClaimableObject(bear.objectId);

			links.push(link);
		}

		const tx = await client.zksend.createLinks({ links });

		const result = await keypair.signAndExecuteTransaction({
			transaction: tx,
			client,
		});

		await client.core.waitForTransaction({ digest: result.Transaction!.digest });

		for (const link of links) {
			const linkUrl = link.getLink();

			const claimLink = await client.zksend.loadLinkFromUrl(linkUrl);

			const claimableAssets = claimLink.assets!;

			expect(claimLink.claimed).toEqual(false);
			expect(claimableAssets.nfts.length).toEqual(1);
			expect(claimableAssets.balances).toMatchInlineSnapshot(`
					[
					  {
					    "amount": 100n,
					    "coinType": "0x0000000000000000000000000000000000000000000000000000000000000002::myso::MYSO",
					  },
					]
				`);

			const claim = await claimLink.claimAssets(keypair.toMySoAddress());

			const res = await client.core.waitForTransaction({
				digest: claim.Transaction!.digest,
				include: {
					effects: true,
				},
			});

			expect(res.Transaction?.effects?.changedObjects.length).toBeGreaterThanOrEqual(
				1 + // bears,
					1 + // coin
					1 + // gas
					1, // bag
			);
		}
	}, 60_000);

	test('create link with minted assets', async () => {
		const link = client.zksend.linkBuilder({
			sender: keypair.toMySoAddress(),
		});

		const tx = new Transaction();

		for (let i = 0; i < 3; i++) {
			const bear = tx.moveCall({
				target: `${DEMO_BEAR_CONFIG.packageId}::demo_bear::new`,
				arguments: [tx.pure.string(`A happy bear - ${Math.floor(Math.random() * 1_000_000_000)}`)],
			});

			link.addClaimableObjectRef(bear, DEMO_BEAR_CONFIG.type);
		}

		link.addClaimableMist(100n);

		const linkUrl = link.getLink();

		await link.create({
			transaction: tx,
			signer: keypair,
			waitForTransaction: true,
		});

		const claimLink = await client.zksend.loadLinkFromUrl(linkUrl);

		const claimableAssets = claimLink.assets!;

		expect(claimLink.claimed).toEqual(false);
		expect(claimableAssets.nfts.length).toEqual(3);
		expect(claimableAssets.balances).toMatchInlineSnapshot(`
				[
				  {
				    "amount": 100n,
				    "coinType": "0x0000000000000000000000000000000000000000000000000000000000000002::myso::MYSO",
				  },
				]
			`);

		const claim = await claimLink.claimAssets(keypair.toMySoAddress());

		const res = await client.core.waitForTransaction({
			result: claim,
			include: {
				effects: true,
			},
		});

		expect(res.Transaction?.effects?.changedObjects.length).toBeGreaterThanOrEqual(
			3 + // bears,
				1 + // coin
				1 + // gas
				1, // bag
		);

		const link2 = await client.zksend.loadLinkFromUrl(linkUrl);
		expect(link2.assets).toBeUndefined();
		expect(link2.claimed).toEqual(true);
	}, 30_000);
});

async function createBears(totalBears: number) {
	const tx = new Transaction();
	const bears = [];

	for (let i = 0; i < totalBears; i++) {
		const bear = tx.moveCall({
			target: `${DEMO_BEAR_CONFIG.packageId}::demo_bear::new`,
			arguments: [tx.pure.string(`A happy bear - ${Math.floor(Math.random() * 1_000_000_000)}`)],
		});

		bears.push(bear);
	}

	tx.transferObjects(bears, tx.pure.address(keypair.toMySoAddress()));

	const res = await keypair.signAndExecuteTransaction({
		transaction: tx,
		client,
	});

	await client.core.waitForTransaction({
		digest: res.Transaction!.digest,
	});

	const objects = await client.core.getObjects({
		objectIds: res
			.Transaction!.effects!.changedObjects.filter((obj) => obj.idOperation === 'Created')
			.map((obj) => obj.objectId),
	});

	const bearList = objects.objects
		.filter(
			(obj): obj is Exclude<typeof obj, Error> =>
				!(obj instanceof Error) && obj.type.includes(DEMO_BEAR_CONFIG.type),
		)
		.map((obj) => {
			return {
				objectId: obj.objectId,
				type: obj.type,
			};
		});

	return bearList;
}
