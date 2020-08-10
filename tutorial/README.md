
# TokenScript for your token
These instructions will help you create a TokenScript interface for a smart contract.
User interface code and business logic is organised in XML declarations for a TokenScript engine to render in a mobile wallet. E.g. [AlphaWallet](https://alphawallet.com/).


## Creating your token and UI widgets

* Open (Ethereum Studio)[studio.ethereum.org], and start the Coin project
  * It shows the smart contract and front-end files, and runs a vm and the Coin files in the browser

Although not conforming to the ERC20 interface, a few changes to the example code will have it demonstrable in AlphaWallet
* Add the following to the Coin contract
```
contract Coin {
	//...

    string public name = "Coin";
    uint256 public decimals = 18;
    string public symbol = "COIN";

	// Returns balance of an address
    function balanceOf(address addr) public view returns (uint) {
        return balances[addr];
    }

```
* lastly rename the `function send(` to `function transfer(`

* (optional) you're welcome to modify this Coin example, or use an erc20 contract of your choosing.


Once you're happy with your contract compiling and running here, we will next deploy to the Ropsten Ethereum test network.

### Deploy Token Contract

At the time of writing, studio.ethereum.org defaults contract deployment to the JavaScriptVM.
[Remix](remix.ethereum.org) is a convenient way to deploy to Ropsten:

* Open [remix](remix.ethereum.org) in a new tab, and choose the `Solidity` environment
* Create a new file (also name it Coin.sol)
* From studio, copy the source of `contracts/Coin.sol`. Then in remix, paste in the new Coin.sol
* In the next studio tab, `compiler`, click `Compile Coin.sol`
* In the next studio tab
  * select `Environment` -> `Injected Web3` (e.g. MetaMask, Ropsten)
  * click `Deploy`
  * (keep studio open you'll need it later for the contract abi)
* Once deployed, copy the contract address to the clipboard

### View in AlphaWallet

To see the default rendering of the contract as a fungible token:

* Open AlphaWallet on your mobile
* Tap the `+` in the top-right corner
  * this is required to manually show tokens that you don't have a balance for
  * (alternately, in remix you can use the `mint` function, to give your wallet address some Coin, eg: `wallet_address, 88000000000000000000`)
* Enter your contract address:
  * A convenient way is (from your computer) to open (etherscan)[etherscan.io], paste in your address (then enter). Then click on the little QR icon to the right of the address in the top-left (next to the copy button).
  * Alternately, paste the contract address into any [QR code generator](https://www.cssscript.com/demo/flexible-client-side-qr-code-generator/) (Like TokenScript, this one rendered locally in the browser)
  * Tap the camera on the address field to scan
* Once you've added the contract address (QR code or otherwise), you should see the token card `Coin (COIN)`, tagged as `Ropsten`

## Your first TokenScript

### Constructing your xml file (current schema 2019/10)

* In studio, create a new file Coin.xml, and initialise with this template (notice the `name="Coin"` and reference in `origins` for your Coin token contract):
```
<?xml version="1.0" encoding="UTF-8"?>
<ts:token xmlns:ts="http://tokenscript.org/2019/10/tokenscript"
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:xml="http://www.w3.org/XML/1998/namespace"
          xsi:schemaLocation="http://tokenscript.org/2019/10/tokenscript http://tokenscript.org/2019/10/tokenscript/tokenscript.xsd"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          custodian="false"
>
    <ts:name>
        <ts:string xml:lang="en">Coin</ts:string>
    </ts:name>
    <ts:contract name="Coin" interface="erc20">
        <ts:address network="3">YOUR_CONTRACT_ADDRESS</ts:address>
    </ts:contract>
    <ts:origins>
        <ts:ethereum contract="Coin"></ts:ethereum>
    </ts:origins>
    <ts:cards>
        <!-- action cards will go here -->
    </ts:cards>
    <ts:attribute-types>
        <!-- attributes will go here -->
    <ts:attribute-types>
</ts:token>
```

In the contract address, where the network is 3 for Ropsten, paste your contract address in place of `YOUR_CONTRACT_ADDRESS`.

The UI elements rendering in studio (app.html) will be captured differently for TokenScript. Rather than a single view, individual actions are isolated in action cards.

* For the action of Minting, create a new file called mint.shtml, and initialise with this template:
```
<script type="text/javascript"><![CDATA[
class Token {
    constructor(tokenInstance) {
        this.props = tokenInstance

    }

    render() {
        return `
        <div class="ui container">
            <div class="ui segment">

            </div>
        </div>`;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens) => {
    const currentTokenInstance = web3.tokens.data.currentInstance;
    document.getElementById('root').innerHTML = new Token(currentTokenInstance).render();
};

]]></script>
<div id="root"></div>

```

* mint.shtml: Inside the "ui segment" div, copy/paste contents of the "create" div from app.html
  * notice the "create-address" and "create-address" input fields


* Coin.xml: At the top of the xml (after the version tag), include references to front-end files `app.css` and `mint.shtml`:
  * (For reference, full TokenScript file provided -> `tutorial-files/Coin.xml`)
```
<!DOCTYPE token  [
    <!ENTITY style SYSTEM "app.css">
    <!ENTITY mint.en SYSTEM "mint.shtml">
    ]>
```

  * Coin.xml: Inside the <ts:cards> section, add the following <ts:action>. The english name is "Mint", and front-end files referenced (style and view).
```
        <ts:action>
            <ts:name>
                <ts:string xml:lang="en">Mint</ts:string>
            </ts:name>
            ...
            <!-- attributetype tags -->
            ...
            <!-- transaction tag -->
            ...
            <style type="text/css">&style;</style>
            <ts:view>&mint.en;</ts:view>
        </ts:action>
```

  * Coin.xml: To refer to the input types that will be used in a smart contract call, add their attribute-type (notice "create-address" and "create-amount")

```
			...
            <ts:attribute-type id="create-address" syntax="1.3.6.1.4.1.1466.115.121.1.15">
                <ts:name>
                    <ts:string xml:lang="en">Address to receive created tokens</ts:string>
                </ts:name>
                <ts:origins>
                    <ts:user-entry as="address"/>
                </ts:origins>
            </ts:attribute-type>
            <ts:attribute-type id="create-amount" syntax="1.3.6.1.4.1.1466.115.121.1.36">
                <ts:name>
                    <ts:string xml:lang="en">Amount to create</ts:string>
                </ts:name>
                <ts:origins>
                    <!-- e18 is a hard coded multiplier.
                    rationale for hardcoding: avoiding over-design -->
                    <ts:user-entry as="e18"/>
                </ts:origins>
            </ts:attribute-type>
            ...
```

  * Coin.xml: Lastly add the transaction (refers to ethereum smart contract, function, and params in the data tag)
```
            <ts:transaction>
                <ts:ethereum function="mint" contract="Coin">
                    <ts:data>
                        <ts:address ref="create-address"/>
                        <ts:uint256 ref="create-amount"/>
                    </ts:data>
                </ts:ethereum>
            </ts:transaction>
```
* Download the xml, css, shtml files, and jump to the section below to test: `Combining files and testing`
  * The required `Makefile` for combining these files is in `tutorial-files`
* Next steps: Once you have been able to test the Mint action, you'll notice the transaction is sent, but does not succeed because the wallet is not the minter.
  * Add a function in the smart contract to set the minter address with a parameter, call from remix with the wallet address
  * Alternately, add a standard `approve` function in the smart contract, and duplicate/modify the `mint` action in `Coin.xml`.

### [future] Obtaining sample files (schema 2020/03)

A really good starting point to generating your own TokenScript (for the upcoming 2020/03 schema) is available with this [ABI-to-TokenScript tool](https://alphawallet.github.io/ABI-to-TokenScript/):

* Enter the contract address
* From remix, copy the contract abi, and paste it in the ABI-to-TokenScript tool
* Enter a contract name, eg "Coin"
* Select erc20 (although this example from studio doesn't completely conform to the erc20 interface)
* Finally, select your network (e.g. Ropsten)
* Click `Create your TokenScript!`, and download `Coin.zip`

Inside you will find:
* A shared.css file
* javascript files of the form <name>.<lang>.js (e.g. for actions: about.en.js, approve.en.js)
* The precursor to your tokenscript file: Coin-TokenScript.xml
  * Confirm the network e.g. ropsten `<ts:address network="3">...contract_address...`
  * Rename this file to Coin.xml for simplicity
* A Makefile to combine the above files

In the following section we'll combine these files in the xml.

### Combining files and testing

Disclaimer: iOS users can simply airdrop the set of js/css/xml files to their device.

To combine the files you will need at least [xmllint](#xmllint) to combine the files, this will give you an unsigned (.canonicalized.xml) file for testing.
When you want to have the file associated with your domain's SSL key, you will then need [xmlsectool](#xmlsectool-optional-signing) create a signed file (.tsml).

* download/install the xmllint command line tool (See instructions [below](#xmllint))
  * can check with `xmllint --version`
* in terminal, from the project directory, run `make Coin.canonicalized.xml`
  * this will look for Coin.xml and use xmllint to combine resources into the output file

Congratulations, you can now add `Coin.canonicalized.xml` TokenScript for use in AlphaWallet!

* Note: Android users will have to ensure "TokenScript Overrides" is turned on in the Settings tab to give access to locally stored xml files.
* Using your tool of choice, copy the file to your device that has AlphaWallet installed
* you can either open the file directly, or manually move it to the AlphaWallet directory
  * eg Android: Internal storage `/AlphaWallet`
* Now in AlphaWallet's Wallet tab, you should see the Coin token card.
* Tapping on the token card will go to the token view, and the row of buttons (or "...") will see additional actions
  * Tap the action to see your action card, enter inputs, then `Confirm` to execute the transaction

## Tools

### [ABI-to-TokenScript tool](https://alphawallet.github.io/ABI-to-TokenScript/)
ABI to TokenScript

### [TokenScript Visualiser](https://github.com/AlphaWallet/TokenScript-Viewer)
You can use the TokenScript Viewer to see the major parts in a TokenScript file.


### xmllint
To get started you will need `xmllint` to import you resource files (eg html/css/js...) into a single canonicalized xml file.

Linux: in `libxml2-utils` - eg `sudo apt install libxml2-utils`
OSX: Pre-installed
Windows: See below

### Windows users

xmllint and xmlsec are available from xmlsoft.org. Precompiled binaries (tools and all dependencies) can be downloaded with curl commands below.
*Alternative:* For convenience [this zip]() has all binary files in a single folder that you can then move to a folder on your PATH.

```
curl -O http://xmlsoft.org/sources/win32/iconv-1.9.2.win32.zip -o iconv-1.9.2.win32.zip
curl -O http://xmlsoft.org/sources/win32/libxml2-2.7.8.win32.zip -o libxml2-2.7.8.win32.zip
curl -O http://xmlsoft.org/sources/win32/libxmlsec-1.2.18.win32.zip -o libxmlsec-1.2.18.win32.zip
curl -O http://xmlsoft.org/sources/win32/libxslt-1.1.26.win32.zip -o libxslt-1.1.26.win32.zip
curl -O http://xmlsoft.org/sources/win32/openssl-0.9.8a.win32.zip -o openssl-0.9.8a.win32.zip
curl -O http://xmlsoft.org/sources/win32/xsldbg-3.1.7.win32.zip -o xsldbg-3.1.7.win32.zip
curl -O http://xmlsoft.org/sources/win32/zlib-1.2.5.win32.zip -o zlib-1.2.5.win32.zip
```
([md5sum here](http://xmlsoft.org/sources/win32/md5sum.txt) for verification)

**Ensure all binaries accessible in PATH**

In lieu of adding each of the corresponding `bin` folders to your PATH variable, you can copy the contents of each `bin` folder (.dll/.exe files) to one folder and put that folder in your PATH.

### xmlsectool (optional signing)
Each OS: installation instructions [here](https://wiki.shibboleth.net/confluence/display/XSTJ2/xmlsectool+V2+Home#xmlsectoolV2Home-ObtainingandUsingxmlsectool) (java).

### (deprecated) xmlstarlet
Linux: `sudo apt install xmlstarlet`
OSX: `brew install xmlstarlet`
Windows: https://sourceforge.net/projects/xmlstar/files/

### (future) xmlsec
Linux: `sudo apt install xmlsec1`
OSX: `brew install libxmlsec1`
Windows: See section `Windows users` above.
