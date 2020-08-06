

const validateFieldBlank = (obj) => {
	let errs = {};
	let valid = true;

	for( let item in obj ){
		if(obj[item].trim().length < 1){
			errs[item] = `${item} cannot be empty`; 
			valid = false;
		}
	}
	return { errs, valid };
}

export const validationPolls = (obj) => {
	return validateFieldBlank(obj)
}

export const validationSingIn = (obj) => {
	return validateFieldBlank(obj);
}

export const validationSingUp = (obj) => {
	return validateFieldBlank(obj);
}


