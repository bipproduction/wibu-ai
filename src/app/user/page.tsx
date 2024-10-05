import { wibuConfig } from "@/lib/wibu_config";
import { cookies } from "next/headers";
import { UserPage } from "./_ui/UserPage";

export default function Page() {
  const cookiesStorage = cookies();
  const token = cookiesStorage.get(wibuConfig.wibuSessionKey);
  return <UserPage token={token?.value || ""} />;
}


