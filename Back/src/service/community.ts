
import User from '../schema/user';
import Calendar from '../schema/calendar';
import mongoose, { ObjectId } from 'mongoose';
import mongoConnection from '../config/db';
import record from '../schema/record'; // record 스키마를 가져옵니다


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



export const setBoard = async (userID: string, data: any) => {
    try {
        mongoConnection;

        const user = await User.findOne({ ID: userID });
        if (!user) {
            console.error(`ID가 ${userID}인 사용자를 찾을 수 없습니다.`);
            return;
        }

        // data의 필수 필드를 검증합니다
        if (!data.userID || typeof data.userID !== 'string') {
            throw new Error('유효하지 않거나 누락된 userID입니다.');
        }
        if (!data.exc_time || typeof data.exc_time !== 'number') {
            throw new Error('유효하지 않거나 누락된 exc_time입니다.');
        }
        if (!data.exc_number || typeof data.exc_number !== 'number') {
            throw new Error('유효하지 않거나 누락된 exc_number입니다.');
        }
        if (!data.exc_weight || typeof data.exc_weight !== 'number') {
            throw new Error('유효하지 않거나 누락된 exc_weight입니다.');
        }
        if (!data.exc_image || typeof data.exc_image !== 'string') {
            throw new Error('유효하지 않거나 누락된 exc_image입니다.');
        }
        if (!data.exc_memo || typeof data.exc_memo !== 'string') {
            throw new Error('유효하지 않거나 누락된 exc_memo입니다.');
        }
        if (typeof data.exc_share !== 'boolean') {
            throw new Error('유효하지 않거나 누락된 exc_share입니다.');
        }

        // exc_data가 제공되지 않으면 기본 값을 설정합니다
        const excData = data.exc_data || [{ type: ['current'], count: ['1'], set: 1 }];

        // exc_data 형식을 검증합니다
        if (!Array.isArray(excData) || excData.some(item => !item.type || !item.count || !item.set)) {
            throw new Error('유효하지 않은 exc_data 형식입니다.');
        }

        const newRecord = new record({
            userID: userID, // userID를 정확히 설정합니다
            exc_data: excData,
            exc_time: data.exc_time,
            exc_number: data.exc_number,
            exc_weight: data.exc_weight,
            exc_image: data.exc_image,
            exc_memo: data.exc_memo,
            exc_share: data.exc_share,
            exc_date: new Date() // 현재 날짜를 사용합니다
        });

        const savedRecord = await newRecord.save();

        if (data.exc_share) {
            await user.updateOne({ $inc: { share: savedRecord._id.toHexString() } });
        }

        console.log('레코드 저장됨:', savedRecord);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            console.error('검증 오류:', e.message);
        } else {
            console.error('오류:', e);
        }
    }
}