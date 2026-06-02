import {Collection, MongoClient} from "mongodb";
import {SETTINGS} from "../core/settings/settings";
import {BlogT, PostT} from "../core/type/db.type";

const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';



export let client : MongoClient
export let blogsCollection: Collection<BlogT>
export let postsCollection: Collection<PostT>

export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db = client.db(SETTINGS.DB_NAME)

    blogsCollection = db.collection(BLOGS_COLLECTION_NAME)
    postsCollection = db.collection(POSTS_COLLECTION_NAME)

    try {
        await client.connect();
        await db.command({ping: 1})
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw new Error('MongoDB connection failed');
    }
}




export async function stopDb() {
    if(!client) {
        throw new Error('No active client DB')
    }
    await  client.close();
}