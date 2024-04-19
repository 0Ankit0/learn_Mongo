//To show all the databases in the system
// show databases;
//Declare the database to use
use('test');
//To show the current database
// db

//Now you can use db for accessing the database

//To create a collection
db.createCollection('users');

//To show all the collections in the database
// show collections;

//To create a database user
db.createUser({
    user: "username",
    pwd: "password",
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