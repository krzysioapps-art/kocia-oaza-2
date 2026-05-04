import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  redirect(`/aktualnosci?post=${params.id}`);
}