import { useState, useCallback, useEffect, useRef } from "react";
import { useTheme } from "../../Contexts/PasswordGenerator/useTheme";
import ToggleThmeButton from "./ToggleThmeButton";

const PasswordGenerator = () => {
  const { isDarkMode } = useTheme();
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let password = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let number = "0123456789";
    let specialChar = "!@#$%^&*()_+";

    if (numberAllowed) str += number;
    if (charAllowed) str += specialChar;

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copypasswordtoclipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Apply body background based on theme
  document.body.className = isDarkMode
    ? "bg-gradient-to-br from-gray-900 to-gray-800"
    : "bg-gradient-to-br from-gray-100 to-gray-300";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className={`${isDarkMode ? "bg-gray-800/90 text-gray-100" : "bg-white/80 text-gray-900"
          } w-full max-w-lg rounded-xl shadow-2xl p-6 transition-all duration-300 backdrop-blur-md border ${isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center mb-6 shadow-lg rounded-lg overflow-hidden relative">
          <input
            type="text"
            value={password}
            className={`p-3 w-full text-lg font-mono ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
              } outline-none`}
            placeholder="Your Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copypasswordtoclipboard}
            className={`relative bg-gradient-to-r ${isCopied
              ? "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              : "from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              } text-white px-4 py-3 font-medium transition-all duration-200`}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
          {/* Temporary Message */}
          {isCopied && (
            <span
              className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md text-sm font-medium text-white bg-green-500/90 shadow-md animate-fade-in-out`}
            >
              Password Copied!
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Length Slider */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex justify-between">
              <span>Length</span>
              <span className="text-orange-500 font-bold">{length}</span>
            </label>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="w-5 h-5 accent-orange-500 cursor-pointer"
              />
              <label className="font-medium">Numbers</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setcharAllowed((prev) => !prev)}
                className="w-5 h-5 accent-orange-500 cursor-pointer"
              />
              <label className="font-medium">Special Characters</label>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="mt-6 flex justify-center">
          <ToggleThmeButton />
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;