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

  const deleteData = async (endpoint: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return true;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  };

  return { fetchData, deleteData };
};
export default useApi;
