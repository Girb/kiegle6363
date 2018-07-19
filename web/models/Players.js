import Backbone from 'backbone';
import Player from './Player';

export default class Players extends Backbone.Collection {
    get model() { return Player; }
}