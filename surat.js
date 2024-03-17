// Get the URL
var url = new URL(window.location.href);

// Get the searchParams object from the URL
var searchParams = url.searchParams;

// Get the pathname (after the ?)
var pathname = url.search.slice(1);

// Split the pathname using '/' as the delimiter
var parts = pathname.split("/");

var part = pathname.split(":");

// Get the value of the variable "surat"
var variableValue = part[1]; // Get the second part (index 1)

// Output the value
console.log(variableValue); // Output: 1

const url1 = `https://equran.id/api/v2/surat/`;
const url2 = `http://api.alquran.cloud/v1/surah/`;

const request1 = fetch(url1 + variableValue).then((response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
});
const request2 = fetch(url2 + variableValue).then((response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
});

Promise.all([request1, request2]).then(([data1, data2]) => {
  console.log(data1);
});
