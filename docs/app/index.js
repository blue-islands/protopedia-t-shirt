function generateTshirt() {
  const userId = encodeURIComponent(document.getElementById("userid").value);
  const title = encodeURIComponent(document.getElementById("title").value);
  const token = encodeURIComponent(document.getElementById("token").value);
  const url = "https://livlog.xyz/webapi/protopedia/tgenerator";

  const apiUrl = `${url}?user_id=${userId}&title=${title}&token=${token}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 0 && data.results.length > 0) {
        // Convert Base64 data to a data URI and update the overlay image
        const base64ImageString = data.results[0];
        const imageDataURI = "data:image/jpeg;base64," + base64ImageString;
        document.querySelector(".overlay-image").src = imageDataURI;
        showDownloadButton(); 
      } else {
        // Handle error messages
        console.error("Error messages:", data.messages);
        alert(data.messages);
      }
    })
    .catch((error) => {
      console.error(
        "There was an error with the T-shirt generation request:",
        error
      );
    });
}

function downloadImage() {
  // Get the image data URL from the overlay image src attribute
  const imageDataURI = document.querySelector(".overlay-image").src;
  // Convert data URL to blob
  fetch(imageDataURI)
    .then((res) => res.blob())
    .then((blob) => {
      // Create an anchor element and download the image
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "tshirt-design.jpg"; // Name the file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl); // Clean up
    });
}

// This function will be called inside generateTshirt() after successful image generation
function showDownloadButton() {
  document.getElementById("downloadBtn").style.display = "block";
}
