// src/services/api/tasks.service.js

/**
 * Tasks service for handling task operations
 */
export class TasksService {
    constructor(client) {
      this.client = client;
      this.baseUrl = '/tasks';
    }
  
    /**
     * Get all tasks
     * @returns {Promise<Object>}
     */
    getAll() {
      return this.client.get(this.baseUrl);
    }
  
    /**
     * Create new task
     * @param {TaskData} taskData 
     * @returns {Promise<Object>}
     */
    create(taskData) {
      return this.client.post(this.baseUrl, taskData);
    }
  
    /**
     * Update task status
     * @param {string} id 
     * @param {string} status 
     * @returns {Promise<Object>}
     */
    updateStatus(id, status) {
      return this.client.patch(`${this.baseUrl}/${id}/status`, { status });
    }
  
    /**
     * Delete task
     * @param {string} id 
     * @returns {Promise<Object>}
     */
    delete(id) {
      return this.client.delete(`${this.baseUrl}/${id}`);
    }
  }