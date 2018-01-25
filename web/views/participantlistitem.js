import DocView from './docview';

class ParticipantListItem extends DocView {
    render() {
        this.el.innerHTML = `
            <span>${this.doc.firstname} ${this.doc.lastname}</span><span>${this.doc.club}</span>
        `;
        return this;
    }
}

export { ParticipantListItem };
