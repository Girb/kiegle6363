import Backbone from 'backbone';
import BaseView from './BaseView';
import CompetitionItem from './CompetitionItem';
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
                const m = new Backbone.Model(c);
                new CompetitionItem({ model: m }).render().$el.appendTo(this.$el);
            });
        });
        return this;
    }
}
