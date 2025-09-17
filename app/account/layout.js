import AccountNavigationBar from "../_components/AccountNavigationBar";

function layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 lg:gap-15 items-start mx-15 mt-5">
      <AccountNavigationBar />
      {children}
    </div>
  );
}

export default layout;
