import Backbone from 'backbone';
import Participant from './Participant';
import Server from '../server';

export default class Results extends Backbone.Collection {
    get model() { return Participant; }
    comparator(x) {
        return -x.get('best2sum');
    }
}
