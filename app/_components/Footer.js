import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="basis-1/10 border-t-3 border-lightlavender text-deepgrey pb-10">
      <div className="flex justify-between">
        <ul className="flex gap-5 pt-3 pl-5">
          <Link href="/cookies">Cookie Settings</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms and Conditions</Link>
        </ul>
        <ul className="flex gap-5 pt-3 pr-5">
          <Link href="#">
            <RiInstagramFill className="size-6" />
          </Link>
          <Link href="#">
            <FaFacebook className="size-6" />
          </Link>
          <Link href="#">
            <FaTwitter className="size-6" />
          </Link>
        </ul>
      </div>

      <p className="text-center ">2025 Adrielle, Inc. All rights reserved</p>
    </footer>
  );
}

export default Footer;
