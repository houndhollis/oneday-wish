import Footer from "components/Footer";

export default function MainLayout({ children }) {
  return (
    <main
      style={{
        boxShadow: "0px 0px 16px rgb(50 50 50 / 12%)",
      }}
      className="w-full h-auto min-h-screen bg-white shadow-2xl"
    >
      {children}
      <Footer />
    </main>
  );
}
