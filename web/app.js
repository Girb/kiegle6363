import { Bacbkone } from 'backbone';
import Header from './Header';
import { HomeView } from './homeview';
import { TestView } from './testview';
import { ParticipantsView } from './views/ParticipantsView';
import { DB } from './db';
import AdminHome from './views/AdminHome';
import CreateCompetitionView from './views/CreateCompetitionView';
import SelectCompetitionView from './views/SelectCompetitionView';
import KVPList from './views/KVPList';
import RegView from './views/RegView';

class App extends Backbone.Router {
    constructor(options) {
        super(options);
        this.db = new DB('mydb2');
    }
    get routes() {
        return {
            '': 'home',
            'test': 'test',
            'admin': 'admin',
            'admin/competitions': 'competitions',
            'admin/competitions/create': 'createCompetition',
            'participants': 'participants',
            'reg/:id/:count': 'reg',
        };
    }
    start() { // starts the app
        Backbone.history.start();
        // this.navigate('/');
    }

    home() {
        this.applyView(new HomeView());
        this.applyView(new KVPList());
    }
    reg(id, count) {
        this.emptyBody();
        let rv = new RegView(id, count);
        document.body.appendChild(rv.render().el);
    }

    test() {
        this.applyView(new TestView());
    }

    participants() {
        this.applyView(new ParticipantsView());
    }

    admin() {
        this.applyView(new AdminHome());
    }

    competitions() {
        this.applyView(new SelectCompetitionView());
    }

    createCompetition() {
        this.applyView(new CreateCompetitionView());
    }

    emptyBody() {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    }

    applyView(view) {
        this.emptyBody();
        document.body.appendChild(new Header(view).render().el);
        const container = document.createElement('div');
        container.classList.add('container');
        document.body.appendChild(container);
        container.appendChild(view.render().el);
        return view;
    }
}

export { App };
