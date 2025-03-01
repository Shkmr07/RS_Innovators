export default function LandingPage() {
    return (
      <div className="bg-gray-100">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4">Gamify Your Wellness</h1>
          <p className="text-lg max-w-2xl">
            Stay fit and motivated with our gamified yoga and wellness platform.
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
            Get Started
          </button>
          <img
            src="https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?w=600&auto=format&fit=crop&q=60"
            alt="Yoga"
            className="mt-6 w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-lg mx-auto"
          />
        </section>
  
        {/* Features Section */}
        <section className="container mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="https://images.unsplash.com/reserve/YEc7WB6ASDydBTw6GDlF_antalya-beach-lulu.jpg?w=600&auto=format&fit=crop&q=60"
                alt="Meditation"
                className="rounded-lg h-48 w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Mindfulness Tracking</h3>
              <p className="text-gray-600 mt-2">
                Track your meditation and yoga progress effortlessly.
              </p>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1664109999537-088e7d964da2?w=600&auto=format&fit=crop&q=60"
                alt="Fitness"
                className="rounded-lg h-48 w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Personalized Challenges</h3>
              <p className="text-gray-600 mt-2">
                Engage in daily yoga challenges to stay motivated.
              </p>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=600&auto=format&fit=crop&q=60"
                alt="Healthy Lifestyle"
                className="rounded-lg h-48 w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Leaderboard & Rewards</h3>
              <p className="text-gray-600 mt-2">
                Compete with friends and earn rewards for consistency.
              </p>
            </div>
          </div>
        </section>
  
        {/* Contact Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-lg mb-6">
              Have questions? Reach out to us and we’ll be happy to help!
            </p>
            <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-blue-400 rounded-lg mb-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-blue-400 rounded-lg mb-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border border-blue-400 rounded-lg mb-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                rows="4"
              ></textarea>
              <button className="w-full bg-yellow-400 text-black py-3 font-semibold rounded-lg hover:bg-yellow-500 transition">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
  