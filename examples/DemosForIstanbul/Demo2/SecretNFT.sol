// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20Tokens {
    function balanceOf(address owner) view external returns (uint256);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface ITokenCheck {
    function balanceOf(address owner) view external returns (uint256);
}

contract SecretNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter public _tokenIdCounter;
    uint private _maxSupply = 10000;
    string private _scriptURI;

    string constant private _element1 = "{ " 
            "\"name\": \"";
    string constant private _element2 = "\", \"image\":" 
            "\"ipfs://QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/";
    string constant private _element3 = ".png\" }";        

    mapping(uint256 => string) private _names;  

    address private _STLTokens = 0x62130D3EC0A74D797BD3B1645222843a601F92Ae;
    address private _MintingToken = 0xc6906a1D878B9e09c80964dd60b52aC92E1113E6;
    uint256 private _mintCost = 20 * (10 ** 18);

    address private easContractAddress;

    constructor() ERC721("Secret TokenScript Token", "STT") {
        _tokenIdCounter.increment();
        _scriptURI = "";
    }

    function updatePayment(address newPTokens) public onlyOwner
    {
        _STLTokens = newPTokens;
    }

    function updateMinting(address newMToken) public onlyOwner
    {
        _MintingToken = newMToken;
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

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable) returns (bool) {
        return
            ERC721Enumerable.supportsInterface(interfaceId);
    }

    function mintWithName(string memory newName) public returns (uint256 tokenId)
    {
        //1. check we have enough coins
        //2. check we have the NFT
        tokenId = _tokenIdCounter.current();
        require (canMint(msg.sender), "You don't have permission to mint");
        require(tokenId < _maxSupply, "Hit upper mint limit");
        
        //3. Spend coins
        IERC20Tokens spendTokens = IERC20Tokens(_STLTokens);
        if (spendTokens.transferFrom(msg.sender, address(this), _mintCost))
        {
            //spent the tokens, now mint the new token and write the metadata
            _mint(msg.sender, tokenId);
            _names[tokenId] = newName;
            _tokenIdCounter.increment();
        }
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "tokenURI: URI query for nonexistent token");

        return string(abi.encodePacked(_element1, _names[tokenId], _element2, tokenId.toString()
                        , _element3));
    }

    function burnToken(uint256 tokenId) public {
        require(_exists(tokenId), "burn: nonexistent token");
        require(ownerOf(tokenId) == msg.sender || msg.sender == owner(), "Token must be owned");
        _burn(tokenId);
    }

    function canMint(address sender) public view returns (bool) {
        ITokenCheck nftControl = ITokenCheck(_STLTokens);
        //Get Balance
        uint256 userBal = nftControl.balanceOf(sender);
        //only allow minting if user holds the NFT
        if (userBal < _mintCost)
        {
            return false;
        } 

        //does own the minting token?
        ITokenCheck mintingNFT = ITokenCheck(_MintingToken);
        userBal = mintingNFT.balanceOf(sender);
        if (userBal == 0)
        {
            return false;
        } 
        else 
        {
            return true;
        }
    }
}