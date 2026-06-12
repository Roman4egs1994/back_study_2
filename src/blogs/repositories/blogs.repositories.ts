import {ObjectId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";
import {mapToBlogs} from "../utils/mapToBlogs";
import {BlogDBT, BlogModelT} from "../types/blog.type";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found";


export const blogRepository = {

   async sendAllBlogs ():Promise<BlogDBT[]> {
       const blogs = await blogsCollection.find().toArray()
       return blogs
    },

   async createBlog (blog: Omit<BlogDBT, '_id'>):Promise<BlogDBT> {
       const insertResult = await blogsCollection.insertOne(blog as BlogDBT)
       return {_id: insertResult.insertedId, ...blog}
    },

   async findByIdBlogOrFail (id: string):Promise<BlogDBT> {
       const blog = await blogsCollection.findOne({ _id: new ObjectId(id) })
       if(!blog) {
           throw new RepositoryNotFoundError("Blog not found")
       }
       return blog
    },

  async update(id: string, dto: Omit<BlogDBT, '_id' | 'createdAt' | 'isMembership'>): Promise<BlogDBT> {
       const updateResult = await blogsCollection.updateOne(
           { _id: new ObjectId(id) },
           { $set: dto }
       )

      if (!updateResult.matchedCount) {
        throw new Error('Blog not found')
      }

      const updated = await blogsCollection.findOne({ _id: new ObjectId(id) })
      return updated!
    },

    async delete(id: string): Promise<void> {
      await blogsCollection.deleteOne({ _id: new ObjectId(id) })
    }

}

