function writeResult(status, success, data) {
    return JSON.stringify({status: status, success: success, data: data})
}

module.exports.writeResult = writeResult;