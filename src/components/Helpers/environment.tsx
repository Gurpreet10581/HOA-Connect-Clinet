let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1' :
        APIURL = 'http://localhost:4000';
        break;
    case 'gs-hoa-connect-client.herokuapp.com' :
        APIURL = 'https://gs-hoa-connect-server.herokuapp.com/'
}

export default APIURL;