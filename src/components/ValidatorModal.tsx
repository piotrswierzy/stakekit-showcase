
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Validator } from "@/models/types";
import { formatApr, formatPercentage } from "@/utils/formatting";
import { useWallet } from "@/context/WalletContext";

interface ValidatorModalProps {
  validator: Validator;
  onClose: () => void;
  onStake: () => void;
}

const ValidatorModal = ({ validator, onClose, onStake }: ValidatorModalProps) => {
  const { walletInfo } = useWallet();
  
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{validator.moniker} - Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm mt-1">{validator.description}</p>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm text-muted-foreground">Website</div>
              <div className="text-sm">
                <a 
                  href={validator.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-stakekit-purple hover:underline"
                >
                  {validator.website}
                </a>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Identity</div>
              <div className="text-sm font-mono">{validator.identity}</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Commission</div>
              <div className="text-sm font-medium">{formatPercentage(validator.commission)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">APR</div>
              <div className="text-sm font-medium text-stakekit-purple">{formatApr(validator.apr)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Voting Power</div>
              <div className="text-sm font-medium">{formatPercentage(validator.votingPower)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="text-sm font-medium capitalize">{validator.status}</div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="text-sm text-muted-foreground">Validator Address</div>
            <div className="text-sm font-mono truncate">{validator.operatorAddress}</div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button 
            onClick={onStake} 
            className="bg-stakekit-purple hover:bg-stakekit-secondary"
            disabled={!walletInfo.connected}
          >
            Stake with this Validator
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ValidatorModal;
