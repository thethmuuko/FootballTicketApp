import { useEffect, useState } from "react";
import { listAllMatch } from "../service/FootballTicketService";
import type { MatchDto } from "../dto/MatchDto";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);


const leagues = [
  {
    key: "",
    label: "All Leagues",
    emoji: "⚽",
    color: "from-cyan-400 to-blue-500",
  },
  {
    key: "PREMIER",
    label: "Premier League",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    color: "from-purple-400 to-purple-600",
  },
  {
    key: "LALIGA",
    label: "La Liga",
    emoji: "🇪🇸",
    color: "from-red-400 to-red-600",
  },
  {
    key: "SERIA",
    label: "Serie A",
    emoji: "🇮🇹",
    color: "from-green-400 to-green-600",
  },
  {
    key: "LIGUE1",
    label: "Ligue 1",
    emoji: "🇫🇷",
    color: "from-blue-400 to-blue-600",
  },
  {
    key: "BUNDESLIGA",
    label: "Bundesliga",
    emoji: "🇩🇪",
    color: "from-red-400 to-red-600",
  },
  {
    key: "CHAMPIONS_LEAGUE",
    label: "Champions League",
    emoji: "🏆",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    key: "EUROPA_LEAGUE",
    label: "Europa League",
    emoji: "🟠",
    color: "from-orange-400 to-orange-600",
  },
];


export default function Matches() {
  const [matches, setMatches] = useState<MatchDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [selectedMatch, setSelectedMatch] = useState<MatchDto | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    listAllMatch()
      .then((res) => {
        setMatches(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load matches");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const filteredMatches = matches.filter((m) => {
    const leagueMatch = selectedLeague ? m.league === selectedLeague : true;

    const searchMatch = searchTerm
      ? m.homeTeam.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.awayTeam.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.statium &&
          m.statium.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;

    const dateMatch = selectedDate
      ? dayjs(m.kickOff).isValid() &&
        dayjs(m.kickOff).format("YYYY-MM-DD") ===
          dayjs(selectedDate).format("YYYY-MM-DD")
      : true;

    return leagueMatch && searchMatch && dateMatch;
  });

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-white/80 font-medium">
            Loading matches...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4"
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
              Oops! Something went wrong
            </h3>
            <p className="text-white/60 mb-6">{error}</p>
            <button
              className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-cyan-600 transition shadow-lg"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full Background */}
      <div className="fixed inset-0 -z-10">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/95"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-24">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Upcoming <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Matches</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Book your tickets for the most exciting football matches around the world
            </p>
          </motion.div>
        </div>

        {/* League Selection & Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* League Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
              {leagues.map((league) => (
                <motion.button
                  key={league.key}
                  onClick={() => setSelectedLeague(league.key)}
                  className={`relative overflow-hidden rounded-xl p-3 text-center transition-all duration-300 group ${
                    selectedLeague === league.key
                      ? "ring-2 ring-cyan-400 shadow-lg transform -translate-y-1 bg-white/20"
                      : "bg-white/5 hover:bg-white/10 hover:shadow-md hover:transform hover:-translate-y-0.5"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative z-10">
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">
                      {league.emoji}
                    </div>
                    <div className={`text-xs font-medium ${
                      selectedLeague === league.key ? "text-white" : "text-white/80"
                    }`}>
                      {league.label}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Search and Date Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search by team or stadium..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-white/40 transition-all duration-200"
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white transition-all duration-200"
                />
              </div>
              {(searchTerm || selectedDate) && (
                <motion.button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDate("");
                  }}
                  className="bg-white/10 text-white/80 px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Matches Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {filteredMatches.length === 0 ? (
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Matches Found
                </h3>
                <p className="text-white/60 mb-6">
                  {selectedLeague
                    ? `No matches found in ${
                        leagues.find((l) => l.key === selectedLeague)?.label
                      }. Try another league or search term.`
                    : "Try selecting a specific league or adjusting your search."}
                </p>
                <motion.button
                  onClick={() => {
                    setSelectedLeague("");
                    setSearchTerm("");
                    setSelectedDate("");
                  }}
                  className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-cyan-600 transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Matches
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* League Header */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                    leagues.find((l) => l.key === selectedLeague)?.color || "from-cyan-400 to-blue-500"
                  } flex items-center justify-center text-white text-xl shadow-lg`}>
                    {leagues.find((l) => l.key === selectedLeague)?.emoji || "⚽"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {leagues.find((l) => l.key === selectedLeague)?.label || "All Matches"}
                    </h2>
                    <p className="text-white/60">
                      {filteredMatches.length} match{filteredMatches.length !== 1 ? 'es' : ''} available
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Matches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredMatches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:border-cyan-400/30 transition-all duration-300 hover:shadow-2xl group"
                    >
                      {/* Match Header */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-cyan-300">
                            <span className="mr-2">
                              {leagues.find((l) => l.key === match.league)?.emoji || "⚽"}
                            </span>
                            {leagues.find((l) => l.key === match.league)?.label || match.league}
                          </div>
                          <div className="text-sm font-medium text-white bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30">
                            {dayjs(match.kickOff).isValid()
                              ? dayjs(match.kickOff).format("HH:mm")
                              : match.kickOff}
                          </div>
                        </div>
                      </div>

                      {/* Teams */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-white/10 rounded-xl flex items-center justify-center p-2 border border-white/20">
                              <img
                                src={match.homeTeam.logo}
                                alt={`${match.homeTeam.teamName} logo`}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="font-bold text-white text-lg leading-tight">
                              {match.homeTeam.teamName}
                            </div>
                          </div>
                          
                          <div className="text-center mx-4">
                            <div className="text-xl font-bold text-cyan-400 bg-white/10 px-3 py-2 rounded-full border border-white/20">VS</div>
                            <div className="text-xs text-white/60 mt-2">
                              {dayjs(match.kickOff).isValid()
                                ? dayjs(match.kickOff, "YYYY-MM-DD HH:mm").format("DD MMM")
                                : match.kickOff}
                            </div>
                          </div>
                          
                          <div className="flex-1 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-white/10 rounded-xl flex items-center justify-center p-2 border border-white/20">
                              <img
                                src={match.awayTeam.logo}
                                alt={`${match.awayTeam.teamName} logo`}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="font-bold text-white text-lg leading-tight">
                              {match.awayTeam.teamName}
                            </div>
                          </div>
                        </div>

                        {/* Stadium */}
                        <div className="flex items-center justify-center text-sm text-white/60 mb-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 text-cyan-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {match.statium}
                        </div>

                        {/* Action Button */}
                        <motion.button
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg group-hover:shadow-cyan-500/25"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedMatch(match)}
                        >
                          View Tickets
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Match Details Modal */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMatch(null)}
          >
            <motion.div
              className="relative bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white sticky top-0 z-10 rounded-t-3xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">
                      {selectedMatch.homeTeam.teamName} vs {selectedMatch.awayTeam.teamName}
                    </h3>
                    <p className="text-cyan-100">
                      {leagues.find((l) => l.key === selectedMatch.league)?.label || selectedMatch.league}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMatch(null)}
                    className="text-white hover:text-cyan-200 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 bg-slate-800/50">
                <div className="space-y-4">
                  {/* Stadium Info */}
                  <div className="flex items-start p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="bg-cyan-500/20 p-3 rounded-xl mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg mb-1">
                        Stadium
                      </h4>
                      <p className="text-white/80">{selectedMatch.statium}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="bg-cyan-500/20 p-3 rounded-xl mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 13V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg mb-1">
                        Address
                      </h4>
                      <p className="text-white/80">
                        {selectedMatch.statiumAddress}
                      </p>
                    </div>
                  </div>

                  {/* Kick Off Time */}
                  <div className="flex items-start p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="bg-cyan-500/20 p-3 rounded-xl mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg mb-1">
                        Kick Off
                      </h4>
                      <p className="text-white/80">
                        {dayjs(selectedMatch.kickOff).isValid()
                          ? dayjs(selectedMatch.kickOff).format(
                              "dddd, DD MMMM YYYY [at] HH:mm"
                            )
                          : selectedMatch.kickOff}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3 mt-8">
                  <motion.button
                    className="flex-1 bg-white/10 text-white py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-200 border border-white/20"
                    onClick={() => setSelectedMatch(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                  <Link
                    to={`/matches/${selectedMatch.id}/${selectedMatch.statium}/booking`}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg text-center flex items-center justify-center"
                    onClick={() => setSelectedMatch(null)}
                  >
                    Book Tickets
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}