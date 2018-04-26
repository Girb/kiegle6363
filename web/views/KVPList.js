import BaseView from '../BaseView';
import Participant from '../Participant';
import KVPListItem from './KVPListItem';
import EditParticipantView from './EditParticipantView';

export default class KVPList extends BaseView {
    constructor() {
        super();
        app.db.on('update', (doc) => {
            //console.log('update!');
            this.render();
        });
    }
    get tagName() { return 'ul'; }
    get className() { return 'bb'; }
    get title() { return app.db.toString(); }
    get events() {
        return {
            'click #addparticipant': 'addParticipant',
        };
    }
    addParticipant() {
        var epv = new EditParticipantView();
        this.listenToOnce(epv, 'add', (doc) => {
            this.render();
        });
        epv.render().show();
    }
    render() {
        app.db.all().then((result) => {
            this.el.innerHTML = '';
            result.rows.forEach((row) => {
                const p = new Participant(row.doc);
                const itm = new KVPListItem(p);
                this.listenTo(itm, 'click', (itmx) => {
                    window.location.href = `#reg/${itmx.model.get('_id')}/10`;
                });
                this.el.appendChild(itm.render().el);
            }, this);
            let addli = document.createElement('li');
            addli.setAttribute('id', 'addparticipant');
            addli.innerText = 'Legg til slager...';
            this.el.appendChild(addli);
        });
        return this;
    }
}
