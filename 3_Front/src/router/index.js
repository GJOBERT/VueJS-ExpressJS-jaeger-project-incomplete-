import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '@/store/index.js';
// import Home from '../views/Home.vue';
import Login_bibliothecaire from '../views/bibliothecaire/login/Login_bibliothecaire.vue';
import Portail_bibliothecaire from '../views/bibliothecaire/portail/Portail_bibliothecaire.vue';
import Catalogue_vue_ensemble from '../views/bibliothecaire/catalogue/general/Catalogue_vue_ensemble.vue';
import Catalogue_vue_ensemble_neo from '../views/bibliothecaire/catalogue/general/Catalogue_vue_ensemble_neo.vue';
import Page_livre from '../views/bibliothecaire/catalogue/general/Page_livre.vue';
import Add_livre from '../views/bibliothecaire/catalogue/editor/Add_livre.vue';
import Modify_livre from '../views/bibliothecaire/catalogue/editor/Modify_livre.vue';
import Trombinoscope from '../views/bibliothecaire/lecteurs/Trombinoscope.vue';
import Add_lecteur from '../views/bibliothecaire/lecteurs/editor/Add_lecteur.vue';
import Modify_lecteur from '../views/bibliothecaire/lecteurs/editor/Modify_lecteur.vue';
import Page_lecteur from '../views/bibliothecaire/lecteurs/general/Page_lecteur.vue';
import Image_experiments from '../views/bibliothecaire/beta/imageexperiments.vue';
import Retardataires from "../views/bibliothecaire/retards/Retardataires.vue"
import BookStats from "../views/bibliothecaire/statistiques/BookStats.vue"
import UserStats from "../views/bibliothecaire/statistiques/UserStats.vue"
import Unauthorized from "../views/bibliothecaire/navguard/Unauthorized.vue"
import HomePage from '../views/User/HomePage.vue';
import CartePage from '../views/User/CartePage.vue';
import AboutPage from '../views/User/AboutPage.vue';
import JAGPage from '../views/User/JAGPage.vue';
/** ***** USER *******/
import AllUsersOverview from '../views/User/catalogue/AllUsersOverview.vue';
import Book from '../views/User/catalogue/Book.vue';
import UserAccountInfo from '../views/User/user_profile/UserAccountInfo.vue';
import UserProfile from '../views/User/user_profile/UserProfile.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/lacarte',
    name: 'Lacarte',
    component: CartePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/JAG',
    name: 'JAG',
    component: JAGPage
  },

  {
    path: '/login_bibliothecaire',
    name: 'Login_bibliothecaire',
    component: Login_bibliothecaire
  },
  {
    path:'/bibliothecaire/portail_bibliothecaire',
    name: 'Portail_bibliothecaire',
    component: Portail_bibliothecaire,

  },
  {
    path:'/bibliothecaire/catalogue/overview',
    name: 'Catalogue_overview',
    component: Catalogue_vue_ensemble
  },
  {
    path:'/bibliothecaire/catalogue/neo',
    name: 'Catalogue_neo',
    component: Catalogue_vue_ensemble_neo
  },
  {
    path:'/bibliothecaire/catalogue/focus/:id',
    name: 'Page_livre',
    component: Page_livre
  },
  {
    path:'/bibliothecaire/editor/add_livre',
    name: 'Add_livre',
    component: Add_livre
  },
  {
    path:'/bibliothecaire/editor/modify_livre/:id',
    name: 'Modify_livre',
    component: Modify_livre
  },
  {
    path:'/bibliothecaire/trombinoscope',
    name: 'Trombinoscope',
    component: Trombinoscope,
  },

  {
    path:'/bibliothecaire/trombinoscope/add_lecteur',
    name: 'Add_lecteur',
    component: Add_lecteur
  },
  {
    path:'/bibliothecaire/trombinoscope/modify_lecteur/:id',
    name: 'Modify_lecteur',
    component: Modify_lecteur
  },
  {
    path:'/bibliothecaire/trombinoscope/page_lecteur/:id',
    name: 'Page_lecteur',
    component: Page_lecteur
  },
  {
    path:'/bibliothecaire/beta/image_experiments/',
    name: 'Image_experiments',
    component: Image_experiments
  },
  {
    path:'/bibliothecaire/retards/retardataires/',
    name: 'Retardataires',
    component: Retardataires
  },
  {
    path:'/bibliothecaire/stats/books/',
    name: 'BookStats',
    component: BookStats
  },
  {
    path:'/bibliothecaire/stats/users/',
    name: 'UserStats',
    component: UserStats
  },
  {
    path:'/bibliothecaire/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized
  },



  /** ***** USER *******/
  // {
  //   path:'/users/home_page',
  //   name: 'HomePage',
  //   component: HomePage
  // },
  {
    path:'/users/catalogue/overview',
    name: 'AllUsersOverview',
    component: AllUsersOverview
  },
  {
    path:'/users/book/:id',
    name: 'Book',
    component: Book
  },
  {
    path:'/user/profile/:id',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path:'/user/account_info/:id',
    name: 'UserAccountInfo',
    component: UserAccountInfo
  },

]

const router = new VueRouter({
  routes
})

export default router
