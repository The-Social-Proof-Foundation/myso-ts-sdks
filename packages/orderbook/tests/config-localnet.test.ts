// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoClientTypes } from '@socialproof/myso/client';
import { afterEach, describe, expect, it } from 'vitest';

import { localnetPackageIds, localnetPythConfigs } from '../src/utils/constants.js';
import {
	OrderbookConfig,
	PYTH_HERMES_MAINNET,
	PYTH_HERMES_NON_MAINNET,
	resolvePythHermesBaseUrl,
} from '../src/utils/config.js';

describe('resolvePythHermesBaseUrl', () => {
	const prev = process.env.PYTH_HERMES_URL;

	afterEach(() => {
		if (prev === undefined) {
			delete process.env.PYTH_HERMES_URL;
		} else {
			process.env.PYTH_HERMES_URL = prev;
		}
	});

	it('uses mainnet Hermes only for mainnet when no override', () => {
		delete process.env.PYTH_HERMES_URL;
		expect(resolvePythHermesBaseUrl('mainnet')).toBe(PYTH_HERMES_MAINNET);
	});

	it('uses beta Hermes for non-mainnet networks', () => {
		delete process.env.PYTH_HERMES_URL;
		expect(resolvePythHermesBaseUrl('testnet')).toBe(PYTH_HERMES_NON_MAINNET);
		expect(resolvePythHermesBaseUrl('localnet')).toBe(PYTH_HERMES_NON_MAINNET);
		expect(resolvePythHermesBaseUrl('devnet')).toBe(PYTH_HERMES_NON_MAINNET);
	});

	it('prefers explicit URL over env and network', () => {
		process.env.PYTH_HERMES_URL = 'http://from-env.example';
		expect(resolvePythHermesBaseUrl('mainnet', { explicitUrl: 'http://explicit.example' })).toBe(
			'http://explicit.example',
		);
	});

	it('prefers PYTH_HERMES_URL over network default', () => {
		process.env.PYTH_HERMES_URL = 'http://from-env.example';
		expect(resolvePythHermesBaseUrl('mainnet')).toBe('http://from-env.example');
	});
});

describe('OrderbookConfig localnet', () => {
	it('accepts localnet and devnet and uses localnet profile', () => {
		const local = new OrderbookConfig({ network: 'localnet', address: '0x1' });
		expect(local.network).toBe('localnet');
		expect(local.REGISTRY_ID).toBe(localnetPackageIds.REGISTRY_ID);

		const dev = new OrderbookConfig({ network: 'devnet', address: '0x1' });
		expect(dev.network).toBe('devnet');
		expect(dev.REGISTRY_ID).toBe(localnetPackageIds.REGISTRY_ID);
	});

	it('merges deployment packageIds and pyth over localnet defaults', () => {
		const c = new OrderbookConfig({
			network: 'localnet',
			address: '0x1',
			deployment: {
				packageIds: { REGISTRY_ID: '0xbeef' },
				pyth: { pythStateId: '0xaaa' },
			},
		});
		expect(c.REGISTRY_ID).toBe('0xbeef');
		expect(c.ORDERBOOK_PACKAGE_ID).toBe(localnetPackageIds.ORDERBOOK_PACKAGE_ID);
		expect(c.pyth.pythStateId).toBe('0xaaa');
		expect(c.pyth.wormholeStateId).toBe(localnetPythConfigs.wormholeStateId);
	});

	it('throws for unsupported network string', () => {
		expect(
			() =>
				new OrderbookConfig({
					network: 'unknown-fabric' as MySoClientTypes.Network,
					address: '0x1',
				}),
		).toThrow(/Orderbook supports/);
	});
});
