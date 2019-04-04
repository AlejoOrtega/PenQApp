import {UPDATE_DATA, UPDATE_BOSS_DATA, PENSION_TARGET, COORDINATES, CUARTO_TARGET, LOAD_CUARTOS} from './Types';


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
    }
}