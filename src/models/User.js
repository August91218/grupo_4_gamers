const fs = require('fs');

const User = {
    //crear el usuario a partir de su informacion
    fileName: './src/data/users.json',

    obtenerDatos: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id+1;
        }
        return 1;
    },

    findAll: function(){
        return this.obtenerDatos();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find((usuario) =>{
            return usuario.id === id;
        });
        return userFound;
    },
    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find((usuarios) =>{
            return usuarios[field] === text;
        });
        return userFound;
    },

    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ''));
        return newUser;
    },
    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(user => user.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ''));
    }
}
module.exports = User; 