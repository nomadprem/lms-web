import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // Use environment variable for backend URL
});

// Function to handle login requests
export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;  // return token
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Function to handle signup requests
export const signup = async (email, password) => {
  try {
    const response = await api.post('/api/auth/signup', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Fetch list of courses
export const getCourses = async () => {
    try {
      const response = await api.get('/api/courses');
      return response.data;  // Return courses data
    } catch (error) {
      throw new Error('Error fetching courses');
    }
  };
  
  // Fetch user progress (example API)
  export const getProgress = async () => {
    try {
      const response = await api.get('/api/progress');
      return response.data;  // Return progress data
    } catch (error) {
      throw new Error('Error fetching progress');
    }
};
