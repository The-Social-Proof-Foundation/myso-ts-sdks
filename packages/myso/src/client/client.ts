// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { Simplify, UnionToIntersection } from '@socialproof/utils';
import { ClientCache } from './cache.js';
import type { CoreClient } from './core.js';
import type { ClientWithExtensions, MySoClientTypes, MySoClientRegistration } from './types.js';

export abstract class BaseClient {
	network: MySoClientTypes.Network;
	cache: ClientCache;
	base: BaseClient;

	constructor({
		network,
		base,
		cache = base?.cache ?? new ClientCache(),
	}: MySoClientTypes.MySoClientOptions) {
		this.network = network;
		this.base = base ?? this;
		this.cache = cache;
	}

	abstract core: CoreClient;

	$extend<const Registrations extends MySoClientRegistration<this>[]>(
		...registrations: Registrations
	) {
		const extensions: Record<string, unknown> = Object.fromEntries(
			registrations.map((registration) => {
				return [registration.name, registration.register(this)];
			}),
		);

		const methodCache = new Map<string | symbol, Function>();

		return new Proxy(this, {
			get(target, prop, receiver) {
				if (typeof prop === 'string' && prop in extensions) {
					return extensions[prop];
				}
				const value = Reflect.get(target, prop, receiver);
				if (typeof value === 'function') {
					if (prop === '$extend') {
						return value.bind(receiver);
					}
					if (!methodCache.has(prop)) {
						methodCache.set(prop, value.bind(target));
					}
					return methodCache.get(prop);
				}
				return value;
			},
		}) as ClientWithExtensions<
			Simplify<
				UnionToIntersection<
					{
						[K in keyof Registrations]: Registrations[K] extends MySoClientRegistration<
							this,
							infer Name extends string,
							infer Extension
						>
							? {
									[K2 in Name]: Extension;
								}
							: never;
					}[number]
				>
			>,
			this
		>;
	}
}
