use mydb

//to insert data into the collection
db.collection.insert({
    name: "John",
    age: 22,
    status: "A"
})

//to insert multiple data into the collection
db.collection.insertMany([
    {
        name: "John",
        age: 22,
        status: "A"
    },
    {
        name: "Doe",
        age: 25,
        status: "B"
    }
]);

//to insert data into the collection with specific id
db.collection.insert({
    _id: 1,
    name: "John",
    age: 22,
    status: "A"
});

//you can also insert data into the collection using the save() method
db.collection.save({
    name: "John",
    age: 22,
    status: "A"
});

//you can also use upsert option to insert data into the collection
db.collection.update(
    { _id: 1 },
    { name: "John", age: 22, status: "A" },
    { upsert: true }
);//if the name is not found in the collection, it will insert the data into the collection

//you can also use the insertOne() method to insert data into the collection
db.collection.insertOne({
    name: "John",
    age: 22,
    status: "A"
});

