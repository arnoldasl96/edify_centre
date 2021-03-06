/* eslint-disable linebreak-style */
const ValidateTitle = (title) => {
  if (!title.length) {
    return { valid: false, error: 'This field is required' };
  }
  if (title.length > 130) {
    return { valid: false, error: 'Max length of title is 130' };
  }
  return { valid: true, error: null };
};
const ValidateTrainer = (name) => {
  if (!name.length) {
    return { valid: false, error: 'This field is required' };
  }
  return { valid: true, error: null };
};
const ValidatePrice = (price) => {
  if (price === null) {
    return { valid: true, error: null };
  }
  if (price < 0) {
    return { valid: false, error: 'Price has to be positive' };
  }
  if (price >= 250) {
    return { valid: false, error: "Price can't be more than 250 euros!" };
  }

  return { valid: true, error: null };
};
const ValidateCategory = (category) => {
  if (!category.length) {
    return { valid: false, error: 'This field is required' };
  }
  return { valid: true, error: null };
};

const ValidateDates = (starts, ends) => {
  const now = Date.now();
  const from = new Date(starts);
  const to = new Date(ends);
  if (starts === '' && ends === '') {
    return { valid: true, error: null };
  }
  if (from.getTime() > to.getTime()) {
    return { valid: false, error: 'starting date cannot be later than ending date' };
  }
  if (to.getTime() < now) {
    return { valid: false, error: 'ending date cannot be in the past' };
  }
  return { valid: true, error: null };
};
const ValidateHours = (Hours) => {
  if (Hours === null) return { valid: true, error: null };
  if (Hours < 0) {
    return { valid: false, error: 'Hours has to be positive' };
  }
  return { valid: true, error: null };
};
const FormatDate = (varDate) => {
  const date_ob = new Date(varDate);
  // adjust 0 before single digit date
  const date = (`0${date_ob.getDate()}`).slice(-2);
  // current month
  const month = (`0${date_ob.getMonth() + 1}`).slice(-2);

  // current year
  const year = date_ob.getFullYear();
  return `${year}-${month}-${date}`;
};
const FormatDateHours = (varDate) => {
  const date_ob = new Date(varDate);
  // adjust 0 before single digit date
  const date = (`0${date_ob.getDate()}`).slice(-2);
  // current month
  const month = (`0${date_ob.getMonth() + 1}`).slice(-2);

  // current year
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
  return `${year}-${month}-${date}T${hours}:${minutes}`;
};

module.exports.ValidateTitle = ValidateTitle;
module.exports.FormatDate = FormatDate;
module.exports.FormatDateHours = FormatDateHours;
module.exports.ValidateTrainer = ValidateTrainer;
module.exports.ValidatePrice = ValidatePrice;
module.exports.ValidateCategory = ValidateCategory;
module.exports.ValidateDates = ValidateDates;
module.exports.ValidateHours = ValidateHours;
