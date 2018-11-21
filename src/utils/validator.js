const { UnprocessableError } = require('../errors');

exports.bodyValidationHandler = next => result => {
  if (result.isEmpty()) return;

  if (!next)
    throw new UnprocessableError(
      result
        .array()
        .map(i => `'${i.param}' has ${i.msg}`)
        .join(' ')
    );
  else
    return next(
      new UnprocessableError(
        result
          .array()
          .map(i => `'${i.param}' has ${i.msg}`)
          .join(' ')
      )
    );
};
