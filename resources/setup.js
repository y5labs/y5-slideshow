function setup() {
  const fullscreen = document.getElementById('fullscreen')
  const message = document.getElementById('message')
  const display = document.getElementById('display')
  const iframe_wrapper = document.getElementById('iframe-wrapper')
  const next_banner = document.getElementById('next-banner')
  const next_display = document.getElementById('next-display')
  const countdown = document.getElementById('countdown')

  const token = new URLSearchParams(window.location.search).get('token')

  if (token == null) {
    message.innerHTML = 'No Token Provided'
    return
  }

  try {
    JSON.parse(atob(token))
  } catch(e) {
    message.innerHTML = 'Malformed Token Provided'
    return
  }

  const setup = JSON.parse(atob(token))
  console.log(JSON.stringify(setup, null, 2))

  if (setup.show_nav === false) document.querySelector('body').classList.add('hide-nav')

  const addresses = setup.addresses
  const duration = setup.duration_s
  const total_addresses = addresses.length

  if (addresses.length == 0) {
    message.innerHTML = 'No Addresses Have Been Provided To Display?'
    return
  }

  if (addresses.length == 1) {
    fullscreen.style.display = 'none'
    display.style.display = 'block'
    next_banner.style.display = 'none'

    var iframe = document.createElement('iframe')
    iframe.src = addresses[0].src
    iframe.title = addresses[0].name
    iframe.classList.add('iframe-fullscreen')
    iframe.scrolling = 'no'

    iframe_wrapper.appendChild(iframe)

    return
  }

  fullscreen.style.display = 'none'
  display.style.display = 'block'
  let current_address_index = 0
  let next_address_index = 1
  let current_address = addresses[current_address_index]
  let next_address= addresses[next_address_index]


  const iframes = addresses.map((address, i) => {
    const iframe = document.createElement('iframe')
    iframe.src = address.src
    iframe.title = address.name
    iframe.classList.add('iframe-multi')
    iframe.scrolling = 'no'

    if (i != 0) {
      iframe.style.display = 'none'
      setTimeout(() => { iframe_wrapper.appendChild(iframe) }, i * 500)
    }
    else {
      iframe_wrapper.appendChild(iframe)
    }

    return iframe
  })

  // Set for next address
  next_display.innerHTML = next_address.name
  countdown.innerHTML = duration

  let elapsed = duration
  setInterval(function() {
    elapsed = elapsed - 1
    countdown.innerHTML = elapsed
  }, 1000)

  setInterval(function() {
    elapsed = duration
    countdown.innerHTML = elapsed

    iframes[current_address_index].style.display = 'none'
    iframes[next_address_index].style.display = 'block'

    current_address_index = next_address_index
    current_address = addresses[current_address_index]
    next_address_index = next_address_index + 1

    if (next_address_index == total_addresses)
      next_address_index = 0

    next_address = addresses[next_address_index]
    next_display.innerHTML = next_address.name;
    countdown.innerHTML = elapsed;
  }, (1000 * duration))
}
