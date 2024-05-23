
//to find all the documents in the collection
db.collection.find();

//to find documents with a specific condition
db.collection.find({ 'title': 'MongoDB Overview' });

//to find the document with specific value in an array
db.collection.find({ 'likes': { $lt: 50 } });

//using operators to find the documents
db.collection.find({ 'likes': { $in: [50, 100] } });

//using logical operators to find the documents
db.collection.find({ $or: [{ 'likes': 50 }, { 'title': 'MongoDB Overview' }] });

//using projection to display only specific fields
db.collection.find({}, { 'title': 1, 'likes': 1 });

//using projection to exclude specific fields
db.collection.find({}, { 'title': 0 });

//using projection to display specific fields and exclude _id field
db.collection.find({}, { 'title': 1, 'likes': 1, '_id': 0 });

//to find the first document in the collection
db.collection.findOne();

//to find the first document with specific condition
db.collection.findOne({ 'title': 'MongoDB Overview' });

//to find the documents and limit the number of documents to be displayed
db.collection.find().limit(2);

//to find the documents and skip the number of documents
db.collection.find().skip(2); //can be useful for pagination
//db.collection.find().skip(page*10).limit(10); //to display 10 documents per page and skip n documents

//to find the documents and sort the documents in ascending order
db.collection.find().sort({ 'likes': 1 });

//to find the documents and sort the documents in descending order
db.collection.find().sort({ 'likes': -1 });

