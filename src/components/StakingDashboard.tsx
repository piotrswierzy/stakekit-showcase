
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useWallet } from "@/context/WalletContext";
import { formatAtom, formatPercentage } from "@/utils/formatting";
import { Coins } from "lucide-react";

const StakingDashboard = () => {
  const { userBalance, walletInfo, isLoading } = useWallet();
  
  if (!walletInfo.connected) {
    return (
      <div className="flex justify-center items-center p-10">
        <Card className="w-full max-w-md text-center p-8">
          <CardHeader>
            <CardTitle className="text-xl">Welcome to StakeKitOS</CardTitle>
            <CardDescription>Connect your wallet to view your staking dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 flex justify-center">
              <Coins className="h-16 w-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !userBalance) {
    return (
      <div className="flex justify-center items-center p-10">
        <Card className="w-full max-w-md text-center p-6">
          <CardHeader>
            <CardTitle>Loading your staking data...</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress className="mt-4" value={isLoading ? undefined : 0} />
          </CardContent>
        </Card>
      </div>
    );
  }

  const total = parseFloat(userBalance.total);
  const staked = parseFloat(userBalance.delegated);
  const stakedPercentage = total > 0 ? (staked / total) * 100 : 0;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <CardDescription>Your total ATOM holdings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatAtom(userBalance.total)}</div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Staked</CardTitle>
          <CardDescription>Total amount staked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatAtom(userBalance.delegated)}</div>
          <Progress className="mt-2" value={stakedPercentage} />
          <div className="text-xs text-muted-foreground mt-1">
            {formatPercentage(stakedPercentage/100)} of your portfolio
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Rewards</CardTitle>
          <CardDescription>Unclaimed staking rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-stakekit-purple">{formatAtom(userBalance.rewards)}</div>
          <div className="text-sm text-muted-foreground mt-1">Available to claim</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StakingDashboard;
