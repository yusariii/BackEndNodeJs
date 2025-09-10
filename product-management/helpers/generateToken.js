module.exports.generateToken = (length) => {
    const characters = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789"
    let token = ''
    for (let i = 0; i < length; i++){
        token += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return token
}