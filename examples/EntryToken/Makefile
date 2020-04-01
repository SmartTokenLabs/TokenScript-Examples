ifeq ($(TOKENSCRIPT_SCHEMA),)
TOKENSCRIPT_SCHEMA=http://tokenscript.org/2019/10/tokenscript/tokenscript.xsd
endif
XMLLINT=xmllint
XMLSEC=xmlsec1 # xmlsec for Linux/Windows
XMLSECTOOL=xmlsectool
KEYSTORE=
KEY=1
KEYPASSWORD=
SIGNATURE_ALGORITHM=rsa-sha256

help:
	# Needs a target, example: $$ make EntryToken.canonicalized.xml
	#
	# Let's say you have a TokenScript "EntryToken.xml"
	#- to validate and canonicalize, add 'canonicalized' in the filename
	@echo $$ make EntryToken.canonicalized.xml
	# - to sign, use tsml as file extension:
	@echo $$ make EntryToken.tsml

%.canonicalized.xml : %.xml
	# XML canonicalization and validation against TS schema
	$(XMLLINT) --c14n $^ > $@ && \
	 $(XMLLINT) --noout --schema http://tokenscript.org/2019/10/tokenscript/tokenscript.xsd $@ || \
	 (mv $@ $@.INVALID && exit 1)

%.tsml: %.canonicalized.xml
ifeq (,$(KEYSTORE))
	@echo ---------------- Keystore missing. Try this ----------------
	@echo $$ make KEYSTORE=shong.wang.p12 KEYPASSWORD=shong.wang $@
	@echo replace it with your .p12 file and your password
else
	# Signing with xmlsec requires original .xml file to contain the Signature tag.
	# $(XMLSEC) sign --pkcs12:"Shong Wang" $(KEYSTORE) --pwd $(KEYPASSWORD) --output $@ $^
	# For now use xmlsectool...
	$(XMLSECTOOL) --sign --keyInfoKeyName 'Shong Wang' --digest SHA-256 --signatureAlgorithm http://www.w3.org/2001/04/xmldsig-more#$(SIGNATURE_ALGORITHM) --inFile $^ --outFile $@ --keystore $(KEYSTORE) --keystoreType PKCS12 --key $(KEY) --keyPassword $(KEYPASSWORD) --signaturePosition LAST
	rm $^
endif
