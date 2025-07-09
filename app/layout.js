import Navigation from "./_components/Navigation";
import "./globals.css";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import Footer from "./_components/Footer";
import { FavoriteItemsProvider } from "./_components/FavoriteItemsContextApi";
import { ChooseSizeProvider } from "./_components/ChooseSizeContextApi";

const notoSans = Noto_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s / Adrielle",
    default: "Welcome / Adrielle",
  },
  description:
    "Luxurious women`s shoe boutique with a huge diversity and style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} flex flex-col w-screen h-screen`}>
        <FavoriteItemsProvider>
          <Navigation />
          <ChooseSizeProvider>
            <main className="text-center basis-8/10 py-7  text-deepgrey mb-35 mt-20">
              {children}
            </main>
          </ChooseSizeProvider>
        </FavoriteItemsProvider>

        <Footer />
      </body>
    </html>
  );
}
