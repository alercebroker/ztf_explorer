
# ZTF Explorer

![main page](https://user-images.githubusercontent.com/19624900/68399708-9876ec80-0155-11ea-8783-76e8bd5c0c84.png)
ZTF Explorer is a tool that provide explore data from Zwicky Transient Facility ([ZTF](https://www.ztf.caltech.edu/)). This tool allow filter data with advance filters and interact with interests objects.

## Features
- Filter data by:
	- ZTF id.
	- Classifier and class.
	- Range of detection.
	- Discovery date.
	- Coordinates (RA/Dec).
- Explore objects:
	- See/download light curves in detail.
	- See/download stamps (historical stamps).
	- Results of object's classification.
	- Cross matched objects.

### Panel of filters

![Panel filter](https://user-images.githubusercontent.com/19624900/68417284-e2bb9600-0174-11ea-9309-5ccdf1bac7fa.png)
### Filtered data
- Pages of results of filtered data.
- Sort data by specific fields.
- When you click _SELECT COLUMNS_, you'll can select different features to show in datatable.
- When you click a row/object of datatable, you'll see the object details.

![enter image description here](https://user-images.githubusercontent.com/19624900/68417354-054daf00-0175-11ea-87b1-80c79026b518.png)
### Object details
- Main stats of objects.
- Permalink to another databases/services.
- Light curves:
	- Difference magnitude.
	- Apparent magnitude.
	- Folded light curve.
- Astronomical object's images by Aladin Sky Atlas.
- Magnitude stats.
- Results of classification.
- Stamps of object by ZTF.

1) General information:

![enter image description here](https://user-images.githubusercontent.com/19624900/68417390-1a2a4280-0175-11ea-9bc0-ee96cf53b8d7.png)
2) Cross matches:
- Provided by [catsHTM](https://github.com/maayane/catsHTM).
- Main object's information of each catalog.

![enter image description here](https://user-images.githubusercontent.com/19624900/68418528-2b744e80-0177-11ea-9baa-935073e947ea.png)
# Set-up

## Development
Is required to have installed at least `nodejs` and `npm` in the machine.

To install the application dependencies just run inside the root repository

```
  npm install

```

### API Configuration

There a 3 ways to run the application.

Running on:

- ￼Development (`.env.developement`):

The most used environment when developing, to run it use the command

```
  npm run serve

```

This will create a webserver running on [http://localhost:8080](http://localhost:8080) and will be listen to any changes in the code and restarting the webpage if necessary.

-   Staging (`.env.staging`)

Staging is a pre-production stage, the idea is to use the development branch APIs to check compatibility and other points before sending the changes to production.

To build the staging environment run

```
  npm run build -- --mode staging

```

this will generate the `html`, `css` and `js` files in the repository `/dist` folder.

Then it has to be copied to an `nginx` serve folder, to be served.

-   Production (`.env.production`)

Production is the final environment of the application, to build the statics as in staging just run

```
  npm run build

```

then copy the files to the respective `nginx`/`apache` desired location.

### Dockerized deployment

ALeRCE Reporter can be run as a container, to build and run the image:

```
  ./docker.sh
```


```
#!/usr/bin/env bash

IMAGE=ztf-explorer-front
CONTAINER=ztf-explorer-frontend
PORT=80

npm install
npm run build
docker build -t $IMAGE .

if docker container ls | grep $CONTAINER > /dev/null; then
docker container stop $CONTAINER
fi

if docker container ls -a | grep $CONTAINER > /dev/null; then
docker container rm $CONTAINER
fi

docker run --restart=always --name $CONTAINER -d -p $PORT:$PORT $IMAGE
```



This script:
- If a container with the name _ztf-explorer-front_ is running, this container is stopped and removed.
- Create a docker image of ZTF Explorer (expose port 80).
- Run docker image.

