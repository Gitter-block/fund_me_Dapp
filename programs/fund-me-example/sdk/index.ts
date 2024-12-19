// src/index.ts

// Import required libraries
import axios from 'axios';

// Define API endpoint
const API_URL = 'https://example.com/api';

/**
 * Example function to get data from an endpoint
 * @param endpoint endpoint to call
 */
export async function fetchData(endpoint: string): Promise<any> {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
