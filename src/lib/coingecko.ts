// CoinGecko API utilities
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CoinPrice {
  date: string;
  price: number;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export const fetchCoinHistory = async (
  coinId: string,
  days: number = 30
): Promise<CoinPrice[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin history');
    }

    const data = await response.json();
    
    return data.prices.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      price: Math.round(price * 100) / 100,
    }));
  } catch (error) {
    console.error('Error fetching coin history:', error);
    return [];
  }
};

export const fetchCoinData = async (coinId: string): Promise<CoinData | null> => {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${coinId}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return null;
  }
};
