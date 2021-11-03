import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import createPersistedState from "vuex-persistedstate";
import jagAPI from '@/api/jagAPI.js'

Vue.use(Vuex)
Vue.use(router.push)


export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    //Status
    isLoggedIn:false,

    //Token
    token:'',

    //User
    user: null,

    //Debouncing
    isLoadingPending:false,

    //Can a user still borrow
    UserEmprunt: true,

    // Search body User side
    search_object_user_side:{
      input: '',
      is_borrowed:'',
      category_id:'',
      orderby:'ORDER BY',
      col:'id',
      order:'DESC',
    },

    //Current Book searchObject
    searchObject:{
      title:'',
      summary:'',
      author:'',
      year:'',
      isbn:'',
      cote:'',
      is_borrowed:'',
      category_id:'',
      orderby:'',
      col:'',
      order:'',
    },

    searchTermBuffer:'',

    //Current User searchObject
    searchObjectUser:{
      card_id:'',
      firstname:'',
      lastname:'',
      birthday:'',
      sexe:'',
      email:'',
      isAdmin:'',
      orderby:'',
      col:'',
      order:'',
    },

    searchObjectLecteur:{
      card_id:'',
      firstname:'',
      lastname:'',
      birthday:'',
      sexe:'',
      email:'',
      isAdmin:'',
      orderby:'',
      col:'',
      order:'',
    },



  },

  mutations: {
    setUserEmprunt(state){
      state.UserEmprunt = false;
    },

    unsetUserEmprunt(state) {
      state.UserEmprunt = true;
    },

    setToken(state, token){
     state.token = token
    },

    unsetToken(state){
      state.token = ''
    },

    setUser(state, user_object){
     state.user = user_object
    },

    unsetUser(state){
      state.user = null
    },

    setLoading(state){
      state.isLoadingPending=true
    },

    unsetLoading(state){
      state.isLoadingPending=false
    },

    setIsLoggedIn(state){
      state.isLoggedIn=true
    },

    unsetIsLoggedIn(state){
      state.isLoggedIn=false
    },

    setSearchObject(state, searchObject){
      state.searchObject=searchObject
    },

    unsetSearchObject(state){
      state.searchObject={
        title:'',
        summary:'',
        author:'',
        year:'',
        isbn:'',
        cote:'',
        is_borrowed:'',
        category_id:'',
        orderby:'',
        col:'',
        order:'',
      }
    },

    setSearchObjectUser(state, searchObjectUser){
      state.searchObjectUser=searchObjectUser
    },

    unsetSearchObjectUser(state){
      state.searchObject={
        card_id:'',
        firstname:'',
        lastname:'',
        birthday:'',
        sexe:'',
        email:'',
        isAdmin:'',
        orderby:'',
        col:'',
        order:'',
      }
    },

    setSearchObjectLecteur(state, searchObjectUser){
      state.searchObjectUser=searchObjectUser
    },

    unsetSearchObjectLecteur(state){
      state.searchObject={
        card_id:'',
        firstname:'',
        lastname:'',
        birthday:'',
        sexe:'',
        email:'',
        isAdmin:'',
        orderby:'',
        col:'',
        order:'',
      }
    },

    // Sauvegarde recherche utilisateur

    unset_search_object_user(state){
      state.search_object_user_side = {
        input: '',
        is_borrowed:'',
        category_id:'',
        orderby:'ORDER BY',
        col:'id',
        order:'DESC'
      }
    },

    set_search_object_user(state, search){
      state.search_object_user_side = search;
    },


    setSearchTermBuffer(state, message){
      state.searchTermBuffer = message
    },

    unsetSearchTermBuffer(state){
      state.searchTermBuffer = ''
    },


  },

  actions: {
    async LogOut({commit}){
      commit('unsetUser')
      commit('unsetIsLoggedIn');
      commit('unsetUserEmprunt');
      commit('unsetToken')
      commit('unsetSearchObject')
      commit('unsetSearchObjectUser')
      commit('unsetLoading')
      commit('unsetSearchTermBuffer')
      

      router.push({ name: 'Home', params: {} })
    },

    async LogIn({commit}, login_API_response){
      //Store the token
      commit('setLoading');
      commit('setToken', login_API_response.token);

      //Fetch other user details from API
      const user_object_raw = await jagAPI.getUserDetails(login_API_response.userId, login_API_response.token)
      const user_object = await user_object_raw.user
      //Store them

      commit('setUser', user_object);

      //Update status
      commit('setIsLoggedIn');
      commit('unsetLoading');

      //Redirects


      if (this.state.user.isAdmin === 1) {
        router.push({ name: 'Portail_bibliothecaire', params: {} });
      }

      else{
        router.push({ name: 'UserProfile', params: {id: this.state.user.card_id}})
      }

      return true


    }

  },
  modules: {
  }
})
