const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"; // Tasty food unsplash

const Hero = () => {
  return (
    <div>
      <img
        src={HERO_IMAGE_URL}
        alt="Delicious food spread"
        className="w-full max-h-[600px] object-cover rounded-lg shadow-md"
      />
    </div>
  );
};

export default Hero;
