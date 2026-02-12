// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

const MYSO_NS_NAME_REGEX =
	/^(?!.*(^(?!@)|[-.@])($|[-.@]))(?:[a-z0-9-]{0,63}(?:\.[a-z0-9-]{0,63})*)?@[a-z0-9-]{0,63}$/i;
const MYSO_NS_DOMAIN_REGEX = /^(?!.*(^|[-.])($|[-.]))(?:[a-z0-9-]{0,63}\.)+myso$/i;
const MAX_MYSO_NS_NAME_LENGTH = 235;

export function isValidMySoNSName(name: string): boolean {
	if (name.length > MAX_MYSO_NS_NAME_LENGTH) {
		return false;
	}

	if (name.includes('@')) {
		return MYSO_NS_NAME_REGEX.test(name);
	}

	return MYSO_NS_DOMAIN_REGEX.test(name);
}

export function normalizeMySoNSName(name: string, format: 'at' | 'dot' = 'at'): string {
	const lowerCase = name.toLowerCase();
	let parts;

	if (lowerCase.includes('@')) {
		if (!MYSO_NS_NAME_REGEX.test(lowerCase)) {
			throw new Error(`Invalid MySoNS name ${name}`);
		}
		const [labels, domain] = lowerCase.split('@');
		parts = [...(labels ? labels.split('.') : []), domain];
	} else {
		if (!MYSO_NS_DOMAIN_REGEX.test(lowerCase)) {
			throw new Error(`Invalid MySoNS name ${name}`);
		}
		parts = lowerCase.split('.').slice(0, -1);
	}

	if (format === 'dot') {
		return `${parts.join('.')}.myso`;
	}

	return `${parts.slice(0, -1).join('.')}@${parts[parts.length - 1]}`;
}
