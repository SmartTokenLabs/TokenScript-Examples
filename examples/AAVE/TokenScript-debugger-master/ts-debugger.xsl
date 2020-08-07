<?xml version="1.0" encoding="UTF-8" ?>
<xsl:transform version="1.0"
					xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
					xmlns:ts="http://tokenscript.org/2020/06/tokenscript"
					xmlns:ethereum="urn:ethereum:constantinople"
					xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
					xmlns:html="http://www.w3.org/1999/xhtml"
					exclude-result-prefixes="xsl ts ethereum xsi">

	<xsl:output method="html" encoding="UTF-8" indent="yes"/>
	<xsl:strip-space elements="*"/>

	<xsl:template match="/|@*|node()">
		<xsl:apply-templates select="@*|node()"/>
	</xsl:template>
	<xsl:template match="/ts:token">
		<html>
			<head>
				<title>TokenScript Debugger</title>
				<h3>Debug your TokenScript XML by refreshing the page</h3>
				<!--script src="jquery.min.js" type="text/javascript" charset="utf-8">/* */</script-->
				<script src="ts-debugger.js" type="text/javascript" charset="utf-8">/* */</script>
			</head>
			<body onload="loadIframe()">
				<xsl:apply-templates select="@*|node()"/>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="ts:item-view|ts:view">
		<h5>TS input details: <xsl:value-of select="concat(local-name(.), ' for ', local-name(..), ' having type as ', ../@type )"/></h5>
		<iframe height="300" width="90%" title="Iframe">
			<xsl:for-each select="html:style">
				<style type="text/css">
					<xsl:value-of select="."/>
				</style>
			</xsl:for-each>
			<xsl:for-each select="html:script">
				<script type="text/javascript">
					<xsl:value-of select="."/>
				</script>
			</xsl:for-each>
			<xsl:choose>
				<xsl:when test="html:body">
					<xsl:for-each select="html:body">
						<xsl:copy-of select="."/>
					</xsl:for-each>
				</xsl:when>
				<xsl:otherwise>
					<h3 style="margin-left: 44%;margin-top: 11%;">No HTML Content</h3>
				</xsl:otherwise>
			</xsl:choose>
		</iframe>
	</xsl:template>
</xsl:transform>
