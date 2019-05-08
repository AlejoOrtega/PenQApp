import {UPDATE_DATA, UPDATE_BOSS_DATA,PENSION_TARGET, COORDINATES, CUARTO_TARGET, LOAD_CUARTOS, ENGINE, LOAD_COMENTS, PICTURE1, PICTURE2, PICTURE3, PICS, PICSROOM} from './Types';

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

function engineResults(list){
    return{
        type: ENGINE, payload:list,
    }
}

function loadComents(list){
    return{
        type: LOAD_COMENTS, payload: list,
    }
}
function picture1(pic){
    return{
        type: PICTURE1, payload: pic,
    }
}
function picture2(pic){
    return{
        type: PICTURE2, payload: pic,
    }
}
function picture3(pic){
    return{
        type: PICTURE3, payload: pic,
    }
}
function pics(pic){
    return{
        type: PICS, payload: pic,
    }
}
function picsroom(pic){
    return{
        type: PICSROOM, payload: pic,
    }
}

const actionsCreator = {
    updateData,
    updateDataBoss,
    pensionTarget,
    coordinates,
    cuartoTarget,
    loadCuartos,
    engineResults,
    loadComents,
    picture1,
    picture2,
    picture3,
    pics,
    picsroom
};

export {actionsCreator};