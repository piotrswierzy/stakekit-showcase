
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatAtom } from "@/utils/formatting";
import { Delegation, Validator } from "@/models/types";
import { api } from "@/services/api";
import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/components/ui/use-toast";

interface DelegationCardProps {
  delegation: Delegation;
  validator?: Validator;
}

const DelegationCard = ({ delegation, validator }: DelegationCardProps) => {
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);
  const { walletInfo, signTransaction, fetchUserBalance } = useWallet();
  const { toast } = useToast();
  
  const handleClaimRewards = async () => {
    setIsClaimingRewards(true);
    
    try {
      // Get unsigned transaction from API
      const tx = await api.getClaimableRewardsTransaction(
        walletInfo.address,
        delegation.validatorAddress
      );
      
      // Sign the transaction
      const signedTx = await signTransaction(tx.unsignedTransaction);
      
      // Execute the transaction
      await api.executeTransaction({
        action: {
          providerId: "cosmos",
          transactionDefinition: tx.unsignedTransaction,
          signedTransaction: signedTx
        }
      });
      
      // Refresh user balance
      await fetchUserBalance();
      
      toast({
        title: "Rewards claimed",
        description: `Successfully claimed ${formatAtom(delegation.rewards, { showSymbol: false })} ATOM in rewards`,
      });
    } catch (error) {
      console.error("Claiming rewards failed:", error);
      toast({
        title: "Failed to claim rewards",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClaimingRewards(false);
    }
  };
  
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {validator?.moniker || "Unknown Validator"}
        </CardTitle>
        <div className="text-xs text-muted-foreground truncate max-w-[300px]">
          {delegation.validatorAddress}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Staked Amount</div>
            <div className="text-lg font-medium">{formatAtom(delegation.amount)}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Pending Rewards</div>
            <div className="text-lg font-medium text-stakekit-purple">
              {formatAtom(delegation.rewards)}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={handleClaimRewards}
              disabled={parseFloat(delegation.rewards) <= 0 || isClaimingRewards}
            >
              {isClaimingRewards ? "Claiming..." : "Claim Rewards"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DelegationCard;
