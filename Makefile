install: node_modules/.bin/install-to-adb
	$(CURDIR)/node_modules/.bin/install-to-adb $(CURDIR)

node_modules/.bin/install-to-adb:
	npm install git+https://github.com/sole/install-to-adb.git
