var SERVER_URL;
if (process.env.NODE_ENV === 'production') {
    // SERVER_URL = 'https://mcuteapp.herokuapp.com';

    SERVER_URL = 'http://localhost:5000';
} else {
    SERVER_URL = 'http://localhost:5000';
}
  
export const API_SERVER = SERVER_URL