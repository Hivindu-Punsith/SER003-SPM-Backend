const uniqid = require('uniqid'); 

exports.generateID = async ()=>{

    var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    //var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    // var id_3 = Math.floor(1000 + Math.random() * 9000);/**generate 4 digit random number  */

    var final = "GYM" + id_1;

    return final;
}

