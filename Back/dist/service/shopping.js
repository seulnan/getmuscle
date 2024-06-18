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
exports.orderPoint = exports.getPurchasedHistory = exports.getProductList = exports.chargePoint = exports.getPoint = exports.getProducts = void 0;
const product_1 = __importDefault(require("../schema/product"));
const user_1 = __importDefault(require("../schema/user"));
const purchased_1 = __importDefault(require("../schema/purchased"));
const db_1 = __importDefault(require("../config/db"));
//
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default;
        const products = yield product_1.default.find({});
        //console.log(products);
        return products;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getProducts = getProducts;
//Shoppingpage.tsx에서 몽고db에서 사용자의 포인트를 가져오는 API가 필요함, 사용자의 ID를 받아 해당사용자의 포인트를 반환해야함
const getPoint = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default;
        const user = yield user_1.default.findOne({ ID: id });
        if (user && user.POINT !== undefined) {
            return user.POINT;
        }
        else {
            // 사용자가 존재하지 않거나 POINT 값이 없는 경우 null 반환
            return null;
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.getPoint = getPoint;
const chargePoint = (id, point) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default;
        let userpoint = yield (0, exports.getPoint)(id);
        if (userpoint === null) {
            console.log(`사용자 ${id}를 찾을 수 없거나 POINT 값이 없습니다.`);
            return; // 함수 종료
        }
        else if (userpoint === undefined) {
            console.log(`사용자 ${id}를 찾을 수 없거나 POINT 값이 없습니다.`);
            return; // 함수 종료
        }
        userpoint += point;
        // 사용자의 POINT 필드를 업데이트합니다.
        yield user_1.default.updateOne({ ID: id }, { $set: { POINT: userpoint } });
        console.log(`사용자 ${id}의 POINT가 ${point}만큼 충전되었습니다.`);
    }
    catch (e) {
        console.log(e);
    }
});
exports.chargePoint = chargePoint;
const getProductList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productlist = yield product_1.default.find({});
        if (productlist === undefined) {
            console.log('사용자 ${id}를 찾을 수 없거나 상품 값이 없습니다.');
            return;
        }
        else if (productlist === null) {
            console.log('사용자 ${id}를 찾을 수 없거나 상품 값이 없습니다.');
            return;
        }
        return productlist;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getProductList = getProductList;
const getPurchasedHistory = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productlist = yield purchased_1.default.find({ userID: userID });
        if (productlist === undefined) {
            console.log(`사용자 ${userID}를 찾을 수 없거나 상품 값이 없습니다.`);
            return;
        }
        else if (productlist === null) {
            console.log(`사용자 ${userID}를 찾을 수 없거나 상품 값이 없습니다.`);
            return;
        }
        return productlist;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getPurchasedHistory = getPurchasedHistory;
const orderPoint = (price, ID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ ID: ID });
        if (user === undefined || user === null) {
            console.log(`사용자 ${ID}를 찾을 수 없습니다.`);
            return;
        }
        let beforepoint = user.POINT;
        let afterpoint = beforepoint - price;
        yield user_1.default.updateOne({ ID: ID }, { $set: { POINT: afterpoint } });
    }
    catch (e) {
        console.log(e);
    }
});
exports.orderPoint = orderPoint;
//getProductList().then(result => console.log(result));
// getProducts()
//     .then(products => console.log(products));
// getPoint('memario')
//     .then(point => console.log('마리오의 포인트는'+ point));
//chargePoint 예시 마리오
// getPoint('memario')
//     .then(point => {
//         console.log('마리오의 포인트는 ' + point);
//         return chargePoint('memario', 3000); // chargePoint 함수 호출 결과를 반환
//     })
//     .then(() => {
//         return getPoint('memario'); // 업데이트된 포인트를 가져오기 위해 getPoint 함수 호출
//     })
//     .then(point => {
//         console.log('마리오의 업데이트된 포인트는 ' + point);
//     })
//     .catch(error => {
//         console.error('오류 발생:', error);
//     });
