// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
'use client';

import Script from 'next/script';

export default function CloudFlareAnalytics() {
	return (
		<Script
			defer
			src="https://static.cloudflareinsights.com/beacon.min.js"
			data-cf-beacon='{"token": "e5b9b395eb1e48a4b003705000860bb8"}'
		/>
	);
}
