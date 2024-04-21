// models/User.js
import fs from 'fs';
import path from 'path';

const p = path.join(path.dirname(process.mainModule.filename), 'static', 'json-file', 'users.json');

const getUsersFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

export class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    save() {
        getUsersFromFile(users => {
            users.push(this);
            fs.writeFile(p, JSON.stringify(users, null, 2), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getUsersFromFile(cb);
    }
}
