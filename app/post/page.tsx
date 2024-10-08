import Header from "components/Header";
import PostSection from "components/Post";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function Page() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="font-sea">
      <Header session={session} />
      <main className="p-4 w-full h-full bg-white pb-[72px]">
        <PostSection session={session} />
      </main>
    </div>
  );
}
