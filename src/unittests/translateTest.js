import axios from 'axios';
import translateText from './translateText'; 

jest.mock('axios');

describe('translateText', () => {
  const mockText = 'Hello';
  const translatedText = 'Привіт';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should translate text successfully', async () => {
    axios.post.mockResolvedValue({
      data: {
        choices: [{ text: translatedText }]
      }
    });

    const result = await translateText(mockText);
    expect(result).toBe(translatedText);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it('should return empty string on API error', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));

    const result = await translateText(mockText);
    expect(result).toBe('');
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it('should retry translation on 429 status code', async () => {
    const mockError = new Error('Rate Limit Exceeded');
    mockError.response = { status: 429 };
    axios.post.mockRejectedValueOnce(mockError).mockResolvedValueOnce({
      data: {
        choices: [{ text: translatedText }]
      }
    });

    const result = await translateText(mockText);
    expect(result).toBe(translatedText);
    expect(axios.post).toHaveBeenCalledTimes(2);
  });

  it('should give up after 3 retries on 429 status code', async () => {
    const mockError = new Error('Rate Limit Exceeded');
    mockError.response = { status: 429 };
    axios.post.mockRejectedValue(mockError);

    const result = await translateText(mockText);
    expect(result).toBe('');
    expect(axios.post).toHaveBeenCalledTimes(4);
  });
});
