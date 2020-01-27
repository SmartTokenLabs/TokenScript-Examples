# TokenScript-Examples
A repo full of complete TokenScripts which you can use for your own tokens that run natively on AlphaWallet iOS and Android 

## Why TokenScript?
TokenScripts are secure modules which execute token logic in a signed container. TokenScripts are designed to run on mobile ethereum wallets with a native feel and authenticity protection as each TokenScript is signed by a valid authority and cannot be tampered with.

If you are a token issuer who wants to provide you token as a service to mobile users or you want third party developers to use your token logic securly, then TokenScript is the perfect framework for you. 

## How to benefit from this repository 
If you have a token and you want to create your own TokenScript you can easily do so by copying some of the existing examples and fitting your own logic into them

## For generic ERC20 Tokens
Copy the AlphaWallet-Discovery-Token or WETH TokenScript and fit your logic into it. With ERC20 TokenScripts you can easily display relevant information to the user via an action page or execute transaction logic like making deposits or converting your token. 

## For ERC20 DeFi Tokens
If you have an ERC20 token which is for DeFi use cases, I recommend copying one of the compound cTokens and changing it for your own token.

## For ERC721 Tokens (NFT)
Copy the EDCON xml and shtml files and change them for your token. With TokenScripts you can easily localise your business logic for another language, interpret your token ids via a bitmask without a third party service like OpenSea and display your unique tokens via a layout which will be presented to the mobile user in a native like feel. 


## Trying out TokenScript
FYI, Join our Telegram group <https://t.me/AlphaWalletGroup> if you need any assistance. 

Tokenscript design weekly meetings, Time: 7pm, Thursday (Sydney Time) Weekly, <a target="_blank" href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=NnNxanAycHRoZm9hazUwNzJ0OGt0cjFlbjJfMjAxOTEyMDVUMDgwMDAwWiB2aWN0b3IuemhhbmdAYWxwaGF3YWxsZXQuY29t&amp;tmsrc=victor.zhang%40alphawallet.com&amp;scp=ALL"><img border="0" src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"></a>

For iOS:

1. Install the latest AlphaWallet app from the app store. 
2. In the AlphaWallet app, go to Wallet (first tab) and tap the `+` button and paste the contract address `0x63cCEF733a093E5Bd773b41C96D3eCE361464942` to make the wallet display the token 
3. Go to our repository at <https://github.com/AlphaWallet/TokenScript-Examples/tree/master/examples/EntryToken> and AirDrop the files `EntryToken.xml`, `token.en.shtml`, `shared.css` and `enter.en.shtml` from your Mac to your iPhone. If you have access to the files in mobile Safari, you can also choose to "Open in AlphaWallet" from the iOS share menu
4. In the AlphaWallet app, go to Wallet tab and tap on the token "TokenScript Test Tokens (TKS)"
5. In the AlphaWallet app, check the Settings tab > `TokenScript Overrides` for the list of TokenScript files. Swipe to delete or tap to share. You can AirDrop the files to another iPhone which has AlphaWallet TestFlight installed

For Android:

1. Install the latest AlphaWallet app from the play store.
2. In the AlphaWallet app, go to Wallet (first tab) and tap the `+` button and paste the contract address `0x63cCEF733a093E5Bd773b41C96D3eCE361464942` to make the wallet display the token
3. Go to our repository at <https://github.com/AlphaWallet/TokenScript-Examples/tree/master/examples/EntryToken>, run 'make EntryToken.canonicalized.xml' and drag and drop the file into the sdcard/home/AlphaWallet folder (on your android device). 
4. In the AlphaWallet app, go to Wallet tab and tap on the token "TokenScript Test Tokens (TKS)"
5. In the AlphaWallet app, check the Settings tab > `TokenScript Overrides` for the list of TokenScript files. Swipe to delete or tap to share. 

## For more information about TokenScript and its implementation 
Visit our main repo [here](https://github.com/AlphaWallet/TokenScript) or visit our main website and forum [here](https://tokenscript.org/)

## Questions?
Feel free to email us at feedback@alphawallet.com, we would love to hear any of your questions or comments. 
