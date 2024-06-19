"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendInfo = exports.newFriend = exports.getUser = void 0;
const user_1 = __importDefault(require("../schema/user"));
const db_1 = __importDefault(require("../config/db"));
const getUser = (id) => {
    try {
        db_1.default;
        const user = user_1.default.findOne({ ID: id });
        return user;
    }
    catch (e) {
        console.log(e);
    }
};
exports.getUser = getUser;
const newFriend = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB (assuming mongoConnection is properly set up)
        const user = yield user_1.default.findOne({ ID: userId });
        const friend = yield user_1.default.findOne({ ID: friendId });
        if (!user || !friend) {
            console.log(`User ${userId} or friend ${friendId} not found.`);
            return;
        }
        const friendObjectId = friend._id.toHexString();
        // convert
        if (user.friend.includes(friendObjectId)) {
            //console.log(user.friend);
            return;
        }
        else {
            // Add friend to user's friends list
            //이게 푸시하는 방법임.
            user.friend.push(friendObjectId);
            yield user.save();
        }
        console.log(user.friend);
        // = User.findById(user.friend[1]).then((result) => console.log(result));
        // console.log(`Added friend ${friendId} to user ${userId}'s friends list.`);
    }
    catch (error) {
        console.error('Error:', error);
    }
});
exports.newFriend = newFriend;
const getFriendInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = [];
        const user = yield user_1.default.findOne({ ID: userId });
        const userFriends = user === null || user === void 0 ? void 0 : user.friend;
        if (!userFriends || userFriends.length === 0) {
            return [];
        }
        for (const friendId of userFriends) {
            let info = { ID: '', image: '', nickname: '', fitnessGoal: '#다이어트' };
            try {
                const friendUser = yield user_1.default.findById(friendId);
                if (friendUser) {
                    info.ID = friendUser.ID;
                    info.image = friendUser.profile;
                    info.nickname = friendUser.nickname;
                }
            }
            catch (error) {
                console.error(`Error fetching user with ID ${friendId}:`, error);
                // Handle error fetching user if needed
            }
            result.push(info);
        }
        console.log('Result:', result); // Check the result array in console
        return result;
    }
    catch (e) {
        console.error('Error:', e);
        // Handle error in outer catch block if needed
        return []; // Return empty array on error
    }
});
exports.getFriendInfo = getFriendInfo;
//     image: "profilePic1.jpg",
//     nickname: "User 1",
//     fitnessGoal: "Lose Weight",
// 
