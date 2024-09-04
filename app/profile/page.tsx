import Header from "components/Header";
import ProfileSection from "components/Profile";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function Profile() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="pb-[64px]">
      <Header session={session} />
      <ProfileSection session={session} />
    </div>
  );
}
