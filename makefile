.PHONY : build live

build :
	parcel build index.html

live : build
	tar czf site-cryptomalluclub.tar.gz dist/
	scp -4 site-cryptomalluclub.tar.gz ajrx@server.algata.ga:/home/ajrx/
clean :
	rm -rf dist &> /dev/null
	rm site-cryptomalluclub.tar.gz &> /dev/null




