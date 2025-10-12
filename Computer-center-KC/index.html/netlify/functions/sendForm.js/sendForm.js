export async function handler(event, context) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQcUYmLVvIR269O0w-iL7mCHsgPbaBzuLpJyIGXetLWFNtI2hGSoYSrDt2O4Hb69kf/exec";

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: event.body,
      headers: { "Content-Type": "application/json" },
    });

    const text = await response.text();

    return {
      statusCode: 200,
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
