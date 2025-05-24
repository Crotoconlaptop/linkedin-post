export async function handler(event) {
  const { idea, tipo } = JSON.parse(event.body);

  const res = await fetch("https://hook.eu2.make.com/2cb125wvo8pmc4vb2du3l2niopfwtq5y", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, tipo }),
  });

  return {
    statusCode: 200,
    body: "OK",
  };
}
