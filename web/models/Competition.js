import Backbone from 'backbone';

export default class Competition extends Backbone.Model {
    initialize(options) {
        Object.assign(this, options);
    }
    url() {
        return app.url(`/competitions/${this.id || 'new'}`);
    }
    fetch() {
        const s = localStorage.getItem('competition');
        if( s && s.id ) {
            this.set(JSON.parse(s));
            return $.Deferred().resolve();
        } else {
            return Backbone.Model.prototype.fetch.apply(this, arguments);
        }
    }
    save() {
        if( this.id ) {
            localStorage.setItem('competition', JSON.stringify(this.toJSON()));
        }
        else {
            return Backbone.Model.prototype.save.apply(this, arguments);
        }        
    }
    destroy() {
        localStorage.removeItem('competition');
    }
    rulesDesc() {
        if (this.get('number_of_rounds') === -1) {
            return `Løpende ${this.get('throws_per_round')}ere`;
        } 
        return `${this.get('number_of_rounds')} X ${this.get('throws_per_round')}`;
    }
    get statusForResults() {
        return this.get('number_of_rounds') !== -1 ? 2 : ''; // defaults to 1+2 on server
    }
}
