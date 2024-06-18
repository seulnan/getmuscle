
import User from '../schema/user';
import mongoose, { ObjectId } from 'mongoose';
import mongoConnection from '../config/db';


export const getUser = ( id : any ) => {
    try{
        mongoConnection;
        const user = User.findOne({ID : id});
        return user;
    }catch(e){console.log(e);}
}


export const newFriend = async (userId: string, friendId: string) => {
    try {
        // Connect to MongoDB (assuming mongoConnection is properly set up)

        const user = await User.findOne({ ID: userId });
        const friend = await User.findOne({ ID: friendId });

        if (!user || !friend) {
            console.log(`User ${userId} or friend ${friendId} not found.`);
            return;
        }
        console.log(typeof(friend._id));
        const friendObjectId = friend._id.toHexString(); // convert
        // Add friend to user's friends list
        user.friend.push(friendObjectId);
        console.log(user.friend);
        // await user.save();
        //const target = await find(user.friend[1]);

        // console.log(`Added friend ${friendId} to user ${userId}'s friends list.`);

    } catch (error) {
        console.error('Error:', error);
    }
};




newFriend( 'memario', 'leeyuenjae')
    .then(() => {});