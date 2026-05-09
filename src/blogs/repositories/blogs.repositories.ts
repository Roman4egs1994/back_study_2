import {db_blogs} from "../../db/db";
import {BlogT} from "../../core/type/db.type";


export const blogRepository = {

    sendAllBlogs: () => {
      return db_blogs
    },

    createBlog: (blog: BlogT) => {
      db_blogs.push(blog)
    },

    getById: (id: string) => {
      return db_blogs.find(blog => blog.id === id)
    },

    update: (blog:BlogT,dto: BlogT) => {
       blog.name = dto.name
       blog.description = dto.description
       blog.websiteUrl = dto.websiteUrl
       return blog
    },
    delete : (id: string) => {
      db_blogs.splice(db_blogs.findIndex(blog => blog.id === id), 1)
    }

}

