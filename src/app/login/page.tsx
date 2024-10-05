"use client";
import { apies, pages } from "@/lib/routes";
import {
  Button,
  Card,
  Container,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSubmit() {
    setLoading(true);
    try {
      if (!phone) return alert("Phone number is required");

      const res = await fetch(
        apies["/api/login/[phone]"]({ phone: "62" + phone }),
        {
          method: "POST"
        }
      );

      const dataText = await res.text();
      console.log(dataText);

      if (!res.ok) {
        return alert("Something went wrong");
      }

      router.push(pages["/login/verify/[phone]"]({ phone: "62" + phone }));
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Stack>
      <Container maw={400}>
        <Card>
          <Stack>
            <Title order={3}>Login</Title>
            <TextInput
              onChange={(e) => setPhone(e.target.value)}
              label="Phone Number"
              leftSection={<Text>+62</Text>}
              placeholder="8969..."
            />
            <Button loading={loading} onClick={onSubmit}>
              Register
            </Button>
          </Stack>
        </Card>
      </Container>
    </Stack>
  );
}
