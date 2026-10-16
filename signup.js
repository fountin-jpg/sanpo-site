/* Email sign-up: posts to Formspree and shows the result in place. */
(function () {
  var form = document.getElementById('signup');
  if (!form) return;
  var msg = document.getElementById('signup-msg');
  var btn = form.querySelector('button[type="submit"]');
  var email = form.querySelector('input[type="email"]');

  function say(text, kind) { msg.textContent = text; msg.className = 'signup-msg ' + (kind || ''); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      say('Please enter a valid email address.', 'error');
      email.focus();
      return;
    }
    btn.disabled = true;
    say('Sending...', '');
    fetch(form.dataset.endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (r) {
      if (!r.ok) throw new Error('bad response');
      form.reset();
      say("You're on the list. We'll email you the day Sanpo is live.", 'ok');
    }).catch(function () {
      say('Something went wrong. Please try again in a moment.', 'error');
    }).then(function () { btn.disabled = false; });
  });
})();
