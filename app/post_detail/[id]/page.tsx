import { getPost } from "actions/postActions";
import Header from "components/Header";
import PostDetailSection from "components/PostDetail";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function PostDetailPage({ params }) {
  const supabase = await createServerSupabaseClient();
  const data = await getPost(params.id);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <Header session={session} />
      <PostDetailSection data={data} />
    </div>
  );
}
