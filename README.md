# DatoCMS example blog using React & Urql

This is a Demo project that you can install from your [DatoCMS dashboard](https://dashboard.datocms.com/projects/browse/categories) > create new demo project.

## Set up your own

By clicking the following button you'll set up a project on DatoCMS with the schema and data that you need to run this example.

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/react-urql-demo)


### How to start

Add a `.env` file with your read-only API token, so that React can access the information on your project:

`echo 'REACT_APP_DATO_API_TOKEN=abc123' >> .env`

then run:

`yarn && yarn start`

### Read more

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

URQL documentation can be found [here](https://github.com/FormidableLabs/urql)
