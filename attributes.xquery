declare namespace ts = "http://tokenscript.org/2020/06/tokenscript";
declare namespace eth = "urn:ethereum:constantinople";
let $examples := collection("examples")
let $refs := $examples/ts:token/ts:attribute/ts:origins/eth:*/ts:data/*[@ref]
let $local-refs := $examples/ts:token/ts:cards/ts:card/ts:attribute/ts:origins/eth:*/ts:data/*[@local-ref]
return $refs