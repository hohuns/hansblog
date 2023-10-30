import NavBar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/context/Context";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import AuthProvider from "@/components/Providers/AuthProvider";
import { Suspense } from "react";
import Loader from "@/components/Loader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hans Blog",
  description: "Hans Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loader />}>
          <AuthProvider>
            <ContextProvider>
              <ThemeProvider>
                <div className="container">
                  <div className="wrapper">
                    <NavBar />
                    {children}
                    <Footer />
                  </div>
                </div>
              </ThemeProvider>
            </ContextProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
