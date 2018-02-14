import NativeView from 'backbone.nativeview';

export default class SingleScoreView extends NativeView {
    constructor(score) {
        super();
        this.score = score;
    }
    get tagName() { return 'span'; }
    get attributes() {
        return {
            'tabindex': '0',
        };
    }
    get events() {
        return {
            'keypress': 'kp',
            'focus': 'fc',
            'blur input': 'bl',
        };
    }
    bl() {
        this.ipt && this.el.removeChild(this.ipt);
    }
    fc() {
        this.ipt = document.createElement('input');
        this.ipt.setAttribute('type', 'number');
        this.ipt.setAttribute('style', 'position: absolute; left: -120%;')
        this.el.append(this.ipt);
        this.ipt.focus();
    }
    kp(e) {
        this.el.innerText = e.key;
        this.trigger('change:value', this);
    }
    get() {
        return isNaN(this.el.innerHTML) ? undefined : parseInt(this.el.innerHTML);
    }
    render() {
        this.el.innerHTML = this.score || '-';
        return this;
    }
}
