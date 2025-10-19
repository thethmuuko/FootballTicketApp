import { isLoginedIn } from "@/service/AuthService";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const isLogin = isLoginedIn();
  const navigator = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-white/80 text-sm">Premier League • 2025/26</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Experience Live
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Football Like Never Before
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Premium tickets, interactive seat maps and secure checkout — all wrapped in a delightful, fast experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors shadow-2xl"
                onClick={() => navigator("/matches")}
              >
                Browse Matches
              </motion.button>
              {!isLogin && <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
                onClick={() => navigator("/register")}
              >
                Create Account
              </motion.button>

              }
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              We've redefined the football ticket experience
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              With cutting-edge features designed for true football fans
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Easy Booking",
                description: "Find and book tickets in a few clicks with a polished, guided flow."
              },
              {
                icon: "💺",
                title: "Best Seats",
                description: "Interactive stadium maps show you exact views and pricing."
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                description: "Bank-level security for every transaction — simple and protected."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">What Our Fans Say</h2>
            <p className="text-white/60 text-lg">Join thousands of satisfied football fans</p>
          </motion.div>

<div className="grid md:grid-cols-3 gap-8">
  {[
    {
      id: 1,
      name: "Jake Williams",
      team: "Manchester United",
      role: "Season Ticket Holder",
      gradient: "from-red-600 to-black",
      quote:
        "I’ve been going to Old Trafford for years, but this app made getting my derby tickets the easiest it’s ever been. Got my seats in under a minute!",
    },
    {
      id: 2,
      name: "Liam Carter",
      team: "Chelsea FC",
      role: "Blue Member",
      gradient: "from-blue-600 to-sky-400",
      quote:
        "Honestly impressed. Usually ticket sites crash on big match days, but this one was smooth and reliable — even for Champions League nights!",
    },
    {
      id: 3,
      name: "Ella Roberts",
      team: "Liverpool FC",
      role: "Die-hard Supporter",
      gradient: "from-red-700 to-yellow-500",
      quote:
        "Finally, a ticket app that actually works. I grabbed my Anfield tickets while on the bus — no errors, no stress. Loved it!",
    },
  ].map((fan) => (
    <motion.div
      key={fan.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: fan.id * 0.2 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
    >
      <div className="flex items-center mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${fan.gradient} rounded-full flex items-center justify-center text-white font-bold mr-4`}
        >
          {fan.name[0]}
        </div>
        <div>
          <h4 className="text-white font-semibold">{fan.name}</h4>
          <p className="text-white/60 text-sm">{fan.role} · {fan.team}</p>
        </div>
      </div>
      <p className="text-white/80 italic">"{fan.quote}"</p>
    </motion.div>
  ))}
</div>

        </div>
      </section>
    </div>
  );
}