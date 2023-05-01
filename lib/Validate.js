class validate {
     userName(user) {
      if (!user.username || typeof user.username !== 'string') {
        throw new Error('User name must be a non-empty string');
      }
      return true;
    }
    userId(id) {
      if (!id || typeof id !== 'string') {
        throw new Error('User ID must be a non-empty string');
      }
      return true;
    }
  
    //  UserData(user) {
    //   if (!user.username || typeof user.username !== 'string') {
    //     throw new Error('User name must be a non-empty string');
    //   }
    //   return true;
    // }
  }
  
  module.exports = validate;
  