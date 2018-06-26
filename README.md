# Famous Paintings API with CouchDB & PouchDB

\_A simple api to manage painting Info

[PouchDB API Docs](https://pouchdb.com/api.html)

**Required**

- **Access to a CouchDB Database**

## Getting Started

Click _Fork_ on this Repo to copy it to your account.

Clone the forked repo to your local machine with the clone url provided from your forked repo.

```
git clone <clone url>
```

cd into the client

```
cd art-api-exam
```

Install dependencies

```
npm install
```

<img src="https://github.com/coinGuyBri/art-api-exam/blob/master/resources/art%20demo%20gif.gif?raw=true">

## Setup Environment Variables

Next, create a file named **.env** in the newly created art-api-exam folder.

Inside the file add the following variables.

1.  `PORT={unused-port}` Set the value to an unused port number for your machine.

2.  `COUCH_HOSTNAME=https://{username}:{password}@{dbhostname}/`

3.  `COUCH_DBNAME={pick-a-name-for-your-database}` only lowercase letters allowed

**.env** file example:

```
PORT=5000
COUCH_HOSTNAME=https://admin:938rhf32f@colin.jrscode.cloud/
COUCH_DBNAME=myart
```

## Load sample data

Optionally, you can load some sample data in your CouchDB database by running `npm run load`. This will add the contents of **load-data.js** into the database.

```
npm run load
```

## Start the api

Run the following command to start the api on the designated port.

```
npm start
```

More Info
[PouchDB API Docs](https://pouchdb.com/api.html)
