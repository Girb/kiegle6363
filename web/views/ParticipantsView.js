import BaseView from './BaseView';
import Participants from '../models/Participants';
//import EditParticipantView from './EditParticipantView';
import ParticipantListItem from './participantlistitem';

export default class ParticipantsView extends BaseView {
    get title() { return 'Slagere'; }
    get className() {
        return 'participants';
    }
    initialize(options) {
        Object.assign(this, options);
        this.$el.append(this.template);
        this.collection = new Participants();
        this.collection.url = 'http://localhost:3001/api/competitions/2/participants';
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        this.collection.fetch({ reset: true });
    }
    get events() {
        return {
            'click #addparticipant': 'add',
        };
    }
    get template() {
        return `
            <div id="participantlist"></div>
        `;
    }
    addOne(p) {
        const itm = new ParticipantListItem({ participant: p });
        itm.render().$el.appendTo(this.$('#participantlist'));
    }
    addAll() {
        this.$('#participantlist').empty();
        this.collection.each(this.addOne, this);
    }
    // add() {
    //     const ev = new EditParticipantView();
    //     ev.on('add', function (doc) {
    //         this.list();
    //     }, this);
    //     ev.render().show();
    // }


    render() {
        return this;
    }
}
