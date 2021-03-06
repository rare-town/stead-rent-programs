const fs = require("fs");
const anchor = require("@project-serum/anchor");
import { SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";

const idl = require("../target/idl/stead_rent.json");

module.exports = async function (provider) {
  anchor.setProvider(provider);

  const program = new anchor.Program(idl, idl.metadata.address, provider);

  const [state, stateBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("state")],
    program.programId
  );

  console.log("State:", state.toString());
  console.log("Owner:", provider.wallet.publicKey.toString());
  console.log("Program ID:", program.programId.toString());

  await program.rpc.initializeState(
    stateBump,
    provider.wallet.publicKey,
    100, // 1% fee
    {
      accounts: {
        state: state,
        payer: provider.wallet.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      },
    }
  );

  fs.writeFileSync(
    "../deployment.json",
    JSON.stringify(
      {
        programKey: idl.metadata.address.toString(),
        stateKey: state.toString(),
      },
      null,
      2
    )
  );
};
