// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import {
  useCurrentAccount,
  useCurrentWallet,
  useSignAndExecuteTransaction,
  useSignPersonalMessage,
  useSignTransaction,
  useMySoClientContext,
} from "@socialproof/dapp-kit";
import { Transaction } from "@socialproof/myso/transactions";
import {
  verifyPersonalMessageSignature,
  verifyTransactionSignature,
} from "@socialproof/myso/verify";
import { Button, Container } from "@radix-ui/themes";
import { fromBase64 } from "@socialproof/myso/utils";
import type {
  MySoChain,
  WalletAccount,
  WalletWithRequiredFeatures,
} from "@socialproof/wallet-standard";
import { signAndExecuteTransaction as signAndExecuteTransactionWalletStandard } from "@socialproof/wallet-standard";
import { useMutation } from "@tanstack/react-query";

export function Actions() {
  const account = useCurrentAccount();
  const signMessage = useSignPersonalMessage();
  const signTransaction = useSignTransaction();
  const signAndExecuteTransaction = useSignAndExecuteTransaction();
  const { network, client } = useMySoClientContext();
  const { currentWallet } = useCurrentWallet();
  const signAndExecuteTransactionForceInWallet = useMutation({
    mutationFn: ({
      transaction,
      account,
      chain,
      wallet,
    }: {
      transaction: Transaction;
      account: WalletAccount;
      chain: MySoChain;
      wallet: WalletWithRequiredFeatures;
    }) => {
      return signAndExecuteTransactionWalletStandard(wallet, {
        transaction,
        account,
        chain,
      });
    },
  });

  if (!account) {
    return null;
  }

  return (
    <Container my="4">
      <Button
        onClick={async () => {
          const message = new TextEncoder().encode("Hello, world!");
          const { signature } = await signMessage.mutateAsync({
            message,
            account,
            chain: `myso:${network}`,
          });
          try {
            await verifyPersonalMessageSignature(message, signature, {
              address: account.address,
              client,
            });
            console.log("Personal message signature verified!");
          } catch (e) {
            console.error(e);
          }
        }}
        mr="2"
      >
        Sign Message
      </Button>
      <Button
        onClick={async () => {
          const transaction = new Transaction();
          const [coin] = transaction.splitCoins(transaction.gas, [1]);

          transaction.transferObjects([coin], account.address);
          transaction.setSender(account.address);

          const { signature, bytes } = await signTransaction.mutateAsync({
            transaction,
            account,
            chain: `myso:${network}`,
          });
          try {
            await verifyTransactionSignature(fromBase64(bytes), signature, {
              address: account.address,
              client,
            });
            console.log("Transaction signature verified!");
          } catch (e) {
            console.error(e);
          }
        }}
        mr="2"
      >
        Sign Transaction
      </Button>
      <Button
        onClick={async () => {
          const transaction = new Transaction();
          const [coin] = transaction.splitCoins(transaction.gas, [1]);

          transaction.transferObjects([coin], account.address);
          transaction.setSender(account.address);

          const { digest } = await signAndExecuteTransaction.mutateAsync({
            transaction,
            account,
            chain: `myso:${network}`,
          });
          console.log("Transaction digest:", digest);
        }}
        mr="2"
      >
        Sign & Execute Transaction
      </Button>
      <Button
        onClick={async () => {
          if (!currentWallet) {
            throw new Error("No wallet connected");
          }

          const transaction = new Transaction();
          const [coin] = transaction.splitCoins(transaction.gas, [1]);

          transaction.transferObjects([coin], account.address);
          transaction.setSender(account.address);
          const { digest } =
            await signAndExecuteTransactionForceInWallet.mutateAsync({
              transaction,
              account,
              chain: `myso:${network}` as MySoChain,
              wallet: currentWallet,
            });
          console.log("Transaction digest:", digest);
        }}
      >
        Sign & force Wallet Execute Transaction
      </Button>
    </Container>
  );
}
