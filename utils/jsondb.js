const fs = require("fs");
const path = require("path");

module.exports = class JsonDb {
    constructor(tableName) {

        this.tableFile = path.join(rundir, "jsondb", `${tableName}.json`)
    }

    all() {
        return JSON.parse(fs.readFileSync(this.tableFile, 'utf8'));
    }

    find(id) {
        let items = JSON.parse(fs.readFileSync(this.tableFile, 'utf8'));
        for (let i = 0; i < items.length; i++) {
            
            if (items[i].id == id) {
                return items[i];
            }
        }
        return { "error": "not found" }
    }

    where(field, value) {
        let items = JSON.parse(fs.readFileSync(this.tableFile, 'utf8'));
        for (let item of items) {
            if (item[field] == value) {
                return item
            }
        }
        return { "error": "not found" }
    }

    create(item) {
        let items = JSON.parse(fs.readFileSync(this.tableFile, 'utf8'));

        let id = 0;
        for (let i = 0; i < items.length; i++) {
            id = id > items[i].id ? id : items[i].id;
        }

        item.id = id + 1;

        items.push(item);

        fs.writeFileSync(this.tableFile, JSON.stringify(items));
        return item;
    }

    update(id, arrParams) {
        let items = JSON.parse(fs.readFileSync(this.tableFile, 'utf8'));

        let item;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                item = items[i];
                break;
            }
        }
        if (item) {
            for (let key in arrParams) {
                item[key] = arrParams[key];
            }
            fs.writeFileSync(this.tableFile, JSON.stringify(items));
        }
        return item
    }

    delete(id) {
        let items = JSON.parse(fs.readFileSync(this.tableFile, 'utf8'));

        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            let item = items.splice(index, 1)[0];
            fs.writeFileSync(this.tableFile, JSON.stringify(items));
            return item
        }
    }

}