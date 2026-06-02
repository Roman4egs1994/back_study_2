
import { BlogT} from "../../core/type/db.type";
import {WithId, ObjectId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";


export const blogRepository = {

   async sendAllBlogs ():Promise<WithId<BlogT>[]> {
      return await blogsCollection.find().toArray()
    },

   async createBlog (blog: BlogT):Promise<WithId<BlogT>> {
      const insertResult = await blogsCollection.insertOne(blog)
      return {...blog, _id: insertResult.insertedId}
    },

   async getById (id: string):Promise<WithId<BlogT>> {
       const blog = await blogsCollection.findOne({ _id: new ObjectId(id) })
       return blog as WithId<BlogT>
    },

  async update(id: string, dto: Omit<BlogT, 'createdAt' | 'isMembership'>): Promise<WithId<BlogT>> {
       const updateResult = await
           blogsCollection.updateOne({ _id: new ObjectId(id) },
               { $set: dto })

      if (!updateResult.matchedCount) {
        throw new Error('Blog not found')
      }

      return await blogsCollection.findOne({ _id: new ObjectId(id) }) as WithId<BlogT>
    },
    async delete  (id: string): Promise<void> {
       await blogsCollection.deleteOne({ _id: new ObjectId(id) })
    }

}

