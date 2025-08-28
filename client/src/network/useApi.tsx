import { API_URL } from '@env';

const useApi = () => {
  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { fetchData };
};
export default useApi;
