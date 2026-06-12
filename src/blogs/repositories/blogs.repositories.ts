import {ObjectId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";
import {mapToBlogs} from "../utils/mapToBlogs";
import {BlogDBT, BlogModelT} from "../types/blog.type";


export const blogRepository = {

   async sendAllBlogs ():Promise<BlogModelT[]> {
       const blogs = await blogsCollection.find().toArray()
       return blogs.map(mapToBlogs)
    },

   async createBlog (blog: Omit<BlogDBT, '_id'>):Promise<BlogModelT> {
       const insertResult = await blogsCollection.insertOne(blog as BlogDBT)
       return mapToBlogs({_id: insertResult.insertedId, ...blog})
    },

   async getById (id: string):Promise<BlogModelT | null> {
       const blog = await blogsCollection.findOne({ _id: new ObjectId(id) })
       return blog ? mapToBlogs(blog) : null
    },

  async update(id: string, dto: Omit<BlogDBT, '_id' | 'createdAt' | 'isMembership'>): Promise<BlogModelT> {
       const updateResult = await blogsCollection.updateOne(
           { _id: new ObjectId(id) },
           { $set: dto }
       )

      if (!updateResult.matchedCount) {
        throw new Error('Blog not found')
      }

      const updated = await blogsCollection.findOne({ _id: new ObjectId(id) })
      return mapToBlogs(updated!)
    },

    async delete(id: string): Promise<void> {
      await blogsCollection.deleteOne({ _id: new ObjectId(id) })
    }

}

