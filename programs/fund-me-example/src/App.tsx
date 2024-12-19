import * as anchor from '@project-serum/anchor';
import React, { useState } from 'react';

function App() {
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

    async function handleDeposit() {
        // Initialize connection and program
        const connectn = new anchor.web3.Connection(
            anchor.web3.Cluster.devnet,
            'confirmed'
        );
        const provider = new anchor.Provider(connectn, anchor.workletWallet, {});
        const idl = // Your IDL
        const program = new anchor.Program(idl, // Program ID
            new anchor.web3.PublicKey(//Program address
            ), provider);

        const wallet = // Your Wallet
        // Transaction logic 
        // await program.rpc.deposit(new anchor.BN(depositAmount))
        //     ...
    }

    async function handleWithdraw() {
        // Similar steps to deposit
    }

    return (
        <div>
            <h1>Simple Fund Me DApp</h1>
            <div>
                <h2>Deposit:</h2>
                <input type="number" value={depositAmount} onChange={e=> setDepositAmount(Number(e.target.value))} />
                <button onClick={handleDeposit}>Deposit</button>
            </div>
            <div>
                <h2>Withdraw:</h2>
                <input type="number" value={withdrawAmount} onChange={e=> setWithdrawAmount(Number(e.target.value))} />
                <button onClick={handleWithdraw}>Withdraw</button>
            </div>
        </div>
    );
}

export default App;
