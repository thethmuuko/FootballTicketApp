import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { SeatDto } from "../dto/SeatDto";
import { listAllSeatByStadiumName } from "../service/FootballTicketService";

const seatTypeIcons: Record<string, string> = {
  STANDARD: "🪑",
  SUPPORTER: "🎉",
  FAMILY: "👨‍👩‍👧‍👦",
  VIP: "👑",
  CLUB: "🏆",
  SKYBOX: "🌌",
  ACCESSIBLE: "♿",
};

const seatTypeColors: Record<string, string> = {
  STANDARD: "from-blue-400 to-blue-600",
  SUPPORTER: "from-green-400 to-green-600",
  FAMILY: "from-pink-400 to-pink-600",
  VIP: "from-purple-400 to-purple-600",
  CLUB: "from-yellow-400 to-yellow-600",
  SKYBOX: "from-indigo-400 to-indigo-600",
  ACCESSIBLE: "from-cyan-400 to-cyan-600",
};

export default function Booking() {
  const { matchId, stadiumName } = useParams<{
    matchId: string;
    stadiumName: string;
  }>();
  const [seats, setSeats] = useState<SeatDto[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");

  const navigator = useNavigate();

  useEffect(() => {
    if (!stadiumName) return;
    listAllSeatByStadiumName(stadiumName)
      .then((res) => {
        setSeats(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load seats");
        setLoading(false);
      });
  }, [stadiumName]);

  const toggleSeat = (id: number) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleProceedToCheckout = () => {
    navigator("/matches/checkout", {
      state: {
        matchId,
        stadiumName,
        seats: seats.filter((s) => selectedSeats.includes(s.id)),
      },
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/95"></div>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-white/80 font-medium">
            Loading seats...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/95"></div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Failed to Load Seats
              </h3>
              <p className="text-white/60 mb-6">{error}</p>
              <button
                className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-cyan-600 transition-all duration-200 shadow-lg"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );

  const seatTypes = [
    "STANDARD",
    "SUPPORTER",
    "FAMILY",
    "VIP",
    "CLUB",
    "SKYBOX",
    "ACCESSIBLE",
  ];

  const filteredSeats = selectedType
    ? seats.filter((s) => s.seatType === selectedType)
    : seats;

  const selectedSeatObjects = seats.filter((s) => selectedSeats.includes(s.id));
  const totalPrice = selectedSeatObjects.reduce(
    (sum, seat) => sum + seat.price,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/95"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-24 pb-12">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Select Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Seats</span>
            </h1>
            <p className="text-white/60 text-lg">
              {stadiumName} • Choose the perfect seats for your match experience
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >

            {/* Seat Type Legend */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <h3 className="text-white font-semibold text-lg mb-4">Seat Types</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {seatTypes.map((type) => (
                  <motion.div
                    key={type}
                    className={`flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all duration-200 cursor-pointer ${
                      selectedType === type ? "ring-2 ring-cyan-400 bg-white/10" : ""
                    }`}
                    onClick={() => setSelectedType(selectedType === type ? "" : type)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{seatTypeIcons[type]}</span>
                    <span className="text-white text-sm font-medium">
                      {type.charAt(0) + type.slice(1).toLowerCase()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Seats Grid */}
            <div className="mb-8">
              {filteredSeats.length === 0 ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-24 h-24 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">😢</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No Seats Available
                  </h3>
                  <p className="text-white/60">
                    {selectedType 
                      ? `No ${selectedType.toLowerCase()} seats available. Try another category.`
                      : "No seats available for this match."
                    }
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.03 } },
                  }}
                >
                  <AnimatePresence>
                    {filteredSeats.map((seat) => (
                      <motion.button
                        key={seat.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={seat.available ? { 
                          scale: 1.05, 
                          boxShadow: "0 8px 32px rgba(34, 211, 238, 0.3)" 
                        } : {}}
                        whileTap={seat.available ? { scale: 0.97 } : {}}
                        disabled={!seat.available}
                        onClick={() => toggleSeat(seat.id)}
                        className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-base font-semibold overflow-hidden group
                          ${
                            !seat.available
                              ? "bg-white/5 border-white/10 cursor-not-allowed text-white/40"
                              : selectedSeats.includes(seat.id)
                              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-400 shadow-lg shadow-green-500/25"
                              : `bg-gradient-to-r ${seatTypeColors[seat.seatType] || "from-blue-400 to-blue-600"} text-white border-white/20 hover:border-cyan-400`
                          }
                        `}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <span className="absolute top-2 right-2 text-xl">
                            {seatTypeIcons[seat.seatType] || "🪑"}
                          </span>
                          <div className="text-2xl mb-2 font-bold text-center">
                            {seat.seatNumber}
                          </div>
                          <div className="text-lg font-semibold text-center mb-1">
                            ${seat.price}
                          </div>
                          <div className="text-xs text-center opacity-90">
                            {seat.seatType.charAt(0) + seat.seatType.slice(1).toLowerCase()}
                          </div>
                        </div>

                        {/* Status Badge */}
                        {!seat.available && (
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full bg-red-500/80 text-white text-xs font-medium">
                            Sold
                          </div>
                        )}

                        {/* Selected Checkmark */}
                        {selectedSeats.includes(seat.id) && (
                          <div className="absolute top-2 left-2">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Selected Seats Summary */}
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h2 className="font-semibold text-xl text-white mb-3">
                    Your Selection
                  </h2>
                  
                  {selectedSeats.length === 0 ? (
                    <p className="text-white/60">No seats selected yet</p>
                  ) : (
                    <div className="space-y-3">
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.05 } },
                        }}
                      >
                        {selectedSeatObjects.map((seat) => (
                          <motion.div
                            key={seat.id}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="text-lg">{seatTypeIcons[seat.seatType]}</span>
                            <span className="font-semibold">{seat.seatNumber}</span>
                            <span className="text-cyan-100">${seat.price}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      <div className="border-t border-white/20 pt-3">
                        <p className="text-lg font-bold text-white">
                          Total: <span className="text-cyan-400 text-2xl">${totalPrice}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <motion.button
                  onClick={handleProceedToCheckout}
                  disabled={selectedSeats.length === 0}
                  whileHover={selectedSeats.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={selectedSeats.length > 0 ? { scale: 0.98 } : {}}
                  className={`px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-200 min-w-64
                    ${
                      selectedSeats.length === 0
                        ? "bg-white/10 text-white/40 border border-white/20 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/25"
                    }`}
                >
                  {selectedSeats.length === 0 ? (
                    "Select Seats to Continue"
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Proceed to Checkout</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}