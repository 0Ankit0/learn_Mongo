use mydb
//to update the document
db.collection.updateOne(
    { 'title': 'MongoDB Overview' },
    {
        $set: { 'title': 'New MongoDB Tutorial' }
    });

//to update multiple documents
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $set: { 'title': 'New MongoDB Tutorial' } }
);

//to update the document and insert if not found
db.collection.updateOne(
    { 'title': 'MongoDB Overview' },
    { $set: { 'title': 'New MongoDB Tutorial' } },
    { upsert: true }
);

//to update the document and increment the value
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $inc: { 'yourFieldName': 5 } }
);

//to update the document and remove the field
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $unset: { 'yourFieldName': 1 } }
);

//to update the document and rename the field
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $rename: { 'yourFieldName': 'newFieldName' } }
);

//to update the document and push the value to array
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $push: { 'yourFieldName': 'value' } }
);

//to update the document and add to set
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $addToSet: { 'yourFieldName': 'value' } }
);

//to update the document and remove value from set
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $pull: { 'yourFieldName': 'value' } }
);

//to update the document and remove first value from array
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $pop: { 'yourFieldName': -1 } }
);

//to update the document and remove last value from array
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $pop: { 'yourFieldName': 1 } }
);

/*************************************************************************************************
 *                                                                                               *
 *                          Comparison Operators:                                                                         *
 *                                                                                               *
 * $eq: Matches values that are equal to a specified value.                                      *
 * 
 *                          Arithmetic Operators:                                                                         *
 *                                                                                               *
 * $min: Returns the minimum value of the specified expression.                                  *
 * $max: Returns the maximum value of the specified expression.                                  *
 * $avg: Returns the average value of the specified expression.                                  *
 * $sum: Returns the sum of the specified expression.                                            *
 * $log10: Calculates the base 10 logarithm of a number.                                         *
 * $trunc: Truncates a number to its integer.                                                    *
 * 
 *                          Array Operators:                                                                              *
 *                                                                                               *
 * $push: Adds an item to an array.                                                              *
 * $addToSet: Adds an item to an array only if it is not already in the array.                   *
 * $pop: Removes the first or last item of an array.                                             *
 * $pull: Removes all array elements that match a specified query.                               *
 * $pullAll: Removes all array elements that match a specified list of values.                   *
 * $each: Modifies the $push and $addToSet operators to append multiple items for array updates. *
 * $slice: Returns a subset of an array.                                                         *
 * $sort: Orders the elements of an array.                                                       *
 * $position: Modifies the $push operator to specify the position in the array to add elements.  *
 * 
 *                          Field Update Operators:                                                                       *
 *                                                                                               *
 * $unset: Removes a specified field.                                                            *
 * $rename: Renames a field.                                                                     *
 * $inc: Increments the value of the field by the specified amount.                              *
 * $mul: Multiplies the value of the field by the specified amount.                              *
 * $currentDate: Sets the value of a field to current date, either as a Date or a Timestamp.     *
 * $set: Sets the value of a field in a document.                                                *
 * $setOnInsert: Sets the value of a field if an update results in an insert of a document.      *
 *************************************************************************************************/


//to rename a field in the document
db.collection.updateMany(
    { 'title': 'MongoDB Overview' },
    { $rename: { 'yourFieldName': 'newFieldName' } }
);

