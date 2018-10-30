
# Requierements
The vue modules are already loaded, just for you to know we have:
- vue@2.5.17
- vue-router@3.0.2

Lok for this updates:
- node@v11.0.0
- npm@6.4.1
- yarn@1.10.1

## How it was build
```sh
./$ node -v
> v11.0.0
./$ npm -v
> 6.4.1
./$ mkdir vue-npm && cd vue-npm
./vue-npm/$ sudo npm init -y 
## Get vue
./vue-npm/$ sudo npm install vue --save
## get and set client
./vue-npm/$ sudo npm install -g @vue/cli
>> default
>> yarn
## create project
./vue-npm/$ vue create vue-proj

## delete content for the repository
./vue-npm/$ sudo rm -rf vue-proj

## clone repository
./vue-npm/$ git clone http://gitlab.dim.uchile.cl/AlerceFrontEnd/vue-proj.git
./vue-npm/$ cd vue-proj

## add url handler
./vue-npm/vue-proj/$ sudo yarn add vue-router
## Run server
./vue-npm/vue-proj/$ yarn serve
```
With this you change the ```./vue-npm/vue-proj/src/components``` folder for the one in the repository :)

# Content
This has to look like this:
- *vue-npm* : the new Vue project that we'll work on
	- node_modules
		- vue
		- vue-router
	- *vue-proj* : here we'll work (repo content)
		- node_modules
		- public
		- *src*
			- assets
			- *components* : here are de Vue files
			- *script* : JavaSripts native of the Django project
			- *static* : Static files native of the Django project
			- *template* : HTML's native of the Django project
