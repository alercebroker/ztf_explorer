<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-center">
    <router-link to="/" class="nav-link">
      <img class="img-fluid w-auto rounded" src="../assets/logos/logoW250.png">
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link" v-bind:class="{'nav-link disabled': $route.name != 'exploreData'}" >
            <h4>Explore Data</h4>
          </router-link>
        </li>
        <li class="nav-item" v-show="false">
          <p class="nav-link disabled">|</p>
        </li>
        <li class="nav-item">
          <router-link to="/userAccount" class="nav-link" v-bind:class="{'nav-link disabled': $route.name != 'userAccount'}" v-show="false">
            <h4>User Account</h4>
          </router-link>
        </li>
        <li class="nav-item" v-show="false">
          <p class="nav-link disabled">|</p>
        </li>
        <li class="nav-item">
          <router-link to="/howTo" class="nav-link" v-bind:class="{'nav-link disabled': $route.name != 'howTo'}" v-show="false">
            <h4>How It Works</h4>
          </router-link>
        </li>
        <li class="nav-item" v-show="false">
          <p class="nav-link disabled">|</p>
        </li>
        <li class="nav-item">
          <router-link to="/aboutUs" class="nav-link" v-bind:class="{'nav-link disabled': $route.name != 'aboutUs'}" v-show="false">
            <h4>About Us</h4>
          </router-link>
        </li>
      </ul>
      <!--button class="btn btn-outline-light my-2 my-sm-0" type="submit">
				<i class="fas fa-user"></i> Log in
      </button-->
    </div>
  </nav>
</template>



