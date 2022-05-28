const responseModel = (success, errorCode, errorMessage, data, extParams) => {
    return {
        "success" : success,
        "errorCode": errorCode,
        "errorMessage": errorMessage,
        "data": data,
        "extParams": extParams
    }
}

exports.success = (data, extParams) => {
    return responseModel(true, null, null, data, extParams)
}

exports.error = (errorCode, errorMessage, data, extParams) => {
    return responseModel(false, errorCode, errorMessage, data, extParams)
}
