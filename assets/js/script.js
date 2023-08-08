document.addEventListener("DOMContentLoaded", function () {
  const certificateForm = document.getElementById("certificateForm");
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close");
  const certificateDetails = document.getElementById("certificateDetails");
  const certificateCodeInput = document.getElementById("certificateCode"); // Add this line

  certificateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Convert input to uppercase
    const certificateCode = certificateCodeInput.value.toUpperCase(); // Convert input to uppercase

    try {
      const response = await fetch("assets/database/Issued_Certificates_Database.csv");
      const data = await response.text();

      Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const certificateData = results.data.find(
            (item) => item.CertificateCode === certificateCode
          );

          if (certificateData) {
            certificateDetails.innerHTML = `
              <p><strong>Certificate ID:</strong> ${certificateData.CertificateCode}</p>
              <p><strong>Name:</strong> ${certificateData.Name}</p>
              <p><strong>Purpose:</strong> ${certificateData.Purpose}</p>
              <p><strong>Date of Issuing:</strong> ${certificateData.Date}</p>
              <p><strong>Issued Authority:</strong> ${certificateData.Division}</p>
            `;
            modal.style.display = "block";
          } else {
            alert("Certificate not found.");
          }
        },
      });
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  });

  // ... rest of your code ...
});
