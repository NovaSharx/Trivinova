// Takes a promise as an arguement and wraps it so that a suspender is thrown while data loads for better feedback.
export const promiseSuspender = (fetchRequest) => {

    const promiseWrapper = (promise) => {

        let status = 'pending' // Tracks the status of the promise.
        let result = '' // Stores the result of the promise.

        // The suspender represents the resolution state of the promise and updates the 'status' variable by flagging either success or error.
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

                // If the promise has been triggered and no error has occured (status === 'success') then return the result.
                return result
            }
        }

    }

    return {
        result: promiseWrapper(fetchRequest)
    }
}