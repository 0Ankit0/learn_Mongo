/**************************************************************************************************************************
 * deleteOne: Returns a result object with details about the deletion operation, such as the number of documents deleted. *
 * findOneAndDelete: Returns the actual document that was deleted.                                                        *
 **************************************************************************************************************************/

//to delete a document from the collection
db.collection.deleteOne(
    { 'title': 'MongoDB Overview' }
).then(result => {
    console.log('Document deleted:', result.deletedCount);
}).catch(err => {
    console.error('Error deleting document:', err);
});
//to delete all documents from the collection
db.collection.deleteMany({});

//to remove multiple documents from the collection
db.collection.deleteMany(
    { 'title': 'MongoDB Overview' }
);

//to find particular document and remove it
db.collection.findOneAndDelete(
    { 'title': 'MongoDB Overview' }
).then(result => {
    console.log('Document deleted:', result.value);
}).catch(err => {
    console.error('Error deleting document:', err);
});

