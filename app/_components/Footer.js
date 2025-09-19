import Link from "next/link";

function Footer() {
  return (
    <footer className="basis-1/10 border-t-3 border-lightlavender text-deepgrey pb-10">
      <div className="flex flex-wrap justify-between items-center gap-5 pt-3 px-3">
        <ul className="flex gap-5">
          <Link href="/cookies" className="hover:underline">
            Cookie Settings
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms and Conditions
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact us
          </Link>
        </ul>
        <p className="text-center ">2025 Adrielle, Inc. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
