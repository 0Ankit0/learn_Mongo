//to delete a document from the collection
db.collection.remove(
    { 'title': 'MongoDB Overview' }
);

//to delete all documents from the collection
db.collection.remove({});

//to delete a single document from the collection
db.collection.remove(
    { 'title': 'MongoDB Overview' },
    { justOne: true }
);

//to remove multiple documents from the collection
db.collection.remove(
    { 'title': 'MongoDB Overview' },
    { justOne: false }
);

