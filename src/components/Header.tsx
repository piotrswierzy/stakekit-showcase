
import React from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { shortenAddress } from "@/utils/formatting";
import { Wallet } from "lucide-react";

const Header = () => {
  const { walletInfo, connect, disconnect, isLoading } = useWallet();
  
  return (
    <header className="py-4 px-6 flex justify-between items-center border-b border-border">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full cosmos-gradient flex items-center justify-center mr-3">
          <span className="font-bold text-white">S</span>
        </div>
        <span className="text-xl font-semibold">StakeKitOS</span>
        <span className="ml-2 text-xs bg-muted py-1 px-2 rounded-full">Cosmos</span>
      </div>
      
      <div>
        {!walletInfo.connected ? (
          <Button 
            onClick={connect} 
            disabled={isLoading} 
            className="bg-stakekit-purple hover:bg-stakekit-secondary"
          >
            <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="bg-muted py-1 px-3 rounded-full text-sm">
              {shortenAddress(walletInfo.address)}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={disconnect}
            >
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
