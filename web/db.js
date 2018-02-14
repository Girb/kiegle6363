import PouchDB from 'pouchdb-browser';
import DocView from './views/docview';

const remote = 'http://185.7.62.149:5984';

class DB {
    constructor() {
        const name = localStorage.getItem('dbname') || 'testdb';
        this._connect(name);
    }

    connect(name) {
        if (this.db) {
            this.db.close().then(() => {
                this._connect(name);
            });
        } else {
            this._connect(name);
        }
    }

    _connect(name) {
        this.db = new PouchDB(name);
        this.remote = new PouchDB(`${remote}/${name}`);
        this.db.sync(this.remote, {
            live: true,
            retry: true,
        }).on('change', (change) => {
            console.log(change);
            if (change.direction === 'pull') {
                change.change.docs.forEach((doc) => {
                    DocView.update(doc);
                }, this);
            }
        }).on('error', (err) => {
            console.log(err);
        });
    }

    put(doc) { // proxy this for now
        return this.db.put(doc);
    }

    get(id) {
        return this.db.get(id);
    }

    all() {
        return this.db.allDocs({ include_docs: true });
    }

    info() {
        return this.db.info();
    }

    dbs(callback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('GET', `${remote}/_all_dbs`, true);
        xhr.send();
    }
}

export { DB };
