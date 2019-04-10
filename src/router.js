import vue from 'vue';

import vuerouter from 'vue-router';

vue.use(vuerouter);

 export default new vuerouter({
     routes:[
         {path:'/films', component:()=> import('./views/films.vue') },
         {path:'/cinema', component:()=> import('./views/cinema.vue') },
         {path:'/center', component:()=> import('./views/center.vue') }
     ]
 })