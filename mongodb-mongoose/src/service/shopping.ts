import  Product from '../schemas/product.js';
import User from '../schemas/user.js';
import Purchased, {IPurchased} from '../schemas/purchased.js';
import user from '../schemas/user.js';

const date: Date = new Date("2023-06-18T10:15:30+09:00");

// toLocaleString 사용 예제
const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZone: 'Asia/Seoul'
};
const dateString: string = date.toLocaleString('ko-KR', options);

console.log(dateString); // "2023. 06. 18. 오전 10:15:30"

// toISOString 사용 예제
//const dateISOString: string = date.toISOString();

//console.log(dateISOString); // "2023-06-18T01:15:30.000Z"


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
export const getPoint = async ( id : string ) =>{
    try{
        
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

function convertToCustomFormat(date: Date): string {
    console.log(`일단date: ${date}`);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'Asia/Seoul'
    };

    // 날짜 문자열로 변환
    const dateString: string = date.toLocaleString('ko-KR', options);
    console.log(`dateString: ${dateString}`);
    if (!dateString) {
        return ''; // dateString이 undefined 또는 빈 문자열일 경우 처리
    }

    // 날짜 부분 추출
    const parts: string[] = dateString.split('.');
    const formattedDate : string = `${parts[0]}.${parts[1]}.${parts[2]}`;
    //console.log(`결과값: ${formattedDate}`);
    return formattedDate;
}



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
        let result : any[] = [];
        for( let i = 0; i < productlist.length;i++){
            let info = {image : '', price: '',name : '', point: '', order_date: '', count: '', arrive_date: '', arrive_done: false};
            info.image = productlist[i].img;
            info.name = productlist[i].name.toString();
            info.price = productlist[i].price.toString();
            info.order_date = convertToCustomFormat(productlist[i].order_date);
            info.arrive_date = convertToCustomFormat(productlist[i].arrive_date);
            info.arrive_done = productlist[i].arrive_done;
            info.count = productlist[i].count.toString();
            result.push(info);
        }
        //console.log(result);
        
        // productlist의 각 요소를 변형하여 새로운 객체 배열 생성
        // const transformedProductList = productlist.map((item : any) => ({
        //     ...item,
        //     arrive_date3: convertToISODate(item.arrive_date)
        // }));

        // 변형된 객체 배열 출력
        //console.log(transformedProductList);
        
        
        return result;
    }catch(e){ console.log(e);}
}
getPurchasedHistory('memario').then(()=>{});

export const orderPoint = async (price : number, ID : string) => {
    try{
        const user = await User.findOne({ID: ID});
        if (user === undefined || user === null){
            console.log(`사용자 ${ID}를 찾을 수 없습니다.`);
            return
        }

        let beforepoint = user.POINT;
        let afterpoint = beforepoint - price;
        
        await User.updateOne({ ID: ID }, { $set: { POINT: afterpoint } });
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


