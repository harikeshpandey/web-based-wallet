import { generateMnemonic } from "bip39";
import { useState } from "react";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;

function Mneumonic() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div>
      <input type="text" value={mnemonic} readOnly />{" "}
      <button
        onClick={() => {
          const mn = generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Generate Mnemonic
      </button>
    </div>
  );
}

export default Mneumonic;
