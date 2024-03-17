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
