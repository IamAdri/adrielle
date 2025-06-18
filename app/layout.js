import Navigation from "./_components/Navigation";
import "@/app/globals.css";
import { Noto_Sans } from "next/font/google";

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
        <Navigation />
        <main className="text-center basis-9/10 py-7 bg-warmwhite text-softlavender">
          {children}
        </main>
      </body>
    </html>
  );
}
