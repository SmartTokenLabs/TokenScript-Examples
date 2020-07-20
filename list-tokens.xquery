let $collection := collection("repo")
for $file in $collection
return document-uri($file)
