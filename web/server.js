const DONE = 4, 
    OK = 200, 
    OK_NO_CONTENT = 204;
class Server {
    static get(url, callback) {
        return new Promise(((resolve, reject) => {
            const xhr = Server.createCORSRequest('GET', Server.baseUrl() + url);
            // xhr.withCredentials = true;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        const res = JSON.parse(xhr.responseText);
                        resolve(res);
                    } else if (xhr.status === OK_NO_CONTENT) {
                        resolve();
                    } else if (xhr.status === 404) {
                        reject('404 not found');
                    } else {
                        reject(`Error: ${xhr.status}`);
                    }
                }
            };
            xhr.send(null);
        }));
    }
    static post(url, dataobj) {
        return new Promise(((resolve, reject) => {
            const xhr = Server.createCORSRequest('POST', Server.baseUrl() + url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF8');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        const res = JSON.parse(xhr.responseText || '{}');
                        resolve(res);
                    } else if (xhr.status === 404) {
                        reject('404 not found');
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dataobj));
        }));
    }
    static delete(url) {
        return new Promise(((resolve, reject) => {
            const xhr = Server.createCORSRequest('DELETE', Server.baseUrl() + url);
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF8');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        const res = JSON.parse(xhr.responseText || '{}');
                        resolve(res);
                    } else if (xhr.status === 404) {
                        reject('404 not found');
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(null);
        }));
    }
    static baseUrl() {
        //return 'http://172.18.8.41:3001/api';
        //return 'http://localhost:3001/api';
        return app.config.baseUrl;
    }
    static createCORSRequest(method, url) {
        let xhr = new XMLHttpRequest();
        if ('withCredentials' in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== 'undefined') { // ie
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else { // :( unsupported
            xhr = null;
        }
        return xhr;
    }
}

export default Server;
