import { UserIcon } from "@heroicons/react/24/solid";
import { auth } from "../_lib/auth";
import Link from "next/link";
import Image from "next/image";

async function AuthUserAvatar({ width, height }) {
  const session = await auth();
  // console.log(session);
  //if (!session) return;
  return (
    <Link className="flex" href="/login">
      {session?.user?.image ? (
        <Image
          className="rounded-full"
          src={session.user.image}
          width={width}
          height={height}
          alt="avatar"
        />
      ) : (
        <UserIcon className="size-7 text-deepgrey" />
      )}
    </Link>
  );
}

export default AuthUserAvatar;
