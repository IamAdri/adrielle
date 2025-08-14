import AccordionSection from "../_components/AccordionSection";
import MainHeading from "../_components/MainHeading";

function Page() {
  return (
    <div className="flex flex-col gap-5 mx-35 lg:mx-55 2xl:mx-95">
      <MainHeading>Privacy Policy</MainHeading>
      <span className="italic text-coolgrey">
        Last updated: August 15, 2025
      </span>
      <p className="my-10 font-medium">
        Welcome to Adrielle. This Privacy Policy explains how we collect, use,
        and protect your information when you interact with our fictional online
        shoe store. While this website is a portfolio/demo project, it does
        store limited real user information from Google sign-in, as described
        below.
      </p>
      <AccordionSection
        accordionID="accordion1"
        heading="Information We Collect"
      >
        When you sign in using Google, we collect and store the following
        information from your Google account:
        <ul className="flex flex-col pl-9 font-semibold list-disc">
          <li>Email address</li>
          <li>Display name (full name as provided by Google)</li>
          <li>Profile avatar/image</li>
        </ul>
        We do not collect payment details, phone numbers, or any other personal
        information.
      </AccordionSection>
      <AccordionSection
        accordionID="accordion2"
        heading="How We Use Your Information"
      >
        We use the information above solely for:
        <ul className="flex flex-col pl-9 font-semibold list-disc">
          <li>Allowing you to sign in and test the demo store</li>
          <li>Displaying your name and avatar in the user interface</li>
          <li>Managing your account during testing sessions</li>
        </ul>
        We do not send marketing emails, share your details with third parties,
        or use your data for any purpose outside this demo.
      </AccordionSection>
      <AccordionSection
        accordionID="accordion3"
        heading="Cookies & Tracking Technologies"
      >
        This demo site may use cookies or local storage to:
        <ul className="flex flex-col pl-9 font-semibold list-disc">
          <li>Keep you signed in during your session</li>
          <li>Remember your test shopping cart</li>
        </ul>
        No third-party advertising or tracking tools are implemented.
      </AccordionSection>
      <AccordionSection
        accordionID="accordion4"
        heading="Sharing of Information"
      >
        We do not sell, rent, or share your information with outside companies.
        The only entities with access to your data are the services required to
        host and operate this project (e.g., authentication provider, database
        host).
      </AccordionSection>
      <AccordionSection accordionID="accordion5" heading="Data Security">
        We take reasonable measures to secure your data, including encrypted
        connections (HTTPS in production) and secure database storage. However,
        because this is a demo project, we recommend you avoid using highly
        sensitive personal information.
      </AccordionSection>
      <AccordionSection accordionID="accordion6" heading="Children`s Privacy">
        This demo site is intended for general audiences.
      </AccordionSection>
      <AccordionSection
        accordionID="accordion7"
        heading="Changes to This Privacy Policy"
      >
        We may update this Privacy Policy at any time to reflect changes in the
        project. Updates will be posted on this page.
      </AccordionSection>
      <AccordionSection accordionID="accordion8" heading="Contact Us">
        Since this is a demo website, all inquiries are fictional.
      </AccordionSection>
    </div>
  );
}

export default Page;
