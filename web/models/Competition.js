import Backbone from 'backbone';

export default class Competition extends Backbone.Model {
    rulesDesc() {
        if (this.get('number_of_rounds') === -1) {
            return `Løpende ${this.get('throws_per_round')}ere`;
        } 
        return `${this.get('number_of_rounds')} X ${this.get('throws_per_round')}`;
    }
}
