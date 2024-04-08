$(document).ready(function () {
  const stateCityIDs = {}; // To store the State and City IDs
  const amenityIDs = []; // To store the Amenity IDs

  // Function to update the h4 tag with the list of States and Cities checked
  function updateH4() {
    const checkedStatesCities = Object.values(stateCityIDs).join(', ');
    $('.locations h4').text(checkedStatesCities);
  }

  // Listen to changes on input checkbox tags
  $('input[type="checkbox"]').on('change', function () {
    const id = $(this).data('id');
    const type = $(this).data('type');

    if ($(this).is(':checked')) {
      if (type === 'state' || type === 'city') {
        stateCityIDs[id] = $(this).data('name');
      } else if (type === 'amenity') {
        amenityIDs.push(id);
      }
    } else {
      if (type === 'state' || type === 'city') {
        delete stateCityIDs[id];
      } else if (type === 'amenity') {
        amenityIDs.splice(amenityIDs.indexOf(id), 1);
      }
    }

    updateH4();
  });

  // When the button tag is clicked, make a POST request to places_search
  $('button').on('click', function () {
    $.ajax({
      type: 'POST',
      url: '/places_search',
      data: JSON.stringify({
        amenities: amenityIDs,
        states_cities: Object.keys(stateCityIDs),
      }),
      contentType: 'application/json',
      success: function (data) {
        // Handle the response data as needed
        console.log(data);
      },
    });
  });

  // When the span next to Reviews h2 is clicked
  $('#reviews-toggle').on('click', function () {
    if ($(this).text() === 'Reviews') {
      // Fetch and display reviews
      $.ajax({
        type: 'GET',
        url: '/fetch_reviews', // Replace with the actual route to fetch reviews
        success: function (data) {
          // Handle and display reviews data here
          console.log(data);
        },
      });
      $(this).text('Hide');
    } else {
      // Hide reviews by removing Review elements
      $('.Review').remove();
      $(this).text('Reviews');
    }
  });
});
