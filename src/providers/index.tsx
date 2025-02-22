"use client";

import { PropsWithChildren } from "react";
import { ReactQueryClientProvider } from "./querry-provider";
import { AutoConnectProvider } from "./auto-connect-provider";
import { WalletProvider } from "./wallet-provider";
import { TransactionProvider } from "@/clients/wrappers/transaction-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <AutoConnectProvider>
      <ReactQueryClientProvider>
        <WalletProvider>
          <TransactionProvider>{children}</TransactionProvider>
        </WalletProvider>
      </ReactQueryClientProvider>
    </AutoConnectProvider>
  );
}
