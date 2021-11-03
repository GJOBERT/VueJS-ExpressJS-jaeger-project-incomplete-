<template>
  <div class="home">
    <p class="display-4">Welcome to Project Jaeger</p>

    <div class="sub_home">
    <div class="left_side">
      <p class="display-1">Bibliothecaire</p>
      <span class="headline">Général</span>
      <ol>
        <li>
          <router-link :to="{ name: 'Login_bibliothecaire', params: {} }">Login bibliothecaire</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Portail_bibliothecaire', params: {} }">Portail bibliothecaire</router-link>
        </li>
      </ol>
      <span class="headline">Catalogue</span>
      <ol>
        <li>
          <router-link :to="{ name: 'Catalogue_overview', params: {} }">Catalogue</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Page_livre', params: {id:2} }">Détail d'un livre</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Add_livre', params: {} }">Ajouter un livre</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Modify_livre', params: {id:3} }">Modifier un livre</router-link>
        </li>
      </ol>
      <span class="headline">Utilisateurs</span>
      <ol>
        <li>
          <router-link :to="{ name: 'Trombinoscope', params: {} }">Trombinoscope</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'Add_lecteur', params: {} }">Inscrire un lecteur</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'Modify_lecteur', params: {id:7} }">Modifier un lecteur</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'Page_lecteur', params: {id:8} }">Détail d'un lecteur</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'Image_experiments', params: {} }">Beta</router-link>
        </li>

      </ol>
    </div>

    <div class="right_side">
      <p class="display-1">Lecteurs</p>
      <ol>
        <li>
          <router-link :to="{ name: 'HomePage', params: {} }">Home page</router-link>
          </li>
      </ol>
      <span class="headline">Catalogue</span>
      <ol>
        <li>
          <router-link :to="{ name: 'AllUsersOverview', params: {} }">Catalogue général</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Book', params: {id:2} }">Détail d'un livre</router-link>
        </li>
      </ol>
      <span class="headline">User Profile</span>
      

    </div>

</div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState([
      'token',
      'user.card_id',
      'username',
      'isAdmin',
      'user'
    ])
  },

}
</script>

<style media="screen">
  .home{
    width:80%;
    margin-top:100px;
    margin-left:auto;
    margin-right:auto;

    display:flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: rebeccapurple; */
  }

  .sub_home{
    display:flex;
    flex-direction: row;
  }
  .left_side{
    flex-basis:50%;
  }


</style>
