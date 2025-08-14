import AccordionSection from "../_components/AccordionSection";
import MainHeading from "../_components/MainHeading";

function Page() {
  return (
    <div className="flex flex-col gap-5 mx-35 lg:mx-55 2xl:mx-95">
      <MainHeading>Terms & Conditions</MainHeading>
      <span className="italic text-coolgrey">
        Last updated: August 15, 2025
      </span>
      <p className="my-10 font-medium">
        Welcome to Adrielle, your go-to destination for stylish and comfortable
        footwear. By accessing or using our website, you agree to comply with
        and be bound by the following Terms and Conditions. These are for
        demonstration purposes only and have no legal validity.
      </p>
      <AccordionSection accordionID="accordion1" heading="Use of the Website">
        You may browse, view, and make purchases from Adrielle only for
        personal, non-commercial purposes. You agree not to misuse the site,
        attempt unauthorized access, or engage in activities that could damage
        our services.
      </AccordionSection>
      <AccordionSection accordionID="accordion2" heading="Product information">
        While we strive to display accurate colors, styles, and sizes of shoes,
        slight variations may occur due to screen settings or photography. All
        product descriptions and prices are subject to change without notice.
      </AccordionSection>
      <AccordionSection accordionID="accordion3" heading="Orders & Payments">
        Orders are subject to acceptance and availability. All prices displayed
        are fictional and for demo purposes only — no actual transactions will
        occur. Payments in this demo store are simulated; no real money will be
        charged.
      </AccordionSection>
      <AccordionSection accordionID="accordion4" heading="Shipping & Delivery">
        Any shipping times or fees shown are placeholders and do not represent
        real services. No physical products will be sent in connection with this
        website.
      </AccordionSection>
      <AccordionSection accordionID="accordion5" heading="Returns & Refunds">
        As this is a demonstration project, no returns, exchanges, or refunds
        will be processed. All orders placed are mock orders for portfolio
        display purposes only.
      </AccordionSection>
      <AccordionSection
        accordionID="accordion6"
        heading="Intellectual Property"
      >
        All logos, graphics, and text on this demo site are either owned by
        Adrielle (fictional) or used with permission from free asset providers.
        They may not be reproduced without consent.
      </AccordionSection>
      <AccordionSection
        accordionID="accordion7"
        heading="Limitation of Liability"
      >
        Adrielle is not responsible for any direct, indirect, or incidental
        damages resulting from the use of this demo website. This includes any
        reliance on product details, prices, or services shown.
      </AccordionSection>
      <AccordionSection
        accordionID="accordion8"
        heading="Changes to These Terms"
      >
        We may update these Terms & Conditions at any time without prior notice.
        Please check this page periodically for changes.
      </AccordionSection>
      <AccordionSection accordionID="accordion9" heading="Contact Us">
        Since this is a demo website, all inquiries are fictional.
      </AccordionSection>
    </div>
  );
}

export default Page;
