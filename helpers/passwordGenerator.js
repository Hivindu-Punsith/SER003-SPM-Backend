const uniqid = require('uniqid'); 

exports.generateRandomPassword = async ()=>{

    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */

    var final = id_2 + id_3;

    return final;
}

