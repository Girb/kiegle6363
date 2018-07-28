import Backbone from 'backbone';

export default class NavBar extends Backbone.View {
    get tagName() { return 'nav'; }
    get className() { return 'navbar navbar-expand-lg navbar-dark fixed-top'; }
    initialize(options) {
        Object.assign(this, options);
        this.listenTo(this.session, 'change:competition', this.render);
        this.$el.empty().append(this.template);
        this.$info = this.$('.info');
    }
    info(txt) {
        this.$info.text(txt);
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
                        <a class="nav-link" href="/participants">Registrering</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/competition">Slagning</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/results">Resultater</a>
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
        
        this.$el.toggle(!!this.session.get('competition'));

        return this;
    }
}
