// CoinGecko API utilities
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Add delay between requests to avoid rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

// Retry logic for failed requests
async function fetchWithRetry(url: string, retries = 3, delayMs = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      // If rate limited (429), wait longer
      if (response.status === 429) {
        console.warn(`Rate limited, waiting ${delayMs * (i + 1)}ms before retry ${i + 1}/${retries}`);
        await delay(delayMs * (i + 1));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.warn(`Request failed, retrying ${i + 1}/${retries}...`);
      await delay(delayMs);
    }
  }
  throw new Error('Max retries reached');
}

export const fetchCoinHistory = async (
  coinId: string,
  days: number = 30
): Promise<CoinPrice[]> => {
  try {
    // Use retry logic with exponential backoff
    const response = await fetchWithRetry(
      `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      3,
      1000
    );
    
    if (!response.ok) {
      console.error(`CoinGecko API error ${response.status} for ${coinId}`);
      const errorText = await response.text();
      console.error('Response:', errorText);
      return [];
    }

    const data = await response.json();
    
    if (!data.prices || !Array.isArray(data.prices) || data.prices.length === 0) {
      console.error(`No price data in response for ${coinId}`, data);
      return [];
    }

    const prices = data.prices.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      price: Math.round(price * 100) / 100,
    }));
    
    console.log(`✓ Successfully fetched ${prices.length} price points for ${coinId}`);
    return prices;
  } catch (error) {
    console.error(`Error fetching coin history for ${coinId}:`, error);
    return [];
  }
};

export const fetchCoinData = async (coinId: string): Promise<CoinData | null> => {
  try {
    // Add small delay to avoid rate limiting
    await delay(300);
    
    // Use retry logic
    const response = await fetchWithRetry(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${coinId}`,
      3,
      1000
    );
    
    if (!response.ok) {
      console.error(`CoinGecko API error ${response.status} for ${coinId} market data`);
      const errorText = await response.text();
      console.error('Response:', errorText);
      return null;
    }

    const data = await response.json();
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error(`No market data found for ${coinId}`, data);
      return null;
    }
    
    console.log(`✓ Successfully fetched market data for ${coinId}`, data[0]);
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching coin data for ${coinId}:`, error);
    return null;
  }
};
