const file = document.getElementById("file");
const btn = document.getElementById("btn");
const output = document.getElementById("output");
const preview = document.getElementById("preview");

btn.addEventListener("click", () => {
  if (file.files.length > 0) {
    OCR();
  } else {
    alert("404");
  }
});

async function OCR() {
  const url = "https://ocr43.p.rapidapi.com/v1/results";

  const formData = new FormData();
  formData.append("image", file.files[0]);
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "3dfe614188msh2e07e9ab7ae457ep1fe4c8jsn624ba4e35877",
      "x-rapidapi-host": "ocr43.p.rapidapi.com",
      //   "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const outputText =
      result.results[0].entities[0].objects[0].entities[0].text;

    output.textContent = outputText;
    const imageURL = URL.createObjectURL(file.files[0]);

    preview.innerHTML = `
  <img 
    src="${imageURL}" 
    class="max-w-full h-auto rounded-lg mt-3 border-3"
  />
`;

    console.log(file.value);
  } catch (error) {
    console.error("Errorrrrrrrrrrrrrrrrrr");
  }
}
