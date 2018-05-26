import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 2000],
          msg: 'Please enter a password with at least 6 characters'
        }
      }
    }
  }, {
    hooks: {
      afterValidate: (user) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 8)
        }
      }
    }
  });
  
  User.associate = function(/*models*/) {
    
  };
  
  User.verifyPassword = (password, hashedPassword) => bcrypt.compareAsync(password, hashedPassword)

  User.verifyLogin = async (username, password) => {
    let user = await User.getUser(username)
    
    if (!user) {
      throw new Error('username does not exist')
    }

    const isMatch = await User.verifyPassword(password, user.password)

    if (!isMatch) {
      throw new Error('password is incorrect')
    }
    
    delete user.password
    return user
  }

  return User
}
