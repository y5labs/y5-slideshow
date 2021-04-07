function setup() {
  var fullscreen = document.getElementById("fullscreen")
  var message = document.getElementById("message")
  var display = document.getElementById("display")
  var address = document.getElementById("address")
  var next_banner = document.getElementById("next-banner")
  var next_display = document.getElementById("next-display")
  var countdown = document.getElementById("countdown")

  var parameters = window.location.search
  const urlParams = new URLSearchParams(parameters);
  const token = urlParams.get('token')

  if (token == null) {
    message.innerHTML = "No Token Provided"
    return
  }

  try {
    JSON.parse(atob(token))
  } catch(e) {
    message.innerHTML = "Malformed Token Provided"
    return
  }

  const setup = JSON.parse(atob(token))

  if(!this.isObject(setup)) {
    message.innerHTML = "Token Structure Is Not An Object"
    return
  }

  const addresses = setup.addresses
  const duration = setup.duration_s
  const total_addresses = addresses.length

  if (total_addresses == 0) {
    message.innerHTML = "No Addresses Have Been Provided To Display?"
    return
  }

  if (total_addresses == 1) {
    fullscreen.style.display = "none"
    display.style.display = "block"
    address.style.height = "100vh"
    next_banner.style.display = "none"

    address.src = addresses[0].src
    address.title = addresses[0].name
    return
  }

  fullscreen.style.display = "none"
  display.style.display = "block"
  var current_address_index = 0
  var next_address_index = 1
  var current_address = addresses[current_address_index]
  var next_address= addresses[next_address_index]

  // Set first address to display
  address.src = current_address.src
  address.title = current_address.name

  var elapsed = duration

  // Set for next address
  next_display.innerHTML = next_address.name;
  countdown.innerHTML = elapsed;

  var timer = setInterval(function() {
    elapsed = elapsed - 1
    countdown.innerHTML = elapsed
  }, 1000)

  var change = setInterval(function() {
    elapsed = duration
    countdown.innerHTML = elapsed

    address.src = next_address.src
    address.title = next_address.name

    current_address_index = next_address_index
    current_address = addresses[current_address_index]
    next_address_index = next_address_index + 1

    if(next_address_index == total_addresses) {
      next_address_index = 0
    }

    next_address = addresses[next_address_index]
    next_display.innerHTML = next_address.name;
    countdown.innerHTML = elapsed;
  }, (1000 * duration))
}

function isObject(object) {
  return object === Object(object)
}