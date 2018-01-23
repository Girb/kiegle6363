import View from './core/view';

class HomeView extends View {
    constructor() {
        super();
    }
    get className() {
        return 'home';
    }
    get template() {
        return `
            This is the start view.
        `;
    }
    render() {
        return this;
    }
}

export { HomeView };
