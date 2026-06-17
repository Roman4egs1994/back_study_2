import {ObjectId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";
import {BlogDBT} from "../types/blog.type";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found";
import {BlogQueryInput} from "../routing/inputs";
import {skipPagination} from "../../core/utils/skipPagination";


export const blogRepository = {

    async findMany(queryDto: BlogQueryInput): Promise<{ items: BlogDBT[]; totalCount: number }> {
        const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } = queryDto;

        const filter: any = {};
        if (searchNameTerm) {
            filter.name = { $regex: searchNameTerm, $options: 'i' };
        }

        const skip = skipPagination(pageNumber, pageSize)

        const items = await blogsCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogsCollection.countDocuments(filter);

        return { items, totalCount };
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
