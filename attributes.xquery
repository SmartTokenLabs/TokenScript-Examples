declare namespace ts = "http://tokenscript.org/2020/06/tokenscript";
declare namespace eth = "urn:ethereum:constantinople";
let $collection := collection("examples")
for $refs in $collection/ts:token/ts:attribute/ts:origins/eth:*/ts:data/*[@ref]
return $refs