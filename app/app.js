import Vue from 'nativescript-vue';
import NSVueShadow from './nativescript-vue-shadow'
import axios from './axios'
Vue.use(NSVueShadow)
import Main from './components/Main';


new Vue({

    template: `
        <Frame>
            <Main />
        </Frame>`,

    components: {
        Main
    }
}).$start();

