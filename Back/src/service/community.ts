
import User from '../schemas/user.js';
import mongoose, { ObjectId } from 'mongoose';


export const getUser = ( id : any ) => {
    try{
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
        
        const friendObjectId = friend._id.toHexString();
         // convert
        
        if( user.friend.includes(friendObjectId)){
            //console.log(user.friend);
            return
        }else{
            // Add friend to user's friends list
            //이게 푸시하는 방법임.
            user.friend.push(friendObjectId);
            await user.save();
        }
        console.log(user.friend);
        // = User.findById(user.friend[1]).then((result) => console.log(result));
        

        // console.log(`Added friend ${friendId} to user ${userId}'s friends list.`);

    } catch (error) {
        console.error('Error:', error);
    }
};

export const getFriendInfo = async (userId: string) => {
    try {
        let result: any[] = [];
        const user = await User.findOne({ ID: userId });
        const userFriends = user?.friend;

        if (!userFriends || userFriends.length === 0) {
            return [];
        }

        for (const friendId of userFriends) {
            let info: any = { ID : '' , image: '', nickname: '', fitnessGoal: '#다이어트' };

            try {
                const friendUser = await User.findById(friendId);
                
                if (friendUser) {
                    info.ID = friendUser.ID;                
                    info.image = friendUser.profile;
                    info.nickname = friendUser.nickname;
                    
                }
            } catch (error) {
                console.error(`Error fetching user with ID ${friendId}:`, error);
                // Handle error fetching user if needed
            }

            result.push(info);
        }

        console.log('Result:', result); // Check the result array in console
        return result;
    } catch (e) {
        console.error('Error:', e);
        // Handle error in outer catch block if needed
        return []; // Return empty array on error
    }
};



    //     image: "profilePic1.jpg",
    //     nickname: "User 1",
    //     fitnessGoal: "Lose Weight",
    // 


