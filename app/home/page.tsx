import Header from "components/Header";
import HomeSection from "components/Home";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function Page() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="">
      <Header session={session} />
      <HomeSection session={session} />
    </div>
  );
}
