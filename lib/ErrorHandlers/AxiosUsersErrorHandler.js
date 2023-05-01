class AxiosErrorHandler {
    static handleAxiosError(error, userId) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw new Error('Bad request');
          case 401:
            throw new Error('Unauthorized');
          case 403:
            throw new Error('Forbidden');
          case 404:
            throw new Error(`${userId} User Not Exist With This ID`);
          case 500:
            throw new Error('Internal server error');
          default:
            throw new Error('Unknown error occurred');
        }
      } else if (error.request) {
        throw new Error('Request failed');
      } else {
        throw new Error(error+' Unknown error occurred');
      }
    }
  }
  
  module.exports = AxiosErrorHandler;
  