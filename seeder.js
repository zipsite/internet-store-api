const gen = require('@faker-js/faker');
const path = require('path')
rundir = path.join(__dirname)
const Book = new (require("./models/Book.js"))();


const faker = gen.faker;

faker.locale = 'ru';

for(let i = 0; i < 10; i++) {
    Book.create({
        id: i,
        name: faker.music.songName(),
        author: faker.name.fullName(),
        year: faker.date.past().getFullYear()
    })
}