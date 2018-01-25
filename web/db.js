import PouchDB from 'pouchdb-browser';
import DocView from './views/docview';

class DB {
    constructor(name) {
        this.db = new PouchDB(name);
        this.remote = new PouchDB(`http://genghis:8081/${name}`);
        this.db.sync(this.remote, {
            live: true,
            retry: true
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

    all() {
        return this.db.allDocs({ include_docs: true });
    }
}

export { DB };
