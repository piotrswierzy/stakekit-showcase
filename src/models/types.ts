
// Types for the API responses

export interface Validator {
  operatorAddress: string;
  moniker: string;
  identity: string;
  description: string;
  website: string;
  commission: number;
  votingPower: number;
  status: string;
  apr: number;
  avatarUrl?: string;
  rank?: number;
}

export interface Delegation {
  validatorAddress: string;
  amount: string;
  rewards: string;
  validator?: Validator;
}

export interface Balance {
  available: string;
  delegated: string;
  rewards: string;
  total: string;
  delegations: Delegation[];
}

export interface Transaction {
  unsignedTransaction: string;
  fee: {
    amount: string;
    denom: string;
  };
}

export interface ExecuteTransactionRequest {
  action: {
    providerId: string;
    transactionDefinition: string;
    signedTransaction: string;
  };
}

export interface WalletInfo {
  address: string;
  balance: string;
  connected: boolean;
}
