import BaseView from '../BaseView';

class EditParticipantView extends BaseView {
    get className() {
        return 'edit';
    }
    get events() {
        return {
            'click #addparticipant': 'add',
            'input input': 'queryReady',
        };
    }
    queryReady() {
        let allok = true;
        this.all('input').forEach((ipt) => {
            allok = allok && !!ipt.value.trim();
        }, this);
        allok && this.one('#addparticipant').removeAttribute('disabled');
        !allok && this.one('#addparticipant').setAttribute('disabled', allok ? '' : 'disabled');
    }
    add(e) {
        e.preventDefault();
        e.stopPropagation();
        const fn = this.one('#firstname').value.trim(),
            ln = this.one('#lastname').value.trim(),
            cl = this.one('#club').value.trim();
        const doc = {
            _id: `${cl}-${ln}-${fn}`,
            firstname: fn,
            lastname: ln,
            club: cl,
        };
        app.db.put(doc).then((saveddoc) => {
            this.trigger('add', saveddoc);
        });
    }
    get template() {
        return `
            <div><label for="firstname">Fornavn</label><input required id="firstname" /></div>
            <div><label for="lastname">Etternavn</label><input required id="lastname" /></div>
            <div><label for="club">Klubb</label><input required id="club" /></div>
            <div><button disabled="disabled" id="addparticipant"><span>Legg til</span></button></div>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}

export { EditParticipantView };
