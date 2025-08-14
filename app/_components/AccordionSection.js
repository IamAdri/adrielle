function AccordionSection({ accordionID, heading, children }) {
  return (
    <div className="bg-nude rounded-lg shadow-lg overflow-hidden">
      <input type="checkbox" id={accordionID} className="peer hidden"></input>
      <label
        htmlFor={accordionID}
        className="flex items-center p-5 bg-nude cursor-pointer hover:bg-darknude transition-colors font-semibold"
      >
        {heading}
      </label>
      <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
        <div className="px-5 pt-3 pb-5 text-left">{children}</div>
      </div>
    </div>
  );
}

export default AccordionSection;
