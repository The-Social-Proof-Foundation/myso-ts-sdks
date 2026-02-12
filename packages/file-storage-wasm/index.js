// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

const wasm = require('./nodejs/file_storage_wasm.js');
function init() {}
module.exports = init;
Object.assign(module.exports, wasm, { default: init });
