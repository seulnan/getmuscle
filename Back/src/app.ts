// src/app.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoConnection from './config/db';
//import shoppingRouter from './api/shopping';
import * as shopping from './service/shopping';
import cors from 'cors';
import * as community from './service/community';
import * as user from './service/user';

const app = express();
const port = 5000;
app.use(cors());

// JSON 파싱을 위한 미들웨어 설정
app.use(bodyParser.json());

// URL 인코딩된 데이터를 파싱하기 위한 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/shopping', shoppingRouter);

app.listen(port, () => {
  mongoConnection;
  console.log(`Server is running on port ${port}`);
});

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

// ---------------------------------shopping api ------------------------------------------------------------------------------------

//포인트 충전 요청
app.post("/shopping/charge", async (req: Request, res: Response) => {
  try {
    // 클라이언트가 전송한 데이터 확인
    const chargePoints: number | undefined = req.body.points;
    if (chargePoints === undefined || chargePoints === null) {
      throw new Error("충전할 포인트를 제대로 입력해주세요.");
    }
    // 사용자 ID는 세션에서 가져오도록 변경
    const userid = "memario"; // 실제로는 세션에서 파싱
    // 포인트 충전
    await shopping.chargePoint(userid, chargePoints);
    // 충전 후 포인트 조회
    const updatedPoints = await shopping.getPoint(userid);
    // 응답 데이터 생성
    const responseData = { points: updatedPoints };
    // 클라이언트에 응답
    res.json(responseData);
  } catch (error: unknown) {
    console.error(error);
    // 에러 발생 시 클라이언트에 에러 메시지를 응답
    res.status(400).json({ error: (error as Error).message });
  }
});

//유저 포인트 정보 조회하기
app.get("/users/points", async (req, res) => {
  try {
    const userID = "memario"; //req.session.id;
    //const points = await shopping.getPoint(userId);
    const points = await shopping.getPoint(userID);
    const responseData = { points: points };
    res.json(responseData);
  } catch (error: unknown) {
    console.error(error);
    // 에러 발생 시 클라이언트에 에러 메시지를 응답
    res.status(400).json({ error: (error as Error).message });
  }
});

//진열 상품 내역 가져오기
app.get("/shopping/products", async (req, res) => {
  const loadProduct = await shopping.getProductList();
  console.log(loadProduct);
  res.json(loadProduct);
});

//주문 내역보기
app.get("/shopping/order-history", async (req, res) => {
  try {
    const userid = "memario"; //req.session.id;
    const result = await shopping.getPurchasedHistory(userid);
    if (result === undefined || result === null) {
      console.log(`일치하는${userid}가 db에 없습니다.`);
      return;
    } else {
      console.log(result);
      res.json(result);
    }
  } catch (error: unknown) {
    console.error(error);
    // 에러 발생 시 클라이언트에 에러 메시지를 응답
    res.status(400).json({ error: (error as Error).message });
  }
});

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
app.put("/shopping/order/:price", async (req, res) => {
  const { price } = req.params;
  const { productId, quantity } = req.body;

  console.log("요청 도착:", { price, productId, quantity });
  try {
    const userID = "memario"; //req.session.id 로 바꿔야됨.
    const productPrice = parseInt(req.params.price, 10); //10은 10진법의 의미
    const beforep = await shopping.getPoint(userID);
    console.log(`충전 전 포인트: ${beforep}`);
    await shopping.orderPoint(productPrice, userID);
    const afterp = await shopping.getPoint(userID);
    console.log(`충전 후 포인트: ${afterp}`);
    res.status(200);
    res.json({ points: afterp });
  } catch (error: unknown) {
    console.error(error);
    return;
  }
});

//---------------------------------------------------------------------------------------------------------------------------------------------------

// {
//     image: "profilePic1.jpg",
//     nickname: "User 1",
//     fitnessGoal: "Lose Weight",
// }

//친구요청시 objectid를 유저의 friend 의 저장
app.post("/api/friends", async (req, res) => {
  //friends의 id가 옴
  try {
    const userid = "memario"; //req.session.Id
    const friendId = req.body.ID;
    console.log(req.body);
    await community.newFriend(userid, friendId);
    //friends = { image, nickname, fitnessGoal, }
  } catch (error: unknown) {
    console.error(error);
    return res.status(404);
  }
});

//친구정보 반환
app.get("/api/friends", async (req, res) => {
  try {
    let data: any[] = [];
    const userId = "memario"; //req.session.ID;
    data = await community.getFriendInfo(userId);
    res.json(data);
  } catch (error: unknown) {
    console.error(error);
    return;
  }
});


app.post('/api/likePoint', async (req,res)=>{
  try{
      const userId = 'memario'; //req.body.ID는 게시물 주인의 정보.;
      const like : boolean = req.body.increment;
      await user.setPoint(userId, like );
  }catch(error: unknown){
      console.error(error);
      return;
  }
})

app.post('/community/add', async (req,res) => {
  
  try{
    const userID = 'memario';//req.session.ID;
    let data = req.body;
    await community.setBoard(userID, data);
    res.status(200);
  }catch(error: unknown){
    console.error(error);
    res.status(400);
  }

})

//{
//     userID : string;
//     exc_data: Array<work>;
//     exc_time: number;
//     exc_number: number;
//     exc_weight: number;
//     exc_image: string;
//     exc_memo: string;
//     exc_share: boolean;
//     exc_date : Date;
// }
