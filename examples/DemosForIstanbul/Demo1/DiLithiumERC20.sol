// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ISequentialMint {
    function mintUsingSequentialTokenId() external;
    function balanceOf(address owner) view external returns (uint256);
}

contract DiLithiumToken is ERC20, Ownable
{
    address private NFTLock = 0x910179fa965CB822c95BF7c21a1846A1B6DE1D99;
    mapping(address => bool) private _canSpend; 

    constructor() ERC20("STL Di-lithium Power", "STLD") 
    {

    }

    function addCanSpend(address canSpend) public onlyOwner 
    {
        _canSpend[canSpend] = true;
    }

    function _spendAllowance(address owner, address spender, uint256 amount) internal override virtual {
        if (!_canSpend[spender]) //allow if allowed spender
        {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
        }
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        emit Transfer(from, to, amount);
        return true;
    }
    
    function mint() public 
    {
        ISequentialMint nftControl = ISequentialMint(NFTLock);
        //Get Balance
        uint256 userBal = nftControl.balanceOf(msg.sender);
        //only allow minting if user holds the NFT
        require (userBal > 0, "You don't hold the NFT");

        _mint(msg.sender, 20 * (10 ** 18));
    }
}