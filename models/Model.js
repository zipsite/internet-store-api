const JsonDb = require("../utils/jsondb.js")
const validateModel = require("../utils/validateModel.js")

module.exports = class Model{
    table = (this.constructor.name).toLowerCase() + 's'
    struct = {}
    constructor() {
        this.db = new JsonDb(this.table)
    }
    all() {
        return this.db.all();
    }
    find(id) {
        return this.db.find(id)
    }
    where(field, value) {
        return this.db.where(field, value)
    }
    create(arrParams) {
        let result = validateModel(this.struct, arrParams);
        if (result.error == true) {
            return result;
        }
        return this.db.create(arrParams);
    }
    update(id, arrParams) {
        let result = validateModel(this.struct, arrParams);
        if (result.error == true) {
            return result;
        }
        return this.db.update(id, arrParams)
    }
    delete(id) {
        return this.db.delete(id)
    }
}