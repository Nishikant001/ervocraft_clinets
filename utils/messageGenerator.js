// export default function generateMessages(client) {
module.exports = function generateMessages(client) {
  const needs = (client.websiteNeeds || []).join(", ") || "Not specified";

 const whatsapp = `Hello ${client.name}, 👋

I hope you're doing well. I came across your business and noticed that you're running a ${client.businessType || "business"}.

I would love to help you grow your business by providing professional services such as Website Development, App Development, Branding, and Digital Support.

If you're open to it, I'd be happy to share ideas that can benefit your business.

Looking forward to connecting! 😊`;


const email = `Dear ${client.name},

I hope you are doing well. I recently came across your business and was impressed by what you do in the ${client.businessType || "industry"}.

I would like to offer my support in helping your business grow through services like Website Development,App Development, Branding, and Digital Solutions. These can help improve your online presence and attract more customers.

If you're interested, I would be glad to discuss how we can work together.

Warm regards,
ErvoCraft Solution Private Limited`;


  return { whatsapp, email };
};
