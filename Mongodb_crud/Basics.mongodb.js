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
