"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
//import shoppingRouter from './api/shopping';
const shopping = __importStar(require("./service/shopping"));
const cors_1 = __importDefault(require("cors"));
const community = __importStar(require("./service/community"));
const user = __importStar(require("./service/user"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
// JSON 파싱을 위한 미들웨어 설정
app.use(body_parser_1.default.json());
// URL 인코딩된 데이터를 파싱하기 위한 미들웨어 설정
app.use(body_parser_1.default.urlencoded({ extended: true }));
//app.use('/shopping', shoppingRouter);
app.listen(port, () => {
    db_1.default;
    console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello World!');
}));
// ---------------------------------shopping api ------------------------------------------------------------------------------------
//포인트 충전 요청
app.post('/shopping/charge', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 클라이언트가 전송한 데이터 확인
        const chargePoints = req.body.points;
        if (chargePoints === undefined || chargePoints === null) {
            throw new Error("충전할 포인트를 제대로 입력해주세요.");
        }
        // 사용자 ID는 세션에서 가져오도록 변경
        const userid = 'memario'; // 실제로는 세션에서 파싱
        // 포인트 충전
        yield shopping.chargePoint(userid, chargePoints);
        // 충전 후 포인트 조회
        const updatedPoints = yield shopping.getPoint(userid);
        // 응답 데이터 생성
        const responseData = { points: updatedPoints };
        // 클라이언트에 응답
        res.json(responseData);
    }
    catch (error) {
        console.error(error);
        // 에러 발생 시 클라이언트에 에러 메시지를 응답
        res.status(400).json({ error: error.message });
    }
}));
//유저 포인트 정보 조회하기
app.get('/users/points', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = 'memario'; //req.session.id;
        //const points = await shopping.getPoint(userId);
        const points = yield shopping.getPoint(userID);
        const responseData = { points: points };
        res.json(responseData);
    }
    catch (error) {
        console.error(error);
        // 에러 발생 시 클라이언트에 에러 메시지를 응답
        res.status(400).json({ error: error.message });
    }
}));
//진열 상품 내역 가져오기
app.get('/shopping/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loadProduct = yield shopping.getProductList();
    console.log(loadProduct);
    res.json(loadProduct);
}));
//주문 내역보기
app.get('/shopping/order-history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = 'memario'; //req.session.id;
        const result = yield shopping.getPurchasedHistory(userid);
        if (result === undefined || result === null) {
            console.log(`일치하는${userid}가 db에 없습니다.`);
            return;
        }
        else {
            console.log(result);
            res.json(result);
        }
    }
    catch (error) {
        console.error(error);
        // 에러 발생 시 클라이언트에 에러 메시지를 응답
        res.status(400).json({ error: error.message });
    }
}));
// 충전 요청을 하면 price 값만큼 사용자의 포인트에서 차감합니다.
//post요청으로 수정.
//수량, 이름 , 가격으로 찾아서 구매내역 생성해야됨.
// app.post('/shopping/order', async(req, res) => {
//     try {
//         const userID = 'memario'; //req.session.id 로 바꿔야됨.
//         const productPrice = parseInt(req.body.price, 10); //10은 10진법의 의미
//         const beforep = await shopping.getPoint(userID);
//         console.log(`충전 전 포인트: ${beforep}`)
//         await shopping.orderPoint( productPrice, userID);
//         const afterp = await shopping.getPoint(userID);
//         console.log(`충전 후 포인트: ${afterp}`)
//         return res.status(200);
//     }catch( error : unknown){
//         console.error(error);
//         return
//     }
// })
app.put('/shopping/order/:price', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = 'memario'; //req.session.id 로 바꿔야됨.
        const productPrice = parseInt(req.params.price, 10); //10은 10진법의 의미
        const beforep = yield shopping.getPoint(userID);
        console.log(`충전 전 포인트: ${beforep}`);
        yield shopping.orderPoint(productPrice, userID);
        const afterp = yield shopping.getPoint(userID);
        console.log(`충전 후 포인트: ${afterp}`);
        res.status(200);
        res.json({ points: afterp });
    }
    catch (error) {
        console.error(error);
        return;
    }
}));
//---------------------------------------------------------------------------------------------------------------------------------------------------
// {
//     image: "profilePic1.jpg",
//     nickname: "User 1",
//     fitnessGoal: "Lose Weight",
// }
//친구요청시 objectid를 유저의 friend 의 저장
app.post('/api/friends', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //friends의 id가 옴
    try {
        const userid = 'memario'; //req.session.Id
        const friendId = req.body.ID;
        console.log(req.body);
        yield community.newFriend(userid, friendId);
        //friends = { image, nickname, fitnessGoal, }
    }
    catch (error) {
        console.error(error);
        return res.status(404);
    }
}));
//친구정보 반환
app.get('/api/friends', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = [];
        const userId = 'memario'; //req.session.ID;
        data = yield community.getFriendInfo(userId);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        return;
    }
}));
app.post('/api/likePoint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = 'memario'; //req.body.ID는 게시물 주인의 정보.;
        const like = req.body.increment;
        yield user.setPoint(userId, like);
    }
    catch (error) {
        console.error(error);
        return;
    }
}));
