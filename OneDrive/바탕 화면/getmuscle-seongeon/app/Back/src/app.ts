// src/app.ts
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoConnection from "./config/db";
//import shoppingRouter from './api/shopping';
import * as shopping from "./service/shopping";
import cors from "cors";

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

app.post("/api/charge", async (req: Request, res: Response) => {
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

app.get("/users/points", async (req, res) => {
  try {
    const userId = "memario"; //req.session.ID;
    //const points = await shopping.getPoint(userId);
    const points = await shopping.getPoint(userId);
    const responseData = { points: points };
    res.json(responseData);
  } catch (error: unknown) {
    console.error(error);
    // 에러 발생 시 클라이언트에 에러 메시지를 응답
    res.status(400).json({ error: (error as Error).message });
  }
});

app.get("/products", async (req, res) => {
  const loadProduct = await shopping.getProductList();
  console.log(loadProduct);
  res.json(loadProduct);
});

app.get("/orders", async (req, res) => {
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
