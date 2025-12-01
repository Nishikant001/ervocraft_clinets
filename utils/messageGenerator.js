module.exports = function generateMessages(client) {
  
  // Client ko KYA zarurat ho sakti hai (your observation)
  const needs = (client.websiteNeeds || []).join(", ") || "a few digital improvements";

  const whatsapp = `Hello ${client.name}, 👋

I hope you're doing well. I have been following your ${client.businessType || "business"} for a while, and during that time, I noticed a few areas where your business could benefit — such as:
${needs}

I would be happy to help you with these requirements and provide professional solutions at a budget-friendly price to support your business growth.

If you're open to it, I’d love to share some ideas that could be helpful for you.

Looking forward to connecting! 😊`;


  const email = `Dear ${client.name},

I hope you're doing well. I have been observing your ${client.businessType || "business"}, and based on that, I noticed that your business could benefit from the following:
${needs}

I would be glad to assist you with these needs and provide high-quality digital solutions at a budget-friendly price to help your business grow more effectively.

If you're interested, I would be happy to discuss your requirements further and explore how we can work together.

Warm regards,
ErvoCraft Solution Private Limited`;

  return { whatsapp, email };
};
