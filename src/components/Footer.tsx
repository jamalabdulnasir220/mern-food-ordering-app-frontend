import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-orange-500 py-6 px-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:px-10 gap-4">
        <Logo
          size="md"
          showText={true}
          variant="white"
          className="mb-2 md:mb-0"
        />
        <span className="flex gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-white font-bold tracking-tight">
          <span>Privacy policy</span>
          <span>Terms of service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
