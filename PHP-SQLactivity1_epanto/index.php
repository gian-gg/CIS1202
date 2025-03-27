<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web1sample";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

function handleSubmit($conn, $name, $price, $quantity)
{
  $text = "";
  $alert = "";

  $total = $price * $quantity;

  if (empty($name) && empty($price) && empty($quantity)) {
    $alert = "danger";
    $text =  "Empty Input";
  }

  $sql = "INSERT INTO productname (productName, price, quantity, total) VALUES ('$name','$price','$quantity', '$total')";

  if (mysqli_query($conn, $sql)) {
    error_reporting(0);
    ini_set('display_errors', 0);
  }

  return array("success", "Product Data successfully submitted.");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PHP-SQLactivity1_epanto</title>
  <link rel="shortcut icon" href="./assets/logo.png" type="image/x-icon" />

  <!-- Bootstrap CSS -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet" />

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" />

  <link rel="stylesheet" href="./styles.css" />
</head>

<body>
  <main
    class="container-fluid d-flex justify-content-center align-items-center flex-column"
    style="height: 100vh; width: 100vw">
    <div
      class="card w-100 p-2 m-2 glassmorphism custom-text-secondary"
      style="height: auto; max-width: 520px">
      <div class="card-header">
        <i class="bi bi-filetype-sql fs-1"></i>
        <h1 class="custom-text-primary m-0">PHP-SQLactivity1:</h1>
        <p>Process Form with PHP.</p>
        <hr />
      </div>
      <div class="card-body d-flex flex-column gap-1 py-0">
      <form method="post">
          <div class="mb-3">
            <label for="nameInput" class="form-label">Product Name</label>
            <input
              type="text"
              class="form-control border border-secondary text-light"
              style="background-color: rgba(229, 226, 226, 0.078)"
              id="nameInput"
              name="nameInput"
              required />
          </div>
          <div class="mb-3">
            <label for="priceInput" class="form-label">Price</label>
            <input
              type="number"
              class="form-control border border-secondary text-light"
              style="background-color: rgba(229, 226, 226, 0.078)"
              id="priceInput"
              name="priceInput"
              required />
          </div>
          <div class="mb-3">
            <label for="quantityInput" class="form-label">Quantity</label>
            <input
              type="number"
              class="form-control border border-secondary text-light"
              style="background-color: rgba(229, 226, 226, 0.078)"
              id="quantityInput"
              name="quantityInput"
              required />
          </div>
          <input type="submit" value="Submit" class="btn btn-outline-secondary custom-text-primary w-100">
        </form>
        <div class="text-white mt-4 d-flex gap-2 justify-content-center">
        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $name =  mysqli_real_escape_string($conn, $_POST ["nameInput"]);
                $price =  mysqli_real_escape_string($conn, $_POST ["priceInput"]);
                $quantity =  mysqli_real_escape_string($conn, $_POST ["quantityInput"]);

                $response = handleSubmit($conn, $name, $price, $quantity);
                echo "<p class='alert alert-" . $response[0] . " w-100 text-center' role='alert'>" . $response[1] . "</p>";
            }
        ?>
        </div>
      </div>
      <div class="card-footer">
        <hr />
        <div
          class="d-flex flex-column flex-md-row justify-content-between"
          style="font-size: smaller">
          <p class="w-75">© Geri Gian C. Epanto | CIS1202 | BSCS - 1</p>
          <div
            class="d-flex w-25 justify-content-end gap-2 fs-6"
            style="line-height: 0">
            <a
              href="https://github.com/gian-gg"
              class="custom-text-secondary custom-btn-hover"
              target="_blank"><i class="bi bi-github"></i></a>
            <a
              href="https://www.linkedin.com/in/gian-gg"
              class="custom-text-secondary custom-btn-hover"
              target="_blank"><i class="bi bi-linkedin"></i></a>
            <a
              href="https://www.facebook.com/epanto.gg/"
              class="custom-text-secondary custom-btn-hover"
              target="_blank"><i class="bi bi-facebook"></i></a>
            <a
              href="https://www.instagram.com/gian.gg_/"
              class="custom-text-secondary custom-btn-hover"
              target="_blank"><i class="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"
    defer></script>
</body>

</html>