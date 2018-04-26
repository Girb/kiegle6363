import Backbone from 'backbone';
import Participant from './Participant';

export default class Participants extends Backbone.Collection {
    get model() { return Participant; }   
}