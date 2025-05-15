
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WalletInfo } from '@/models/types';
import { useToast } from '@/components/ui/use-toast';
import { Balance } from '@/models/types';
import { api } from '@/services/api';

interface WalletContextType {
  walletInfo: WalletInfo;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (unsignedTx: string) => Promise<string>;
  userBalance: Balance | null;
  fetchUserBalance: () => Promise<void>;
  isLoading: boolean;
}

const defaultWalletInfo: WalletInfo = {
  address: '',
  balance: '0',
  connected: false
};

const mockUserAddress = 'cosmos1abcdefghijklmnopqrstuvwxyz0123456789';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>(defaultWalletInfo);
  const [userBalance, setUserBalance] = useState<Balance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const connect = async () => {
    setIsLoading(true);
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful connection
    setWalletInfo({
      address: mockUserAddress,
      balance: '15000000',
      connected: true
    });
    
    toast({
      title: "Wallet connected",
      description: `Connected to ${mockUserAddress.slice(0, 8)}...${mockUserAddress.slice(-4)}`,
    });
    
    // Fetch balance after connecting
    await fetchUserBalance();
    
    setIsLoading(false);
  };

  const disconnect = () => {
    setWalletInfo(defaultWalletInfo);
    setUserBalance(null);
    toast({
      title: "Wallet disconnected",
    });
  };
  
  const fetchUserBalance = async () => {
    if (!walletInfo.connected) return;
    
    setIsLoading(true);
    try {
      const balance = await api.getBalances(walletInfo.address);
      setUserBalance(balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      toast({
        title: "Error fetching balance",
        description: "Failed to load your account data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signTransaction = async (unsignedTx: string): Promise<string> => {
    // In a real implementation, this would call the wallet's signing methods
    console.log('Signing transaction:', unsignedTx);
    
    // Mock signing by adding a prefix to simulate a signed tx
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate signing delay
    
    toast({
      title: "Transaction signed",
      description: "Your transaction has been signed successfully",
    });
    
    return `SIGNED_${unsignedTx}`;
  };

  return (
    <WalletContext.Provider value={{ 
      walletInfo, 
      connect, 
      disconnect, 
      signTransaction, 
      userBalance, 
      fetchUserBalance,
      isLoading
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
