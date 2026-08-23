import { MongoClient } from 'mongodb'
import dotenv from 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI

export const client = new MongoClient(MONGO_URI)

export async function clientConnect() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error :', error.message)
    }
}