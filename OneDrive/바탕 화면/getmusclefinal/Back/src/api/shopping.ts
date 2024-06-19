// shoppingRouter.ts

import express, { Request, Response } from 'express';
import * as shoppingService from '../service/shopping';


//import mongoConnection from '../config/db';
//import Product from '../schema/product';

const shoppingRouter = express.Router();
// 모든 상품을 반환하는 엔드포인트

shoppingRouter.get('/products', (req: Request, res: Response) => {
    shoppingService.getProducts()
    .then(products => {
        console.log(products);
        res.json(products); // 해결된 데이터를 클라이언트에게 보냄
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
})


export default shoppingRouter;



