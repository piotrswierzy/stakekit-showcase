
import { Balance, Transaction, Validator, ExecuteTransactionRequest } from '@/models/types';

const BASE_URL = 'https://api.mockstakekit.com'; // Mock API URL (would be replaced with real endpoint)
const CHAIN = 'cosmoshub';

export const api = {
  async getValidators(): Promise<Validator[]> {
    // For demo purposes, return mock data
    // In production, this would be: return fetch(`${BASE_URL}/yields/validators?chain=${CHAIN}`).then(res => res.json());
    
    console.log('Fetching validators from API');
    return mockValidators;
  },

  async getBalances(address: string): Promise<Balance> {
    // For demo purposes, return mock data
    // In production, this would be: return fetch(`${BASE_URL}/yields/balances?chain=${CHAIN}&address=${address}`).then(res => res.json());
    
    console.log(`Fetching balances for address ${address}`);
    return mockBalance;
  },

  async getClaimableRewardsTransaction(address: string, validator: string): Promise<Transaction> {
    // For demo purposes, return mock data
    // In production, this would be: return fetch(`${BASE_URL}/yields/claimable-rewards?chain=${CHAIN}&address=${address}&validator=${validator}`).then(res => res.json());
    
    console.log(`Getting claimable rewards transaction for ${address} from validator ${validator}`);
    return mockTransaction;
  },

  async getDelegateTransaction(address: string, validator: string, amount: string): Promise<Transaction> {
    // For demo purposes, return mock data
    // In production, this would be: return fetch(`${BASE_URL}/yields/delegate?chain=${CHAIN}&address=${address}&validator=${validator}&amount=${amount}`).then(res => res.json());
    
    console.log(`Getting delegate transaction for ${address} to validator ${validator} with amount ${amount}`);
    return mockTransaction;
  },

  async executeTransaction(request: ExecuteTransactionRequest): Promise<any> {
    // For demo purposes, just log and return success
    // In production, this would be: return fetch(`${BASE_URL}/yields/actions?chain=${CHAIN}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(request)
    // }).then(res => res.json());
    
    console.log('Executing transaction', request);
    return { success: true };
  }
};

// Mock data
const mockValidators: Validator[] = [
  {
    operatorAddress: "cosmosvaloper1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u2lcnj0",
    moniker: "Cosmos Validator",
    identity: "4C7A23F697695D0B",
    description: "Secure and reliable validator running on professionally managed infrastructure",
    website: "https://cosmos.network",
    commission: 0.05,
    votingPower: 0.023,
    status: "active",
    apr: 0.12,
    rank: 1
  },
  {
    operatorAddress: "cosmosvaloper156gqf9837u7d4c4678yt3rl4ls9c5vuursrrzf",
    moniker: "StakeKit Validator",
    identity: "9E2E5D7F013BE8BF",
    description: "StakeKit's official validator for the Cosmos Hub",
    website: "https://stakekit.io",
    commission: 0.07,
    votingPower: 0.019,
    status: "active",
    apr: 0.115,
    rank: 2
  },
  {
    operatorAddress: "cosmosvaloper1a3yjj7d3qnx4spgvjcwjq9cw9snrrrhu5h6jll",
    moniker: "Figment",
    identity: "E13F0D23F142D059",
    description: "Figment is a professional validator and blockchain infrastructure provider",
    website: "https://figment.io",
    commission: 0.08,
    votingPower: 0.045,
    status: "active",
    apr: 0.11,
    rank: 3
  },
  {
    operatorAddress: "cosmosvaloper19yy989ka5usws6gsd8vl94y7l6ssgdwsrnscjc",
    moniker: "Chorus One",
    identity: "00B79D689B7DC1CE",
    description: "Chorus One operates validators across multiple Proof-of-Stake networks",
    website: "https://chorus.one",
    commission: 0.075,
    votingPower: 0.031,
    status: "active",
    apr: 0.113,
    rank: 4
  },
  {
    operatorAddress: "cosmosvaloper1vf44d85es37hwl9f4h9gv0e064m0lla60j9luj",
    moniker: "Coinbase Cloud",
    identity: "5BDF8EA6D34CE5CF",
    description: "Coinbase Cloud provides secure, reliable staking infrastructure",
    website: "https://www.coinbase.com/cloud",
    commission: 0.06,
    votingPower: 0.063,
    status: "active",
    apr: 0.118,
    rank: 5
  }
];

const mockBalance: Balance = {
  available: "5000000",
  delegated: "10000000",
  rewards: "450000",
  total: "15450000",
  delegations: [
    {
      validatorAddress: "cosmosvaloper1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u2lcnj0",
      amount: "5000000",
      rewards: "250000"
    },
    {
      validatorAddress: "cosmosvaloper156gqf9837u7d4c4678yt3rl4ls9c5vuursrrzf",
      amount: "5000000",
      rewards: "200000"
    }
  ]
};

const mockTransaction: Transaction = {
  unsignedTransaction: "eyJib2R5Ijp7Im1lc3NhZ2VzIjpbeyJAd.....long-base64-encoded-string....xyz==",
  fee: {
    amount: "5000",
    denom: "uatom"
  }
};
