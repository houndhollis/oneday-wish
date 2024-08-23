import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createServerSupabaseClient } from "utils/supabase/server";
import AuthProvider from "config/AuthProvider";
import MainLayout from "layouts/MainLayout";
import KakaoScript from "utils/script/KakaoSrcipt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "하루소원",
  description: "하루하루 행복을 바라는 소원을 빌어봐요",
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={`${inter.className} max-w-[528px] mx-auto bg-[#f5f5f5]`}>
        <AuthProvider accessToken={session?.access_token}>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
        <KakaoScript />
      </body>
    </html>
  );
}
