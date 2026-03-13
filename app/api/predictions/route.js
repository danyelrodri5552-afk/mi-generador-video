import Replicate from "replicate";
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
export async function POST(request) {
  const { prompt } = await request.json();
  const prediction = await replicate.predictions.create({
    model: "kwaivgi/kling-v1-5-pro",
    input: {
      prompt: prompt,
      duration: 10,
      aspect_ratio: "16:9",
    },
  });
  return Response.json(prediction, { status: 201 });
}
