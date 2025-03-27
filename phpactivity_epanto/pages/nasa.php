<?php
$distance = isset($_POST["distanceInput"]) ? $_POST["distanceInput"] : null;
$speed = isset($_POST["speedInput"]) ? $_POST["speedInput"] : null;

function calculateTravelTime($distance, $speed)
{
  $lightYearKm = 9.461e12; // 1 light-year in km
  $secondsPerYear = 60 * 60 * 24 * 365; // Total seconds in a year

  $timeYears = ($distance * $lightYearKm) / ($speed * $secondsPerYear); // Calculate travel time in years

  return number_format($timeYears, 2) . " years";
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PHPActivity_epanto</title>
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
        <i class="bi bi-rocket-takeoff fs-1"></i>
        <h1 class="custom-text-primary m-0">Astronomy:</h1>
        <p>Calculating Planetary Travel Time.</p>
        <hr />
      </div>
      <div class="card-body d-flex flex-column gap-1 py-0">
        <form method="post">
          <div class="mb-3">
            <label for="distanceInput" class="form-label">Distance (light-years)</label>
            <input
              type="number"
              step="any"
              class="form-control border border-secondary text-light"
              style="background-color: rgba(229, 226, 226, 0.078)"
              id="distanceInput"
              name="distanceInput"
              required />
          </div>
          <div class="mb-3">
            <label for="speedInput" class="form-label">Spacecraft's Speed (km/s)</label>
            <input
              type="number"
              class="form-control border border-secondary text-light"
              style="background-color: rgba(255, 255, 255, 0.078)"
              id="speedInput"
              name="speedInput"
              required />
          </div>
          <button
            type="submit"
            class="btn btn-outline-secondary custom-text-primary w-100">
            Submit
          </button>
        </form>
        <div class="text-white mt-4 d-flex gap-2 justify-content-center">
          <?php
          if ($distance && $speed) {
            echo "<h5>Estimated Travel Time:</h5>";
            echo "<p>" . calculateTravelTime($distance, $speed) . "</p>";
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