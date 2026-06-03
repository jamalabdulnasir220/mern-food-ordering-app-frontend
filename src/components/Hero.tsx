const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=80";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-b-2xl shadow-lg md:rounded-b-3xl">
      <img
        src={HERO_IMAGE_URL}
        alt="Assorted Ghanaian dishes including jollof rice and grilled fish"
        className="h-[200px] w-full object-cover sm:h-[280px] md:h-[380px]"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 px-4 pb-6 pt-16 sm:px-8 sm:pb-8 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-300 sm:text-sm">
          Welcome to GhanaBite
        </p>
        <h1 className="mt-1 max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
          Authentic Ghanaian food, delivered to your door
        </h1>
      </div>
    </div>
  );
};

export default Hero;
