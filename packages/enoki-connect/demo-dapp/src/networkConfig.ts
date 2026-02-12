// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { getJsonRpcFullnodeUrl } from "@socialproof/myso/jsonRpc";
import { createNetworkConfig } from "@socialproof/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      network: "devnet",
      url: getJsonRpcFullnodeUrl("devnet"),
    },
    testnet: {
      network: "testnet",
      url: getJsonRpcFullnodeUrl("testnet"),
    },
    mainnet: {
      network: "mainnet",
      url: getJsonRpcFullnodeUrl("mainnet"),
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
