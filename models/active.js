module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Activity;
   };