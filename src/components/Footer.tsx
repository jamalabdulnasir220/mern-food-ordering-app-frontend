const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:px-10">
        <span className="text-3xl text-white font-bold tracking-tight">
          QuickFork.com
        </span>
        <span className="flex gap-4 text-white font-bold tracking-tight">
          <span>Privacy policy</span>
          <span>Terms of service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
