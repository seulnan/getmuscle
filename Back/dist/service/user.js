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
exports.setPoint = exports.getUsers = void 0;
const user_1 = __importDefault(require("../schema/user"));
const db_1 = __importDefault(require("../config/db"));
db_1.default;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default;
        const users = yield user_1.default.find({});
        console.log(users);
        return users;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getUsers = getUsers;
const setPoint = (ID, plus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ ID: ID });
        if (plus === true && user != null) {
            yield user_1.default.updateOne({ ID: ID }, { $inc: { POINT: 5 } });
        }
        else if (plus === false && user != null) {
            yield user_1.default.updateOne({ ID: ID }, { $inc: { POINT: -5 } });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.setPoint = setPoint;
//test
// const k = true;
// for (let i = 0; i < 5; i++){
//     setPoint('memario', k)  
//     .then();
// }
