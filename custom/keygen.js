//TODO I can't bind these DOM elements, probably becuase they aren't yet rendered why I try.
// Maybe this should be part of a plugin that runs afterEach or something
// https://docsify.now.sh/write-a-plugin
// const genButton = document.getElementById("gen-button");
//
// genButton.addEventListener("click", () => {
//   console.log("clicked");
// })
// const edBox = document.getElementById("ed25519");
// const srBox = document.getElementById("sr25519");




const phrase = "year violin rifle stage lend excite fluid suit lunar carbon capital wheel";
const k = new keyring.Keyring(); // Implicit type ed25519

// $ subkey -e inspect "year violin rifle stage lend excite fluid suit lunar carbon capital wheel"
// Secret phrase `year violin rifle stage lend excite fluid suit lunar carbon capital wheel` is account:
//   Secret seed: 0x30b0a496e908779b3b18696f5cfc399663da10a3ab12f684da255c6824a65ac6
//   Public key (hex): 0xf09806b297070a8bf4a598da240b9d48070175f1380358f07f21500039a1a91d
//   Address (SS58): 5HWAWaDydET1CwN3949wZbr4pSBbXB5ScJ1L1vhjLYY72GJy
const edKey = k.addFromUri(phrase, {}, "ed25519");
console.log(edKey.address);
console.log(util.u8aToHex(edKey.publicKey));


// $ subkey -s inspect "year violin rifle stage lend excite fluid suit lunar carbon capital wheel"
// Secret phrase `year violin rifle stage lend excite fluid suit lunar carbon capital wheel` is account:
//   Secret seed: 0x30b0a496e908779b3b18696f5cfc399663da10a3ab12f684da255c6824a65ac6
//   Public key (hex): 0x16b5afef420796a1a06d10e554f559833da408017b14340c642e1b38816dc124
//   Address (SS58): 5CaUtAhLTq66UXKJUPe5JaGVvZdzAYePneicTAoDM1pBhNHP
const srKey = k.addFromUri(phrase, {}, "sr25519");
console.log(srKey.address);
console.log(util.u8aToHex(srKey.publicKey));
