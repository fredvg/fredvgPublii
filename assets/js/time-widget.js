(function () {
  var ONES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
    'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  var TENS = ['','','twenty','thirty','forty','fifty'];
  var MONTHS = ['january','february','march','april','may','june','july','august',
    'september','october','november','december'];
  var ORDINALS = ['', 'first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth',
    'eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth',
    'nineteenth','twentieth','twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth',
    'twenty-sixth','twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first'];

  var COMFORT = {
    morning: [
      "You are right where you need to be.",
      "Welcome, make yourself at home.",
      "Take your time, there's no rush today.",
      "The day is yours to shape."
    ],
    afternoon: [
      "Glad you stopped by.",
      "Settle in, stay a while.",
      "You are right where you need to be.",
      "No need to hurry through this."
    ],
    evening: [
      "Welcome, make yourself at home.",
      "Whatever it is, it's OK.",
      "You are right where you need to be.",
      "Good to have you here."
    ],
    night: [
      "Just a few hours left in the day.",
      "Welcome, make yourself at home.",
      "You are right where you need to be.",
      "Whatever it is, it'll wait for you."
    ]
  };

  function numberToWords(n) {
    if (n < 20) return ONES[n];
    var t = Math.floor(n / 10), o = n % 10;
    return TENS[t] + (o ? '-' + ONES[o] : '');
  }

  function timeInWords(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var h12 = h % 12 === 0 ? 12 : h % 12;
    var hourWord = numberToWords(h12);

    if (m === 0) return hourWord + " o'clock";
    if (m < 10) return hourWord + " oh " + ONES[m];
    return hourWord + " " + numberToWords(m);
  }

  function periodOfDay(hour) {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function render() {
    var el = document.getElementById('time-widget');
    if (!el) return;
    var now = new Date();
    var period = periodOfDay(now.getHours());
    var time = timeInWords(now);
    var month = MONTHS[now.getMonth()];
    var day = ORDINALS[now.getDate()];
    var comfort = pick(COMFORT[period]);

    el.innerHTML =
      '<p>It’s ' + time + ', the ' + period + ' of ' + month + ' ' + day + '.' +
      '<span class="comfort">' + comfort + '</span></p>';
  }

  render();
  setInterval(render, 30000);
})();