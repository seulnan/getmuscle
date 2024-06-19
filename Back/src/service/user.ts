import User from '../schema/user';
import mongoConnection from '../config/db';
import user from '../schema/user';
import * as shopping from './shopping.js'
mongoConnection;
export const getUsers = async () => {
    try{
        mongoConnection;
        const users = await User.find({});
        
        console.log(users);
        return users;
    }catch(e){console.log(e);}
};

export const setPoint = async (ID : string, plus : boolean) => {
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
