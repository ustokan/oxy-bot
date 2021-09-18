module.exports = class {
    constructor(name, options = {}) {
        this.name = name;
        this.event = options.event || null;
    }
}