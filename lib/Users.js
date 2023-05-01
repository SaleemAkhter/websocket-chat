const axios = require('axios');
const validate  = require('./validate')
const AxiosUsersErrorHandler = require('./ErrorHandlers/AxiosUsersErrorHandler');

class Users {
  constructor(sparkoInstance) {
    this.sparko = sparkoInstance;
    this.httpUrl = sparkoInstance.httpUrl; 
    this.axiosInstance = axios.create({
      baseURL: this.httpUrl,
    });
    this.validate =  new validate()
  }

  /**
   * Creates a new user with the specified data
   *
   * @param {object} userData The data for the new user
   * @returns {Promise<void>} A Promise that resolves when the user is created
   * @throws {Error} If there is an error sending the message
   */
  async create(userData) {
    try {
      this.validate.userName(userData);
      const response = await this.axiosInstance.post('/users', userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Reads the data for the user with the specified ID
   *
   * @param {string} userId The ID of the user to read
   * @returns {Promise<void>} A Promise that resolves when the user data is received
   * @throws {Error} If there is an error sending the message
   */
  async get(userId) {
    try {
      this.validate.userId(userId);
      const response = await this.axiosInstance.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
        AxiosUsersErrorHandler.handleAxiosError(error,userId);
    }
  }

  /**
   * Updates the data for the user with the specified ID
   *
   * @param {string} userId The ID of the user to update
   * @param {object} updatedUserData The updated data for the user
   * @returns {Promise<void>} A Promise that resolves when the user is updated
   * @throws {Error} If there is an error sending the message
   */
  async update(userId, updatedUserData) {
    try {
      const response = await this.axiosInstance.put(`/users/${userId}`, updatedUserData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user with ID ${userId}: ${error.message}`);
    }
  }

  /**
   * Deletes the user with the specified ID
   *
   * @param {string} userId The ID of the user to delete
   * @returns {Promise<void>} A Promise that resolves when the user is deleted
   * @throws {Error} If there is an error sending the message
   */
  async delete(userId) {
    try {
      const response =  await this.axiosInstance.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
        AxiosUsersErrorHandler.handleAxiosError(error,userId);
    }
  }
}

module.exports = Users;
