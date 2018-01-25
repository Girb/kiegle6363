import View from '../core/view';
import { EditParticipantView } from './editparticipant';
import { ParticipantListItem } from "./participantlistitem";

class ParticipantsView extends View {
    get className() {
        return 'participants';
    }
    get template() {
        return `
            <div id='participantlist'></div>        
        `;
    }
    list() {
        const lst = this.one('#participantlist');
        lst.innerHTML = '';
        app.db.all().then(function(result) {
            result.rows.forEach(function(row) {
                var itm = new ParticipantListItem({ doc: row.doc });
                lst.appendChild(itm.render().el);
            }, this);
        }.bind(this));
    }
    render() {
        const ev = new EditParticipantView();
        ev.on('add', function(doc) {
            this.list();
        }, this);
        this.el.insertBefore(ev.render().el, this.one('#participantlist'));

        this.list();

        return this;
    }
}

export { ParticipantsView };
