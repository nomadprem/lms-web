import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // Use environment variable for backend URL
});

// Function to handle login requests
export const login = async (email, password) => {
  try {
    console.log('Logging in with email:', email); // Debugging line
    console.log('Password',password)
    console.log('Url:', process.env.REACT_APP_API_URL); // Debugging line
    const response = await api.post('/api/users/login', { email, password }); // Updated route
    console.log('Login response:', response.data); // Debugging line
    return response.data;  // return token and user data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

// Function to handle signup requests
export const signup = async (firstName, lastName, email, password, role) => {
  try {
    const response = await api.post('/api/users/register', { firstName, lastName, email, password, role }); // Updated route
    console.log('Signup response:', response.data); // Debugging line
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

// Fetch list of courses using axios
export const getCourses = async () => {
  try {
    const response = await api.get('/api/courses/1');  // Use the api instance
    return response.data;  // Return the courses data
  } catch (error) {
    console.error('Error fetching courses:', error); // Log the error for debugging
    throw new Error(error.response?.data?.message || 'Failed to fetch courses');
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
