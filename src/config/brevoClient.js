const SibApiV3Sdk = require('sib-api-v3-sdk');

const brevoClient = () => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY; // set in .env
  return new SibApiV3Sdk.TransactionalEmailsApi();
};

module.exports = brevoClient;
