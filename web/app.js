import { Router } from './core/router';
import Header from './Header';
import { HomeView } from './homeview';
import { TestView } from './testview';
import { ParticipantsView } from './views/ParticipantsView';
import { DB } from './db';
import AdminHome from './views/AdminHome';
import CreateCompetitionView from './views/CreateCompetitionView';

class App extends Router {
    constructor(config) {
        super();
        this.db = new DB('mydb2');
    }
    get routes() {
        return {
            '': 'home',
            'test': 'test',
            'admin': 'admin',
            'admin/competitions/create': 'createCompetition',
            'participants': 'participants',
        };
    }
    start() { // starts the app
        super.start();
        // this.navigate('/');
    }

    home() {
        this.applyView(new HomeView());
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

    createCompetition() {
        this.applyView(new CreateCompetitionView());
    }

    applyView(view) {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        document.body.appendChild(new Header(view).render().el);
        const container = document.createElement('div');
        container.classList.add('container');
        document.body.appendChild(container);
        container.appendChild(view.render().el);
        return view;
    }
}

export { App };
