# Requierements
- node@v11.0.0
- npm@6.4.1
- yarn@1.10.1 

## clone repository
```
$ git clone https://github.com/alercebroker/vue-proj.git
$ cd vue-proj
$ npm install
```

# Develop

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

# Stage

## Tests

## Build

```
cd /opt/alerce/vue-proj
npm run build
sudo rm -r /var/www/html/vue
sudo mv dist /var/www/html/vue
```

# Production

## Build

```
cd /opt/alerce/vue-proj
npm run build
sudo rm -r /var/www/html/vue
sudo mv dist /var/www/html/vue
```
