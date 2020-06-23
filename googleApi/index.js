const generateGoogleToken = require('./generateGoogleToken');
const Gmail 			  = require('./Gmail');
const googleVerify 		  = require('./googleVerify');

const generateQuickToken  = require('./generateQuickToken'); // for quick email sending...

module.exports = { generateGoogleToken, googleVerify, Gmail, generateQuickToken};
