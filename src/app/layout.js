import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "BlogMania",
  description: "Sharing blogs with convenience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        try {
          var theme = localStorage.getItem('theme') || 'light';
          var root = document.documentElement;
          root.classList.add(theme);
          // Apply to body once it exists
          if (document.body) {
            document.body.classList.add(theme);
          } else {
            document.addEventListener('DOMContentLoaded', function() {
              document.body.classList.add(theme);
            });
          }
        } catch (e) {}
      })();
    `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <div className="container">
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
