/***********************************************************************************************************
 * Aggregation is a pipeline of operations that process the input documents and return computed results. 
    * Aggregation operations group values from multiple documents together, and can perform a variety of operations on the grouped data to return a single result.
    * Aggregation operations are similar to the Group By clause in SQL.
 ***********************************************************************************************************/

// The aggregate() Method
// The aggregate() method is used to perform aggregation on the data in a collection.
// The aggregate() method takes an array of documents as an argument. Each document in this array is a pipeline operator.
// The aggregate() method returns a cursor to the documents produced by the final stage of the aggregation pipeline.
// The aggregate() method is a wrapper around the aggregation framework.

//To find the sum of the likes of all the documents in the collection
db.collection.aggregate([{
    $group: {
        _id: null,
        totalLikes: {
            $sum: '$likes'
        }
    }
}]);

//To aggregate the result of the find operation
db.collection.aggregate([
    { $match: { 'likes': { $lt: 50 } } },
    {
        $group: {
            _id: null,
            totalLikes: {
                $sum: '$likes'
            }
        }
    }
]);

//To add a new field to the document from find operation
db.collection.aggregate([
    { $match: { 'likes': { $lt: 50 } } },
    {
        $addFields: {
            newField: 'new value'
        }
    }
]);

//To find the documents with the total likes greater than 100
db.collection.aggregate([{
    $group: {
        _id: null,
        totalLikes: {
            $sum: '$likes'
        }
    }
}, {
    $match: {
        totalLikes: {
            $gt: 100
        }
    }
}]);

//To find the documents with the total likes greater than 100 and display only the title and likes
db.collection.aggregate([{
    $group: {
        _id: null,
        totalLikes: {
            $sum: '$likes'
        }
    }
}, {
    $match: {
        totalLikes: {
            $gt: 100
        }
    }
}, {
    $project: {
        title: 1,
        likes: 1
    }
}]);

//To find the documents with the total likes greater than 100 and display only the title and likes in ascending order
db.collection.aggregate([{
    $group: {
        _id: null,
        totalLikes: {
            $sum: '$likes'
        }
    }
}, {
    $match: {
        totalLikes: {
            $gt: 100
        }
    }
}, {
    $project: {
        title: 1,
        likes: 1
    }
}, {
    $sort: {
        likes: 1
    }
}]);

//To use aggregation with multiple collections
db.collection.aggregate([{
    $lookup: {
        from: 'anotherCollection',
        localField: 'field',
        foreignField: 'field',
        as: 'newField'
    }
}]);

//To use aggregation with multiple collections and unwind the array
db.collection.aggregate([{
    $lookup: {
        from: 'anotherCollection',
        localField: 'field',
        foreignField: 'field',
        as: 'newField'
    }
}, {
    $unwind: '$newField'
}]);

/*********************************************************************************************************************************************************************************************
 * The $unwind operator is used to deconstruct an array field from the input documents to output a document for each element. Each output document replaces the array with an element value. *
 * For example, if a document has an array field with [1, 2, 3], the $unwind operator will output three documents with the array field replaced by 1, 2, and 3 respectively.                 *
 *  {
  "_id": 1,
  "field": "a",
  "newField": [
    {"_id": 101, "field": "a", "extra": "foo"},
    {"_id": 102, "field": "a", "extra": "bar"}
  ]
}
*The above after unwind will become
* {
  "_id": 1,
  "field": "a",
  "newField": {"_id": 101, "field": "a", "extra": "foo"}
},
{
  "_id": 1,
  "field": "a",
  "newField": {"_id": 102, "field": "a", "extra": "bar"}
}                                                                                                                                                                                         *
 *********************************************************************************************************************************************************************************************/
//To use aggregation with multiple collections and group the result
db.collection.aggregate([{
    $lookup: {
        from: 'anotherCollection',
        localField: 'field',
        foreignField: 'field',
        as: 'newField'
    }
}, {
    $unwind: '$newField'
}, {
    $group: {
        _id: null,
        totalLikes: {
            $sum: '$likes'
        }
    }
}]);

//To inner join multiple collections
db.collection.aggregate([{
    $lookup: {
        from: 'anotherCollection',
        localField: 'field',
        foreignField: 'field',
        as: 'newField'
    }
}, {
    $unwind: '$newField'
}, {
    $match: {
        'newField.field': 'value'
    }
}]);

