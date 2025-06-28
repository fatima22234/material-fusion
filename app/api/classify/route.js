export async function POST(req) {
  const { image } = await req.json();

  const API_KEY = process.env.ROBOFLOW_API_KEY;
  const WORKSPACE = process.env.WORKSPACE;
  const WORKFLOW_ID = process.env.WORKFLOW_ID;
  const API_URL = `https://serverless.roboflow.com/infer/workflows/${WORKSPACE}/${WORKFLOW_ID}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: API_KEY,
        inputs: {
          image: {
            type: "base64",
            value: image
          }
        }
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.log("KEY:", process.env.ROBOFLOW_API_KEY);
console.log("WORKSPACE:", process.env.WORKSPACE);
console.log("WORKFLOW_ID:", process.env.WORKFLOW_ID);   
    console.error("Error from Roboflow API:", err);
    return new Response("Error calling Roboflow API", { status: 500 });
  }
}
