<?php
$name = isset($_POST["nameInput"]) ? $_POST["nameInput"] : null;
$contact = isset($_POST["contactInput"]) ? $_POST["contactInput"] : null;
$date = isset($_POST["dateInput"]) ? $_POST["dateInput"] : null;

function displayAppointment($name, $contact, $date)
{
  if (empty($name) && empty($contact) && empty($date)) {
    return "Empty Input";
  }

  $currDate = date("Y-m-d");

  if ($currDate > $date) {
    return "Date should be after current Date.";
  } else {
    return "Appointment booked for " . $name . " on " . $date . ". Contact: " . $contact . ".";
  }

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CIS1202-03_epanto</title>
  <link rel="shortcut icon" href="../assets/logo.png" type="image/x-icon" />

  <!-- Bootstrap CSS -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet" />

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" />

  <link rel="stylesheet" href="../styles.css" />
</head>

<body>
  <main
    class="container-fluid d-flex justify-content-center align-items-center flex-column"
    style="height: 100vh; width: 100vw">
    <a
      href="../index.html"
      class="btn glassmorphism btn-outline-secondary mb-2 custom-text-secondary"><i class="bi bi-arrow-left"></i> Go Back</a>
    <div
      class="card w-100 p-2 m-2 glassmorphism custom-text-secondary"
      style="height: auto; max-width: 520px">
      <div class="card-header">
        <i class="bi bi-hospital fs-1"></i>
        <h1 class="custom-text-primary m-0">Healthcare:</h1>
        <p>Patient Appointment Form.</p>
        <hr />
      </div>
      <div class="card-body d-flex flex-column gap-1 py-0">
        <form method="post">
          <div class="mb-3">
            <label for="nameInput" class="form-label">Name</label>
            <input
              type="text"
              class="form-control border border-secondary text-light"
              style="background-color: rgba(229, 226, 226, 0.078)"
              id="nameInput"
              name="nameInput"
              required />
          </div>
          <div class="mb-3">
            <label for="contactInput" class="form-label">Contact</label>
            <input
              type="text"
              class="form-control border border-secondary text-light"
              style="background-color: rgba(229, 226, 226, 0.078)"
              id="contactInput"
              name="contactInput"
              required />
          </div>
          <div class="mb-3">
            <label for="dateInput" class="form-label">Date</label>
            <input
              type="date"
              class="form-control border border-secondary text-light"
              style="background-color: rgba(229, 226, 226, 0.078)"
              id="dateInput"
              name="dateInput"
              required />
          </div>
          <input type="submit" value="Order" class="btn btn-outline-secondary custom-text-primary w-100">
        </form>
        <div class="text-white mt-4 d-flex gap-2 justify-content-center">
          <?php
          if ($name && $contact && $date) {
            echo "<p class='alert alert-primary' role='alert'>" . displayAppointment($name, $contact, $date) . "</p>";
          }
          ?>
        </div>
      </div>
      <div class="card-footer">
        <hr />
        <div
          class="d-flex flex-column flex-md-row justify-content-between"
          style="font-size: smaller">
          <p class="w-75">© 2025, Gian Epanto. All Rights Reserved.</p>
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