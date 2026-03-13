import Replicate from "replicate";
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
export async function POST(request) {
  const { prompt } = await request.json();
  const prediction = await replicate.predictions.create({
    model: "minimax/video-01",
    input: { prompt: prompt },
  });
  return Response.json(prediction, { status: 201 });
}
```

Luego clic en **"Commit changes"** → clic en **"Commit changes"** de nuevo.

---

## 🟢 SEGUNDO — Pega esto en tu navegador:
```
https://github.com/danyelrodri5552-afk/mi-generador-video/edit/main/app/page.js
