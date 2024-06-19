import mongoose from 'mongoose';
//import Product from '../schema/product';

const dbURI = "mongodb+srv://yeunsuhkim:eLho8EVjP3bAqm0M@learnmongodb.smascwx.mongodb.net/?retryWrites=true&w=majority&appName=learnMongoDB/dkeun";

mongoose
    .connect(dbURI as string,{dbName: 'dkeun'}) //{dbName: 'dkeun'});

const mongoConnection = mongoose.connection;

mongoConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoConnection.once('open', () => {
    console.log('Connected to MongoDB');
});

// async function addProduct() {

//     try {
//         // MongoDB에 연결

//         // Product 컬렉션의 모든 문서 가져오기
//         //const product = await Product.find({});
//         const newProductData = {
//             img: 'proteins',
//             name: 'Product Name3',
//             price: 3000,
//         };
//         // Product 모델을 사용하여 데이터 추가
//         const newProduct = new Product(newProductData);
//         await newProduct.save();
//         console.log('Product added successfully:', newProduct);
//     } catch (error) {
//         console.error('Error occurred while connecting to MongoDB:', error);
//     } finally {
//         // 연결 닫기
//         await mongoose.connection.close();
//     }
// }
// addProduct();

// getProducts 함수 호출 및 결과 출력

export default mongoConnection;