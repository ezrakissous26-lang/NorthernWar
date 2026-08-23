import { map } from "../data/map.js";
import { client } from "../db/connect.js";

const dbNorthernWar = client.db('NorthernWar')
const collectionMap = dbNorthernWar.collection('map')

async function create(data) {
    try {
        const result = await collectionMap.insertOne(data)
        console.log(result)
        return result  
    } catch (error) {
        console.error('Error :', error.message)
    }
}

await create(map)