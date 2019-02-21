# Workflow


| [Requirements][] | [Development][] | [Deploy][] | [Built with][] |
|---|---|---|---|


## Requirements

- [MongoDB](https://www.mongodb.com/download-center)
- [Node.js 8.0+](http://nodejs.org)
- [Vue](http://vuejs.org)
- [Git](https://git-scm.com/download/win)

## Development

## Install MongoDB OSX

Download mongo https://www.mongodb.com/download-center/community

tar -zxvf mongodb-osx-ssl-x86_64-4.0.6.tgz

sudo mv mongodb-osx-ssl-x86_64-4.0.6 /usr/local/mongodb

sudo mkdir -p /data/db

cd /data/db

sudo shown yourname /data/db

Goint to home : ls 

open .bash_profile

 
source .bash_profile

### Downloading MongoDB .tgz file
Visit MongoDB official website https://www.mongodb.com/download-center/community and download the .tgz file from the community section of the website.
Now extract the downloded .tgz and mv the mongo directory to /usr/local/mongodb directory using following command in terminal.

```
$ cd ~/Download
$ tar -zxvf mongodb-osx-ssl-x86_64-4.0.6.tgz
$ sudo mv mongodb-osx-ssl-x86_64-4.0.6.tgz /usr/local/mongodb
```

### Create MongoDB Data directory (/data/db)
MongoDB stores the data into the /data/db directory by default, so we need to create this directory and also assign proper permission using chown command.
Open the terminal run the following command
```
$ sudo mkdir -p /data/db
$ whoami
turtuvshin
$ sudo chown turtuvshin /data/db
```

### Set mongodb/bin PATH to ~/.bash_profile
Now we need to set the envirent variable for MongoDb, So the mongo and mongod command can be recognized from the terminal.
For that we need to add the mongodb/bin path to the ~/.bash_profile file.
```
$ cd
$ pwd
/Users/turtuvshin
# if .bash_profile is not present follow the step 
# to create it otherwise skip the step below.
$ touch .bash_profile
$ open .bash_profile
Now .bash_profile file will open in a text editor. In this file add the following exports

export PATH=<mongodb-install-directory>/bin:$PATH
```

Now restart your terminal and verify the mongodb version by following commands

```
$ mongo -version
MongoDB shell version: 3.6.1
$ mongo -version
MongoDB shell version: 3.6.1
```

### Start MongoDB
In order to work with mongodb we need to first run the mongod command which starts the mongo daemon .
So open two different terminals.
Now in

terminal 1
run the following command

```
$ mongod
MongoDB starting : pid=38042 port=27017 dbpath=/data/db/ 64-bit host=codebind.local3
//...
waiting for connections on port 27017
```

```
$ mongod
MongoDB starting : pid=38042 port=27017 dbpath=/data/db/ 64-bit host=turtuvshin.local3
//...
waiting for connections on port 27017
```

Now in

terminal 2
run the following command

```
$ mongo
MongoDB shell version: 3.6.1
connecting to: test
> show dbs
local	(empty)
admin	(empty)


$ mongo
MongoDB shell version: 3.6.1
connecting to: test
> show dbs
local	(empty)
admin	(empty)
```

## Running

Clone the repository, then

* `npm install` from the root folder
* `npm start` from the root folder
  * alternatively: run `node server/bin/www`

## Deploy

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Deploy to Heroku

<img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Heroku_logo.png" width="200">

- Download and install [Heroku Toolbelt](https://toolbelt.heroku.com/)
- In terminal, run `heroku login` and enter your Heroku credentials
- From *your app* directory run `heroku create`
- Run `heroku addons:create mongolab`.  This will set up the mLab add-on and configure the `DB_URI` environment variable in your Heroku app for you.
- Lastly, do `git push heroku master`.  Done!

**Note:** To install Heroku add-ons your account must be verified.

---

<img src="https://mlab.com/company/img/branding/mLab-logo-onlight.svg" width="200">

- Open [mlab.com](https://mlab.com) website
- Click the yellow **Sign up** button
- Fill in your user information then hit **Create account**
- From the dashboard, click on **:zap:Create new** button
- Select **any** cloud provider (I usually go with AWS)
- Under *Plan* click on **Single-node (development)** tab and select **Sandbox** (it's free)
 - *Leave MongoDB version as is - `2.4.x`*
- Enter *Database name** for your web app
- Then click on **:zap:Create new MongoDB deployment** button
- Now, to access your database you need to create a DB user
- Click to the recently created database
- You should see the following message:
 - *A database user is required to connect to this database.* **Click here** *to create a new one.*
- Click the link and fill in **DB Username** and **DB Password** fields
- Finally, in `.env` instead of `mongodb://localhost:27017/test`, use the following URI with your credentials:
 - `db: 'mongodb://USERNAME:PASSWORD@ds027479.mongolab.com:27479/DATABASE_NAME'`

**Note:** As an alternative to mLab, there is also [Compose](https://www.compose.io/).

## Built with

* [Node.js](https://nodejs.org/en/download/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/download-center)
* [Vue.js](https://vuejs.org/)

**[⬆ back to top](#workflow)**

[Requirements]:#requirements
[Development]:#development
[Deploy]:#deploy
[Built with]:#built-with

## Copyright

Copyright &copy;2019 Intelligo Systems. All Rights Reserved.
