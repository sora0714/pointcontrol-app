"use client";

import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

const wallets = [new PontemWallet()];

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect>
      {children}
    </AptosWalletAdapterProvider>
  );
};

export default Providers;
