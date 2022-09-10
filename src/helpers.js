export const pluralize = (count, word) => {
  return count === 1 ? `1 ${word}` : `${count} ${word}s`;
};

export const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const MONEY_AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/;

export const isMoneyAmountValid = amount => {
  const trimmedAmount = amount.trim();

  return (
    MONEY_AMOUNT_REGEX.test(trimmedAmount) && parseFloat(trimmedAmount) !== 0
  );
};

export const isDescriptionValid = description => description.trim() !== "";

export const isDateValid = date => {
  const timestamp = Date.parse(date);

  return (
    !isNaN(timestamp) &&
    timestamp > 1420070400000 && // new Date('2015-01-01').getTime()
    timestamp < 3313526400000 // new Date('2075-01-01').getTime()
  );
};

export const isMoneyRecordValid = ({
  lender,
  borrower,
  amount,
  description,
  date
}) =>
  lender !== null &&
  borrower !== null &&
  isMoneyAmountValid(amount) &&
  isDescriptionValid(description) &&
  isDateValid(date);

const MONTHS = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};

export const formatRecordDate = recordDate => {
  const currentYear = new Date().getFullYear();
  const month = MONTHS[recordDate.slice(5, 7)];
  const day = recordDate.slice(8, 10);

  if (recordDate.startsWith(currentYear)) {
    return `${day} ${month}`;
  }

  const year = recordDate.slice(0, 4);

  return `${day} ${month}, ${year}`;
};

export const shortenLenderOrBorrower = lenderOrBorrower => {
  switch (lenderOrBorrower) {
    case "leva":
      return "L";
    case "danik":
      return "D";
    case "2masters":
      return "2M";
    default:
      return "?";
  }
};

export const getLevaOwesDanikDiff = ({ lender, borrower, amount }) => {
  if (lender === "2masters" && borrower === "danik") {
    return -amount / 2;
  }

  if (lender === "2masters" && borrower === "leva") {
    return amount / 2;
  }

  if (lender === "leva" && borrower === "2masters") {
    return -amount / 2;
  }

  if (lender === "danik" && borrower === "2masters") {
    return amount / 2;
  }

  if (lender === "leva" && borrower === "danik") {
    return -amount;
  }

  if (lender === "danik" && borrower === "leva") {
    return amount;
  }

  return 0;
};

export const getMessage = () => {
  switch (getToday().slice(5)) {
    case "01-31":
      return "Happy Birthday Markusha!";
    case "03-09":
      return "Happy Birthday Danik!";
    case "04-29":
      return "Happy Birthday Julia!";
    case "05-31":
      return "Happy Birthday Michelle!";
    case "06-09":
      return "Happy Birthday Josh!";
    case "08-03":
      return "Happy Birthday Leva!";
    case "10-03":
      return "Happy Birthday Amira!";
    case "11-01":
      return "Happy Birthday Luda!";
    default:
      return null;
  }
};

// See: https://stackoverflow.com/a/33897213/247243
export const getOrderedResults = dataSnapshot => {
  const result = {};

  if (!dataSnapshot) {
    return result;
  }

  dataSnapshot.forEach(childSnapshot => {
    result[childSnapshot.key] = childSnapshot.val();
  });

  return result;
};

const LEAVE_AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/;

export const isLeaveAmountValid = amount => {
  const trimmedAmount = amount.trim();

  return LEAVE_AMOUNT_REGEX.test(trimmedAmount);
};

export const isLeaveRecordValid = ({
  person,
  description,
  startDate,
  amount
}) =>
  person !== null &&
  isDescriptionValid(description) &&
  isDateValid(startDate) &&
  isLeaveAmountValid(amount);

export function getLevaHasDiff({ person, amount }) {
  return person === "leva" ? -amount : amount;
}

export function formatName(name) {
  return name === "" ? "" : name[0].toUpperCase() + name.slice(1);
}
