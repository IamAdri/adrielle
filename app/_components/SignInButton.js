"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

function SignInButton() {
  const router = useRouter();
  //previous();
  return <button onClick={router.back.back}>GO BACK</button>;
}

export default SignInButton;
