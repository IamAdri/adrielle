import MainHeading from "../_components/MainHeading";

function Contact() {
  return (
    <div className="flex flex-col gap-15 mt-5 mx-35 lg:mx-55 2xl:mx-95">
      <MainHeading>Contact page</MainHeading>
      <p>
        Do you have any questions or want to give us a feedback? Do not
        hesittate to contact us!
      </p>
      <ul className="flex flex-col gap-5">
        <li>
          Phone number: <span className="font-semibold">073335155</span>
        </li>
        <li>
          Email: <span className="font-semibold">adrielle@gmail.com</span>
        </li>
      </ul>
    </div>
  );
}

export default Contact;
