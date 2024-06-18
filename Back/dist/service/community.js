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
exports.newFriend = exports.getUser = void 0;
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
        console.log(typeof (friend._id));
        const friendObjectId = friend._id.toHexString(); // convert
        // Add friend to user's friends list
        user.friend.push(friendObjectId);
        console.log(user.friend);
        // await user.save();
        // console.log(`Added friend ${friendId} to user ${userId}'s friends list.`);
    }
    catch (error) {
        console.error('Error:', error);
    }
});
exports.newFriend = newFriend;
(0, exports.newFriend)('memario', 'leeyuenjae')
    .then(() => { });
