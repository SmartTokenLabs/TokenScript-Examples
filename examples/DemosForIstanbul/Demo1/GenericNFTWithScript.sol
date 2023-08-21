// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { ERC5169 } from "stl-contracts/ERC/ERC5169.sol";

contract GenericNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter public _tokenIdCounter;
    uint private _maxSupply = 10000;
    string private _scriptURI;

    string private constant _metadata = "https://metadata.artlab.xyz/01892bef-5488-84a9-a800-92d55e4e534e/";

    address private easContractAddress;

    constructor() ERC721("TokenScript Demo #1", "TSD") {
        _tokenIdCounter.increment();
        _scriptURI = "ipfs://QmdkzDdiAx7cqWU2XgGhgzgqRr4LRtjYXbvLZ5viSDajkB";
        mintUsingSequentialTokenId();
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

}