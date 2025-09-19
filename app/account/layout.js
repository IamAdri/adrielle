import AccountNavigationBar from "../_components/AccountNavigationBar";

function layout({ children }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row  items-start mx-15 mt-15">
      <AccountNavigationBar />
      <div className="flex flex-col items-center w-full">{children}</div>
    </div>
  );
}

export default layout;
