
// Formatting utilities for displaying crypto amounts and percentages

export const formatAtom = (amount: string | number, options?: { showSymbol?: boolean, showPrefix?: boolean, decimals?: number }): string => {
  const { showSymbol = true, showPrefix = false, decimals = 6 } = options || {};
  
  // Convert to number and divide by 1,000,000 (uatom to ATOM)
  const valueInAtom = typeof amount === 'string' ? parseFloat(amount) / 1_000_000 : amount / 1_000_000;
  
  // Format with the specified number of decimal places
  const formattedValue = valueInAtom.toFixed(decimals);
  
  // Add prefix and symbol if requested
  return `${showPrefix ? 'Ⓐ' : ''}${formattedValue}${showSymbol ? ' ATOM' : ''}`;
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

export const shortenAddress = (address: string, prefixLength = 8, suffixLength = 4): string => {
  if (!address || address.length < prefixLength + suffixLength) {
    return address;
  }
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
};

export const formatApr = (apr: number): string => {
  return `${(apr * 100).toFixed(2)}%`;
};
