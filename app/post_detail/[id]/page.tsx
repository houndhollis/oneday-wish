import Header from "components/Header";
import PostDetailSection from "components/PostDetail";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function PostDetailPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <Header session={session} />
      <PostDetailSection />
    </div>
  );
}
