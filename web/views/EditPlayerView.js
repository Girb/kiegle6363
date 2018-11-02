import $ from 'jquery';
import ModalView from './ModalView';
import Server from '../server';

export default class EditPlayerView extends ModalView {
    get title() { return 'Legg til slager'; }
    get events() {
        return {
            'click .ok': 'add',
            'click .cancel': 'close',
            'input input': 'queryReady',
        };
    }
    queryReady() {
        let allok = true;
        this.$('input').each((idx, ipt) => {
            allok = allok && !!ipt.value.trim();
        }, this);
        this.$('.ok').attr('disabled', !allok);
    }
    add(e) {
        e.preventDefault();
        e.stopPropagation();
        const firstname = this.$('#firstname').val().trim(),
            lastname = this.$('#lastname').val().trim(),
            club_id = this.$('#club').val().trim();
        
        Server.post('/players', {
            firstname, lastname, club_id
        }).then((res) => {
            this.trigger('saved', res);
            this.close();
        });
    }
    get content() {
        return `
            <form>
                <div class="form-group">
                    <label for="firstname">Fornavn</label>
                    <input autofocus class="form-control" required id="firstname" />
                </div>
                <div class="form-group">
                    <label for="lastname">Etternavn</label>
                    <input class="form-control" required id="lastname" />
                </div>
                <div class="form-group">
                    <label for="club">Klubb</label>
                    <select class="form-control" required id="club" />
                </div>
            </form>
        `;
    }
    render() {
        ModalView.prototype.render.apply(this);
        const sel = this.$('#club');
        Server.get('/players/clubs').then((clubs) => {
            clubs.forEach((club) => {
                $('<option />').val(club.id).text(club.name).appendTo(sel);
            });
            this.$('#firstname').focus();
        });
        return this;
    }
}
