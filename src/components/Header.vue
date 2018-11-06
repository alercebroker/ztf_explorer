<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark text-center">
		<a class="navbar-brand mr-20" href="#ExploreData"><img class="img-fluid w-auto rounded" src="../assets/logos/logoW250.png"></a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse " id="navbarSupportedContent">
			<ul class="navbar-nav mx-auto ">

				<li class="nav-item">
					<router-link to="/" class="nav-link">
						<h3>Explore Data</h3>
					</router-link>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">
						<h3>User Account</h3>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">|</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">
						<h3>How It Works</h3>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">|</a>
				</li>
				<li class="nav-item">
					<router-link to="/AboutUs" class="nav-link">
						<h3>About Us</h3>
					</router-link>
				</li>
			</ul>
			<button class="btn btn-outline-light my-2 my-sm-0" type="submit">
				<i class="fas fa-user"></i> Log in
			</button>
		</div>
	
      
	</nav>
</template>

<script>
  
</script>

<style>

</style>
