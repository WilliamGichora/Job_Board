const Filters = () => {
    return (
        <div className="py-8 px-8">
            <div className="flex flex-col flex-wrap gap-4 justify-center items-center">
                <div className="space-x-2">
                    <p className="font-bold text-center">LOCATION</p>
                    {["Achem", "Amsterdam", "Barcelona", "Berlin"].map((loc) => (
                        <button key={loc} className="bg-blue-300 px-3 py-1 rounded hover:bg-blue-600">
                            {loc}
                        </button>
                    ))}
                </div>
                <div className="space-x-2">
                    <p className="font-bold text-center">LANGUAGE</p>
                    {["Dutch", "English", "German"].map((lang) => (
                        <button key={lang} className="bg-blue-300 px-3 py-1 rounded hover:bg-blue-600">
                            {lang}
                        </button>
                    ))}
                </div>
                <div className="space-x-2">
                    <p className="font-bold text-center">CONTRACT TYPE</p>
                    {["Freelance", "Full-time", "Part-time"].map((type) => (
                        <button key={type} className="bg-blue-300 px-3 py-1 rounded hover:bg-blue-600">
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filters;
