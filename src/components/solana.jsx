import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const addWallet = () => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);

      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      const derivedSeed32 = derivedSeed.slice(0, 32);

      const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed32).secretKey;

      const keypair = Keypair.fromSecretKey(secretKey);

      setPublicKeys((prevKeys) => [...prevKeys, keypair.publicKey.toBase58()]);

      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };

  return (
    <div>
      <button onClick={addWallet}>Add wallet</button>
      {publicKeys.map((publicKey, index) => (
        <div key={index}>{publicKey}</div>
      ))}
    </div>
  );
}
