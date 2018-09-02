import Backbone from 'backbone';
import BaseView from './BaseView';
import Competition from '../models/Competition';
import CompetitionItem from './CompetitionItem';
import CreateCompetitionView from './CreateCompetitionView';
import Server from '../server';

export default class HomeView extends BaseView {
    get className() {
        return 'home';
    }
    get template() {
        return `
        `;
    }
    render() {
        this.$el.empty();
        this.$el.append(this.template);
        Server.get('/competitions').then((cs) => {
            cs.forEach((c) =>{
                const m = new Competition(c);
                new CompetitionItem({ model: m }).render().$el.appendTo(this.$el);
            });
            const citm = new CreateCompetitionView();
            this.listenTo(citm, 'created', (newcomp) => {
                this.render();
            });
            citm.render().$el.appendTo(this.$el);
        });
        return this;
    }
}
