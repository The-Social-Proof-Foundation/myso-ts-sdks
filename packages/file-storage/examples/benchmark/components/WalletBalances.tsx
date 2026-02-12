// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { useDAppKit, useCurrentClient } from '@socialproof/dapp-kit-react';
import { useState, useEffect, useCallback } from 'react';
import { MIST_PER_MYSO, parseStructTag } from '@socialproof/myso/utils';
import { coinWithBalance, Transaction } from '@socialproof/myso/transactions';
import { TESTNET_FILE_STORAGE_PACKAGE_CONFIG } from '../../../src/index.js';
import type { Signer } from '@socialproof/myso/cryptography';

interface WalletBalancesProps {
	onError: (error: string) => void;
	onTransaction: (digest: string) => void;
	isDisabled?: boolean;
	signer: Signer | null;
	refreshTrigger?: number;
}

const TESTNET_WAL_COIN_TYPE =
	'0x8270feb7375eee355e64fdb69c50abb6b5f9393a722883c1cf45f8e26048810a::wal::WAL';

export function WalletBalances({
	onError,
	onTransaction,
	isDisabled = false,
	signer,
	refreshTrigger,
}: WalletBalancesProps) {
	const dAppKit = useDAppKit();
	const mysoClient = useCurrentClient();
	const [isFunding, setIsFunding] = useState(false);
	const [isReturning, setIsReturning] = useState(false);
	const [isSwapping, setIsSwapping] = useState(false);
	const [walBalance, setWalBalance] = useState<string>('0');
	const [mysoBalance, setMySoBalance] = useState<string>('0');

	const formatBalance = (balance: string, decimals: number = 9): string => {
		const num = Number(balance) / Math.pow(10, decimals);
		return num.toFixed(4);
	};

	useEffect(() => {
		async function fetchBalances() {
			const addressToCheck = signer?.toMySoAddress();
			if (!addressToCheck) return;

			const [mysoBal, walBal] = await Promise.all([
				mysoClient.getBalance({ owner: addressToCheck, coinType: '0x2::myso::MYSO' }),
				mysoClient.getBalance({
					owner: addressToCheck,
					coinType: TESTNET_WAL_COIN_TYPE,
				}),
			]);

			setMySoBalance(mysoBal.balance.balance.toString());
			setWalBalance(walBal.balance.balance.toString());
		}

		fetchBalances().catch(onError);
	}, [refreshTrigger, signer, mysoClient, onError]);

	const fundKeypair = useCallback(async () => {
		if (!signer) return;

		setIsFunding(true);

		try {
			// Create a transaction to send 1 MYSO to the keypair
			const tx = new Transaction();
			const [coin] = tx.splitCoins(tx.gas, [1n * MIST_PER_MYSO]);
			tx.transferObjects([coin], signer.toMySoAddress());

			// Sign and execute the transaction
			const result = await dAppKit.signAndExecuteTransaction({ transaction: tx });
			const txDigest = result.Transaction?.digest ?? result.FailedTransaction?.digest;
			if (!txDigest) {
				throw new Error('Transaction failed: no digest returned');
			}

			onTransaction(txDigest);
		} catch (error) {
			const errorMessage = `Failed to fund keypair: ${error instanceof Error ? error.message : 'Unknown error'}`;
			onError(errorMessage);
		} finally {
			setIsFunding(false);
		}
	}, [signer, dAppKit, onError, onTransaction]);

	const returnFunds = useCallback(async () => {
		if (!signer) return;

		setIsReturning(true);

		try {
			const address = signer.toMySoAddress();
			const tx = new Transaction();
			tx.setSender(address);

			const coins = await mysoClient.listCoins({
				owner: signer.toMySoAddress(),
				coinType: TESTNET_WAL_COIN_TYPE,
			});

			if (coins.objects.length > 0) {
				if (coins.objects.length > 1) {
					tx.mergeCoins(
						coins.objects[0].objectId,
						coins.objects.slice(1).map((c: (typeof coins.objects)[0]) => c.objectId),
					);
				}
				tx.transferObjects([tx.gas, coins.objects[0].objectId], address);
			}

			const result = await signer.signAndExecuteTransaction({
				transaction: tx,
				client: mysoClient,
			});

			const digest = result.Transaction?.digest ?? result.FailedTransaction?.digest;
			if (!digest) {
				throw new Error('Transaction failed: no digest returned');
			}

			// Wait for transaction to be processed
			await mysoClient.waitForTransaction({ result });

			onTransaction(digest);
		} catch (error) {
			onError(
				`Failed to return funds: ${error instanceof Error ? error.message : 'Unknown error'}`,
			);
		} finally {
			setIsReturning(false);
		}
	}, [signer, mysoClient, onError, onTransaction]);

	const swapMySoForWal = useCallback(async () => {
		if (!signer) return;

		setIsSwapping(true);

		try {
			const address = signer.toMySoAddress();
			const tx = new Transaction();
			tx.setSender(address);

			const { object: exchange } = await mysoClient.getObject({
				objectId: TESTNET_FILE_STORAGE_PACKAGE_CONFIG.exchangeIds[0],
			});

			const exchangePackageId = parseStructTag(exchange.type).address;
			const wal = tx.moveCall({
				package: exchangePackageId,
				module: 'wal_exchange',
				function: 'exchange_all_for_wal',
				arguments: [
					tx.object(TESTNET_FILE_STORAGE_PACKAGE_CONFIG.exchangeIds[0]),
					coinWithBalance({
						balance: MIST_PER_MYSO / 2n,
					}),
				],
			});

			tx.transferObjects([wal], address);

			// Sign and execute with the keypair
			const txBytes = await tx.build({ client: mysoClient });
			const signedTx = await signer.signTransaction(txBytes);
			const result = await mysoClient.executeTransaction({
				transaction: txBytes,
				signatures: [signedTx.signature],
			});

			const txDigest = result.Transaction?.digest ?? result.FailedTransaction?.digest;
			if (!txDigest) {
				throw new Error('Transaction failed: no digest returned');
			}
			onTransaction(txDigest);
		} catch (error) {
			console.error('Swap failed:', error);
			onError(`Swap failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
		} finally {
			setIsSwapping(false);
		}
	}, [signer, mysoClient, onError, onTransaction]);

	return (
		<div style={{ marginBottom: '15px' }}>
			<h3 style={{ margin: '0 0 10px 0' }}>Keypair Balances</h3>
			<div style={{ marginBottom: '10px' }}>
				<strong>MYSO:</strong> {formatBalance(mysoBalance)} MYSO
				<span style={{ margin: '0 15px' }}>•</span>
				<strong>WAL:</strong> {formatBalance(walBalance)} WAL
			</div>
			<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
				<button
					type="button"
					onClick={fundKeypair}
					disabled={isFunding || isDisabled || !signer}
					style={{
						padding: '8px 16px',
						backgroundColor: isFunding || isDisabled || !signer ? '#ccc' : '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: isFunding || isDisabled || !signer ? 'not-allowed' : 'pointer',
						fontSize: '14px',
					}}
				>
					{isFunding ? 'Funding...' : 'Fund with 1 MYSO'}
				</button>

				<button
					type="button"
					onClick={swapMySoForWal}
					disabled={isSwapping || isDisabled || !signer}
					style={{
						padding: '8px 16px',
						backgroundColor: isSwapping || isDisabled || !signer ? '#ccc' : '#28a745',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: isSwapping || isDisabled || !signer ? 'not-allowed' : 'pointer',
						fontSize: '14px',
					}}
				>
					{isSwapping ? 'Swapping...' : 'Swap 0.5 MYSO for WAL'}
				</button>

				<button
					type="button"
					onClick={returnFunds}
					disabled={isReturning || isDisabled || !signer}
					style={{
						padding: '8px 16px',
						backgroundColor: isReturning || isDisabled || !signer ? '#ccc' : '#dc3545',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: isReturning || isDisabled || !signer ? 'not-allowed' : 'pointer',
						fontSize: '14px',
					}}
				>
					{isReturning ? 'Returning...' : 'Return All Funds'}
				</button>
			</div>
		</div>
	);
}
