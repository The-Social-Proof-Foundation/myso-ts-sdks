// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { buildApplication, buildRouteMap } from '@stricli/core';
import { buildInstallCommand, buildUninstallCommand } from '@stricli/auto-complete';
import { generateCommand } from './commands/generate/command.js';

export function buildCli(version: string) {
	const routes = buildRouteMap({
		routes: {
			generate: generateCommand,
			install: buildInstallCommand('myso-ts-codegen', { bash: '__myso-ts-codegen_bash_complete' }),
			uninstall: buildUninstallCommand('myso-ts-codegen', { bash: true }),
		},
		docs: {
			brief: 'Generate TypeScript bindings for your Move code',
			hideRoute: {
				install: true,
				uninstall: true,
			},
		},
	});

	return buildApplication(routes, {
		name: 'myso-ts-codegen',
		versionInfo: {
			currentVersion: version,
		},
	});
}
