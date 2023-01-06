
module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("country", {
        country_id: {
            type: Sequelize.STRING,
            allowNull: false,               
            unique: true,
            primaryKey: true
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,            
        }
    },{        
        tableName: 'country',
        createdAt: false,
        updatedAt: false,
    });

    return Country;

}