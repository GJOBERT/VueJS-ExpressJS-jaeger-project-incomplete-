import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)
Vue.use(router.push)

export default new Vuex.Store({
  state: {
    //Authentication
    userId: 0,
    username: '',
    token: localStorage.getItem('token') || '',
    isAdmin: localStorage.getItem('isAdmin') || '',

    //Current user details
    firstname:localStorage.getItem('firstname') || '',
    lastname:localStorage.getItem('lastname') || '',
    card_id:localStorage.getItem('card_id') || '',
    birthday:localStorage.getItem('birthday') || '',
    avatar: '',
    email: '',
    image_preview_url:'',

    user: {}
  },

  mutations: {
    save_user(state, user) {
      state.userId = user.userId;
      state.token = user.token;
      state.username = user.username;
      state.isAdmin = user.isAdmin;

    },



    change_user(state, username) {
      state.username = username;
    },

    setAvatar(state, base64url){
      state.avatar = base64url
    },

    retrieveUserDetails(state, response){
      state.firstname = response.firstname;
      state.lastname = response.lastname;
      state.card_id = response.card_id;
      state.sexe = response.sexe;
      state.email = response.email;

      let Tindex = response.birthday.search('T');
      response.birthday = response.birthday.substring(Tindex, 0);
      state.birthday = response.birthday;
      state.user = response;


    },

    LogOut(state){
      state.userId= 0,
      state.username= '',
      state.token= '',
      state.isAdmin= 0,
      state.user = {}
    }
  },

  actions: {
    async LogOut({commit}){
      commit('LogOut');
      console.log("Store action Logout has been called !");
      localStorage.removeItem('token');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      localStorage.removeItem('card_id');
      localStorage.removeItem('birthday');
      localStorage.removeItem('avatar');
      localStorage.removeItem('isAdmin');

      router.push({ name: 'Home', params: {} });
    }

  },
  modules: {
  }
})
