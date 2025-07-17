import { UserIcon } from "@heroicons/react/24/solid";
import { auth } from "../_lib/auth";
import Link from "next/link";
import Image from "next/image";

async function AuthUserAvatar() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      {session.user.image && <img src={session.user.image} />}
      <Link href="/login">
        <UserIcon className="size-7 text-deepgrey" />
      </Link>
    </div>
  );
}

export default AuthUserAvatar;
