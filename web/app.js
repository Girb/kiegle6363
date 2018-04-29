import { Bacbkone } from 'backbone';
import Header from './Header';
import { HomeView } from './homeview';
import { TestView } from './testview';
import { ParticipantsView } from './views/ParticipantsView';
import AdminHome from './views/AdminHome';
import CreateCompetitionView from './views/CreateCompetitionView';
import SelectCompetitionView from './views/SelectCompetitionView';
import KVPList from './views/KVPList';
import RegView from './views/RegView';
import KVPSideNav from './views/KVPSideNav';
import StagesList from './views/StagesList';

class App extends Backbone.Router {
    get competition() {
        return { id: 2 }
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
    start(dbname) { // starts the app
        localStorage.setItem('dbname', dbname);
        //this.db = new DB(dbname);
        Backbone.history.start();
        // this.navigate('/');
    }

    home() {
        this.applyView(new StagesList(), 'bb');
        this.sideNav(new KVPSideNav());
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
        this.sideNav(new KVPSideNav());
    }

    admin() {
        this.applyView(new AdminHome());
        this.sideNav(new KVPSideNav());
    }

    competitions() {
        this.applyView(new SelectCompetitionView());
        this.sideNav(new KVPSideNav());
    }

    createCompetition() {
        this.applyView(new CreateCompetitionView());
    }

    emptyBody(cls) {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        document.body.className = cls;
    }

    applyView(view, bodyclass) {
        this.emptyBody(bodyclass);
        document.body.appendChild(new Header(view).render().el);
        const container = document.createElement('div');
        container.classList.add('container');
        document.body.appendChild(container);
        container.appendChild(view.render().el);
        return view;
    }

    sideNav(nav) {
        document.body.appendChild(nav.render().el);
    }
}

export { App };
