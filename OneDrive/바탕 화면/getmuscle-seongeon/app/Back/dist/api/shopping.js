"use strict";
// shoppingRouter.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shoppingService = __importStar(require("../service/shopping"));
//import mongoConnection from '../config/db';
//import Product from '../schema/product';
const shoppingRouter = express_1.default.Router();
// 모든 상품을 반환하는 엔드포인트
shoppingRouter.get('/products', (req, res) => {
    shoppingService.getProducts()
        .then(products => {
        console.log(products);
        res.json(products); // 해결된 데이터를 클라이언트에게 보냄
    })
        .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
});
exports.default = shoppingRouter;
