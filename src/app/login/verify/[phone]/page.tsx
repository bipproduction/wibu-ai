"use client";
import { apies, pages } from "@/lib/routes";
import {
  Button,
  Card,
  CloseButton,
  Container,
  PinInput,
  Stack,
  Title
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { phone: string } }) {
  const [pin, setPin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    try {
      setLoading(true);
      if (!pin) return alert("Pin is required");

      const res = await fetch(
        apies["/api/login/[phone]/verify/[code]"]({
          phone: params.phone,
          code: pin
        }),
        {
          method: "POST"
        }
      );

      if (!res.ok) {
        return alert("Something went wrong");
      }
      const dataText = await res.text();
      console.log(dataText);
      router.replace(pages["/user"]);
    } catch (error) {
      console.log("error on submit pin", error);
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
            <CloseButton onClick={router.back} />
            <Title order={3}>Verify</Title>
            <PinInput onChange={setPin} />
            <Button loading={loading} onClick={onSubmit}>Verify</Button>
          </Stack>
        </Card>
      </Container>
    </Stack>
  );
}
