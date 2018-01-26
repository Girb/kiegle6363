import NativeView from 'backbone.nativeview';

class HomeView extends NativeView {
    get className() {
        return 'home';
    }
    get template() {
        return `
            This is the start view.
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}

export { HomeView };
