import { Router } from './core/router';
import { HomeView } from './homeview';
import { TestView } from './testview';
import { ParticipantsView } from './views/participants';
import { DB } from './db';

class App extends Router {
    constructor(config) {
        super();
        this.db = new DB('mydb2');
    }
    get routes() {
        return {
            '': 'home',
            'test': 'test',
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

    applyView(view) {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        document.body.appendChild(view.render().el);
        return view;
    }
}

export { App };
