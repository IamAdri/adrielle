import AuthUserAvatar from "../_components/AuthUserAvatar";
import DeliveryDetailsDiv from "../_components/DeliveryDetailsDiv";
import UpdateLogedInItems from "../_components/UpdateLogedInItems";
import { auth } from "../_lib/auth";
import { getFavoriteItems } from "../_lib/data-service";

async function Account() {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  console.log(session?.user.email);
  if (!session?.user) return;
  await getFavoriteItems(session.user.email);
  return (
    <div className="w-125">
      <div className="flex flex-col  items-start gap-5 mx-15 my-10 p-5 border-nude border-2">
        <UpdateLogedInItems currentUser={session.user.email} />
        <h2 className="font-semibold">Account data</h2>
        <div className="flex items-center gap-3">
          <AuthUserAvatar width={75} height={75} />
          <div className="flex flex-col items-start">
            <p>
              <span className="text-coolgrey">Name: </span>
              <span>{session?.user?.name}</span>
            </p>
            <p>
              <span className="text-coolgrey">Email: </span>
              <span>{session?.user?.email}</span>
            </p>
          </div>
        </div>
      </div>

      <DeliveryDetailsDiv sessionUser={currentUser} />
    </div>
  );
}

export default Account;
