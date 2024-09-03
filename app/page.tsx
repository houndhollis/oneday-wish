import LoginForm from "components/LoginForm";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <LoginForm session={session} />;
}
