import NativeView from 'backbone.nativeview';

export default class RegOptionsView extends NativeView {
    constructor(doc) {
        super();
        this.doc = doc;
    }
    get className() { return 'options'; }
    get events() {
        return {
            'click #cancelreg': 'discard',
            'click #startreg': 'start',
            'click #savereg': 'save'
        };
    }
    start() {
        this.trigger('start', this.doc);
    }
    discard() {
        this.trigger('discard', this.doc);
    }
    save() {
        this.trigger('save', this.doc);
    }
    button(id, text) {
        const b = document.createElement('button');
        b.setAttribute('id', id);
        const txt = document.createElement('span');
        txt.innerText = text;
        b.appendChild(txt);
        return b;
    }
    render() {
        this.el.innerHTML = '';
        if (!this.doc.get('draft')) {
            this.el.appendChild(this.button('startreg', 'Start'));
        } else {
            this.el.appendChild(this.button('cancelreg', 'Forkast'));
            this.el.appendChild(this.button('savereg', 'Bekreft og lagre'));
        }
        return this;
    }
}
