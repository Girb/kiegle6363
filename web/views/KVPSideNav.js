import SideNav from './SideNav';

export default class KVPSideNav extends SideNav {
    get template() {
        return `
            <a href="#/admin">Administrasjon</a>
            <a href="#/">Slagning</a>
        `;
    }
}
