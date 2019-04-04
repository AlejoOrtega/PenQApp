import {UPDATE_DATA, UPDATE_BOSS_DATA,PENSION_TARGET, COORDINATES, CUARTO_TARGET, LOAD_CUARTOS} from './Types';

function updateData(data){
    return {
        type: UPDATE_DATA, payload: data,
    };
}

function updateDataBoss(data){
    return{
        type: UPDATE_BOSS_DATA, payload:data,
    };
}

function pensionTarget(target){
    return{
        type: PENSION_TARGET, payload: target,
    }
}

function loadCuartos(data){
    return{
        type:LOAD_CUARTOS, payload: data,
    }
}

function cuartoTarget(target){
    return{
        type: CUARTO_TARGET, payload: target,
    };
}

function coordinates(coor){
    return{
        type: COORDINATES, payload: coor,
    };
}

const actionsCreator = {
    updateData,
    updateDataBoss,
    pensionTarget,
    coordinates,
    cuartoTarget,
    loadCuartos
};

export {actionsCreator};