export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const { idea, tipo } = req.body;

  try {
    const makeWebhookUrl = "https://hook.eu2.make.com/2cb125wvo8pmc4vb2du3l2niopfwtq5y";

    const respuesta = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, tipo }),
    });

    if (!respuesta.ok) {
      return res.status(respuesta.status).send("Error al enviar a Make");
    }

    return res.status(200).send("OK");
  } catch (error) {
    return res.status(500).send("Error interno del servidor");
  }
}
