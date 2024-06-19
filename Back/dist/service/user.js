import User from '../schemas/user.js';

import * as shopping from './shopping.js'

export const getUsers = async () => {
    try{
        
        const users = await User.find({});
        
        console.log(users);
        return users;
    }catch(e){console.log(e);}
};

export const setPoint = async (ID , plus ) => {
    try {
        const user = await User.findOne({ ID : ID});  
        if (plus === true && user != null){
             
            await User.updateOne({ID: ID}, {$inc : {POINT : 5}});
        }else if (plus === false && user != null){
            
            await User.updateOne({ID: ID}, {$inc : {POINT : -5}});
        }

    }catch(e){console.log(e)}
}
//test
// const k = true;
// for (let i = 0; i < 5; i++){
//     setPoint('memario', k)  
//     .then();
// }
