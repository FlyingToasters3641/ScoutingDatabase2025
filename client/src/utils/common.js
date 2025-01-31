/**
 * This function is used to lookup a value in a multi-dimensional array
 * Posted on Tathyika.com (also refer for more codes there)
 * 
 * @version 1
 *
 * @param {Object} searchValue The value to search for the lookup (vertical).
 * @param {Array} array The multi-dimensional array to be searched.
 * @param {String} searchIndex The column-index of the array where to search.
 * @param {String} returnIndex The column-index of the array from where to get the returning matching value.
 * @return {Object} Returns the matching value found else returns null.
 */
export function arrayLookup(searchValue,array,searchIndex,returnIndex) {
    var returnVal = null;
    var i;
    for(i=0; i<array.length; i++) {
        if(array[i][searchIndex]===searchValue) {
            returnVal = array[i][returnIndex];
            break;
        }
    }
    return returnVal;
}