import Backbone from 'backbone';

export default class NavBar extends Backbone.View {
    get tagName() { return 'nav'; }
    get className() { return 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top'; }

    get template() {
        return `
            <a class="navbar-brand" href="#">Kiegle6363</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/participants">Registrering</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/competition">Slagning</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/tools">Verktøy</a>
                    </li>
                </ul>
                <button class="btn btn-primary my-2 my-sm-0 addparticipant" type="button"><i class="material-icons">person_add</i> Meld på slager</button>
            </div>
            
        `;
    }
    get events() {
        return {
            'click .addparticipant': 'add'
        };
    }

    add() {
        
    }

    render() {
        this.$el.empty().append(this.template);

        return this;
    }
}
