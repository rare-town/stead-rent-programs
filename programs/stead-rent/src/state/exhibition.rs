use anchor_lang::prelude::*;

use crate::InitExhibitionBumpSeeds;

/// Rental property that will serve as an art gallery
#[account]
pub struct Exhibition {
    /// The owner property where the exhibition takes place
    pub renter: Pubkey,
    
    /// The property hosting the exhibition
    pub property: Pubkey,

    /// The owner of tokens to be displayed in the exhibition
    pub exhibitor: Pubkey,

    /// The number of pieces currently in the exhibition
    pub n_pieces: u64,

    /// Bumps used to sign PDA
    pub bumps: InitExhibitionBumpSeeds,
}

impl Exhibition {
    pub const LEN: usize = 40 + 40 + 40 + 8;
}