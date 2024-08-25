import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { createServerSupabaseClient } from "utils/supabase/server";
import AuthProvider from "config/AuthProvider";
import MainLayout from "layouts/MainLayout";
import KakaoScript from "utils/script/KakaoSrcipt";
import ReactQueryClinetProvider from "config/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "하루공감",
  description: "하루하루 공감과 기록을",
};

const yeongdeockSea = localFont({
  src: "../public/font/Yeongdeok_Sea.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-sea",
});

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
    <html lang="en" className={yeongdeockSea.variable}>
      <body className={`${inter.className} max-w-[528px] mx-auto bg-[#f5f5f5]`}>
        <AuthProvider accessToken={session?.access_token}>
          <ReactQueryClinetProvider>
            <MainLayout>{children}</MainLayout>
          </ReactQueryClinetProvider>
        </AuthProvider>
        <KakaoScript />
      </body>
    </html>
  );
}
