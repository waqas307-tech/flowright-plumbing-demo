// FlowRight Plumbing — small helpers: mobile menu, today's hours,
// scroll animations, the footer year, and the contact form thank-you note.

// 1) Mobile menu: the three-line button opens and closes the links.
var menuButton = document.getElementById('menu-button');
var mainNav = document.getElementById('main-nav');

menuButton.addEventListener('click', function () {
  var isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close the menu after a link is tapped (nicer on phones).
mainNav.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

// 2) Today's hours: pick the right line for the real day of the week.
// getDay() gives 0 = Sunday, 1 = Monday, ... 6 = Saturday.
var hoursByDay = {
  0: 'Emergency calls only',  // Sunday
  1: '7:00 AM – 7:00 PM',      // Monday
  2: '7:00 AM – 7:00 PM',      // Tuesday
  3: '7:00 AM – 7:00 PM',      // Wednesday
  4: '7:00 AM – 7:00 PM',      // Thursday
  5: '7:00 AM – 7:00 PM',      // Friday
  6: '8:00 AM – 5:00 PM'       // Saturday
};

var today = new Date().getDay();
document.getElementById('today-hours').textContent = hoursByDay[today];

// Highlight today's row in the hours table and add a short note under it.
var rows = document.querySelectorAll('#hours-table tr');
rows.forEach(function (row) {
  var days = row.getAttribute('data-days').split(',');
  if (days.indexOf(String(today)) !== -1) {
    row.classList.add('today');
    document.getElementById('today-note').textContent =
      today === 0
        ? 'Today is Sunday — the shop is closed, but the emergency line is answered all day.'
        : 'That highlighted row is today — we are open ' + hoursByDay[today] + '.';
  }
});

// 3) Footer year: always shows the current year.
document.getElementById('year').textContent = new Date().getFullYear();

// 4) Reveal on scroll: the hidden start state is added HERE, by JavaScript,
// never in the stylesheet — so if JavaScript fails, everything stays visible.
var revealItems = document.querySelectorAll('.reveal');
revealItems.forEach(function (item) { item.classList.add('reveal-init'); });

if ('IntersectionObserver' in window) {
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        watcher.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (item) { watcher.observe(item); });
} else {
  // Very old browser: just show everything.
  revealItems.forEach(function (item) { item.classList.add('visible'); });
}

// 5) Contact form: there is no server behind this demo,
// so we thank the visitor on the page instead of sending anything.
var form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading
  var name = document.getElementById('name').value.trim();
  document.getElementById('form-note').textContent =
    'Thank you' + (name ? ', ' + name : '') + '. Your message is with us — we reply within one working day. For anything urgent, call (512) 555-0187.';
  form.reset();
});
