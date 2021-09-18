module.exports = class {
    constructor() {
        throw new Error(`Class Random cannot be initialized`)
    }

    /**
     * Случайный выбор элемента из массива
     * @param {Array} arr
     */
    static randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * Сгенерировать случайное число в указаном радиусе
     * @param {Number} min
     * @param {Number} max
     */
    static randomInt(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    /**
     * Сгенерировать случайную строку
     * @param {Number} length
     */
    static randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}
