import { createDAppKit } from "@socialproof/dapp-kit-react";
import { MySoGrpcClient } from "@socialproof/myso/grpc";

const GRPC_URLS = {
  mainnet: "https://fullnode.mainnet.mysocial.network:443",
  testnet: "https://fullnode.testnet.mysocial.network:443",
  devnet: "https://fullnode.devnet.mysocial.network:443",
};

export const dAppKit = createDAppKit({
  enableBurnerWallet: import.meta.env.DEV,
  networks: ["mainnet", "testnet", "devnet"],
  defaultNetwork: "testnet",
  createClient(network) {
    return new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] });
  },
});

// global type registration necessary for the hooks to work correctly
declare module "@socialproof/dapp-kit-react" {
  interface Register {
    dAppKit: typeof dAppKit;
  }
}
