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
	echo '	$ TOKENSCRIPT_SCHEMA=/home/james/TokenScript-Repo/www/2019/10/tokenscript/tokenscript.xsd  ./validate.sh */*.xml */*/*.xml'
fi

CWD=${PWD}
for i in "$@"
do
	# ignore all folders with space in it
	echo "$i" | grep ' '  && continue

	if [ -f "${i%.xml}.canonicalized.xml" ]; then
	    rm  "${i%.xml}.canonicalized.xml"
	fi

	BN=`basename "$i" .xml`

	cd "${i%/*.xml}"

	make "${BN}.canonicalized.xml" > /dev/null && echo "[Valid] : $i"

	cd $CWD
	## the following is very important to prevent these XML files being picked up in the next run
	if [ -f "${i%.xml}.canonicalized.xml" ]; then
	    rm  "${i%.xml}.canonicalized.xml"
	fi
done;
