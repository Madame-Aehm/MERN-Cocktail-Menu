
function passwordValidation (string) {
    const numbers = /[0-9]/g;
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    if (string.length > 5 && string.match(numbers) && string.match(lowerCase) && string.match(upperCase)) {
      return true
    } else {
      return false
    }
}

function emailValidation (string) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(string)) {
    return true
  }
  return false
}

function displayNicely(string) {
  let final = "";
  let trimmed = string.trim();
  for (let i = 0; i < trimmed.length; i++) {
      if (i === 0 || trimmed.charAt(i - 1) === " ") {
          final += trimmed.charAt(i).toUpperCase();
      } else {
          final += trimmed.charAt(i);
      }
  } return final;
}

function formatImage500px (imageURL) {
  const result = sliceImageURL(imageURL, "w_500,h_500,c_fill/");
  return result
}

function formatProfileImage500px (imageURL) {
  const result = sliceImageURL(imageURL, "w_500,h_500,c_fill,g_faces,r_max/");
  return result
}

function formatImageThumb (imageURL) {
  const result = sliceImageURL(imageURL, "c_thumb,w_30,h_30,c_fill,g_faces,r_max/");
  return result
}

function sliceImageURL (imageURL, insert) {
  const uploadIndex = imageURL.indexOf("upload/") + 7;
  const result = imageURL.slice(0, uploadIndex) + insert + imageURL.slice(uploadIndex);
  return result
}

function checkIf (ID, array) {
  let result = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].toString() === ID) {
      result = true;
    }
  }
  return result;
}

function resetSubArray(array, comparisonId) {
  const index = array.findIndex( e => e === comparisonId );
  array.splice(index, 1);
  return array
}

export { passwordValidation, emailValidation, displayNicely, checkIf, resetSubArray,
   formatImage500px, formatImageThumb, formatProfileImage500px }