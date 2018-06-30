'use strict'

const Post = use('App/Models/Post')
const { validateAll } = use('Validator')

class PostController {
  /**
   * Fetch all posts inside our database.
   *
   * ref: http://adonisjs.com/docs/4.1/lucid#_all
   */
  async index ({ view }) {
    const posts = await Post.all()
    return view.render('posts.index', { posts: posts.toJSON() })
  }

  //=========================
  // Create
  create ({ view }) {
    return view.render('posts.create')
  }

  //=========================
  // Store
  async store ({ session, request, response }) {

    const data = request.only(['title', 'body'])

    const validation = await validateAll(data, {
      title: 'required',
      body: 'required',
    })

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    await Post.create(data)

    return response.redirect('/')
  }

  //=========================
  // Show a post's body
  async show ({ params, view }) {
    const post = await Post.findOrFail(params.id)
    return view.render('posts.show', { post: post.toJSON() })
  }

  //=========================
  // Edit a post
  async edit ({ params, view }) {
    const post = await Post.findOrFail(params.id)
    return view.render('posts.edit', { post: post.toJSON() })
  }

  //=========================
  // Update a post
  async update ({ params, session, request, response }) {
  
    const data = request.only(['title', 'body'])

    const validation = await validateAll(data, {
      title: 'required',
      body: 'required',
    })

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const post = await Post.findOrFail(params.id)

    post.merge(data)
    await post.save()

    return response.redirect('/')
  }

  //=========================
  // Delete a post
  async delete ({ params, response }) {
    /**
     * Finding the post and deleting it
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_deletes
     */
    const post = await Post.findOrFail(params.id)
    await post.delete()

    return response.redirect('/')
  }
}

module.exports = PostController
