import BaseView from '../BaseView';
import EditParticipantView from './EditParticipantView';
import { ParticipantListItem } from './participantlistitem';

class ParticipantsView extends BaseView {
    get title() { return 'Slagere'; }
    get className() {
        return 'participants';
    }
    get events() {
        return {
            'click #addparticipant': 'add',
        };
    }
    list() {
        const lst = this.one('#participantlist');
        lst.innerHTML = '';
        app.db.all().then((result) => {
            result.rows.forEach((row) => {
                const itm = new ParticipantListItem({ doc: row.doc });
                lst.appendChild(itm.render().el);
            }, this);
        });
    }
    add() {
        const ev = new EditParticipantView();
        ev.on('add', function (doc) {
            this.list();
        }, this);
        ev.render().show();
    }

    render() {
        this.el.innerHTML = `<div id='participantlist'></div>`;

        this.list();

        var btn = document.createElement('button');
        btn.setAttribute('id', 'addparticipant');
        btn.style.marginTop = '24px';
        var txt = document.createElement('span');
        txt.innerText = 'Legg til deltager';
        btn.appendChild(txt);
        this.el.appendChild(btn);

        return this;
    }
}

export { ParticipantsView };
