import * as lodash from 'lodash'

export class JsonUtils {
    /**
     * Method responsible for providing a function which replaces circular dependencies of an object
     *      Usually used as the second parameter for JSON.stringify()
     *
     * @static
     * @memberof JsonUtils
     */
    public static getCircularReplacer = () => {
        const seen = new WeakSet()
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return
                }
                seen.add(value)
            }
            return value
        }
    }

    public static stringify = (data: object) => {
        try {
            const dataStringified = JSON.stringify(data)
            return dataStringified
        } catch (error) {
            const dataStringified = JSON.stringify(data, JsonUtils.getCircularReplacer())
            return dataStringified
        }
    }

    public static cloneDeepObject<T>(obj: T): T {
        return lodash.cloneDeep(obj)
    }

    public static fromBufferToJson<T>(buffer: Buffer): T {
        return JSON.parse(buffer.toString())
    }
}
