import {UPDATE_DATA, UPDATE_BOSS_DATA, PENSION_TARGET, COORDINATES, CUARTO_TARGET, LOAD_CUARTOS, ENGINE, LOAD_COMENTS, PICTURE1, PICTURE2, PICTURE3, PICS, PICSROOM, BEST} from './Types';


const initialState ={};

export default Reducer= (state=initialState, action)=>{
    const{type, payload} = action;
    switch(type){
        case UPDATE_DATA:
            return{
                ...state,
                user: payload
            };
        break;
        case UPDATE_BOSS_DATA:
            return{
                ...state,
                pensiones: payload,
            };
        break;
        case PENSION_TARGET:
            return{
                ...state,
                target: payload,
            };
        break;
        case COORDINATES:
            return{
                ...state,
                coordinates: payload,
            }
        break;
        case CUARTO_TARGET:
            return{
                ...state,
                cuartoTarget: payload,
            }
        break;
        case LOAD_CUARTOS:
            return{
                ...state,
                cuartos: payload,
            }
        break;
        case ENGINE:
            return{
                ...state,
                list: payload,
            }
        case LOAD_COMENTS:
            return{
                ...state,
                coments:payload,
            }
        case PICTURE1:
            return{
                ...state,
                picture1:payload,
            }
        case PICTURE2:
            return{
                ...state,
                picture2:payload,
            }
        case PICTURE3:
            return{
                ...state,
                picture3:payload,
            }
        case PICS:
            return{
                ...state,
                pics:payload,
            }
        case PICSROOM:
            return{
                ...state,
                picsroom: payload
            }
        case BEST:
            return{
                ...state,
                best: payload
            }
    }
}