

const OfferCard = ({ title, offer, text, rotation }) => {
    return (
        <div className={`relative p-6 py-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-2xl border-2 border-white transform ${rotation} mx-6`}>
            <h1 className="text-2xl font-extrabold mb-2">{title}</h1>
            <h3 className="text-xl font-bold mb-2 text-yellow-300">{offer}</h3>
            <p className="mt-2 text-sm">{text}</p>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white opacity-25 blur-xl"></div>
        </div>
    );
};

const Banner = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 py-12 my-12 shadow-xl rounded-xl px-4 md:px-12">
            <div className="flex flex-col justify-center items-center mb-12 md:mb-0">
                <img src="https://i.ibb.co/QfpSRGd/icons8-taka-64.png" alt="Amar Artho Logo" className="w-24 h-24 mb-4" />
                <p className="text-2xl md:text-3xl font-bold">Amar Artho</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <OfferCard
                    title="Send Money"
                    offer="Charge 5 Taka"
                    text="For every transaction over 100 taka, a user has to pay a fee of 5 Taka. A user needs to do a transaction with at least 50 taka. Less than 50 taka is not allowed for transactions."
                    rotation="-rotate-6"
                />
                <OfferCard
                    title="Cash Out"
                    offer="Charge 1.5%"
                    text="For every cash out, there will be a fee which is 1.5% of the transaction amount and the fee will be deducted from the user’s balance and added to the agent balance."
                    rotation="rotate-6"
                />
            </div>
        </div>
    );
};

export default Banner;
