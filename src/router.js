import vue from 'vue';

import vuerouter from 'vue-router';

vue.use(vuerouter);

 export default new vuerouter({
     routes:[
         {
             path:'/',
             component:()=> import('./views/home.vue'),
             children:[
                {path:'/films',
                 component:()=> import('./views/films.vue'),
                 children:[
                     {path:'nowpalying', component:()=> import('./components/filmsnowpalying.vue')},
                     {path:'comingsoon', component:()=> import('./components/filmscomingsoon.vue')},
                     {path:'', redirect:'nowpalying'}
                 ]
                
                },
                {path:'/cinema', component: ()=> import('./views/cinema.vue') },
                {path:'/center', component: ()=> import('./views/center.vue') },
                {path:'' ,redirect:'/films/nowpalying'}
             ]
         },
        {path:'/films/:id',name: 'detail', component: ()=> import('./views/detail.vue') },
        {path:'/city',component: () => import('./views/city.vue')},
        {path:'*',redirect:'/films/nowpalying'}

     ]
 })
 