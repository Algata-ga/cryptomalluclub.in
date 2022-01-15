.PHONY : build live

build :
	parcel build index.html

live : build
	tar czf site-cryptochallenger.tar.gz dist/
	scp site-cryptochallenger.tar.gz ajrx@server.algata.ga:/home/ajrx/
clean :
	rm -rf dist &> /dev/null
	rm site-cryptochallenger.tar.gz &> /dev/null




