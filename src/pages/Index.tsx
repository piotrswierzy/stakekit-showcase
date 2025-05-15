
import React from "react";
import Header from "@/components/Header";
import StakingDashboard from "@/components/StakingDashboard";
import ValidatorList from "@/components/ValidatorList";
import DelegationList from "@/components/DelegationList";
import { WalletProvider } from "@/context/WalletContext";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">Cosmos Staking Dashboard</h1>
          
          <StakingDashboard />
          
          <DelegationList />
          
          <div className="mt-8 mb-4">
            <h2 className="text-xl font-semibold">Available Validators</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose a validator to stake your ATOM and earn rewards
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <ValidatorList />
        </main>
        
        <footer className="border-t border-border py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>StakeKitOS - Cosmos Integration Demo</p>
            <p className="mt-1">
              Built with <a href="https://stakekit.io" target="_blank" rel="noopener noreferrer" className="text-stakekit-purple hover:underline">StakeKit</a>
            </p>
          </div>
        </footer>
      </div>
    </WalletProvider>
  );
};

export default Index;
