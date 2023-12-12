module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        },
        preview: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        category: {
            type: dataTypes.STRING
        },
        discount: {
            type: dataTypes.INTEGER
        }
        
    };
    let config = {
        tableName: "products",
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config);

    return Product;
}