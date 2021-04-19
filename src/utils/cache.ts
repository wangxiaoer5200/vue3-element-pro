/**
 * cache: () => {}
 * setCacheItem
 * getCacheItem
 * removeCacheItem
 * clear
 */

const isUndefine = (str: unknown) => typeof str === 'undefined'
export const Cache = (() => {
    const cacheData = new Map() // datas
    return {
        setCacheItem: (key: unknown, value: unknown) => {
            if (isUndefine(key)) {
                throw `cache not set ${key}`
            }
            return cacheData.set(key, value)
        },
        getCacheItem: (key: unknown) => {
            if (isUndefine(key) && !cacheData.has(key)) {
                throw `cache not find ${key}`
            }
            return cacheData.get(key)
        },
        removeCacheItem: (key: unknown) => {
            if (isUndefine(key) && cacheData.has(key)) {
                cacheData.delete(key)
            }
        },
        clear: () => {
            cacheData.clear()
        }   
    }
})()