// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { beforeAll, describe, expect } from 'vitest';

import { MySoJsonRpcClient, JsonRpcHTTPTransport } from '../../../../src/jsonRpc/index.js';
import { MySoGrpcClient } from '../../../../src/grpc/index.js';
import { MySoGraphQLClient } from '../../../../src/graphql/index.js';
import type { ClientWithCoreApi } from '../../../../src/client/core.js';
import { createTestWithAllClients } from '../../utils/setup.js';

describe('Core API - MVR (Move Registry)', () => {
	let jsonRpcClient: ClientWithCoreApi;
	let grpcClient: ClientWithCoreApi;
	let graphqlClient: ClientWithCoreApi;

	// Named packages from Move Registry
	const fileStoragePackage = '@file-storage/sites';
	const orderbookPackage = '@orderbook/core';

	// MVR requires testnet, so we use custom client configuration
	const testWithAllClients = createTestWithAllClients(() => ({
		jsonRpc: jsonRpcClient,
		grpc: grpcClient,
		graphql: graphqlClient,
	}));

	beforeAll(async () => {
		// MVR requires testnet as it's not available in localnet
		const testnetJsonRpcUrl = 'https://fullnode.testnet.mysocial.network';
		const testnetGrpcUrl = 'https://fullnode.testnet.mysocial.network:443';

		jsonRpcClient = new MySoJsonRpcClient({
			network: 'testnet',
			transport: new JsonRpcHTTPTransport({
				url: testnetJsonRpcUrl,
			}),
		});
		grpcClient = new MySoGrpcClient({
			network: 'testnet',
			baseUrl: testnetGrpcUrl,
		});
		graphqlClient = new MySoGraphQLClient({
			network: 'testnet',
			url: 'https://graphql.testnet.mysocial.network/graphql',
		});
	});

	describe('MVR Package Resolution', () => {
		testWithAllClients('should resolve named package to package ID', async (client) => {
			const result = await client.core.mvr.resolvePackage({
				package: orderbookPackage,
			});

			expect(result.package).toBeDefined();
			expect(typeof result.package).toBe('string');
			expect(result.package).toMatch(/^0x[a-f0-9]+$/);
			// Package ID should be different from the named package
			expect(result.package).not.toBe(orderbookPackage);
		});

		testWithAllClients('should handle non-existent named package', async (client) => {
			const fakePackage = '@non/existent';

			await expect(
				client.core.mvr.resolvePackage({
					package: fakePackage,
				}),
			).rejects.toThrow();
		});
	});

	describe('MVR Type Resolution', () => {
		testWithAllClients('should resolve type with named package', async (client) => {
			const typeString = `${orderbookPackage}::pool::Pool`;

			const result = await client.core.mvr.resolveType({
				type: typeString,
			});

			expect(result.type).toBeDefined();
			expect(typeof result.type).toBe('string');
			// Should resolve to package ID address, not named package
			expect(result.type).toMatch(/^0x[a-f0-9]+::/);
			expect(result.type).not.toContain(orderbookPackage);
			expect(result.type).toContain('::pool::Pool');
		});

		testWithAllClients('should resolve generic type with named package', async (client) => {
			const typeString = `${orderbookPackage}::pool::Pool<0x2::myso::MYSO>`;

			const result = await client.core.mvr.resolveType({
				type: typeString,
			});

			expect(result.type).toBeDefined();
			expect(result.type).toMatch(/^0x[a-f0-9]+::/);
			expect(result.type).not.toContain(orderbookPackage);
			expect(result.type).toContain('::pool::Pool<');
		});

		testWithAllClients('should resolve type without MVR name (passthrough)', async (client) => {
			// Regular type without named package should pass through unchanged
			const typeString = `0x2::coin::Coin<0x2::myso::MYSO>`;

			const result = await client.core.mvr.resolveType({
				type: typeString,
			});

			expect(result.type).toBeDefined();
			expect(result.type).toBe(typeString);
		});
	});

	describe('MVR Batch Resolution', () => {
		testWithAllClients('should resolve multiple named packages at once', async (client) => {
			const result = await client.core.mvr.resolve({
				packages: [orderbookPackage, fileStoragePackage],
			});

			expect(result.packages).toBeDefined();
			expect(Object.keys(result.packages)).toHaveLength(2);
			expect(result.packages[orderbookPackage]).toBeDefined();
			expect(result.packages[orderbookPackage].package).toMatch(/^0x[a-f0-9]+$/);
			expect(result.packages[fileStoragePackage]).toBeDefined();
			expect(result.packages[fileStoragePackage].package).toMatch(/^0x[a-f0-9]+$/);
			// Should resolve to different IDs
			expect(result.packages[orderbookPackage].package).not.toBe(
				result.packages[fileStoragePackage].package,
			);
		});

		testWithAllClients('should resolve multiple types at once', async (client) => {
			const type1 = `${orderbookPackage}::pool::Pool`;
			const type2 = `${fileStoragePackage}::site::Site`;

			const result = await client.core.mvr.resolve({
				types: [type1, type2],
			});

			expect(result.types).toBeDefined();
			expect(Object.keys(result.types)).toHaveLength(2);
			expect(result.types[type1]).toBeDefined();
			expect(result.types[type1].type).toContain('::pool::Pool');
			expect(result.types[type2]).toBeDefined();
			expect(result.types[type2].type).toContain('::site::Site');
		});

		testWithAllClients('should resolve both packages and types together', async (client) => {
			const typeString = `${orderbookPackage}::pool::Pool`;

			const result = await client.core.mvr.resolve({
				packages: [orderbookPackage, fileStoragePackage],
				types: [typeString, `${fileStoragePackage}::site::Site`],
			});

			expect(result.packages).toBeDefined();
			expect(Object.keys(result.packages)).toHaveLength(2);
			expect(result.types).toBeDefined();
			expect(Object.keys(result.types)).toHaveLength(2);
		});

		testWithAllClients('should handle empty batch request', async (client) => {
			const result = await client.core.mvr.resolve({
				packages: [],
				types: [],
			});

			expect(result.packages).toBeDefined();
			expect(Object.keys(result.packages)).toHaveLength(0);
			expect(result.types).toBeDefined();
			expect(Object.keys(result.types)).toHaveLength(0);
		});
	});
});
