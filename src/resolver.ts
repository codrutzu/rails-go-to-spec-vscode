export function getRelated(file) {
	if (isSpec(file)) {
		return specToCode(file);
	} else {
		return codeToSpec(file);
	}
}

export function isSpec(file) {
	return file.indexOf('_spec.rb') > -1;
}

export function codeToSpec(file) {
	var viewRegex = /erb$|haml$|slim$/
	var controllerRegex = /controllers/
	var isViewFile = file.match(viewRegex);
	var isControllerFile = file.match(controllerRegex);

	if (isViewFile) {
		return file
			.replace('/app/', '/spec/')
			.replace('.haml', '.haml_spec.rb')
			.replace('.erb', '.erb_spec.rb')
			.replace('.slim', '.slim_spec.rb');
	}

	if (isControllerFile) {
		file = file.replace('/controllers/', '/requests/');
	}

	file = file.replace('.rb', '_spec.rb');

	var isLibFile = file.indexOf('/lib/') > -1;
	if (isLibFile) {
		return file.replace('/lib/', '/spec/lib/');
	}

	return file.replace('/app/', '/spec/');
}

export function specToCode(file: string) {
	var controllerRegex = /requests/
	var viewRegex = /(.erb|.haml|.slim)_spec.rb$/;

	var isViewFile = file.match(viewRegex);
	var isControllerFile = file.match(controllerRegex);

	if (isViewFile) {
		return file
			.replace('_spec.rb', '')
			.replace('/spec', '/app');
	}

	file = file.replace('_spec.rb', '.rb');

	if (isControllerFile) {
		file = file.replace('/requests/', '/controllers/')
	}

	var isLibFile = file.indexOf('/spec/lib/') > -1;
	if (isLibFile) {
		return file.replace('/spec/lib/', '/lib/');
	}

	return file.replace('/spec/', '/app/');
}

