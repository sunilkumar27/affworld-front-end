// src/services/api/posts.service.js
/**
 * Posts service for handling post operations
 */
export class PostsService {
    constructor(client) {
      this.client = client;
      this.baseUrl = '/posts';
    }
  
    /**
     * Get all posts
     * @returns {Promise<Object>}
     */
    getAll() {
      return this.client.get(this.baseUrl);
    }
  
    /**
     * Create new post
     * @param {FormData} formData 
     * @returns {Promise<Object>}
     */
    async create(formData) {
      try {
        const response = await this.client.post(this.baseUrl, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
      }
    }
  
    /**
     * Delete post
     * @param {string} id 
     * @returns {Promise<Object>}
     */
    delete(id) {
      return this.client.delete(`${this.baseUrl}/${id}`);
    }
  }