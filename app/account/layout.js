import AccountNavigationBar from "../_components/AccountNavigationBar";
import { UserDetailsProvider } from "../_contextAPI/userDetailsContextApi";

function layout({ children }) {
  return (
    <div className="flex gap-5 lg:gap-25 lg:mx-10 items-center">
      <AccountNavigationBar />
      {children}
    </div>
  );
}

export default layout;
