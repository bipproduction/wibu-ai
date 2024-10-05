"use client";
import { apies, pages } from "@/lib/routes";
import { Button, Flex, Stack, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onLogout() {
    setLoading(true);
    try {
      const res = await fetch(apies["/api/logout"], {
        method: "POST"
      });

      if (res.ok) {
        return router.replace(pages["/login"]);
      }
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red"
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Stack>
      <Flex
        justify="space-between"
        bg={"dark"}
        p={"md"}
        style={{
          borderBottom: "0.2px solid #333"
        }}
      >
        <Title order={3}>User</Title>
        <Button
          loading={loading}
          onClick={onLogout}
          size="compact-xs"
          bg={"grape"}
          radius={"lg"}
        >
          Logout
        </Button>
      </Flex>

      {children}
    </Stack>
  );
}
