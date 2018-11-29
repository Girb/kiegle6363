import Backbone from 'backbone';
import Participant from './Participant';
import Server from '../server';

export default class Results extends Backbone.Collection {
    get model() { return Participant; }
    comparator(x,y) {
        if( !x || !y ) return 0;
        const sumx = x.totalSum(),
            sumy = y.totalSum();
        if( sumx !== sumy ) {
            return sumx < sumy ? 1 : -1;
        }
        const cx = x.allRoundsCardinalityModifier(),
            cy = y.allRoundsCardinalityModifier();
        
        return cx < cy ? 1 : -1;
        //return -x.get('best2sum');
    }
}
