/**************************************************************************
 * when you are using an operator that starts with $ always wrap it in {} *
 * when using an element in the document wrap it in "" ex."$elementName"  *
 *                                                                        *
 **************************************************************************/



//To show all the databases in the system
 show databases;
//Declare the database to use
use('test');
//To show the current database
db

//Now you can use db for accessing the database

//To create a collection
db.createCollection('users');

//To show all the collections in the database
 show collections;

//To create a database user
db.createUser({
    user: "username",
    pwd: "password", //or passwordPrompt() to ask for password
    roles: [{ role: "role", db: "database" }]
})
/************************************************************************************************************************
 * role can be any of the following                                                                                     *
 * read: provides the ability to read data on all non-system collections                                                *
 * readWrite: provides the ability to read and write data on all non-system collections                                 *
 * dbAdmin: provides the ability to perform administrative tasks, such as compacting data, on a given database          *
 * userAdmin : provides the ability to create and modify roles and users on a given database                            *
 * clusterAdmin: provides the highest cluster-wide access to all databases                                              *
 * readAnyDatabase : provides the ability to read data on all databases                                                 *
 * readWriteAnyDatabase : provides the ability to read and write data on all databases                                  *
 * userAdminAnyDatabase : provides the ability to create and modify roles and users on all databases                    *
 * dbAdminAnyDatabase : provides the ability to perform administrative tasks, such as compacting data, on all databases *
 *                                                                                                                      *
 ************************************************************************************************************************/

//To authenticate and login as a particular user
db.auth("username", "password");
db.auth("username", passwordPrompt()); //asks the password as a prompt instead of hardcoding it

//To view all the users in the database
db.getUsers();

//To update a user password
db.updateUser("username", {
    pwd: "newpassword"
});

//To update a user role
db.updateUser("username", {
    roles: [{ role: "role", db: "database" }]
});

//To drop a user
db.dropUser("username");

//you can create a backup of the database using mongodump
//and restore it using mongorestore but it is an external tool that you have to install separately

/***********************************************************************************************************************************************************************************************************************************************************
 *              The ESR rule for index creation                                                                                                                                                                                                                         *
 * Creating the correct index for the queries is not always obvious.
 * However, there is a general rule that you can use to help you, which is called the ESR (Equality, Sort, Range) rule.                                                                  *
 *                                                                                                                                                                                                                                                         *
 * This rule is a thought framework that describes how to build your compound indexes.
 * Start with the fields that use an exact match, add the fields you use for sorting, and finally,
 * add fields used for non-exact matches (i.e., $lt or $ne operators). *
 *                                                                                                                                                                                                                                                         *
 ***********************************************************************************************************************************************************************************************************************************************************/

//creating an index to make it available for searching
db.collection().createIndex({ title: 1 }) //1 for ascending order and -1 for descending order
db.collection().createIndex({ title: 1, price: -1 }) //compound index


//The $text query operator in MongoDB requires a text index on the fields that you want to search.
db.collection('').createIndex({ title: 'text' })
db.collection('').find({ $text: { $search: "perfume" } })


/****************************************************************************************************************
 * unique: If set to true, MongoDB enforces a unique constraint,                                                *
 * which ensures that the indexed field does not store duplicate values.                                        *
 *                                                                                                              *
 * sparse: If set to true, MongoDB only indexes the documents that contain the indexed field.                   *
 *  The sparse index option can make queries more efficient.                                                    *
 *                                                                                                              *
 * background: If set to true, MongoDB builds the index in the background                                       *
 * so that building an index does not block other database activities.                                          *
 *                                                                                                              *
 * expireAfterSeconds: This option is used with TTL (Time-To-Live) indexes.                                     *
 * It specifies a value, in seconds, as a TTL to control how long MongoDB retains documents in this collection. *
 *                                                                                                              *
 ****************************************************************************************************************/

//in mongodb you cannot directly alter an index so
//you have to drop the index and create a new index
db.products.getIndexes();//to get the name of all the indexes
db.products.dropIndex('title_1');//to drop the index

//to create a replica set
//first create a directory for the data
mkdir - p / data / rs1 / data / rs2 / data / rs3 //-p flag is used to create the parent directory if it does not exist
//then start the mongod instances
mongod--replSet rs--port 27017 --dbpath / data / rs1
mongod--replSet rs--port 27018 --dbpath / data / rs2
mongod--replSet rs--port 27019 --dbpath / data / rs3
//then connect to one of the instances
mongo--port 27017
//then initiate the replica set
rs.initiate()
//then add the other instances to the replica set
rs.add("localhost:27018")
rs.add("localhost:27019")
//then check the status of the replica set
rs.status()
//to remove a replica set member
rs.remove("localhost:27019")
//to add a replica set member
rs.add("localhost:27019")
//to reconfigure the replica set
rs.reconfig()
//to step down the primary node( mostly used for maintenance purposes)
rs.stepDown()
//to check the replica set configuration
rs.conf()
//to check the replica set status
rs.status()
//to check the replica set version
rs.isMaster().maxWireVersion
//to check the replica set members
rs.isMaster().hosts

/*****************************************************************************************************************************************************************************************************************************
 * A sharded cluster in MongoDB is a set of servers that work together to distribute and manage data.
 *  The data is broken into chunks and distributed across the servers in the cluster. 
 * This process is known as "sharding". *
 *                                                                                                                                                                                                                           *
 * Sharding is a method for distributing data across multiple machines.
 *  MongoDB uses sharding to support deployments with very large data sets and high throughput operations.                                               
 *                                                                                                                                                                                                                           *
 * Here are the main components of a sharded cluster:                                                                                                                                                                        *
 *                                                                                                                                                                                                                           *
 * Shards: Each shard contains a subset of the sharded data. As your data set grows, 
 * you can add more shards to a cluster to increase capacity.                                                                              
 *                                                                                                                                                                                                                           *
 * Config servers: Config servers store metadata and configuration settings for the cluster. 
 * They track the location and distribution of data within the cluster.                                                            
 *                                                                                                                                                                                                                           *
 * Mongos instances: These are routing processes that direct the client application's data requests to the appropriate shard or shards.                                                                                      *
 *                                                                                                                                                                                                                           *
 *****************************************************************************************************************************************************************************************************************************/
//to create a sharded cluster
//first create a directory for the data
mkdir - p / data / config / data / shard1 / data / shard2 / data / shard3
//then start the config server
mongod--configsvr--replSet configReplSet--port 27017 --dbpath / data / config
//then connect to the config server
mongo--port 27017
//then initiate the config server
rs.initiate()
//then start the shard servers
mongod--shardsvr--replSet shard1ReplSet--port 27018 --dbpath / data / shard1
mongod--shardsvr--replSet shard2ReplSet--port 27019 --dbpath / data / shard2
mongod--shardsvr--replSet shard3ReplSet--port 27020 --dbpath / data / shard3
//then connect to the shard servers
mongo--port 27018
mongo--port 27019
mongo--port 27020
//then initiate the shard servers
rs.initiate()
//then connect to the config server
mongo--port 27017
//then add the shard servers to the config server
sh.addShard("shard1ReplSet/localhost:27018")
sh.addShard("shard2ReplSet/localhost:27019")
sh.addShard("shard3ReplSet/localhost:27020")
//then check the status of the sharded cluster
sh.status()
//then create a database and a collection
use test
db.createCollection("users")
//then shard the collection
sh.shardCollection("test.users", { _id: "hashed" })
//then insert some data
db.users.insert({ _id: 1, name: "Alice" })
db.users.insert({ _id: 2, name: "Bob" })
db.users.insert({ _id: 3, name: "Charlie" })

//to check the shard distribution
db.users.getShardDistribution()
//to check the shard key
db.users.getShardKey()
//to check the shard version
db.users.getShardVersion()
//to check the shard status
db.users.getShardStatus()


//mongoexport is a tool that allows you to export data from MongoDB in JSON, CSV, or TSV format.
//to export data from a collection
mongoexport--db test--collection users--out / data / users.json

//mongoimport is a tool that allows you to import data into MongoDB from a JSON, CSV, or TSV file.
//to import data into a collection
mongoimport--db test--collection users--file / data / users.json

//mongodump is a tool that allows you to create a backup of a MongoDB database.
//to create a backup of the database
mongodump--db test--out / data / backup

//mongorestore is a tool that allows you to restore a MongoDB database from a backup created with mongodump.
//to restore the database
mongorestore--db test / data / backup / test

