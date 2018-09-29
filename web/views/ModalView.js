import Backbone from 'backbone';

export default class ModalView extends Backbone.View {
    get className() { return 'modal'; }
    get attributes() {
        return {
            'tabindex': '-1',
            'role': 'dialog'
        }
    }
    get template() {
        return `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${this.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">${this.content}</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary ok">Lagre</button>
                        <button type="button" class="btn btn-secondary cancel">Avbryt</button>
                    </div>
                </div>
            </div>     
        `;
    }
    get content() {
        return `override with content`;
    }
    get events() {
        return {
        };
    }
    show() {
        return this.$el.modal();        
    }
    close() {
        return this.$el.modal('hide').modal('dispose');
    }
    render() {
        
        this.$el.html(this.template);

        return this;
    }
}
