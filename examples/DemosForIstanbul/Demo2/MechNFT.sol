// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20Check {
    function balanceOf(address owner) view external returns (uint256);
}

contract MechNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter public _tokenIdCounter;
    uint private _maxSupply = 10000;
    string private _scriptURI;

    address private STLTokens = 0x62130D3EC0A74D797BD3B1645222843a601F92Ae;

    string private constant _metadata = "https://ipfs.io/ipfs/Qmcob1MaPTXUZt5MztHEgsYhrf7R6G7wV8hpcweL8nEfgU/meka/";

    address private easContractAddress;

    constructor() ERC721("TokenScript Demo #2", "TSD2") {
        _tokenIdCounter.increment();
        _scriptURI = "";
        mintUsingSequentialTokenId();
    }

    function updatePayment(address newPTokens) public onlyOwner
    {
        STLTokens = newPTokens;
    }

    function getChainId() public view returns (uint256 chainId) {
        chainId = block.chainid;
    }

    function scriptURI() public view returns (string memory) {
        return _scriptURI;
    }

    function updateScriptURI(string memory newScript) public onlyOwner {
        _scriptURI = newScript;
    }

    function contractURI() public pure returns (string memory) {
        return "ipfs://QmR4Ti6huhEKh3pWQZ8tRuSGJaB7FvWuRDVzWYRmZsQAjF";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "tokenURI: URI query for nonexistent token");
        return string(abi.encodePacked(_metadata, tokenId.toString()));
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable) returns (bool) {
        return
            ERC721Enumerable.supportsInterface(interfaceId);
    }

    function mintUsingSequentialTokenId() public returns (uint256 tokenId) {
        tokenId = _tokenIdCounter.current();
        require(tokenId < _maxSupply, "Hit upper mint limit");
        _mint(msg.sender, tokenId);
        _tokenIdCounter.increment();
    }

    function burnToken(uint256 tokenId) public {
        require(_exists(tokenId), "burn: nonexistent token");
        require(ownerOf(tokenId) == msg.sender || msg.sender == owner(), "Token must be owned");
        _burn(tokenId);
    }

    function canMint() public view returns (bool) {
        IERC20Check nftControl = IERC20Check(STLTokens);
        //Get Balance
        uint256 userBal = nftControl.balanceOf(msg.sender);
        //only allow minting if user holds the NFT
        if (userBal >= 20 * (10 ** 18)) 
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
}