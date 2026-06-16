import {blogRepository} from "../../repositories/blogs.repositories";
import {BlogDBT, BlogQueryResponse} from "../../types/blog.type";
import {postRepository} from "../../../posts/repositoties/posts.repositories";
import {BlogQueryInput} from "../../routing/inputs";
import {mapToBlogsQueryResponse} from "../../utils/mapToBlogs";



export const blogsService = {
  createBlogService: async (dto: Pick<BlogDBT, 'name' | 'description' | 'websiteUrl'>) : Promise<BlogDBT> => {

      const newBlog: Omit<BlogDBT, '_id'> = {
          ...dto,
          isMembership: false,
          createdAt: new Date().toISOString(),
      }

      return await blogRepository.createBlog(newBlog)
  },

  updateBlogService: async (id: string, dto: Omit<BlogDBT, '_id' | 'createdAt' | 'isMembership'>) : Promise<BlogDBT> => {
      await blogRepository.findByIdBlogOrFail(id)
      const updated = await blogRepository.update(id, dto)
      await postRepository.updateBlogName(id, dto.name)
      return updated
  },

  findArrayBlogsService: async (queryDto: BlogQueryInput): Promise<BlogQueryResponse> => {
      const { items, totalCount } = await blogRepository.findMany(queryDto)
      return mapToBlogsQueryResponse(items, totalCount, queryDto)
  },

}
