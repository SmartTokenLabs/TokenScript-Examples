
# TokenScript Examples
This repo contains complete TokenScripts examples which you can use to get started with your own tokens. Natively run on AlphaWallet iOS and Android.

**Available content:**
- ENS Tokens
- EntryTokens
- Karma: Car Usage Tokens
- UEFA / FIFA Ticket Tokens
- EdCon Ticket Tokens
- ERC20: AAVE, BestRates, Compound, DAI, DDEX, DeFiMoneyMarket, NEST, SAI, USDC, Uniswap, WETH, dForce

![tokenscript examples alphawallet tokens](/img/readme/tokenscript-examples.jpg)

## Why use TokenScript?
TokenScripts are signed modules which execute token logic in a secure container. TokenScripts are designed to run on mobile Ethereum Wallets with a native feel and authenticity protection as each TokenScript is signed by a valid authority, thus tampering can be detected.

If you are a token issuer who wants to provide your token as a service to mobile users, or you want third party developers to use your token logic securely, then TokenScript is the perfect framework for you.

## How to benefit from this repository
If you have a token and you want to extend its functionality and make it more portable with TokenScript, you can easily get started by copying some of the existing examples and fitting your own logic into them.

## For generic ERC20 tokens
Copy the `AlphaWallet-Discovery-Token` or `WETH TokenScript` and fit your logic into it. With ERC20 TokenScripts, you can easily display relevant information to the user via an action page or execute transaction logic like making deposits or converting your token.

## For ERC20 DeFi tokens
If you have an ERC20 token used in DeFi use cases, we recommend copying one of the compound cTokens and changing it for your own token.

## For ERC721 tokens (Non-Fungible Tokens)
Copy the EDCON `.xml` and `.shtml` files and change them for your token.

With TokenScripts, you can easily localise your business logic for another language, interpret your token ids via a bitmask without a third party service like OpenSea and display your unique tokens via a layout which will be presented to the mobile user in a native like feel.


## Find support 👨‍💻 👩‍💻

**Need assistance?**
Join and let us know issues or feedback at [Telegram](https://t.me/AlphaWalletGroup), [Twitter](https://twitter.com/AlphaWallet) or through our [community forums](https://community.tokenscript.org/).

**Tokenscript Design Weekly Meetings**
Time: 7PM (Sydney/AEST time), every Thursday.

Add to Calendar: <a href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=NnNxanAycHRoZm9hazUwNzJ0OGt0cjFlbjJfMjAxOTEyMDVUMDgwMDAwWiB2aWN0b3IuemhhbmdAYWxwaGF3YWxsZXQuY29t&amp;tmsrc=victor.zhang%40alphawallet.com&amp;scp=ALL"><img border="0" src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"></a>

You can also email us at feedback@alphawallet.com. We would love to hear any of your questions or comments.

## Trying TokenScript

### For iOS:

1. Install the latest <a href='https://itunes.apple.com/us/app/alphawallet/id1358230430?ls=1&mt=8'>AlphaWallet iOS App</a> from the App Store.
2. In the AlphaWallet app, go to Wallet (first tab) and tap the `Add/Hide Tokens +` button above your tokens
3. Tap the `+` button in the top right corner
4. Paste the Contract Address `0x63cCEF733a093E5Bd773b41C96D3eCE361464942` to make the wallet display the token. The remaining information will auto-fill.
5. Go to our repository at <https://github.com/AlphaWallet/TokenScript-Examples/tree/master/examples/EntryToken> and AirDrop the files `EntryToken.xml`, `token.en.shtml`, `shared.css` and `enter.en.shtml` from your Mac to your iPhone. If you have access to the files in mobile Safari, you can also choose to "Open in AlphaWallet" from the iOS share menu
6. In the AlphaWallet app, go to Wallet tab and tap on the token "TokenScript Test Tokens (TKS)"
7. In the AlphaWallet app, check the Settings tab > `TokenScript Overrides` for the list of TokenScript files. Swipe to delete or tap to share. You can AirDrop the files to another iPhone which has AlphaWallet TestFlight installed

### For Android:

1. Install the latest <a href='https://play.google.com/store/apps/details?id=io.stormbird.wallet&hl=en&utm_source=github-readme&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>AlphaWallet Android App</a> from the Play Store.
2. In the AlphaWallet app, go to Wallet (first tab) and tap the `Add/Hide Tokens +` button above your tokens
3. Tap the `+` button in the top right corner
4. Paste the Contract Address `0x63cCEF733a093E5Bd773b41C96D3eCE361464942` to make the wallet display the token. The remaining information will auto-fill.
5. Go to our repository at <https://github.com/AlphaWallet/TokenScript-Examples/tree/master/examples/EntryToken>, run 'make EntryToken.canonicalized.xml' and drag and drop the file into the sdcard/home/AlphaWallet folder (on your android device).
6. In the AlphaWallet app, go to Wallet tab and tap on the token "TokenScript Test Tokens (TKS)"
7. In the AlphaWallet app, check the Settings tab > `TokenScript Overrides` for the list of TokenScript files. Swipe to delete or tap to share.

## For more information about TokenScript and its implementation...

Want to learn what TokenScript is first? Visit our main repository [TokenScript](https://github.com/AlphaWallet/TokenScript), [website](https://tokenscript.org/) or visit our [community forum](https://community.tokenscript.org/c/AlphaWallet).

## Contributors

Thank you to all the contributors! You are awesome.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/James-Sangalli"><img src="https://avatars0.githubusercontent.com/u/16630514?v=4" width="100px;" alt=""/><br/><sub><b>James Sangalli</b></sub></a><br/><a href="https://github.com/AlphaWallet/TokenScript-Examples/commits?author=James-Sangalli" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/colourful-land"><img src="https://avatars3.githubusercontent.com/u/548435?v=4" width="100px;" alt=""/><br /><sub><b>Weiwu Zhang</b></sub></a><br /><a href="https://github.com/AlphaWallet/TokenScript-Examples/commits?author=colourful-land" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/JamesSmartCell"><img src="https://avatars2.githubusercontent.com/u/12689544?v=4" width="100px;" alt=""/><br /><sub><b>James Brown</b></sub></a><br /><a href="https://github.com/AlphaWallet/TokenScript-Examples/commits?author=JamesSmartCell" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jzaki"><img src="https://avatars3.githubusercontent.com/u/939603?v=4" width="100px;" alt=""/><br /><sub><b>James Zaki</b></sub></a><br /><a href="https://github.com/AlphaWallet/alpha-wallet-ios/commits?author=jzaki" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hboon"><img src="https://avatars2.githubusercontent.com/u/56189?v=4" width="100px;" alt=""/><br /><sub><b>Hwee-Boon Yar</b></sub></a><br /><a href="#ideas-hboon" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zhangzhongnan928"><img src="https://avatars2.githubusercontent.com/u/33795543?v=4" width="100px;" alt=""/><br /><sub><b>Victor Zhang</b></sub></a><br /><a href="#ideas-zhangzhongnan928" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/hellolucas"><img src="https://avatars3.githubusercontent.com/u/17125002?v=4" width="100px;" alt=""/><br /><sub><b>Lucas Toledo</b></sub></a><br /><a href="https://github.com/AlphaWallet/TokenScript-Examples/commits?author=hellolucas" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ChintanRathod"><img src="https://avatars0.githubusercontent.com/u/4371780?s=460&u=aeffa77e91dfaf95990f355328b2b0636bcb9877&v=4" width="100px;" alt=""/><br /><sub><b>Chintan Rathod</b></sub></a><br /><a href="https://github.com/AlphaWallet/TokenScript-Examples/commits?author=ChintanRathod" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/coreycaplan3"><img src="https://avatars3.githubusercontent.com/u/13280244?s=460&u=4a4261476b882e93238af58910e3b39150216454&v=4" width="100px;" alt=""/><br /><sub><b>Corey Caplan</b></sub></a><br /><a href="https://github.com/AlphaWallet/TokenScript-Examples/commits?author=coreycaplan3" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
TokenScript is available under the [MIT license](https://github.com/AlphaWallet/TokenScript-Examples/blob/master/LICENSE). Free for commercial and non-commercial use.
