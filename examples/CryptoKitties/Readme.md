# Cryptokittes breeding script
## Currently only works on Android AlphaWallet

This script allows you to breed kitties.

Breeding kitties involves several functions:

First is the breeding function:
```
breedWithAuto(kittyMom#ID, kittyPop#ID)
```
Which takes two parameters the mom and pop, and must be sent with a breeding fee, around 0.001 Eth.

Then, assuming all goes well you 'call the midwife', which produces a new cryptokitty and releases the breeding fee to the caller:
```
giveBirth(kittyMom#ID)
```

There are two simple breeding rules, which make perfect sense:
1. Kitty mom cannot already be pregnant.
2. Kitty mom and pop cannot be related by previous birth.

There are two supporting functions which check these two rules:
```
bool isReadyToBreed(kittyMom#ID)
```

```
bool canBreedWith(kittyCandidate1#ID, kittyCandidate2#ID)
```

Both functions need to return true in order to breed. Notice that this allows a surreal situation - you can make a kitty pregnant, then use that kitty as the 'pop' in another breeding - Iain M Banks would approve.

In the script, you will notice there are no item views or views - this is because we will use the default view for ERC721 which we are already happy with.
Function 1 is 'Breed Kitty'. Because the ethereum function definition includes two tokenIds so you need to select two kitties to call this. The primary token (in this case the mom; see the breedWithAuto function above) is selected using long press.

Once two kitties are selected and the breed button clicked, the function view requires two remote attributes to be resolved. See this part of the script:

```
<span><b>Breed Kitties</b><br></span>
<span>Kitty mom: ${this.props.tokenIds[0]}</span><span> Ready to breed: ${this.props.canBreed}<br></span>
<span>Kitty pop: ${this.props.tokenIds[1]}<br></span><br>
<span>Valid breeding pair: ${this.props.isAllowedToBreed}</span>
```
There are two properties sourced from the attributes canBreed and isAllowedToBreed.

These attributes are declared in the attribute-types at the bottom of the script:
```
        <!-- is kitty breedable? -->
        <ts:attribute-type id="canBreed" syntax="1.3.6.1.4.1.1466.115.121.1.7">
            <!-- boolean -->
            <ts:origins>
                <ts:ethereum as="bool" contract="Kitty" function="isReadyToBreed">
                    <ts:data>
                        <ts:uint256 ref="tokenId"/>
                    </ts:data>
                </ts:ethereum>
            </ts:origins>
        </ts:attribute-type>
        <!-- are these two kitties allowed to breed together? -->
        <ts:attribute-type id="isAllowedToBreed" syntax="1.3.6.1.4.1.1466.115.121.1.7">
            <!-- boolean -->
            <ts:origins>
                <ts:ethereum as="bool" contract="Kitty" function="canBreedWith">
                    <ts:data>
                        <ts:uint256 ref="tokenId[0]"/>
                        <ts:uint256 ref="tokenId[1]"/>
                    </ts:data>
                </ts:ethereum>
            </ts:origins>
        </ts:attribute-type>
```

These two declarations are origins:ethereum so they require a function call to contract 'Kitty' to be resolved.

Once resolved the simple function card will display the results showing if the pair can breed; you need both 'Ready to breed' and 'Valid breeding pair' to be TRUE.
Clicking on the 'breed' button at the bottom will form the transaction as declared in the card and take you to the confirmation page. Note the midwife fee 'value' in wei which is sent with the transaction.
```
        <ts:transaction>
            <ts:ethereum contract="Kitty" function="breedWithAuto">
                <ts:data>
                    <ts:uint256 ref="tokenId[0]"/>
                    <ts:uint256 ref="tokenId[1]"/>
                </ts:data>
                <ts:value>1000000000000000</ts:value>
            </ts:ethereum>
        </ts:transaction>
```
After this transaction is written to a block, the kitty is ready to be born. Check the transaction page and wait for the transaction to be written.

Go back to the kitties view and find the kitty mom. Click on the mom and try the 'Birth' function. The simple function card for this function looks like this:
```
var pregnant = "FALSE";
        if (this.props.canBreed == "FALSE") {
          pregnant = "TRUE";
        }
		
...		
		
<b>Midwife Function</b><br></span>
<span>Kitty to give Birth: ${this.props.tokenId}<br></span>
<span>Kitty pregnant?: ${pregnant}<br></span></div></div>
```

There's no 'isPregant' function in kitties but you can use the 'isReadyToBreed' function instead to determine if the kitty is pregnant.

Assuming everything went ok you should see a 'TRUE' here. Click on the 'Birth' button at the bottom and the breeding function will be called:
```
	<ts:transaction>
            <ts:ethereum contract="Kitty" function="giveBirth">
                <ts:data>
                    <ts:uint256 ref="tokenId"/>
                </ts:data>
            </ts:ethereum>
        </ts:transaction>
```
This will return the breeding fee you staked in the first function. The game added this feature to ensure that kitties aren't left pregnant. On main-net it became a 'cottage industry' to call the giveBrith function as you could earn 1 ETH by acting as midwife a thousand times.

Once the transaction is written you should shortly see the new kitty pop into your inventory. It's actually quite a lot of fun, and the script illustrates how simple it is to breed kitties in your wallet.
