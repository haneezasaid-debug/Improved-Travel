export type CurrencyCode = 'SGD' | 'MYR' | 'USD' | 'EUR';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromSGD: number; // 1 SGD = rateFromSGD in target currency
}

export const CURRENCIES: Record<CurrencyCode, CurrencyOption> = {
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateFromSGD: 1.0 },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rateFromSGD: 3.4 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateFromSGD: 0.75 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateFromSGD: 0.69 }
};

/**
 * Converts an amount from SGD to target currency
 */
export function convertFromSGD(amountSGD: number, targetCurrency: CurrencyCode): number {
  const rate = CURRENCIES[targetCurrency]?.rateFromSGD ?? 1.0;
  return Math.round(amountSGD * rate);
}

/**
 * Converts an amount from target currency to SGD
 */
export function convertToSGD(amountInTarget: number, sourceCurrency: CurrencyCode): number {
  const rate = CURRENCIES[sourceCurrency]?.rateFromSGD ?? 1.0;
  return Math.round(amountInTarget / rate);
}

/**
 * Formats a figure with exact currency code and symbol so it's never ambiguous.
 * e.g., "RM 120 MYR", "$35 SGD", "$26 USD", "€24 EUR" or "Free"
 */
export function formatCurrency(
  amountSGD: number,
  currency: CurrencyCode = 'SGD',
  options?: { showFree?: boolean }
): string {
  if (options?.showFree && amountSGD === 0) {
    return 'Free';
  }

  const curr = CURRENCIES[currency] || CURRENCIES.SGD;
  const converted = Math.round(amountSGD * curr.rateFromSGD);
  const formattedNum = converted.toLocaleString();

  switch (currency) {
    case 'MYR':
      return `RM ${formattedNum} MYR`;
    case 'SGD':
      return `$${formattedNum} SGD`;
    case 'USD':
      return `$${formattedNum} USD`;
    case 'EUR':
      return `€${formattedNum} EUR`;
    default:
      return `${curr.symbol}${formattedNum} ${currency}`;
  }
}
