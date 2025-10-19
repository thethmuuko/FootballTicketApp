import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { SeatDto } from "../dto/SeatDto";
import type { BookingDto } from "../dto/BookingDto";
import type { RegisterPaymentAccountDto } from "../dto/RegisterPaymentAccountDto";
import type { PaymentAccountDto } from "../dto/PaymentAccountDto";
import { getLoginUserEmail } from "../service/AuthService";
import {
  createAccount,
  findByUsername,
  getLoan,
  withdraw,
} from "../service/PaymentService";
import { bookSeat } from "../service/FootballTicketService";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { matchId, stadiumName, seats } = location.state as {
    matchId: string;
    stadiumName: string;
    seats: SeatDto[];
  };

  const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [paymentError, setPaymentError] = useState<React.ReactNode>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showLoanModal, setShowLoanModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState(500);
  const [loanAccepted, setLoanAccepted] = useState(false);
  const [hasActiveLoan, setHasActiveLoan] = useState(false);

  // Calculate dynamic loan amounts based on total price
  const getLoanOptions = () => {
    const minLoan = 100;
    const maxLoan = 2000;

    // Calculate suggested amounts based on total price
    const exactAmount = Math.max(minLoan, totalPrice);
    const extra20 = Math.min(maxLoan, Math.ceil(totalPrice * 1.2));
    const extra50 = Math.min(maxLoan, Math.ceil(totalPrice * 1.5));

    // Remove duplicates and ensure min/max limits
    const amounts = [exactAmount, extra20, extra50, 500, 1000, 1500]
      .filter(
        (amount, index, self) =>
          amount >= minLoan &&
          amount <= maxLoan &&
          self.indexOf(amount) === index
      )
      .sort((a, b) => a - b);

    return amounts.slice(0, 4); // Return max 4 options
  };

  const loanOptions = getLoanOptions();

  // Set initial loan amount to the first option when modal opens
  useEffect(() => {
    if (showLoanModal && loanOptions.length > 0) {
      setLoanAmount(loanOptions[0]);
    }
  }, [showLoanModal]);

  const handlePay = () => {
    const dto: PaymentAccountDto = {
      accountName: username,
      password: password,
      amount: totalPrice,
      alreadyTakeLoan: false,
    };

    withdraw(dto)
      .then(() => {
        const bookingDto: BookingDto = {
          matchId: parseInt(matchId),
          seatIds: seats.map((s) => s.id),
          price: totalPrice,
          email: getLoginUserEmail()!,
        };

        return bookSeat(bookingDto);
      })
      .then(() => {
        navigate(`/matches/${matchId}/${stadiumName}/booking`);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const errorMsg = err.response.data.message;
          if (
            errorMsg.includes("balance") ||
            errorMsg.includes("insufficient")
          ) {
            setPaymentError(
              <span>
                {errorMsg}.{" "}
                <button
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium"
                  onClick={() => {
                    findByUsername(username)
                      .then((res) => {
                        setLoanAccepted(false);
                        if (res.data.alreadyTakeLoan) {
                          setHasActiveLoan(true);
                        } else {
                          setHasActiveLoan(false);
                        }
                        setShowLoanModal(true);
                      })
                      .catch((err) => console.error(err));
                  }}
                >
                  Get a loan?
                </button>
              </span>
            );
          } else {
            setPaymentError(errorMsg);
          }
        }
      });
  };

  const handleCreateAccount = () => {
    const dto: RegisterPaymentAccountDto = {
      firstName,
      lastName,
      username: createUsername,
      userEmail: getLoginUserEmail()!,
      password: createPassword,
    };

    createAccount(dto)
      .then(() => {
        setUsername(createUsername);
        setPassword(createPassword);
        setShowCreate(false);
        setPaymentError(null);
      })
      .catch((err) => {
        setPaymentError(err.response.data.message);
      });
  };

  const handleAcceptLoan = () => {
    const dto: PaymentAccountDto = {
      accountName: username,
      password: password,
      amount: loanAmount,
      alreadyTakeLoan: true,
    };

    getLoan(dto)
      .then(() => {
        setTimeout(() => {
          setShowLoanModal(false);
          setPaymentError(null);
          setLoanAccepted(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.message?.includes("active loan")) {
          setHasActiveLoan(true);
          setPaymentError(
            "You already have an active loan. Please repay it first."
          );
        } else {
          setPaymentError("Failed to process loan. Please try again.");
        }
      });
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(100, Math.min(2000, value));
    setLoanAmount(clampedValue);
  };

  // Function to close error message
  const closeErrorMessage = () => {
    setPaymentError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full Background - Keep your original background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/95"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Main Content - Keep your original structure */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <motion.h1
            className="text-3xl font-bold text-center mb-8 text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Checkout
          </motion.h1>

          <motion.div
            className="mb-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-semibold text-white text-lg mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Stadium:</span>
                <span className="text-white font-medium">{stadiumName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Seats:</span>
                <span className="text-cyan-300 font-mono font-medium">
                  {seats.map((s) => s.seatNumber).join(", ")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Total Price:</span>
                <span className="text-cyan-400 font-bold text-xl">
                  ${totalPrice}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form - Keep your original */}
          <AnimatePresence mode="wait">
            {!showCreate ? (
              <motion.div
                key="pay"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="font-semibold text-white text-lg">
                  Pay with Account
                </h2>

                <AnimatePresence>
                  {paymentError && (
                    <motion.div
                      className="p-4 bg-red-500/20 border border-red-400/30 rounded-xl relative"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start">
                        <svg
                          className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-red-300 text-sm pr-6">
                          {paymentError}
                        </span>
                      </div>
                      {/* Close button for error message */}
                      <button
                        onClick={closeErrorMessage}
                        className="absolute top-3 right-3 text-red-300 hover:text-red-100 transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-white/40 transition-all duration-200"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-white/40 transition-all duration-200"
                    />
                  </div>
                </div>

                <motion.button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePay}
                  disabled={!username || !password}
                >
                  Pay Now
                </motion.button>

                {/* Only show "Create one" link when not in create mode and no error */}
                {!paymentError && (
                  <div className="text-center pt-4 border-t border-white/20">
                    <p className="text-white/60 text-sm">
                      Don't have an account?{" "}
                      <button
                        className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                        onClick={() => setShowCreate(true)}
                      >
                        Create one
                      </button>
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="font-semibold text-white text-lg">
                  Create Payment Account
                </h2>

                <AnimatePresence>
                  {paymentError && (
                    <motion.div
                      className="p-4 bg-red-500/20 border border-red-400/30 rounded-xl relative"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start">
                        <svg
                          className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-red-300 text-sm pr-6">
                          {paymentError}
                        </span>
                      </div>
                      {/* Close button for error message */}
                      <button
                        onClick={closeErrorMessage}
                        className="absolute top-3 right-3 text-red-300 hover:text-red-100 transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-white/40 transition-all duration-200"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-white/40 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Choose a username"
                      value={createUsername}
                      onChange={(e) => setCreateUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-white/40 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      value={createPassword}
                      onChange={(e) => setCreatePassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-white/40 transition-all duration-200"
                    />
                  </div>
                </div>

                <motion.button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateAccount}
                  disabled={
                    !firstName ||
                    !lastName ||
                    !createUsername ||
                    !createPassword
                  }
                >
                  Create Account
                </motion.button>

                <div className="text-center pt-4 border-t border-white/20">
                  <p className="text-white/60 text-sm">
                    Already have an account?{" "}
                    <button
                      className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      onClick={() => setShowCreate(false)}
                    >
                      Go back to Pay
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Loan Modal with Dynamic Amounts */}
      <AnimatePresence>
        {showLoanModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoanModal(false)}
          >
            <motion.div
              className="relative bg-slate-900/95 rounded-3xl shadow-2xl max-w-sm w-full border border-white/20"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-5 text-white rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Dynamic Loan</h3>
                    <p className="text-cyan-100 text-sm">
                      Borrow what you need
                    </p>
                  </div>
                  <button
                    onClick={() => setShowLoanModal(false)}
                    className="text-white hover:text-cyan-200 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
              <div className="p-5 bg-slate-800/80">
                {!loanAccepted ? (
                  <div className="space-y-4">
                    {hasActiveLoan ? (
                      /* Already has active loan */
                      <div className="text-center py-4">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-6 h-6 text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Active Loan
                        </h3>
                        <p className="text-white/60 text-sm mb-3">
                          Please repay your current loan first.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-400 mb-1">
                            ${loanAmount}
                          </div>
                          <div className="text-white/60 text-sm">
                            Selected Loan Amount
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {loanOptions.map((amount) => (
                            <button
                              key={amount}
                              onClick={() => setLoanAmount(amount)}
                              className={`py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                loanAmount === amount
                                  ? "bg-cyan-500 text-white shadow-md"
                                  : "bg-white/10 text-white/80 hover:bg-white/20"
                              }`}
                            >
                              ${amount}
                            </button>
                          ))}
                        </div>

                        {/* Custom Amount Input */}
                        <div>
                          <label className="block text-sm font-medium text-white/80 mb-1">
                            Custom amount:
                          </label>
                          <input
                            type="number"
                            min="100"
                            max="2000"
                            value={loanAmount}
                            onChange={handleCustomAmountChange}
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white text-center text-sm placeholder-white/40 transition-all duration-200"
                            placeholder="Enter amount"
                          />
                          <div className="flex justify-between text-white/60 text-xs mt-1">
                            <span>Min: $100</span>
                            <span>Max: $2000</span>
                          </div>
                        </div>

                        {/* Loan Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Booking Cost:</span>
                            <span className="text-cyan-400 font-semibold">
                              ${totalPrice}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60">Repayment:</span>
                            <span className="text-white font-semibold">
                              30 days
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <button
                            className="flex-1 bg-white/10 text-white py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm"
                            onClick={() => setShowLoanModal(false)}
                          >
                            Cancel
                          </button>
                          <motion.button
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAcceptLoan}
                            disabled={loanAmount < 100 || loanAmount > 2000}
                          >
                            Borrow ${loanAmount}
                          </motion.button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* Success State */
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3"
                    >
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Loan Approved!
                    </h3>
                    <p className="text-white/60 text-sm mb-2">
                      ${loanAmount} added to your account
                    </p>
                    <p className="text-cyan-400 font-semibold text-sm">
                      Complete your booking now
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}