// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, test } from 'vitest';

import { isValidMySoNSName, normalizeMySoNSName } from '../../../src/utils/index.js';

describe('isValidMySoNSName', () => {
	test('valid MySoNS names', () => {
		expect(isValidMySoNSName('example.myso')).toBe(true);
		expect(isValidMySoNSName('EXAMPLE.myso')).toBe(true);
		expect(isValidMySoNSName('@example')).toBe(true);
		expect(isValidMySoNSName('1.example.myso')).toBe(true);
		expect(isValidMySoNSName('1@example')).toBe(true);
		expect(isValidMySoNSName('a.b.c.example.myso')).toBe(true);
		expect(isValidMySoNSName('A.B.c.123@Example')).toBe(true);
		expect(isValidMySoNSName('1-a@1-b')).toBe(true);
		expect(isValidMySoNSName('1-a.1-b.myso')).toBe(true);
		expect(isValidMySoNSName('-@test')).toBe(false);
		expect(isValidMySoNSName('-1@test')).toBe(false);
		expect(isValidMySoNSName('test@-')).toBe(false);
		expect(isValidMySoNSName('test@-1')).toBe(false);
		expect(isValidMySoNSName('test@-a')).toBe(false);
		expect(isValidMySoNSName('test.myso2')).toBe(false);
		expect(isValidMySoNSName('.myso2')).toBe(false);
		expect(isValidMySoNSName('test@')).toBe(false);
		expect(isValidMySoNSName('@@')).toBe(false);
		expect(isValidMySoNSName('@@test')).toBe(false);
		expect(isValidMySoNSName('test@test.test')).toBe(false);
		expect(isValidMySoNSName('@test.test')).toBe(false);
		expect(isValidMySoNSName('#@test')).toBe(false);
		expect(isValidMySoNSName('test@#')).toBe(false);
		expect(isValidMySoNSName('test.#.myso')).toBe(false);
		expect(isValidMySoNSName('#.myso')).toBe(false);
		expect(isValidMySoNSName('@.test.sue')).toBe(false);

		expect(isValidMySoNSName('hello-.myso')).toBe(false);
		expect(isValidMySoNSName('hello--.myso')).toBe(false);
		expect(isValidMySoNSName('hello.-myso')).toBe(false);
		expect(isValidMySoNSName('hello.--myso')).toBe(false);
		expect(isValidMySoNSName('hello.myso-')).toBe(false);
		expect(isValidMySoNSName('hello.myso--')).toBe(false);
		expect(isValidMySoNSName('hello-@myso')).toBe(false);
		expect(isValidMySoNSName('hello--@myso')).toBe(false);
		expect(isValidMySoNSName('hello@-myso')).toBe(false);
		expect(isValidMySoNSName('hello@--myso')).toBe(false);
		expect(isValidMySoNSName('hello@myso-')).toBe(false);
		expect(isValidMySoNSName('hello@myso--')).toBe(false);
		expect(isValidMySoNSName('hello--world@myso')).toBe(false);
	});
});

describe('normalizeMySoNSName', () => {
	test('normalize MySoNS names', () => {
		expect(normalizeMySoNSName('example.myso')).toMatch('@example');
		expect(normalizeMySoNSName('EXAMPLE.myso')).toMatch('@example');
		expect(normalizeMySoNSName('@example')).toMatch('@example');
		expect(normalizeMySoNSName('1.example.myso')).toMatch('1@example');
		expect(normalizeMySoNSName('1@example')).toMatch('1@example');
		expect(normalizeMySoNSName('a.b.c.example.myso')).toMatch('a.b.c@example');
		expect(normalizeMySoNSName('A.B.c.123@Example')).toMatch('a.b.c.123@example');
		expect(normalizeMySoNSName('1-a@1-b')).toMatch('1-a@1-b');
		expect(normalizeMySoNSName('1-a.1-b.myso')).toMatch('1-a@1-b');

		expect(normalizeMySoNSName('example.myso', 'dot')).toMatch('example.myso');
		expect(normalizeMySoNSName('EXAMPLE.myso', 'dot')).toMatch('example.myso');
		expect(normalizeMySoNSName('@example', 'dot')).toMatch('example.myso');
		expect(normalizeMySoNSName('1.example.myso', 'dot')).toMatch('1.example.myso');
		expect(normalizeMySoNSName('1@example', 'dot')).toMatch('1.example.myso');
		expect(normalizeMySoNSName('a.b.c.example.myso', 'dot')).toMatch('a.b.c.example.myso');
		expect(normalizeMySoNSName('A.B.c.123@Example', 'dot')).toMatch('a.b.c.123.example.myso');
		expect(normalizeMySoNSName('1-a@1-b', 'dot')).toMatch('1-a.1-b.myso');
		expect(normalizeMySoNSName('1-a.1-b.myso', 'dot')).toMatch('1-a.1-b.myso');

		expect(() => normalizeMySoNSName('-@test')).toThrowError('Invalid MySoNS name -@test');
		expect(normalizeMySoNSName('1-a@1-b')).toMatchInlineSnapshot('"1-a@1-b"');
		expect(normalizeMySoNSName('1-a.1-b.myso')).toMatchInlineSnapshot('"1-a@1-b"');
		expect(() => normalizeMySoNSName('-@test')).toThrowError('Invalid MySoNS name -@test');
		expect(() => normalizeMySoNSName('-1@test')).toThrowError('Invalid MySoNS name -1@test');
		expect(() => normalizeMySoNSName('test@-')).toThrowError('Invalid MySoNS name test@-');
		expect(() => normalizeMySoNSName('test@-1')).toThrowError('Invalid MySoNS name test@-1');
		expect(() => normalizeMySoNSName('test@-a')).toThrowError('Invalid MySoNS name test@-a');
		expect(() => normalizeMySoNSName('test.myso2')).toThrowError('Invalid MySoNS name test.myso2');
		expect(() => normalizeMySoNSName('.myso2')).toThrowError('Invalid MySoNS name .myso2');
		expect(() => normalizeMySoNSName('test@')).toThrowError('Invalid MySoNS name test@');
		expect(() => normalizeMySoNSName('@@')).toThrowError('Invalid MySoNS name @@');
		expect(() => normalizeMySoNSName('@@test')).toThrowError('Invalid MySoNS name @@test');
		expect(() => normalizeMySoNSName('test@test.test')).toThrowError(
			'Invalid MySoNS name test@test.test',
		);
		expect(() => normalizeMySoNSName('@test.test')).toThrowError('Invalid MySoNS name @test.test');
		expect(() => normalizeMySoNSName('#@test')).toThrowError('Invalid MySoNS name #@test');
		expect(() => normalizeMySoNSName('test@#')).toThrowError('Invalid MySoNS name test@#');
		expect(() => normalizeMySoNSName('test.#.myso')).toThrowError('Invalid MySoNS name test.#.myso');
		expect(() => normalizeMySoNSName('#.myso')).toThrowError('Invalid MySoNS name #.myso');
		expect(() => normalizeMySoNSName('@.test.sue')).toThrowError('Invalid MySoNS name @.test.sue');
	});
});
