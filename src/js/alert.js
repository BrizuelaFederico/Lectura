const $alert = document.getElementById("alert");
const successColor = "#59df47";
const errorColor = "#e84c73";

function showSuccessAlert(message) {
  $alert.style.backgroundColor = successColor;
  showAlert(message);
  return true;
}

function showErrorAlert(message) {
  $alert.style.backgroundColor = errorColor;
  showAlert(message);
}

function showAlert(message) {
  const $p = $alert.querySelector("p");
  $p.textContent = message;
  $alert.style.transform = "translate(-50%, 1dvh)";
  setTimeout(() => {
    $alert.style.transform = "translate(-50%, -100%)";
  }, 3000);
}

export { showSuccessAlert, showErrorAlert };
