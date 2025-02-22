"use client";

import React from "react";
import { Button } from "@/components/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shared/ui/dialog";
import { Row } from "@tanstack/react-table";
import { UIPostionReserveData } from "@/clients/types/view/pool/position";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/ui/tabs";
import DepositTab from "./deposit-tab";
import WithdrawTab from "./withdraw-tab";

export default function DepositDialog({ row, className }: { row: Row<UIPostionReserveData>; className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          onClick={() => {
            console.log("deposit", row.original);
          }}
          className={className}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]">
        <DialogHeader>
          <DialogTitle>
            <div className="ml-6 text-base font-semibold">Edit {row.original.symbol}</div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="deposit" className="w-full pt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <DepositTab row={row} onClose={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="withdraw">
            <WithdrawTab row={row} onClose={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
