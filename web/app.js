import { Router } from './core/router';
import { HomeView } from './homeview';
import { TestView } from './testview';

class App extends Router {
    constructor(config) {
        super();
    }
    get routes() {
        return {
            '': 'home',
            test: 'test',
        };
    }
    start() { // starts the app
        super.start();
        // this.navigate('/');
    }

    home() {
        this.applyView(new HomeView());
    }

    test() {
        this.applyView(new TestView());
    }

    applyView(view) {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        document.body.appendChild(view.render().el);
        return view;
    }
}

export { App };
