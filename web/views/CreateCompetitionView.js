import $ from 'jquery';
import Backbone from 'backbone';
import Competition from '../models/Competition';
import moment from 'moment';

export default class CreateCompetitionView extends Backbone.View {
    get className() { return 'newcomp card text-primary'; }
    initialize(options) {
        Object.assign(this, options);
    }
    get template() {
        return `
            <form>
                <div class="form-group">
                    <label for="type">Type</label>
                    <select autofocus id="type" class="form-control">
                        <option value="1">Kongematch (kvalifisering)</option>
                        <option value="2">Kongematch (semi)</option>
                        <option value="3">Kongematch (finale)</option>
                        <option selected value="4">Slagning / Kniksens Vandrepokal</option>
                        <option value="5">Dronningaften</option>
                        <option value="6">Klubb vs Klubb</option>
                        <option value="7">Gustibus-kveld</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="name">Navn</label>
                    <input id="name" disabled="disabled" class="form-control" placeholder="Navn på konkurransen" />
                </div>
                <button type="button" class="btn btn-primary" disabled="disabled" id="btncreate">Opprett konkurranse</button>
            </form>
        `;
    }
    get events() {
        return {
            'click .addimg': 'start',
            'input #name': 'queryReady',
            'change #type': 'fixName',
            'click #btncreate': 'commit',
        };
    }
    commit(e) {
        e.preventDefault();
        this.model.set({
            title: this.$('#name').val(),
            type_id: this.$('#type').val()
        });
        this.model.save().then(() => {
            this.trigger('created', this.model);
            delete this.model;
            this.render();
        });
    }
    fixName() {
        const t = this.$('#type').val();
        let name;
        if( ['1','2','3','5','7'].indexOf(t) !== -1 ) {
            name = this.$('#type>option:selected').text() + ' ' + moment().format('YYYY');
        } else if( t === '4' ) {
            name = 'Slagning ' + moment().format('DD.MM.YYYY');
        }
        this.$('#name').val(name).prop('disabled', t !== '6');
        this.queryReady();
    }
    queryReady() {
        this.$('#btncreate').prop('disabled', !this.$('#name').val().trim());
    }
    start() {
        this.model = new Competition();
        this.model.url = app.url('/competitions/new');
        this.render();
    }
    create(e) {
    }
    render() {
        this.$el.empty();
        if (this.model) {
            this.$el.append(this.template);
            this.fixName();
        } else {
            $('<div/>').addClass('addimg').appendTo(this.$el);
        }
        
        return this;
    }
}
