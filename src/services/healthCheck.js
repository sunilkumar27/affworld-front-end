// src/services/healthCheck.js
import axios from 'axios';

class HealthCheckService {
  constructor() {
    this.interval = null;
    this.INTERVAL_TIME = 840000; // 14 minutes in milliseconds
  }

  startHealthCheck() {
    // Perform initial check
    this.performHealthCheck();
    
    // Set up recurring check
    this.interval = setInterval(() => {
      this.performHealthCheck();
    }, this.INTERVAL_TIME);
  }

  async performHealthCheck() {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/health`);
      console.log('Server health check: OK');
    } catch (error) {
      console.log('Server health check: Waking up...');
    }
  }

  stopHealthCheck() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

export const healthCheckService = new HealthCheckService();