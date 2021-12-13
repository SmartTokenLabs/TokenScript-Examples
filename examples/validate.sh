#!/bin/sh

if [ $# -eq 0 ]; then
	echo Usage:
	echo '	$ ./validate.sh directory/filename.xml'
	echo which validates the said XML file - a TokenScript file
	echo '	'
	echo You can do a blanket test of all xml files by:
	echo '	$ ./validate.sh */*.xml */*/*.xml'
	echo '	'
	echo 'You can specify a schema file (with absolute path)'
	echo '	$ TOKENSCRIPT_SCHEMA=/home/james/TokenScript-Repo/www/2020/03/tokenscript/tokenscript.xsd  ./validate.sh */*.xml */*/*.xml'
fi

CWD=${PWD}
PASS=TRUE
for i in "$@"
do
	# ignore all folders with space in it
	echo "$i" | grep ' '  && continue

	if [ -f "${i%.xml}.canonicalized.xml" ]; then
	    rm  "${i%.xml}.canonicalized.xml"
	fi
	
	if [ ${i##*.} != "xml" ]; then
	    echo "Only accepts .xml file."
	    exit
	fi

	BN=`basename "$i" .xml`

	cd "${i%/*.xml}"

	if make "${BN}.canonicalized.xml" > /dev/null; then
		echo "[Valid]   : $i"
        else
		PASS=FALSE
        fi

	cd $CWD
	## the following is very important to prevent these XML files being picked up in the next run
	if [ -f "${i%.xml}.canonicalized.xml" ]; then
	    rm  "${i%.xml}.canonicalized.xml"
	fi
done;
if [ $PASS = FALSE ] ; then exit 1; fi
