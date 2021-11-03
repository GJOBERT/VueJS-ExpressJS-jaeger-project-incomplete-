<template lang="html">
<div class="main_container">
  <div class="headerblock mt-5">
    <span class="text-h2 font-weight-thin">Cette page</span><span class="text-h2 blue--text text--lighten-1 font-weight-bold "> est réservée aux bibliothécaires ! </span>
    <div class="subheader">
        <span class="text-h5 font-weight-thin">Des KPI prêts à consommer pour vos rendements de compte...</span>
    </div>
  </div>
<v-img lazy-src="https://media.giphy.com/media/xT5LMPbe3zcjNSn7Uc/source.gif" class="hero_image mt-5" alt=""></v-img>
<div class="headerblock mt-5">
<span class="text-h4 font-weight-bold">Vous n'avez donc pas le droit </span><span class="text-h4 blue--text text--lighten-3 font-weight-thin "> de la consulter...</span>
</div>
<div class="headerblock mt-5">
<span class="text-h6 font-weight-thin">Essayez de vous logger en haut à droit ;-) </span>
</div>


</div>



</template>

<script>

export default {
  name:'Unauthorized',
}

</script>

<style lang="css" scoped>

.main_container{
  width:90%;
  margin-left:auto;
  margin-right:auto;
  /* background-color:rebeccapurple; */
  display:flex;
  flex-direction: column;
}

.hero_image{
  width:100%;
  height:200px;
  object-fit: cover;
}
.action_grid{
  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  column-gap:20px;
  row-gap:20px;

}

.stat_square{
  display:flex;  flex-direction: column;

}
</style>
