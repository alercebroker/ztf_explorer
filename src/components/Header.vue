<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark text-center">
		<router-link to="/" class="nav-link"><img class="img-fluid w-auto rounded" src="../assets/logos/logoW250.png"></router-link>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse " id="navbarSupportedContent">
			<ul class="navbar-nav mx-auto ">

				<li class="nav-item">
					<router-link to="/" class="nav-link">
						<h4>Explore Data</h4>
					</router-link>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">|</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">
						<h4>User Account</h4>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">|</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">
						<h4>How It Works</h4>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">|</a>
				</li>
				<li class="nav-item">
					<router-link to="/AboutUs" class="nav-link">
						<h4>About Us</h4>
					</router-link>
				</li>
			</ul>
			<!--button class="btn btn-outline-light my-2 my-sm-0" type="submit">
				<i class="fas fa-user"></i> Log in
			</button -->
		</div>
	
      
	</nav>
</template>

<script>
</script>

<style>
</style>
