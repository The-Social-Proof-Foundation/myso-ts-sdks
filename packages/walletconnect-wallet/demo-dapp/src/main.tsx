// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import ReactDOM from "react-dom/client";
import "@socialproof/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";

import { MySoClientProvider, WalletProvider } from "@socialproof/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import { networkConfig } from "./networkConfig.ts";
import { registerWalletConnectWallet } from "@socialproof/walletconnect-wallet";
import { MySoGrpcClient } from "@socialproof/myso/grpc";

const queryClient = new QueryClient();

const GRPC_URLS = {
  testnet: "https://fullnode.testnet.mysocial.network:443",
  mainnet: "https://fullnode.mainnet.mysocial.network:443",
  devnet: "https://fullnode.devnet.mysocial.network:443",
  localnet: "http://127.0.0.1:9000",
} as const;

registerWalletConnectWallet({
  projectId: "your_project_id",
  getClient: (chain) =>
    new MySoGrpcClient({ network: chain, baseUrl: GRPC_URLS[chain] }),
  metadata: {
    walletName: "Wallet Connect",
    icon: "https://walletconnect.org/walletconnect-logo.png",
    enabled: true,
    id: "walletconnect",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <MySoClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            <App />
          </WalletProvider>
        </MySoClientProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
