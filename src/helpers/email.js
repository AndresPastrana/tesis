const validateEmails = (emails = []) => {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const atLeastOneInvalid = emails.some((value) => !emailRegEx.test(value));
      console.log(atLeastOneInvalid);
    if (atLeastOneInvalid) return false;
    return true;
}


const getStringifyEmails = (emails = []) => {
    return emails.join(", ");
}

module.exports = {
    validateEmails,
    getStringifyEmails
}