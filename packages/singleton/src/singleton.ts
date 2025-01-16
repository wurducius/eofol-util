const Bluebird = require("bluebird")

export const setPromise = (nextPromise) => {
    return new Bluebird.Promise(() => nextPromise())
}

export const cancelPromise = (promise) => {
    if (promise) {
        promise.cancel()
    }
}
