const generateLocationMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
} 

module.exports = {
    generateMessage, generateLocationMessage
}