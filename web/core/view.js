import EventHost from './eventhost';

class View extends EventHost {
    constructor(options) {
        super();
        options = options || {};
        this.handlers = {};
        this.setElement(options.el || document.createElement(this.tagName));
        if (this.className) {
            this.className.split(' ').forEach(function (cn) {
                this.el.classList.add(cn);
            }, this);
        }
        this.el.setAttribute('id', this.id);
    }
    setElement(element) {
        this.undelegateEvents();
        this.el = element;
        const tmp = this.template;
        if (tmp) {
            this.el.innerHTML = tmp;
        }
        this.delegateEvents();
        return this;
    }
    get id() {
        return '';
    }
    get className() {
        return '';
    }
    get tagName() {
        return 'div';
    }
    get template() {
        return '';
    }
    all(selector) {
        return this.el.querySelectorAll(selector);
    }
    one(selector) {
        return this.el.querySelector(selector);
    }
    delegate(eventName, selector, listener) {
        this.handlers[`${selector}:${eventName}`] = listener;
        [].forEach.call(this.all(selector), (elx) => {
            elx.addEventListener(eventName.split('.')[0], listener);
        });
    }
    delegateEvents(events) {
        events = events || this.events; // eslint-disable-line
        if (!events) return this;

        this.undelegateEvents();
        Object.keys(events).forEach(function (key) {
            let func = events[key];
            if (!(typeof func === 'function')) {
                func = this[func];
            }
            if (func) {
                const match = key.match(/^(\S+)\s*(.*)$/);
                this.delegate(match[1], match[2], func.bind(this));
            }
        }, this);
        return this;
    }
    undelegateEvents() {
        Object.keys(this.handlers).forEach(function (key) {
            this.all(key.split(':')[0]).removeListener(key.split(':')[1]);
        }, this);
    }
    remove() {
        this.el.parentNode.removeChild(this.el);
        return this;
    }
    empty() {
        while (this.el.lastChild) {
            this.el.removeChild(this.el.lastChild);
        }
    }
    isFunction(x) {
        return typeof (x) === 'function';
    }
    rerender() { // maybe think of something better here...
        const tmp = this.template;
        if (tmp) {
            this.el.innerHTML = tmp;
        } else {
            this.el.innerHTML = '';
        }
        this.render();
    }
    render() {
        return this;
    }
}

export default View;
