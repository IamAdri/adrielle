import MainHeading from "../_components/MainHeading";

function Page() {
  return (
    <div className="flex flex-col gap-15 mx-35 lg:mx-55 2xl:mx-95">
      <MainHeading>Cookie Settings</MainHeading>
      <p>
        We use cookies to enhance your shopping experience at Adrielle. Some
        cookies are essential for the website to function, while others help us
        improve your experience, personalize content, and show relevant offers.
      </p>
    </div>
  );
}

export default Page;
