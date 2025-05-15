
import React, { useState, useEffect } from "react";
import { api } from "@/services/api";
import ValidatorCard from "./ValidatorCard";
import { Validator } from "@/models/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWallet } from "@/context/WalletContext";
import ValidatorModal from "./ValidatorModal";
import StakeModal from "./StakeModal";

const ValidatorList = () => {
  const [validators, setValidators] = useState<Validator[]>([]);
  const [filteredValidators, setFilteredValidators] = useState<Validator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("apr");
  const { userBalance, walletInfo } = useWallet();
  
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  
  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const validatorsData = await api.getValidators();
        setValidators(validatorsData);
        setFilteredValidators(sortValidators(validatorsData, sortOption));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch validators:", error);
        setLoading(false);
      }
    };
    
    fetchValidators();
  }, []);
  
  useEffect(() => {
    const filtered = validators.filter(validator =>
      validator.moniker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      validator.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredValidators(sortValidators(filtered, sortOption));
  }, [searchTerm, sortOption, validators]);
  
  const sortValidators = (vals: Validator[], option: string) => {
    return [...vals].sort((a, b) => {
      switch(option) {
        case "apr":
          return b.apr - a.apr;
        case "commission":
          return a.commission - b.commission;
        case "voting":
          return b.votingPower - a.votingPower;
        case "name":
          return a.moniker.localeCompare(b.moniker);
        default:
          return 0;
      }
    });
  };
  
  const handleShowDetails = (validator: Validator) => {
    setSelectedValidator(validator);
    setShowDetailsModal(true);
  };
  
  const handleStake = (validator: Validator) => {
    setSelectedValidator(validator);
    setShowStakeModal(true);
  };
  
  const isStakedWithValidator = (validatorAddress: string) => {
    if (!userBalance || !userBalance.delegations) return false;
    
    return userBalance.delegations.some(
      delegation => delegation.validatorAddress === validatorAddress
    );
  };
  
  if (loading) {
    return <div className="flex justify-center py-8">Loading validators...</div>;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search validators..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm whitespace-nowrap">Sort by:</span>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apr">Highest APR</SelectItem>
              <SelectItem value="commission">Lowest Commission</SelectItem>
              <SelectItem value="voting">Highest Voting Power</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredValidators.map((validator) => (
          <ValidatorCard
            key={validator.operatorAddress}
            validator={validator}
            onStake={handleStake}
            isStakedWith={isStakedWithValidator(validator.operatorAddress)}
            onShowDetails={handleShowDetails}
          />
        ))}
      </div>
      
      {filteredValidators.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg">No validators match your search criteria</p>
          <Button 
            variant="link" 
            onClick={() => setSearchTerm("")}
            className="mt-2"
          >
            Clear search
          </Button>
        </div>
      )}
      
      {selectedValidator && showDetailsModal && (
        <ValidatorModal
          validator={selectedValidator}
          onClose={() => setShowDetailsModal(false)}
          onStake={() => {
            setShowDetailsModal(false);
            setShowStakeModal(true);
          }}
        />
      )}
      
      {selectedValidator && showStakeModal && (
        <StakeModal
          validator={selectedValidator}
          onClose={() => setShowStakeModal(false)}
          userAddress={walletInfo.address}
        />
      )}
    </div>
  );
};

export default ValidatorList;
