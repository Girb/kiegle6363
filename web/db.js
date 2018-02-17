import PouchDB from 'pouchdb-browser';
import DocView from './views/docview';
import DBName from './DBName';
import moment from 'moment';
import EventHost from './core/eventhost'

const remote = 'http://admin:kiegle6363@185.7.62.149:5984';

class DB extends EventHost {
    constructor(name) {
        super();
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
                    this.trigger('update', doc);
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
        //return this.db.allDocs({ include_docs: true });
        return this.db.query(function(doc) {
            emit(doc.sortOrder);
        }, { include_docs: true });
    }

    info() {
        return this.db.info();
    }

    static inferName(callback) {
        DB.dbs((res) => {
            let found = false;
            for (const db of res) {
                if (!db.startsWith('_')) {
                    const dbn = new DBName(db);
                    if (moment().isSame(dbn.date, 'day')) {
                        callback(dbn.rawname);
                        found = true;
                        return;
                    }
                }
            }
            !found && res.length && callback(res[0]); // grasping at straws here...
        });
    }

    static dbs(callback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('GET', `${remote}/_all_dbs`, true);
        xhr.send();
    }

    isKniksen() {
        return new DBName(localStorage.getItem('dbname')).rulesAbbr === 'kvp';
    }

    toString() {
        const dbn = new DBName(localStorage.getItem('dbname'));
        return dbn.name + ' ' + dbn.dateStr;
    }
}

export default DB;
