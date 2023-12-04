import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App);

app.use (router);

// FontAwesome 

    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faTwitter, faFacebook, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faUserSecret, faBars } from '@fortawesome/free-solid-svg-icons';
    import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
    import { faInbox } from '@fortawesome/free-solid-svg-icons';
    import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
    import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

    library.add(
        faTwitter,faFacebook,faInstagram, faLinkedin,faUserSecret,
        faBars,
        faNoteSticky, 
        faInbox, 
        faTrashCan,
        faEllipsisVertical);
        
    app.component('fa-icon', FontAwesomeIcon);


app.mount('#app');