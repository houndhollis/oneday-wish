import Header from "components/Header";
import TextListSection from "components/Home/TextListSection";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function TextList() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="font-sea">
      <Header session={session} />
      <TextListSection />
    </div>
  );
}
