# ztf_explorer

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate

# deploy to s3 bucket
$ npm run generate
$ gulp deploy
```

To deploy to s3 you first need to have the following environment variables set:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_BUCKET_NAME
AWS_CLOUDFRONT
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
