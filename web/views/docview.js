import View from '../core/view';

const singleton = Symbol();
class DocView extends View {
    constructor(options) {
        super(options);
        if (!options.doc) throw new Error('No doc specified for docview.');
        this.doc = options.doc;
        this.docid = this.doc._id; // eslint-disable-line
        DocView.addInstance(this);
    }

    static addInstance(instance) {
        DocView.instances[instance.docid] = instance;
    }

    static update(doc) {
        const view = DocView.instances[doc._id];
        if (view) {
            view.doc = doc;
            view.rerender();
        }
    }

    static get instances() {
        if( !this[singleton] ) {
            this[singleton] = {};
        }
        return this[singleton];
    }
}

export default DocView;
