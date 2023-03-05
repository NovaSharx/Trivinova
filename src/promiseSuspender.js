// Takes a fetch request promise as an arguement and wraps it.
export const promiseSuspender = (fetchRequest) => {

    const promiseWrapper = (promise) => {

        let status = 'pending' // Tracks the status of the promise.
        let result = '' // Stores to result of the promise.

        // The suspender represents the resolution of the promise and updates the 'status' variable by flagging either a success or an error.
        let suspender = promise.then(response => {
            status = 'success'
            result = response
        }, error => {
            status = 'error'
            result = error
        })

        // The suspender will return either the fetched data or an error once it has resolved the promise
        return {
            read() {
                // If the promise hasn't been initialized then trigger it.
                if (status === 'pending') {
                    throw suspender
                }
                // If the promise has flagged an error then send that error through.
                else if (status === 'error') {
                    throw result
                }

                // If the promise has been triggered and no error has occured then return the result!
                return result
            }
        }

    }

    return {
        result: promiseWrapper(fetchRequest)
    }
}