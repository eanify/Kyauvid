async function enhance() {
  const fileInput = document.getElementById("uploadFile");
  const file = fileInput.files[0];
  const loading = document.getElementById("loading");
  const resultSection = document.getElementById("resultSection");
  const resultImage = document.getElementById("resultImage");

  if (!file) {
    alert("Please select an image file.");
    return;
  }

  loading.style.display = "block";
  resultSection.style.display = "none";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("https://api.deepai.org/api/torch-srgan", {
      method: "POST",
      headers: {
        "api-key": "3d8a7cc1-e992-4f7d-ab1f-f8b97a4e2f35"
      },
      body: formData,
    });

    const data = await response.json();
    if (data.output_url) {
      resultImage.src = data.output_url;
      resultSection.style.display = "block";
    } else {
      alert("AI enhancement failed. Please try again.");
    }
  } catch (error) {
    alert("Error enhancing image: " + error.message);
  } finally {
    loading.style.display = "none";
  }
}
