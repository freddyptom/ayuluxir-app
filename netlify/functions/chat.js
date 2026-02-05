/**
 * Netlify serverless function: chat
 * Reply to visitor messages using OpenAI, or a static reply if no API key is set.
 * Set OPENAI_API_KEY in Netlify Environment variables to enable AI replies.
 */

const SYSTEM_PROMPT = `You are a helpful assistant for Ayuluxir Wellness Clinic. Ayuluxir offers holistic wellness and Ayurveda-inspired treatments in Birmingham, UK (Wylde Green, B23 5TN). Services include: signature massage, Nasya therapy, Indian head massage, deep tissue massage, lymphatic drainage, reflexology, facials (signature, pigmentation, hydration), wellness packages (signature wellness, purity detox, antioxidant therapy, immune booster, vitamin booster). They often have offers (e.g. 20% off). Contact: phone +44 7345 409977, email info@ayuluxir.co.uk, WhatsApp for bookings. Be warm, concise, and encourage bookings or enquiries. If unsure, suggest they call or WhatsApp.`;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async function (event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ reply: 'Method not allowed' }) };
  }

  let message = '';
  try {
    const body = JSON.parse(event.body || '{}');
    message = (body.message || '').trim();
  } catch (_) {
    return { statusCode: 400, headers, body: JSON.stringify({ reply: 'Invalid request' }) };
  }

  if (!message) {
    return { statusCode: 400, headers, body: JSON.stringify({ reply: 'Please type a message.' }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('OpenAI error:', res.status, err);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            reply: "We're having a small hiccup. Please WhatsApp us at +44 7345 409977 or call—we'd love to help!",
          }),
        };
      }

      const data = await res.json();
      const reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
      return { statusCode: 200, headers, body: JSON.stringify({ reply: reply.trim() }) };
    } catch (err) {
      console.error('Chat function error:', err);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          reply: "Something went wrong on our side. Please WhatsApp +44 7345 409977 or email info@ayuluxir.co.uk—we're here to help!",
        }),
      };
    }
  }

  // No API key: return a short static reply
  const fallback = "Thanks for your message! For bookings and questions, the quickest way to reach us is WhatsApp (+44 7345 409977) or call. You can also email info@ayuluxir.co.uk. We'd love to help you with our wellness services.";
  return { statusCode: 200, headers, body: JSON.stringify({ reply: fallback }) };
};
