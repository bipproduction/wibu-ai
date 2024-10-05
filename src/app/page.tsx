"use client";
import { apies } from "@/lib/routes";
import { Stack } from "@mantine/core";
import MarkdownPreview from "@uiw/react-markdown-preview";

const md = `
# Apies

POST ${apies["/api/tiny-dolphin"]}

POST ${apies["/api/tiny-llama"]}

examples: 

\`\`\`sh
curl -X POST "${apies["/api/tiny-dolphin"]}" \

  -H "Content-Type: application/json" \

  -d '{"prompt": "hello world"}'

\`\`\`\

`;

export default function Home() {
  return (
    <Stack p={24}>
      <MarkdownPreview
        style={{
          padding: "24px"
        }}
        source={md}
      />
    </Stack>
  );
}
