import {Collection, MongoClient} from "mongodb";
import {SETTINGS} from "../core/settings/settings";
import {BlogDBT} from "../blogs/types/blog.type";
import {PostBDType} from "../posts/types/posts.type";
import {UserDBT} from "../user/types/user.type";

const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';
const USERS_COLLECTION_NAME = 'users';




export let client : MongoClient
export let blogsCollection: Collection<BlogDBT>
export let postsCollection: Collection<PostBDType>
export let usersCollection: Collection<UserDBT>

export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db = client.db(SETTINGS.DB_NAME)

    blogsCollection = db.collection(BLOGS_COLLECTION_NAME)
    postsCollection = db.collection(POSTS_COLLECTION_NAME)
    usersCollection = db.collection(USERS_COLLECTION_NAME)
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