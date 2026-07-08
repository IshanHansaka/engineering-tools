import Anthropic from "@anthropic-ai/sdk";

function safeParse(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Invalid JSON");

  return JSON.parse(match[0]);
}

export async function routeIntent(
  anthropic: Anthropic,
  input: string
) {
  const res = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 150,
    temperature: 0,

    system: `
You are a routing assistant.

Return ONLY JSON.

Extract:
- iteration
- function

Rules:

1. If user mentions:
"this week"
"current iteration"

return:

{
  "args": {
    "iteration": "this_week",
    "function": null
  }
}


2. If user mentions:
"next week"

return:

{
  "args": {
    "iteration": "next_week",
    "function": null
  }
}


3. If user explicitly mentions a function/team such as:
"People Operations"
"IAM"

extract it.

Example:

User:
"What are releases this week in People Operations?"

Return:

{
  "args": {
    "iteration": "this_week",
    "function": "People Operations"
  }
}


Never invent a function.
If the user does not mention one, return null.
`,

    messages: [
      {
        role: "user",
        content: input
      }
    ]
  });

  const text =
    res.content[0].type === "text"
      ? res.content[0].text
      : "";

  return safeParse(text);
}