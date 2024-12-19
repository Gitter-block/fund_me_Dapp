// tests/sdk.test.ts
import { fetchData } from '../src/index';

describe('SDK fetchData test suite', () => {

  it('should fetch data successfully', async () => {
    const mockData = { data: 'mocked response' }; // Dummy data for mock

    // Mocking the axios module
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockData));

    const result = await fetchData('test-endpoint');
    expect(result).toEqual(mockData);

    // Restore the original implementation
    axios.get.mockRestore();
  });

  it('should throw an error if API call fails', async () => {
    // Mocking axios with a rejected promise
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Network error')));

    await expect(fetchData('failed-endpoint')).rejects.toThrow('Network error');

    // Restore the original implementation
    axios.get.mockRestore();
  });

});
