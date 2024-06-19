import  Product from '../schemas/product.js';
import Purchased from '../schemas/purchased.js';
import user, {IUser} from '../schemas/user.js';




//
export const getProducts = async (  ) =>{
    try{
        const products = await Product.find({});
        //console.log(products);
        return products;
    }
    catch(e){console.log(e);}
};

//Shoppingpage.tsx에서 몽고db에서 사용자의 포인트를 가져오는 API가 필요함, 사용자의 ID를 받아 해당사용자의 포인트를 반환해야함
export const getPoint = async ( id ) =>{
    try{
        await user.findOne({ID : id})
        .then((result)=>{
            if(result!=null){
                console.log(result.POINT);
                return result.POINT;
            }
            else return null;
        })
    }
    catch(e){console.log(e); return null;}
};


export const chargePoint = async  ( id , point ) =>{
    try{
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
        await user.updateOne({ ID: id }, { $set: { POINT: userpoint } });

        console.log(`사용자 ${id}의 POINT가 ${point}만큼 충전되었습니다.`);
        
    }
    catch(e){console.log(e);}
};

export const getProductList = async () =>{
    try{
        const productlist = await Product.find({});

        if (productlist === undefined){
            console.log('상품 값이 없습니다.');
            return
        }
        else if (productlist === null){
            console.log('상품 값이 없습니다.');
            return
        }

        return productlist;
    }catch(e){ console.log(e);}
};


export const getPurchasedHistory = async (userID ) =>{
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

export const orderPoint = (price ,ID ) => {
    try{
        user.findOne({ID: ID}).then(async (result)=>{
            if(result!=null && result!=undefined){
                let beforepoint = result.POINT;
                let afterpoint = beforepoint - price;
                
                await user.updateOne({ ID: ID }, { $set: { POINT: afterpoint } });
            }else{
                console.log(`사용자 ${ID}를 찾을 수 없습니다.`);
                return
            }
        })
    }
    catch(e){
        console.log(e);
    }
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
