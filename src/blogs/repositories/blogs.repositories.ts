import {BlogT} from "../../core/type/db.type";
import {ObjectId, WithId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";
import {mapToBlogs} from "../utils/mapToBlogs";
import {BlogModelT} from "../types/blog.type";


export const blogRepository = {

   async sendAllBlogs ():Promise<BlogModelT[]> {
       const blogs = await blogsCollection.find().toArray()
       return blogs.map(mapToBlogs)
    },

   async createBlog (blog: BlogT):Promise<WithId<BlogT>> {
       const insertResult = await blogsCollection.insertOne(blog)
       return mapToBlogs({_id: insertResult.insertedId, ...blog})
    },

   async getById (id: string):Promise<BlogModelT> {
       const blog = await blogsCollection.findOne({ _id: new ObjectId(id) })
       if (!blog) {
         throw new Error('Blog not found')
       }
       return mapToBlogs(blog)
    },

  async update(id: string, dto: Omit<BlogT, 'createdAt' | 'isMembership'>): Promise<BlogModelT> {
       const updateResult = await
           blogsCollection.updateOne({ _id: new ObjectId(id) },
               { $set: dto })

      if (!updateResult.matchedCount) {
        throw new Error('Blog not found')
      }

      return await mapToBlogs(blogsCollection.findOne({ _id: new ObjectId(id) }))
    },
    async delete  (id: string): Promise<void> {
      return  await blogsCollection.deleteOne({ _id: new ObjectId(id) })
    }

}

