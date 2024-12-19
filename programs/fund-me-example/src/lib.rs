use anchor_lang::prelude::*;

#[program]
mod fund_me_example {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let accounts = ctx.accounts;
        accounts.user_wallet.initialize()?;
        accounts.fund_me_wallet.initialize()?;
        Ok(())
    }
    
    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> ProgramResult {
        let user_ata = &ctx.accounts.user_wallet;
        let wallet_ata = &ctx.accounts.fund_me_wallet;

        if amount <= 0 {
            return Err(ProgramError::InvalidArgs);
        }

        if user_ata.amount(ctx.accounts.user_info.key) < amount {
            return Err(ProgramError::InsufficientFunds);
        }

        // Transfer token from user to contract
        anchor_lang::solana::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::solana::system_program::Transfer {
                    from: ctx.accounts.user_wallet.to_account_info(),
                    to: ctx.accounts.fund_me_wallet.to_account_info(),
                }
            ).amount(amount)
        )?;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> ProgramResult {
        let user_ata = &ctx.accounts.user_wallet;
        let wallet_ata = &ctx.accounts.fund_me_wallet;

        if amount <= 0 {
            return Err(ProgramError::InvalidArgs);
        }

        if wallet_ata.amount(ctx.accounts.fund_me_info.key) < amount {
            return Err(ProgramError::InsufficientFunds);
        }

        // Transfer token from contract to user
        anchor_lang::solana::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::solana::system_program::Transfer {
                    from: ctx.accounts.fund_me_wallet.to_account_info(),
                    to: ctx.accounts.user_wallet.to_account_info(),
                }
            ).amount(amount)
        )?;

        Ok(())
    }
}
