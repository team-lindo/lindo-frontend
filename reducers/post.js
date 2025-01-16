
export const initialState = {
    mainPosts: [{
        id:1,
        User :{
            id:1,
            nickname:'설이'
        },
        
        content : '첫 번째 게시물이다냥 #츄르 #닭가슴살',
        Images: [
            { src: '/images/a.png' },
            { src: '/images/b.png' },
            { src: '/images/c.png' },


          ],
    Comments: [{
        User :{
            nickname:'까미'
        },
        content :"우와 신상 츄르야~!?"
    },{
        User :{
            nickname:'노랭이'
        },
        content :"나는 참치캔이 좋더라!^^"
    }]
    }],
    imagePaths: [],
    postAdded: false,
}

// 액션 이름
const ADD_POST ='ADD_POST';
export const addPost ={
 type:ADD_POST,
}

const dummyPost = {
    User :{
    id:1,
    nickname:'설이'
},
    Images :[],
    Comments: [],
};
const reducer = (state = initialState,action) =>{
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                //dummyPost를 맨 앞에 둬야 게시물을 맨 위에 뜸
                mainPosts :[dummyPost,...state.mainPosts],
                postAdded: true,
            }
        default: return state ;
    }
}
export default reducer;
