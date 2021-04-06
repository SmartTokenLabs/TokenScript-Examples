ifeq ($(TOKENSCRIPT_SCHEMA),)
TOKENSCRIPT_SCHEMA=http://tokenscript.org/2020/06/tokenscript.xsd
endif

ifeq ($(XMLSECTOOL),)
XMLSECTOOL=xmlsectool
endif

ifeq ($(XMLLINT),)
XMLLINT=xmllint
endif

ifeq ($(XMLSEC),)
XMLSEC=xmlsec1 # xmlsec for Linux/Windows
endif

ifeq ($(SIGNATURE_ALGORITHM),)
SIGNATURE_ALGORITHM=rsa-sha256
endif

help:
	# Needs a target, example: $$ make EntryToken.canonicalized.xml
	#
	# Let's say you have a TokenScript "EntryToken.xml"
	# - to validate and canonicalize, add 'canonicalized' in the filename
	@echo $$ make EntryToken.canonicalized.xml
	# - to sign, use tsml as file extension:
	@echo $$ make EntryToken.tsml

%.canonicalized.xml : %.xml
	# XML canonicalization and validation against TS schema
	$(XMLLINT) --c14n $^ > $@ && \
	 $(XMLLINT) --noout --schema $(TOKENSCRIPT_SCHEMA) $@ || \
	 (mv $@ $@.TEST && exit 1)

%.tsml: %.canonicalized.xml
ifeq (,$(KEYPARAMS))
	@echo ---------------- KEYPARAMS missing. Examples on how to use this ----------------
	@echo Example using key file and certificate files
	@echo $$ make SIGNATURE_ALGORITHM=ecdsa-sha256 KEYPARAMS='"--key ~/KEYS/aw.app.key --certificate ~/KEYS/positiveSSL/aw_app.crt --keyInfoKeyName AlphaWallet"' $@
	@echo Example using keystore file
	@echo $$ make KEYPARAMS='--keystore shong.wang.p12 --keyPassword=shong.wang --keyInfoName="Shong Wang"' $@
	@echo replace it with your .p12 file and your password
	rm $^
else
	# Signing with xmlsec requires original .xml file to contain the Signature tag.
	# $(XMLSEC) sign --pkcs12:"$(KEYINFO)" $(KEYSTORE) --pwd "$(KEYPASSWORD)" --output $@ $^
	# For now use xmlsectool...
	$(XMLSECTOOL) --sign --digest SHA-256 --signatureAlgorithm http://www.w3.org/2001/04/xmldsig-more#$(SIGNATURE_ALGORITHM) --inFile $^ --outFile $@  --signaturePosition LAST $(KEYPARAMS)
	# removing the canonicalized created for validation
	rm $^
endif
