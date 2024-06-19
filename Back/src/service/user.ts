import user from '../schema/user';
import mongoConnection from '../config/db';

mongoConnection;
export const getUsers = async () => {
    try{
        mongoConnection;
        const users = await user.find({});
        
        console.log(users);
        return users;
    }catch(e){console.log(e);}
};


getUsers()
    .then(users => console.log(users));