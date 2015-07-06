SOURCES = $(shell git ls-tree -r master --name-only | grep -v \.gitignore)

all: package

package:
	mkdir -p dist
	zip dist/package.zip $(SOURCES)

clean:
	rm -f dist/package.zip

install: node_modules/.bin/install-to-adb
	$(CURDIR)/node_modules/.bin/install-to-adb $(CURDIR)

node_modules/.bin/install-to-adb:
	npm install git+https://github.com/sole/install-to-adb.git
