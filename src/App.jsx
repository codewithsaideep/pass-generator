import { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState("");
  const [numAllowed, setNumAllowed] = useState(false);
  const [length, setLength] = useState(10);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let char = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    for (let i = 0; i < length; i++) {
      const num = Math.floor(Math.random() * str.length);
      char += str.charAt(num);
    }
    setPassword(char);
  }, [numAllowed, length, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, charAllowed, numAllowed]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-2xl mb-4 text-center">Password Generator</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="password"
            value={password}
            readOnly
            className="flex-1 bg-white text-black p-2 rounded-l-lg"
          />
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(password);
              document.getElementById("clipboard").innerHTML = "Copied to clipboard";
            }}
            className="bg-blue-500 p-2 rounded-r-lg"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              type="range"
              value={length}
              min={0}
              max={50}
              onChange={(e) => setLength(e.target.value)}
              className="flex-1"
            />
            <label className="text-orange-500">Length: {length}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
              className="form-checkbox text-orange-500"
            />
            <label className="text-orange-500">Characters</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={(e) => setNumAllowed(e.target.checked)}
              className="form-checkbox text-orange-500"
            />
            <label className="text-orange-500">Numbers</label>
          </div>
        </div>
        <div id="clipboard" className="text-center mt-4 text-lime-500"></div>
      </div>
    </div>
  );
}

export default App;
