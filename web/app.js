import 'bootstrap';
import Backbone from 'backbone';
import NavBar from './views/NavBar';
import ParticipantsView from './views/ParticipantsView';
import AdminHome from './views/AdminHome';

class App extends Backbone.Router {
    initialize() {
        const body = $('body');
        new NavBar().render().$el.appendTo(body);
        this.$main = $('<div/>').prop('id', 'main').appendTo(body);        
    }
    get competition() {
        return { id: 2 };
    }
    get routes() {
        return {
            '': 'home',
            'test': 'test',
            'admin': 'admin',
            'competitions': 'competitions',
            'participants': 'participants',
            'reg/:id/:count': 'reg',
        };
    }
    start(dbname) { // starts the app
        localStorage.setItem('dbname', dbname);
        // this.db = new DB(dbname);
        Backbone.history.start({ pushState: true });
        // this.navigate('/');
    }
    home() {
        
    }
    test() {
    }
    competitions() {
        
    }
    participants() {
        this.$main.empty();
        const pv = new ParticipantsView();
        pv.render().$el.appendTo(this.$main);
    }
    admin() {
    }
}

export { App };
