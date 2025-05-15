
import React, { useEffect, useState } from "react";
import DelegationCard from "./DelegationCard";
import { useWallet } from "@/context/WalletContext";
import { api } from "@/services/api";
import { Delegation, Validator } from "@/models/types";

const DelegationList = () => {
  const { userBalance, walletInfo } = useWallet();
  const [validators, setValidators] = useState<Validator[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchValidators = async () => {
      if (!userBalance || !userBalance.delegations || userBalance.delegations.length === 0) {
        return;
      }
      
      setLoading(true);
      try {
        const validatorsData = await api.getValidators();
        setValidators(validatorsData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch validators:", error);
        setLoading(false);
      }
    };
    
    fetchValidators();
  }, [userBalance]);
  
  if (!walletInfo.connected) {
    return null;
  }
  
  if (!userBalance || loading) {
    return <div className="mt-6 text-center">Loading your delegations...</div>;
  }
  
  if (!userBalance.delegations || userBalance.delegations.length === 0) {
    return (
      <div className="mt-6 text-center p-8 bg-muted rounded-lg">
        <p className="text-lg mb-2">You don't have any active delegations</p>
        <p className="text-sm text-muted-foreground">
          Select a validator from the list below to start staking your ATOM
        </p>
      </div>
    );
  }
  
  // Attach validator info to each delegation
  const enhancedDelegations = userBalance.delegations.map(delegation => {
    const matchingValidator = validators.find(v => v.operatorAddress === delegation.validatorAddress);
    return {
      ...delegation,
      validator: matchingValidator
    };
  });
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Active Delegations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enhancedDelegations.map((delegation, index) => (
          <DelegationCard 
            key={`${delegation.validatorAddress}-${index}`}
            delegation={delegation}
            validator={delegation.validator}
          />
        ))}
      </div>
    </div>
  );
};

export default DelegationList;
