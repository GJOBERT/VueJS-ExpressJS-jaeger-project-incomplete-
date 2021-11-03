<template>

    <div>
        <div class="header">
            <div class="logo">
                <span class="fas fa-book logo"></span>
            </div>
            <div>
                <h1 class="main_title">JAG Library</h1>
            </div>
            <div>
                Already registered ?
                <router-link to="/users/login">Log In !</router-link>     
            </div>
        </div>
        <!-- <div v-if="'user OK'">
             <div class="logo">
            <span class="fas fa-book logo"></span>
            </div>
            <div>
                <h1 class="main_title">JAG Library</h1>
            </div>

            <div>
                Already registered ?
                <router-link to="/login">Log In !</router-link>     
            </div>
        </div> -->
 
    </div>

</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="css" scoped>

.header {
    display: flex;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.644);
    margin-top: 0;
    margin-bottom: 2vh;
    height: 75px;
}

.main_title {
    color: white;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 3.4rem;
}

.logo {
    color: white;
    font-size: 3rem;
    margin-right: 1vw;
}

</style>
