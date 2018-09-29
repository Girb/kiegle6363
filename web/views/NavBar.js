import $ from 'jquery';
import Backbone from 'backbone';

export default class NavBar extends Backbone.View {
    get tagName() { return 'nav'; }
    get className() { return 'navbar navbar-expand-lg navbar-dark fixed-top'; }
    initialize(options) {
        Object.assign(this, options);
        this.$el.empty().append(this.template);
        this.$info = this.$('.info');
    }
    get events() {
        return {
            'click .nav-link': 'go',
        };
    }
    go(e) {
        e.preventDefault();
        const t = $(e.currentTarget);
        const url = `/competition/${app.competitionId() + t.prop('href')}`;
        app.navigate(url, { trigger: true, replace: false });
    }
    update() {
        if( app.comp ) {
            this.$info.text(app.comp.get('title'));
            this.$('#sl').prop('href', `/competition/${app.competitionId()}/signup`);
            this.$('#pl').prop('href', `/competition/${app.competitionId()}/participants`);
            this.$('#cl').prop('href', `/competition/${app.competitionId()}/queue`);
            this.$('#rl').prop('href', `/competition/${app.competitionId()}/results`);
        }
        this.$('ul.navbar-nav').toggle(!!app.comp);
    }
    get template() {
        return `
            <a class="navbar-brand" href="/">Kiegle6363</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item su">
                        <a id="sl" class="nav-link" href="/signup">Påmelding</a>
                    </li>
                    <li class="nav-item pa">
                        <a id="pl" class="nav-link" href="/participants">Registrering</a>
                    </li>
                    <li class="nav-item co">
                        <a id="cl" class="nav-link" href="/queue">Slagning</a>
                    </li>
                    <li class="nav-item re">
                        <a id="rl" class="nav-link" href="/results">Resultater</a>
                    </li>
                </ul>
                <span class="navbar-text ml-auto info">&copy; Kiegleklubben Kniksen</span>
            </div>
            
        `;
    }
    render() {
        this.$('.nav-item').removeClass('active');
        const f = Backbone.history.fragment;
        if (f) {
            if (f.indexOf('signup') !== -1) this.$('.su').addClass('active');
            if (f.indexOf('participants') !== -1) this.$('.pa').addClass('active');
            if (f.indexOf('queue') !== -1) this.$('.co').addClass('active');
            if (f.indexOf('results') !== -1) this.$('.re').addClass('active');
        }
        this.update();
        return this;
    }
}
