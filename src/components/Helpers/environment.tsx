let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1' :
        APIURL = 'http://localhost:4000';
        break;
    case 'hoa-create-client.herokuapp.com' :
        APIURL = 'https://hoa-create-server2.herokuapp.com'
}

export default APIURL;
