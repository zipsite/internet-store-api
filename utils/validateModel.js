module.exports = validateModel = (struct, params) => {
    for (let key in struct) {
        if ((key in params)) {
            console.log(typeof params[key])
            console.log(struct[key].type)
            if (!((typeof params[key]) === struct[key].type)) {
                return {
                    error: true,
                    message: `parameter "${key}" is of the wrong type `
                }
            }
        } else {
            return {
                error: true,
                message: `object does not have this parameter: ${key}`
            }
        }
    }
    return {
        error: false,
        message: "valid!"
    }
}