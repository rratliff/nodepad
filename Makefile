lint:
	find . -name "*.js" |grep -v node_modules | xargs  jslint --sloppy --nomen

test:
	mocha --reporter spec --no-colors

.PHONY: test lint
