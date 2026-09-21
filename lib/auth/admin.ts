import { cookies } from "next/headers";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  const cookie =
    cookieStore.get("kocia-admin");

  return cookie?.value === "authorized";
}