 //* Problem 1: replace all internal whitespace in a string value with underscore

function snake(value) {

  value = value.trim().toLowerCase();
  
  value = value.replace(/[\s\t.]+/g, '_');
  
  return value;
}

//* Problem 2: create an HTML <video> element for the given url.

function createVideo(src, width, controls) {

  src = src.trim();

  let videoHTML = '<video';

  videoHTML += ` src="${src}"`;

  if (typeof width === 'number' || (typeof width === 'string' && /^\d+$/.test(width))) {
    videoHTML += ` width="${width}"`;
  }

  if (controls) {
    videoHTML += ' controls';
  }

  videoHTML += '></video>';

  return videoHTML;
}

//* Problem 3: extract Date from date string

function parseDateString(value) {
  if (typeof value !== 'string') {
    throw new Error('Invalid date string');
  }

  const parts = value.split('-');
  
  if (parts.length !== 3) {
    throw new Error('Invalid date format');
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; 
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date format');
  }

  const date = new Date();
  date.setFullYear(year, month, day);

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    throw new Error('Invalid date');
  }

  return date;
}

//* Problem 4: convert Date to date string with specified format.

function toDateString(value) {
  if (!(value instanceof Date && !isNaN(value))) {
    throw new Error('Invalid date');
  }

  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const day = value.getDate();

  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');

  const dateString = `${year}-${paddedMonth}-${paddedDay}`;

  return dateString;
}

 //* Problem 5: parse a geographic coordinate

 function normalizeCoord(value) {
  if (typeof value !== 'string') {
    throw new Error('Invalid coordinate format');
  }

  const regex = /^\[?(-?\d+(?:\.\d+)?),?\s*(-?\d+(?:\.\d+)?)\]?$/;

  const match = value.match(regex);

  if (!match || match.length !== 3) {
    throw new Error('Invalid coordinate format');
  }

  const latitude = parseFloat(match[2]);
  const longitude = parseFloat(match[1]);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Invalid coordinate format');
  }

  if (latitude < -90 || latitude > 90) {
    throw new Error('Invalid latitude value');
  }

  if (longitude < -180 || longitude > 180) {
    throw new Error('Invalid longitude value');
  }

  const formattedCoord = `(${latitude}, ${longitude})`;

  return formattedCoord;
}

 //* Problem 6: format any number of coordinates as a list in a string

 function formatCoords(...values) {
  const formattedCoordinates = values
    .map((coordinate) => {
      try {
        return normalizeCoord(coordinate);
      } catch (error) {
        return null;
      }
    })
    .filter((coordinate) => coordinate !== null);

  const coordinateList = `(${formattedCoordinates.join(', ')})`;

  return coordinateList;
}

 //* Problem 7: determine MIME type from filename extension

  //* Problem 8, Part 1: generate license text and link from license code.

  function generateLicenseLink(licenseCode, targetBlank = false) {
  const licenseMap = {
    'CC-BY': 'Creative Commons Attribution License',
    'CC-BY-NC': 'Creative Commons Attribution-NonCommercial License',
    'CC-BY-SA': 'Creative Commons Attribution-ShareAlike License',
    'CC-BY-ND': 'Creative Commons Attribution-NoDerivs License',
    'CC-BY-NC-SA': 'Creative Commons Attribution-NonCommercial-ShareAlike License',
    'CC-BY-NC-ND': 'Creative Commons Attribution-NonCommercial-NoDerivs License',
  };

  const licenseText = licenseMap[licenseCode] || 'All Rights Reserved';
  const licenseUrl =
    licenseMap[licenseCode]
      ? `https://creativecommons.org/licenses/${licenseCode.slice(3).toLowerCase()}/4.0/`
      : 'https://choosealicense.com/no-permission/';

  const linkTarget = targetBlank ? ' target="_blank"' : '';

  return `<a href="${licenseUrl}"${linkTarget}>${licenseText}</a>`;
}

 //* Problem 9 Part 1: convert a value to a Boolean (true or false)

 function pureBool(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  const trueValues = ['yes', 'y', 'oui', 'o', 't', 'true', 'vrai', 'v', '1'];
  const falseValues = ['no', 'non', 'n', 'f', 'false', 'faux', '0'];

  value = String(value).toLowerCase();

  if (trueValues.includes(value)) {
    return true;

  } else if (falseValues.includes(value)) {
    return false;

  } else {
    throw new Error('invalid value');
  }
}

// * Problem 9 Part 2: checking for all True or all False values in a normalized list

function every(...values) {
  try {
    for (const value of values) {
      if (!pureBool(value)) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

function any(...values) {
  try {
    for (const value of values) {
      if (pureBool(value)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}

function none(...values) {
  try {
    for (const value of values) {
      if (pureBool(value)) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

 //* Problem 10 - build a URL

 function buildUrl(query, order, count, license) {
  if (typeof count !== 'number' || count < 1 || count > 50) {
    throw new Error('Invalid count parameter. Count must be a number between 1 and 50.');
  }

  if (order !== 'ascending' && order !== 'descending') {
    throw new Error('Invalid order parameter. Order must be "ascending" or "descending".');
  }

  const validLicenses = [
    'none',
    'any',
    'cc-by',
    'cc-by-nc',
    'cc-by-sa',
    'cc-by-nd',
    'cc-by-nc-sa',
    'cc-by-nc-nd'
  ];
  if (!validLicenses.includes(license)) {
    throw new Error('Invalid license parameter. License must be one of: none, any, cc-by, cc-by-nc, cc-by-sa, cc-by-nd, cc-by-nc-sa, cc-by-nc-nd');
  }

  const encodedQuery = encodeURIComponent(query);

  const url = `https://api.inaturalist.org/v2/observations?query=${encodedQuery}&count=${count}&order=${order}&license=${license}`;
  
  return url;
}