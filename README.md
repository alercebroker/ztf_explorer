# Content
We have 4 folders:
- *script* : JavaSripts native of the Django project
- *static* : Static files native of the Django project
- *template* : HTML's native of the Django project
- *vue-npm* : the new Vue project that we'll work on
	- node_modules
		- vue
		- vue-router
	- *vue-proj* : here we'll work
		- node_modules
		- public
		- *src*
			- assets
			- *components* : here are de Vue files

# Requierements
The vue modules are already loaded, just for you to know we have:
- vue@2.5.17
- vue-router@3.0.2

Lok for this updates:
- node@v11.0.0
- npm@6.4.1
- yarn@1.10.1

```sh
./vue-npm/$ sudo npm install -g @vue/cli
>> default
>> yarn

./vue-npm/$ cd vue-proj
./vue-npm/vue-proj/$ yarn serve
```

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
## add url handler
./vue-npm/vue-proj/$ sudo yarn add vue-router

## Run server
./vue-npm/vue-proj/$ yarn serve
```
With this you can change de ```./vue-npm/vue-proj/src/components``` folder for the one in the repository :)