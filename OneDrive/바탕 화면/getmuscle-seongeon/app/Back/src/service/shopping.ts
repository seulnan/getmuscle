import  Product from '../schema/product';
import User from '../schema/user';
import Purchased from '../schema/purchased';
import mongoConnection from '../config/db';




//
export const getProducts = async (  ) =>{
    try{
        mongoConnection;
        const products = await Product.find({});
        //console.log(products);
        return products;
    }
    catch(e){console.log(e);}
};

//Shoppingpage.tsx에서 몽고db에서 사용자의 포인트를 가져오는 API가 필요함, 사용자의 ID를 받아 해당사용자의 포인트를 반환해야함
export const getPoint = async ( id : string ) =>{
    try{
        mongoConnection;
        const user = await User.findOne({ID : id});

        if (user && user.POINT !== undefined) {
            return user.POINT;
        } else {
            // 사용자가 존재하지 않거나 POINT 값이 없는 경우 null 반환
            return null;
        }
        
    }
    catch(e){console.log(e);}
};

export const chargePoint = async  ( id : string, point : number ) =>{
    try{
        mongoConnection;
        let userpoint = await getPoint(id);

        if(userpoint === null){
            console.log(`사용자 ${id}를 찾을 수 없거나 POINT 값이 없습니다.`);
            return; // 함수 종료
        }
        else if (userpoint === undefined ) {
            console.log(`사용자 ${id}를 찾을 수 없거나 POINT 값이 없습니다.`);
            return; // 함수 종료
        }
        userpoint += point;

        // 사용자의 POINT 필드를 업데이트합니다.
        await User.updateOne({ ID: id }, { $set: { POINT: userpoint } });

        console.log(`사용자 ${id}의 POINT가 ${point}만큼 충전되었습니다.`);
        
    }
    catch(e){console.log(e);}
};

export const getProductList = async () =>{
    try{
        const productlist = await Product.find({});

        if (productlist === undefined){
            console.log('사용자 ${id}를 찾을 수 없거나 상품 값이 없습니다.');
            return
        }
        else if (productlist === null){
            console.log('사용자 ${id}를 찾을 수 없거나 상품 값이 없습니다.');
            return
        }

        return productlist;
    }catch(e){ console.log(e);}
};


export const getPurchasedHistory = async (userID : string) =>{
    try{
        const productlist = await Purchased.find({userID: userID});

        if (productlist === undefined){
            console.log(`사용자 ${userID}를 찾을 수 없거나 상품 값이 없습니다.`);
            return
        }
        else if (productlist === null){
            console.log(`사용자 ${userID}를 찾을 수 없거나 상품 값이 없습니다.`);
            return
        }

        return productlist;
    }catch(e){ console.log(e);}
}
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


