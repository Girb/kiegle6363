import 'bootstrap';
import Backbone from 'backbone';
import NavBar from './views/NavBar';
import ParticipantsView from './views/ParticipantsView';
import AdminHome from './views/AdminHome';
import Server from './server';
import HomeView from './views/HomeView';
import CompetitionView from './views/CompetitionView';
import Round from './models/Round';
import RegView from './views/RegView';

class App extends Backbone.Router {
    initialize(options) {
        Object.assign(this, options);
        const body = $('body');
        new NavBar({ session: this.session }).render().$el.appendTo(body);
        this.$main = $('<div/>').prop('id', 'main').appendTo(body);        
    }
    url(tail) {
        return `${Server.baseUrl()}${tail}`;
    }
    get routes() {
        return {
            '': 'home',
            'test': 'test',
            'admin': 'admin',
            'participants': 'participants',
            'competition': 'competition',
            'results': 'results',            
            'reg/:id/:count': 'reg',
            'round/:id': 'round'
        };
    }
    start(dbname) { // starts the app
        console.log('app starting');
        localStorage.setItem('dbname', dbname);
        Backbone.history.start({ pushState: true });
        $(document).on('click', 'a:not([data-bypass]):not(.dropdown-item)', function (evt) {
            var href = $(this).attr('href');
            var protocol = this.protocol + '//';
            if (href.slice(protocol.length) !== protocol) {
              evt.preventDefault();
              app.navigate(href, { trigger: true });
            }
          });
    }
    execute(callback, args) {
        if( !this.session.get('competition') ) {
            this.navigate('/');
            this.home.apply(this, args);
        } else {
            callback && callback.apply(this, args);
        }
    }
    home() {
        this.$main.empty();
        const hv = new HomeView();
        hv.render().$el.appendTo(this.$main);                        
    }
    test() {
    }
    round(id) {
        const round = new Round();
        round.url = this.url(`/rounds/${id}`);
        round.fetch().then(() => {
            const rv = new RegView({ model: round });
            rv.render().$el.appendTo(this.$main);
        });
    }
    competition() {
        this.$main.empty();        
        var cv = new CompetitionView();
        cv.render().$el.appendTo(this.$main);
    }
    results() {
        this.$main.empty().append('results');
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
