import NativeView from 'backbone.nativeview';

class BaseView extends NativeView {
    one(selector) {
        return _.first(this.$(selector));
    }
    all(selector) {
        return _.toArray(this.$(selector));
    }
}

export default BaseView;
