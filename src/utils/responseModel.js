// Common response

/**
 * @param {import('express').Response} res
 */

module.exports = (res, status, payload) => {
    return res.json({
        status: status,
        results: payload
    })
}

