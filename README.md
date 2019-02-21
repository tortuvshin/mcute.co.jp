# Workflow

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
Visit MongoDB official website and download the .tgz file from the community section of the website.
Now extract the downloded .tgz and mv the mongo directory to /usr/local/mongodb directory using following command in terminal.

```
$ cd ~/Download
$ tar -zxvf mongodb-osx-ssl-x86_64-3.6.1.tgz
$ sudo mv mongodb-osx-ssl-x86_64-3.6.1 /usr/local/mongodb
$ cd ~/Download
$ tar -zxvf mongodb-osx-ssl-x86_64-3.6.1.tgz
$ sudo mv mongodb-osx-ssl-x86_64-3.6.1 /usr/local/mongodb
```

### Create MongoDB Data directory (/data/db)
MongoDB stores the data into the /data/db directory by default, so we need to create this directory and also assign proper permission using chown command.
Open the terminal run the following command
```
$ sudo mkdir -p /data/db
$ whoami
turtuvshin
$ sudo chown turtuvshin /data/db
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

## Copyright

Copyright &copy;2019 Intelligo Systems. All Rights Reserved.

Distributed under [MIT License](http://mutedsolutions.mit-license.org).
