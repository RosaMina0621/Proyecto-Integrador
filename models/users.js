const fs = require('fs');
const path = require('path');

const model = {
    route: '../data/users.json',

    findAll: function () {
        const usersJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');

        const users = JSON.parse(usersJSON);

        return users;
    },

    create: function (newUsers) {
        let users = this.findAll();

        newUsers.id = users[users.length - 1].id + 1;

        users.push(newUsers);

        const usersJSON = JSON.stringify(users);

        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);
    },

    findById: function (id) {
        const users = this.findAll();

        let user = users.find(user => user.id === id);

        if(!user){
            user = null;
        }

        return user; 
    },
    deleteById: function (id) {

        let users = this.findAll();

        users = users.filter(user => user.id !== id);

        const usersJSON = JSON.stringify(users, null, " ");

        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

        return users;
    },
};

module.exports = model;