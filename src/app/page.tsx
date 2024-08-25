"use client";

import Image from "next/image";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useEffect, useState } from "react";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);

const pointControlAddress =
  "0xa7eccda457653e9ec4ae2a02571a7314bca5f875f363d30b7726eec1a888b8aa";

export default function Home() {
  const [point, setPoint] = useState("0");
  const { account, signAndSubmitTransaction } = useWallet();
  const fetchPoint = async () => {
    try {
      const resource = await aptos.view({
        payload: {
          function: `${pointControlAddress}::point_control::point`,
          functionArguments: [],
        },
      });
      setPoint(resource?.[0]?.toString() ?? "");
    } catch (err) {
      console.log(err);
      return 0;
    }
  };
  useEffect(() => {
    fetchPoint();
  }, []);

  const onIncrease = async () => {
    if (!account) return;

    const tx: InputTransactionData = {
      data: {
        function: `${pointControlAddress}::point_control::increase`,
        functionArguments: [],
      },
    };

    try {
      const response = await signAndSubmitTransaction(tx);

      await aptos.waitForTransaction({ transactionHash: response.hash });
      await fetchPoint();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <div className="flex items-center">
        <WalletSelector />
      </div>
      <div className="text-black mt-4">Point: {point}</div>
      <button
        className="bg-[#3f67ff] text-white rounded-md py-3 px-10 text-sm mt-4"
        onClick={onIncrease}
      >
        INCREASE
      </button>
    </main>
  );
}
