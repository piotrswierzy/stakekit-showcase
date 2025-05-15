
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Validator } from "@/models/types";
import { formatApr, formatPercentage } from "@/utils/formatting";

interface ValidatorCardProps {
  validator: Validator;
  onStake: (validator: Validator) => void;
  isStakedWith: boolean;
  onShowDetails: (validator: Validator) => void;
}

const ValidatorCard = ({ validator, onStake, isStakedWith, onShowDetails }: ValidatorCardProps) => {
  return (
    <Card className={`card-hover ${isStakedWith ? 'border-stakekit-purple' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{validator.moniker}</CardTitle>
            <div className="text-xs text-muted-foreground mt-1 truncate max-w-[180px]">
              {validator.description}
            </div>
          </div>
          <div className="bg-muted rounded-full px-2 py-1 text-xs">#{validator.rank}</div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">Commission</div>
            <div className="font-medium">{formatPercentage(validator.commission)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">APR</div>
            <div className="font-medium text-stakekit-purple">{formatApr(validator.apr)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Voting Power</div>
            <div className="font-medium">{formatPercentage(validator.votingPower)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Status</div>
            <div className="font-medium capitalize">{validator.status}</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onShowDetails(validator)}
        >
          Details
        </Button>
        
        <Button 
          size="sm" 
          className="bg-stakekit-purple hover:bg-stakekit-secondary"
          onClick={() => onStake(validator)}
        >
          Stake
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ValidatorCard;
