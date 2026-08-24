import { map } from "../data/map.js";
import { client } from "../db/connect.js";

const dbNorthernWar = client.db('NorthernWar')
const collectionMap = dbNorthernWar.collection('map')


export async function checkIfMapExist() {
    try {
        const result = await collectionMap.countDocuments();
        console.log(result)
        return result > 0;
    } catch (error) {
        console.error('Error :', error.message)
        const err = new Error(error.message);
        err.status = 500;
        throw err
    }
}

export async function createMap(data) {
    try {
        const result = await collectionMap.insertMany(data)
        console.log(result)
        return result  
    } catch (error) {
        console.error('Error :', error.message)
        const err = new Error(error.message);
        err.status = 500;
        throw err
    }
}

export async function getAllTerritories() {
    try {
        const territories = await collectionMap.find({}, { projection: { _id: 0 } }).toArray();
        console.log(territories)
        return territories
    } catch (error) {
        console.error('Error :', error.message)
        const err = new Error(error.message);
        err.status = 500;
        throw err
    }
}

export async function updateTerritoryById(id) {
    try {
        const result = await collectionMap.updateOne({id: id},{ $set: {soldier: +3}})
        console.log(result)
        return result
    } catch (error) {
        console.error('Error :', error.message)
        const err = new Error(error.message);
        err.status = 500;
        throw err
    }
}

export async function updateSoldierAndOwner(id, soldiers, owner) {
    try {
        const result = await collectionMap.updateMany({id: id}, { $set: {soldiers, owner}})
        console.log(result)
        return result
    } catch (error) {
        console.error('Error :', error.message)
        const err = new Error(error.message);
        err.status = 500;
        throw err
    }
}

// await updateSoldierAndOwner(21, 50, 'banana')