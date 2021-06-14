const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}

// define table clumns and configuration 
User.init( 
    {
        // define an id column
        id: {
            // special sequelize DataTypes object prove what type of data it is
            type: DataTypes.INTEGER,
            // this is quivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        }, 
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any dulicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating table data
            validate: {
                isEmail: true
            }
        },
        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least four characters long
                len:[4]
            }
        }
    },
    {
        sequelize,
        // table configuration options go here

        // pass in our imported sequelize connection
        // dont automatically create createdAt.uodatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of database table
        freezeTableName: true,
        // use underscores instead of came-casing (i.e `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database 
        modelName: 'user'
    }
);

module.exports = User;