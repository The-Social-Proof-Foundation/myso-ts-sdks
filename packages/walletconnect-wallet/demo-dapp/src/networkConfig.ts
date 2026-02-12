// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { createNetworkConfig } from "@socialproof/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      network: "devnet",
      url: "https://fullnode.devnet.mysocial.network:443",
    },
    testnet: {
      network: "testnet",
      url: "https://fullnode.testnet.mysocial.network:443",
    },
    mainnet: {
      network: "mainnet",
      url: "https://fullnode.mainnet.mysocial.network:443",
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
