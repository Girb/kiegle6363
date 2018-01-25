class EventHost {
    constructor() {
        this.listeners = [];
        this._events = [];
    }

    on(type, listener, context) {
        this._addListener(type, listener, false, context);
    }
    once(type, listener, context) {
        this._addListener(type, listener, true, context);
    }
    off(eventType, listenerFunc) {
        const typeidx = this._events.indexOf(eventType);
        const hasType = eventType && typeidx !== -1;
        if (!hasType) return;

        if (!listenerFunc) {
            delete this.listeners[eventType];
            this._events.splice(typeidx, 1);
        } else {
            (function () {
                const removedEvents = [];
                const typeListeners = this.listeners[eventType];
                typeListeners.forEach((f, idx) => {
                    if (f.f === listenerFunc) {
                        removedEvents.unshift(idx);
                    }
                });
                removedEvents.forEach((idx) => {
                    typeListeners.splice(idx, 1);
                });
                if (!typeListeners.length) {
                    this._events.splice(typidx, 1);
                    delete this.listeners[eventType];
                }
            }.bind(this))();
        }
    }
    trigger(type) {
        for (var len = arguments.length, eventArgs = Array(len > 1 ? len - 1 : 0), key = 1; key < len; key++) {
            eventArgs[key - 1] = arguments[key];
        }
        this._applyEvents(type, eventArgs);
    }
    destroy() {
        this.listeners = [];
        this._events = [];
    }
    _addListener(type, listener, once, context) {
        if (typeof listener !== 'function') {
            throw TypeError('Listener must be a function');
        }

        const x = { once, f: listener, context };
        if (this._events.indexOf(type) === -1) {
            this.listeners[type] = [x];
            this._events.push(type);
        } else {
            this.listeners[type].push(x);
        }
    }
    _applyEvents(eventType, eventArguments) {
        const typeListeners = this.listeners[eventType];
        if (!typeListeners || !typeListeners.length) return;

        const removableListeners = [];
        typeListeners.forEach((l, idx) => {
            l.f.apply(l.context, eventArguments);
            if (l.once) {
                removableListeners.unshift(idx);
            }
        });
        removableListeners.forEach((idx) => {
            typeListeners.splice(idx, 1);
        });
    }
}

export default EventHost;
