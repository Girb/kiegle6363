import Backbone from 'backbone';

export default class NavBar extends Backbone.View {
    get tagName() { return 'nav'; }
    get className() { return 'navbar navbar-expand-lg navbar-dark fixed-top'; }
    initialize(options) {
        Object.assign(this, options);
        this.$el.empty().append(this.template);
        this.$info = this.$('.info');
    }
    update() {
        this.$info.text(app.comp.get('title'));
        this.$('#pl').prop('href', `/competition/${app.competitionId()}/participants`);
        this.$('#cl').prop('href', `/competition/${app.competitionId()}`);
        this.$('#rl').prop('href', `/competition/${app.competitionId()}/results`);
    }
    get template() {
        return `
            <a class="navbar-brand" href="/">Kiegle6363</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a id="pl" class="nav-link" href="/participants">Registrering</a>
                    </li>
                    <li class="nav-item">
                        <a id="cl" class="nav-link" href="/competition">Slagning</a>
                    </li>
                    <li class="nav-item">
                        <a id="rl" class="nav-link" href="/results">Resultater</a>
                    </li>
                </ul>
                <span class="navbar-text ml-auto info">&copy; Kiegleklubben Kniksen</span>
            </div>
            
        `;
    }
    get events() {
        return {
            'click .addparticipant': 'add'
        };
    }


    render() {
        //this.$el.empty();
//        this.$el.toggle(!!app || !!app.comp);

        return this;
    }
}
