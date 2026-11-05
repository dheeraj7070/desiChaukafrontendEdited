import { refresh } from "@/lib/fetchApi";

export default async function RefreshPage() {
  const c = await refresh();
  return (
    <>
      <p>{c}</p>
    </>
  );
}
