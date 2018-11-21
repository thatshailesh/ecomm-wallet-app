const generaterr = require('generaterr');
const STATUS = require('../constants/status');

// Not authenticated
exports.UnauthorizedError = generaterr('UnauthorizedError', {
  status: STATUS.UNAUTHORIZED,
});

// The real unauthorized
exports.ForbiddenError = generaterr('ForbiddenError', {
  status: STATUS.FORBIDDEN,
});

// Other errors
exports.PreconditionError = generaterr('PreconditionError', {
  status: STATUS.PRECONDITION_FAILED,
});
exports.BadRequestError = generaterr('BadRequestError', {
  status: STATUS.BAD_REQUEST,
});
exports.UnprocessableError = generaterr('UnprocessableError', {
  status: STATUS.UNPROCESSABLE,
});
exports.NotFoundError = generaterr('NotFoundError', {
  status: STATUS.NOT_FOUND,
});
exports.InternalError = generaterr('InternalError', {
  status: STATUS.INTERNAL_ERROR,
});
exports.ConflictError = generaterr('ConflictError', {
  status: STATUS.CONFLICT,
});
exports.DuplicateError = generaterr('DuplicateError', {
  status: STATUS.DUPLICATE,
});
