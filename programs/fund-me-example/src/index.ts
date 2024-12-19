import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import { Provider, Wallet } from '@project-serum/anchor';
import idl from '../idl.json'; // Import Anchor program IDl

const programId = new PublicKey(idl.metadata.address);

async function main() {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const provider = new Provider(connection, Wallet.local(), {});
    const program = new AnchorProvider(connection, Wallet.local(), idl);

    // Example: User deposits a token
    // const depositTx = await program.program.methods.deposit(new BN(100)).rpc();
    // console.log(`Transaction Signature ${tx}: ${depositTx}`);

    // Example: User withdraws a token
    // const withdrawTx = await program.program.methods.withdraw(new BN(100)).rpc();
    // console.log(`Transaction Signature ${tx}: ${withdrawTx}`);
}

main();
