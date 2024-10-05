"use client";
import { apies } from "@/lib/routes";
import {
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Textarea,
  Title
} from "@mantine/core";

import { useState } from "react";

export function UserPage({ token }: { token: string }) {
  return (
    <Stack>
      <Container>
        <Card>
          <Stack>
            <Title>User Page</Title>
            <Text
              style={{
                textWrap: "wrap",
                wordBreak: "break-word"
              }}
            >
              {token}
            </Text>
            <TestArea token={token} />
          </Stack>
        </Card>
      </Container>
    </Stack>
  );
}

function TestArea({ token }: { token: string }) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function onSubmit() {
    try {
      setLoading(true);
      if (!text) return alert("Text is required");
      const res = await fetch(
        apies["/api/ai/[...path]"]({ path: ["api", "generate"] }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            model: "codegeex4",
            prompt: text,
            stream: false
          })
        }
      );

      const dataText = await res.text();
      try {
        const dataJson = JSON.parse(dataText);
        setResult(dataJson.response);
      } catch (error) {
        console.log(error);
        setResult(dataText);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Stack>
      <Textarea
        onChange={(e) => setText(e.target.value)}
        label="test"
        placeholder="test"
      />
      <Group>
        <Button loading={loading} onClick={onSubmit}>
          TEST
        </Button>
      </Group>
      {result}
    </Stack>
  );
}
