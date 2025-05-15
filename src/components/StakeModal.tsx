
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Validator } from "@/models/types";
import { useWallet } from "@/context/WalletContext";
import { api } from "@/services/api";
import { Separator } from "@/components/ui/separator";
import { formatAtom, formatApr } from "@/utils/formatting";
import { useToast } from "@/components/ui/use-toast";

interface StakeModalProps {
  validator: Validator;
  onClose: () => void;
  userAddress: string;
}

const StakeModal = ({ validator, onClose, userAddress }: StakeModalProps) => {
  const { userBalance, signTransaction, fetchUserBalance } = useWallet();
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const availableAtoms = userBalance ? parseFloat(userBalance.available) : 0;
  const maxAmount = availableAtoms / 1_000_000; // Convert uatom to ATOM
  
  const handleSetMax = () => {
    setAmount(maxAmount.toString());
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setAmount(value);
    }
  };
  
  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive",
      });
      return;
    }
    
    if (parseFloat(amount) > maxAmount) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough ATOM to stake this amount",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert ATOM to uatom for the API
      const atomAmount = Math.floor(parseFloat(amount) * 1_000_000).toString();
      
      // Get unsigned transaction from API
      const tx = await api.getDelegateTransaction(
        userAddress,
        validator.operatorAddress,
        atomAmount
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
        title: "Staking successful",
        description: `Successfully staked ${amount} ATOM with ${validator.moniker}`,
      });
      
      onClose();
    } catch (error) {
      console.error("Staking failed:", error);
      toast({
        title: "Staking failed",
        description: "There was an error processing your staking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Stake with {validator.moniker}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Annual Return (APR)</span>
            <span className="text-stakekit-purple font-medium">{formatApr(validator.apr)}</span>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="amount">Amount to Stake</Label>
              <div className="text-sm text-muted-foreground">
                Available: {formatAtom(userBalance?.available || "0")}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.0"
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={handleSetMax}
                className="whitespace-nowrap"
              >
                Max
              </Button>
            </div>
          </div>
          
          {parseFloat(amount) > 0 && (
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>You're staking</span>
                  <span className="font-medium">{amount} ATOM</span>
                </div>
                <div className="flex justify-between">
                  <span>Validator</span>
                  <span className="font-medium">{validator.moniker}</span>
                </div>
                <div className="flex justify-between">
                  <span>Commission</span>
                  <span>{(validator.commission * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleStake} 
            className="bg-stakekit-purple hover:bg-stakekit-secondary"
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount || isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Stake ATOM'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StakeModal;
