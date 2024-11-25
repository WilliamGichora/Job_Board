const HeroSection = () => {
    return (
        <section className="text-center py-12 px-8">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-lg mb-6">We help you find exciting opportunities around the world. Have the latest openings at your fingertips in your inbox.</p>
            <div className="flex justify-center gap-2">
                <input type="email" placeholder="Your email" className="p-2 w-64 rounded text-black" />
                <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded hover:bg-yellow-500">Subscribe</button>
            </div>
        </section>
    );
};

export default HeroSection;
