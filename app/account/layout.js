import AccountNavigationBar from "../_components/AccountNavigationBar";

function layout({ children }) {
  return (
    <div className="flex gap-5 lg:gap-25 lg:mx-10 items-start">
      <AccountNavigationBar />
      {children}
    </div>
  );
}

export default layout;
