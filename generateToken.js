const crypto = require('crypto');

const clientOptions = {
    cypher: 'AES-256-CBC',
    key: 'MySuperSecretKeyForParamsToken12'
}

 const encrypt = (value = '') => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(clientOptions.cypher, clientOptions.key, iv);

    let crypted = cipher.update(JSON.stringify(value), 'utf8', 'base64');
    crypted += cipher.final('base64');

    const data = {
        iv: iv.toString('base64'),
        value: crypted
    };

    return new Buffer(JSON.stringify(data)).toString('base64');
};

module.exports = { encrypt };