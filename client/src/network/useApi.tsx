import { API_URL } from '@env';

const useApi = () => {
  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok', API_URL);
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

  const updateStatus = async (
    endpoint: string,
    _id: string,
    completed: boolean,
  ) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: completed }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return true;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  };

  const postData = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return true;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };
  const loginUser = async (
    email: string,
    password: string,
    endpoint: string,
  ): Promise<any> => {
    try {
      // Normalize email before sending to backend
      const normalizedEmail = email.trim().toLowerCase();

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      if (!res.ok) {
        // Handle error responses
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! Status: ${res.status}`,
        );
      }

      return await res.json();
    } catch (error) {
      console.error('Login request failed:', error);
      throw error;
    }
  };
  return { fetchData, deleteData, updateStatus, postData, loginUser };
};
export default useApi;
