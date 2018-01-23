import View from './core/view';
import PouchDB from 'pouchdb-browser';

class TestView extends View {
    constructor() {
        super();
        this.db = new PouchDB('mydb');
        this.remote = new PouchDB('http://genghis:8081/my_db');
        this.db.sync(this.remote, {
            live: true,
        }).on('change', (change) => {

        }).on('error', (err) => {
            console.log(err);
        });
    }
    get className() {
        return 'test';
    }

    get template() {
        return `
            <div><label for="name">Navn</label><input id="name" /></div>
            <div><label for="age">Alder</label><input id="age" type="number" /></div>
            <button id="okgo"><span>Ok go</span></button>
            <div id="list"></div>
        `;
    }

    list() {
        const lst = this.one('#list');
        lst.innerHTML = '';
        this.db.allDocs({ include_docs: true }).then((response) => {
            response.rows.forEach(function (row) {
                const d = document.createElement('div');
                d.innerText = `${row.doc.name} (${row.doc.age})`;
                this.one('#list').appendChild(d);
            }, this);
        });
    }

    render() {
        this.one('#okgo').addEventListener('click', () => {
            const name = this.one('#name').value,
                age = this.one('#age').value;
            const doc = {
                _id: `${new Date().valueOf()}`,
                name,
                age,
            };
            this.db.put(doc);
            this.list();
        });

        this.list();

        return this;
    }
}

export { TestView };
