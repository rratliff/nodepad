lint:
	find . -name "*.js" |grep -v node_modules | xargs  jslint --sloppy --nomen

test:
	mocha

.PHONY: test lint
