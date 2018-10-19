import 'bootstrap';
import $ from 'jquery';
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
import SignupView from './views/SignupView';
import KVPResultsView from './views/KVPResultsView';

import Queue from './views/public/Queue';
import ResultsList from './views/public/ResultsList';

class App extends Backbone.Router {
    initialize(options) {
        Object.assign(this, options);
        const body = $('body');
        this.$navbar = $('<nav/>').addClass('navbar navbar-expand-lg navbar-dark fixed-top').prependTo(body);
        this.$main = $('<div/>').prop('id', 'main').appendTo(body);
    }
    execute(callback, args) {
        Backbone.Router.prototype.execute.apply(this, arguments);
        this.navbar = new NavBar({ el: this.$navbar });
        this.navbar.render();
    }
    url(tail) {
        return `${Server.baseUrl()}${tail}`;
    }
    alert(txt, className) {
        const ad = $('<div/>')
            .addClass(`alert alert-${  className}`)
            .prop('role', 'alert')
            .html(txt)
            .hide()
            .appendTo($('body'))
            .show(150);
        setTimeout(() => {
            ad.hide(100, () => {
                ad.remove();
            });
        }, 3000);
    }
    get routes() {
        return {
            '': 'home',
            'test': 'test',
            'admin': 'admin',
            'competition': 'competition',
            'competition/:id': 'competition',
            'competition/:id/queue': 'competition',
            'competition/:id/signup': 'signup',
            'competition/:id/participants': 'participants',
            'competition/:id/results': 'results',            

            'competition/:id/public/queue': 'publicQueue',
            'competition/:id/public/results': 'publicResults',
            
            'reg/:id/:count': 'reg',
            'round/:id': 'round',
        };
    }
    start() { // starts the app
        console.log('app starting');
        Backbone.history.start({ pushState: true });
        $(document).on('click', 'a:not([data-bypass]):not(.dropdown-item)', function (evt) {
            let href = $(this).attr('href');
            let protocol = `${this.protocol  }//`;
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
        delete this.comp;
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
        this.comp = new Competition({ id });
        this.comp.fetch().then(() => {
            this.comp.save();
            this.$main.empty();
            let cv = new CompetitionView();
            cv.render().$el.appendTo(this.$main);
        });
    }
    results(id) {
        this.comp = new Competition({ id });
        this.comp.fetch().then(() => {
            this.comp.save();
            this.$main.empty();
            let rv = new KVPResultsView();
            rv.render().$el.appendTo(this.$main);
        });
    }
    signup(id) {
        this.comp = new Competition({ id });
        this.comp.fetch().then(() => {
            this.$main.empty();
            const sv = new SignupView();
            sv.render().$el.appendTo(this.$main);
        });
    }
    participants(id) {
        this.comp = new Competition({ id });
        this.comp.fetch().then(() => {
            this.$main.empty();
            const pv = new ParticipantsView();
            pv.render().$el.appendTo(this.$main);
        });
    }
    publicQueue(id) {
        this.comp = new Competition({ id });
        this.comp.fetch().then(() => {
            $('body').addClass('public').empty();
            const qv = new Queue({ model: this.comp });
            qv.render().$el.appendTo($('body'));
        });
    }
    publicResults(id) {
        this.comp = new Competition({ id });
        this.comp.fetch().then(() => {
            $('body').addClass('public').empty();
            const rl = new ResultsList({ model: this.comp });
            rl.render().$el.appendTo($('body'));
        });
    }
    admin() {
    }

    competitionId() {
        return this.comp.id;
    }

    current() {
        let router = this,
            fragment = Backbone.history.fragment,
            routes = _.pairs(router.routes),
            route = null, 
            params = null, 
            matched;

        matched = _.find(routes, (handler) => {
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
            route,
            fragment,
            params,
        };
    }
}

export { App };
