import Backbone from 'backbone';

export default class ParticipantListItem extends Backbone.View {
    get tagName() { return 'tr'; }
    initialize(options) {
        Object.assign(this, options);
        this.listenTo(this.model, 'remove', this.remove);
    }
    get events() {
        return {
            'click .up': 'moveUp',
            'click .dn': 'moveDn',
            'click .confirm': 'confirm',
            'click .mnureg': 'registered',
        };
    }
    moveUp() {
        this.model.moveUp();
        this.$el.insertBefore(this.$el.prev());
    }
    moveDn() {
        this.model.moveDn();
        this.$el.insertAfter(this.$el.next());
    }
    confirm() {
        this.model.confirm();
    }
    registered() {
        this.model.registered();
    }
    get confirmedTemplate() {
        return `
        <td scope="row">${this.model.get('firstname')} ${this.model.get('lastname')}</td>
        <td>${this.model.get('club')}</td>
        <td>${this.model.get('email')}</td>
        <td class="commands">
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-sm btn-secondary up"><i class="material-icons">keyboard_arrow_up</i></button>
                <button type="button" class="btn btn-sm btn-secondary dn"><i class="material-icons">keyboard_arrow_down</i></button>
                <button id="more${this.model.get('id')}" type="button" class="btn btn-sm btn-secondary dropdown-toggle more" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Valg</button>
                <div class="dropdown-menu" aria-labelledby="${this.model.get('id')}">
                    <a class="dropdown-item mnureg" href="#">Påmeldt</a>
                </div>
            </div>
        </td>
        `;
    }
    get registeredTemplate() {
        return `
            <td scope="row">${this.model.get('firstname')} ${this.model.get('lastname')}</td>
            <td>${this.model.get('club')}</td>
            <td>${this.model.get('email')}</td>
            <td class="commands">
                <button type="button" class="btn btn-sm btn-secondary confirm">Bekreft</button>
            </td>
        `;
    }
    render() {
        const tmp = this.model.get('status_id') === 1 ? this.confirmedTemplate : this.registeredTemplate;
        this.$el.empty().append(tmp);
        return this;
    }
}
