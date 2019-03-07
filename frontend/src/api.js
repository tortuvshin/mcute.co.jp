let API_SERVER = process.env.BASE_URL ? (process.env.BASE_URL) : 'http://localhost:5000/';

if (process.env.NODE_ENV === 'production'){
    API_SERVER = 'https://mcute.herokuapp.com'
} else {

}

export default API_SERVER