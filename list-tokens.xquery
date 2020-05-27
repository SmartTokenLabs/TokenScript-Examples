let $collection := collection("examples")
for $file in $collection
return document-uri($file)