<template lang="html">
  <div class="main_container">

     <v-btn
    @click="goback"
    class="ma-3 back_button"
    color="orange darken-2"
    dark
    >
        <v-icon
        dark
        left
        >
        mdi-arrow-left
        </v-icon>Retour
    </v-btn>

    <h1 class="display-4">Compte</h1>
    <h2 class="display-2 font-weight-light">Informations</h2>

    <div class="rack">
      <router-link :to="{ name: 'UserProfile', params: {id:this.user.card_id} }">
          <v-btn color="green" class="white--text pl-0" @click="loader = 'loading3'" text>
          Vers profil
          <v-icon right dark medium>fa-address-card</v-icon>
          </v-btn>
      </router-link>
    </div>

    <div class="info_block">

      <div class="left_side">
        <img  v-if="image_preview_url" :src="image_preview_url" class="Book_illustration">
        <img  v-if="!image_preview_url" class="Book_illustration" v-bind:src="current_image_src">
        <v-file-input
          @change="onFileChange"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Choisissez un fichier"
          prepend-icon="mdi-camera"
          label="Illustration"
          ></v-file-input>
          <v-btn @click="submit_image()" v-if="submit === true">Modifier l'image</v-btn>
      </div>

      <div class="right_side" v-if="modify === false">

        <v-text-field
        :value="firstname"
        label="Prénom"
        disabled
        >``</v-text-field>

        <v-text-field
        :value="lastname"
        label="Nom de famille"
        disabled
        >``</v-text-field>

        <v-text-field
        :value="email"
        label="Email"
        disabled
        >``</v-text-field>

        <v-text-field
        value="*******"
        label="Mot de passe"
        disabled
        >``</v-text-field>

        <v-text-field
        :value="new_birthday"
        label="Date de naissance"
        disabled
        >``</v-text-field>

        <v-text-field
        :value="sexe"
        label="Sexe"
        disabled
        >``</v-text-field>

        <div class="modify_buttons">
          <v-btn @click="open_modify">Modifier</v-btn>
        </div>

      </div>

      <div class="right_side" v-if="modify === true">

        <v-text-field
        v-model="firstname"
        label="Prénom"
        >``</v-text-field>

        <v-text-field
        v-model="lastname"
        label="Nom de famille"
        >``</v-text-field>

        <v-text-field
        v-model="email"
        label="Email"
        >``</v-text-field>
      
      <div v-if="modify_password === true">
        <v-text-field
        v-model="password"
        label="Mot de passe"
        type="password"
        >``</v-text-field>

        <v-text-field
        v-model="password_confirmation"
        label="Confirmation mot de passe"
        type="password"
        >``</v-text-field>

        <p class="error_message" v-if="wrong_conf === true">Le mot de passe et la confirmation doivent être identique</p>
      </div>

      <div v-if="modify_password === false">
        <v-text-field
        v-model="password"
        label="Mot de passe"
        type="password"
        disabled
        >``</v-text-field>

        <v-text-field
        v-model="password_confirmation"
        label="Confirmation mot de passe"
        type="password"
        disabled
        >``</v-text-field>

        <div class="modify_buttons">
          <v-btn @click="modify_password = true" small>Modifier le mot de passe</v-btn>
        </div>

      </div>

        <v-text-field
        v-model="new_birthday"
        label="Date de naissance"
        >``</v-text-field>

        <v-radio-group
          v-model="sexe"
          row
        >
          <v-radio
            label="M"
            value="m"
          ></v-radio>
          <v-radio
            label="F"
            value="f"
          ></v-radio>
        </v-radio-group>

        <div class="modify_buttons">
          <v-btn @click="updateUser()" color="green">Enregistrer</v-btn>
          <v-btn @click="close_modify()">Annuler</v-btn>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import jagAPI from '@/api/jagAPI';

export default {

  name:'UserAccount',
  data(){
    return{
      modify: false,
      password: '*******',
      password_confirmation: '*******',
      modify_password: false,
      wrong_conf: false,
      firstname: '',
      lastname: '',
      sexe: '',
      sexeCache: '',
      email: '',
      new_birthday: '',
      user_edit: {},
      current_image_src: '',
      image_preview_url: '',
      submit: false
    }
  },
  methods: {
    goback(){
      this.$router.go(-1);
    },
    close_modify () {
      this.sexe = this.sexeCache;
      this.modify = false;
      this.modify_password = false;
      this.password = '*******';
      this.password_confirmation = '*******';
      this.getUser(this.user.card_id);
    },
    open_modify () {
      this.modify = true;
    },
    async updateUser () {
      if (this.password === this.password_confirmation) {

        var new_password = '';
        if (this.password === '*******') {
          new_password = this.user_edit.password;
        } else {
          new_password = this.password;
        }
        var avatar_update = await this.image_replacer();
        var update_user = { 
          card_id: this.user.card_id,
          password: new_password,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          sexe: this.sexe,
          birthday: this.new_birthday,
          avatar: avatar_update,
          isAdmin: this.user.isAdmin
        }
        update_user = JSON.stringify(update_user);

        jagAPI.updateUser(this.user.card_id, update_user, this.token)
          .then(() => {
            alert('Profil modifié');
            this.close_modify();
            this.getUser(this.user.card_id);
          })
          .catch((err) => console.log('Update error:' + err));
      
      } else {
        this.wrong_conf = true;
      }

    },
    getUser (id) {
      this.new_birthday = this.user.birthday;
      let Tindex = this.new_birthday.search('T');
      this.new_birthday = this.new_birthday.substring(Tindex, 0);

      jagAPI.getEditUser(id, this.token)
        .then((response) => {
          this.user_edit = response[0];
          this.firstname = this.user_edit.firstname;
          this.lastname = this.user_edit.lastname;
          this.email = this.user_edit.email;
          this.sexe = this.user_edit.sexe;
          this.sexeCache = this.sexe;
          if (this.user_edit.avatar !== null) {
            this.image_preview_url = Buffer.from(this.user_edit.avatar);
          }
        })
        .catch((err) => console.log(err));
    },

    async image_replacer () {
      const response = await fetch(this.image_preview_url);
      const blob = await response.blob();
      const reader = new FileReader();
      await new Promise((resolve, reject) => {
        reader.onload = resolve;
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      return reader.result.toString();
    },

    handlePasswordChange(){
      this.target_user.password = this.new_password
    },

    async submit_image () {
      delete this.user_edit["id"];
      this.user_edit.birthday = this.user_edit.birthday.substring(0,10);
      this.user_edit.avatar = await this.image_replacer();
      var user_up = JSON.stringify(this.user_edit);
      jagAPI.updateUser(this.user.card_id, user_up, this.token)
        .then(() => {
          this.getUser(this.user_edit.card_id);
          this.submit = false;
        })
        .catch(err => console.log(err));
    },

    async onFileChange(e) {
      const file = e;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>

      this.user_edit.avatar = reader.result;
      this.image_preview_url = URL.createObjectURL(file);
      this.user_edit.avatar = await this.image_replacer();
      this.submit = true;
    },
  },
  computed: {
    ...mapState([
        'token',
        'isLoggedIn',
        'user'
      ])
  },
  mounted () {
    if (this.user === null || this.isLoggedIn !== true) {
      this.$router.push('/');
    } else {
      this.getUser(this.user.card_id);
    }
  }
}
</script>

<style lang="css" scoped>
.error_message {
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: rgb(204, 21, 21);
}

.modify_buttons {
  display: flex;
  width: 50%;
}

.main_container{
  width:80%;
  margin-left:auto;
  margin-right:auto;
  /* background-color:rebeccapurple; */
  display:flex;
  flex-direction: column;
}

.info_block{
  /* background-color: gold; */
  margin-top: 20px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}

.left_side{
  /* background-color: rebeccapurple; */
  flex-basis:30%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
}

.right_side{
  /* background-color: azure; */
  flex-basis:60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height:60%;
}

.Book_illustration{
  width:100%;
  height:500px;
  background-color: black;
  object-fit:cover;
}

.back_button {
  width: 150px;
}

</style>
