import 'bootstrap';
import Backbone from 'backbone';
import NavBar from './views/NavBar';
import ParticipantsView from './views/ParticipantsView';
import AdminHome from './views/AdminHome';
import Server from './server';
import HomeView from './views/HomeView';
import CompetitionView from './views/CompetitionView';
import Competition from './models/Competition';
import Round from './models/Round';
import RegView from './views/RegView';

class App extends Backbone.Router {
    initialize(options) {
        Object.assign(this, options);
        const body = $('body');
        this.navbar = new NavBar();
        this.navbar.render().$el.appendTo(body);
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
            'competition/:id': 'competition',
            'competition/:id/participants': 'participants',
            'competition/:id/results': 'results',            
            'reg/:id/:count': 'reg',
            'round/:id': 'round'
        };
    }
    start() { // starts the app
        console.log('app starting');
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
    // execute(callback, args) {
    //     if( !this.session.get('competition') ) {
    //         this.navigate('/');
    //         this.home.apply(this, args);
    //     } else {
    //         callback && callback.apply(this, args);
    //     }
    // }
    home() {
        this.$main.empty();
        const hv = new HomeView();
        hv.render().$el.appendTo(this.$main);                        
    }
    test() {
    }
    round(id) {
        this.$main.empty();
        const round = new Round();
        round.url = this.url(`/rounds/${id}`);
        round.fetch().then(() => {
            const rv = new RegView({ model: round });
            rv.render().$el.appendTo(this.$main);
        });
    }
    competition(id) {
        this.comp = new Competition({ id: id });
        this.comp.fetch().then( () => {
            this.comp.save();
            this.$main.empty();
            var cv = new CompetitionView();
            cv.render().$el.appendTo(this.$main);
        });
    }
    results() {
        this.$main.empty().append('results');
    }
    participants(id) {
        this.comp = new Competition({ id: id });
        this.comp.fetch().then( () => {
            this.$main.empty();
            const pv = new ParticipantsView();
            pv.render().$el.appendTo(this.$main);
        });
    }
    admin() {
    }

    competitionId() {
        const r = this.current();
        if( r.route && r.route.toLowerCase() === 'competition' ) {
            if( r.params.length && !isNaN(r.params[0]) ) {
                return r.params[0];
            }
        }
        console.log('Could not find competitionid');
        return '';
    }

    current() {
        var router = this,
            fragment = Backbone.history.fragment,
            routes = _.pairs(router.routes),
            route = null, 
            params = null, 
            matched;

        matched = _.find(routes, function (handler) {
            route = _.isRegExp(handler[0]) ? handler[0] : router._routeToRegExp(handler[0]);
            return route.test(fragment);
        });

        if (matched) {
            // NEW: Extracts the params using the internal
            // function _extractParameters
            params = router._extractParameters(route, fragment);
            route = matched[1];
        }

        return {
            route: route,
            fragment: fragment,
            params: params
        };
    }
}

export { App };
