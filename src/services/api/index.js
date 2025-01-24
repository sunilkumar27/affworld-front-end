// src/services/api/index.js
import { createAPIClient } from './client';
import { AuthService } from './auth.service';
import { TasksService } from './tasks.service';
import { PostsService } from './posts.service';

const client = createAPIClient();

/**
 * Centralized API services with shared HTTP client
 */
export const services = {
  auth: new AuthService(client),
  tasks: new TasksService(client),
  posts: new PostsService(client)
};

export default services;