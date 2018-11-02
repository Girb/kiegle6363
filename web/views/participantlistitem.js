import $ from 'jquery';
import Backbone from 'backbone';
import Players from '../models/Players';
import PlayerSelect from './PlayerSelect';

export default class ParticipantListItem extends Backbone.View {
    get tagName() { return 'tr'; }
    initialize(options) {
        Object.assign(this, options);
        this.listenTo(this.model, 'remove', this.remove);
        this.listenTo(this.model, 'sync', this.render);
    }
    get events() {
        return {
            'click .confirm': 'confirm',
            'click .mnureg': 'registered',
            'click .commitplayer': 'registerPlayer',
            'click .unregister': 'unregisterPlayer',
        };
    }
    registerPlayer(e) {
        e.preventDefault();
        const playerid = this.playerSelect.$el.val();
        this.model.url = app.url(`/competitions/${app.comp.id}/players/add/${playerid}`);
        this.model.save();
        // .then(() => {
        //     this.model.collection.fetch({ reset: true });
        // });
    }
    unregisterPlayer(e) {
        e.preventDefault();
        this.model.destroy();
    }
    confirm() {
        this.model.confirm().then(() => {
            this.model.collection && this.model.collection.fetch();
            app.alert(this.model.toString() + ' ble bekreftet', 'success');
        });
    }
    registered() {
        this.model.registered().then(() => {
            this.model.collection && this.model.collection.fetch();
            app.alert(this.model.toString() + ' har fått status påmeldt', 'success');
        });
    }
    get confirmedTemplate() {
        return `
        <td scope="row">${this.model.get('firstname')} ${this.model.get('lastname')}</td>
        <td>${this.model.get('club')}</td>
        <td class="commands">
            <div class="btn-group" role="group">
                <button id="more${this.model.get('id')}" type="button" class="btn btn-sm btn-secondary dropdown-toggle more" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Valg</button>
                <div class="dropdown-menu" aria-labelledby="${this.model.get('id')}">
                    <a class="dropdown-item mnureg" href="#">Angre bekreft opmøte</a>
                </div>
            </div>
        </td>
        `;
    }
    get registeredTemplate() {
        return `
            <td scope="row">${this.model.get('firstname')} ${this.model.get('lastname')}</td>
            <td>${this.model.get('club')}</td>
            <td class="commands">
                <button type="button" class="btn btn-sm btn-secondary confirm">Bekreft oppmøte</button>
                <button type="button" class="btn btn-sm btn-outline-danger unregister">Meld av</button>
            </td>
        `;
    }
    get newTemplate() {
        return `
        <td class="addrow" colspan="4">
            <form>
                <div class="form-row">
                    <div class="col playersel"></div>
                    <div class="col-auto">
                        <button class="btn btn-success commitplayer"><i class="material-icons">check</i>Meld på</button>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-primary newplayer"><i class="material-icons">person_add</i>Opprett ny person</button>
                    </div>
                </div>
            </form>
        </td>            
        `;
    }
    render() {
        let tmp;
        if (this.model.isNew()) {
            tmp = this.newTemplate;
        } else if (this.model.get('status_id') === 1) {
            tmp = this.confirmedTemplate;
        } else {
            tmp = this.registeredTemplate;
        }
         
        this.$el.empty().toggleClass('table-info', this.model.isNew()).append(tmp);
        if (this.model.isNew()) {
            const players = new Players();
            players.url = `http://localhost:3001/api/competitions/${app.comp.id}/players/add`;
            this.playerSelect = new PlayerSelect({ collection: players });
            this.playerSelect.render().$el.appendTo(this.$('.playersel'));
        }
        return this;
    }
}
