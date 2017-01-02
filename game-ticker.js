(function( $ ) {
  var countries = [
    { abbr: 'ca', name: 'Canada' },
    { abbr: 'us', name: 'United States' },
    { abbr: 'it', name: 'Italy' },
    { abbr: 'jm', name: 'Jamaica' },
    { abbr: 'be', name: 'Belgium' },
    { abbr: 'cr', name: 'Croatia' },
    { abbr: 'pt', name: 'Portugal' },
    { abbr: 'se', name: 'Sweden' },
    { abbr: 'ch', name: 'Switzerland' },
    { abbr: 'gb', name: 'United Kingdom' },
    { abbr: 'jp', name: 'Japan' },
    { abbr: 'cn', name: 'China' },
    { abbr: 'br', name: 'Brazil' },
    { abbr: 'au', name: 'Australia' },
    { abbr: 'gr', name: 'Greece' },
    { abbr: 'kr', name: 'South Korea' },
    { abbr: 'de', name: 'Germany' },
    { abbr: 'fi', name: 'Finland' }
  ];

  function randomData() {
    var data = [];

    for (var i = 0; i < countries.length; i+= 2) {
      var division = {};
      switch(i%3) {
        case 0:
          division = { class: 'open-div', name: 'Open' };
          break;
        case 1:
          division = { class: 'women-div', name: 'Women' };
          break;
        case 2:
          division = { class: 'mixed-div', name: 'Mixed' };
          break;
      }

      data.push({
        id: i,
        start: new Date(),
        field: 'Field #' + Math.floor(Math.random() * 10),
        state: Math.floor(Math.random() * 10) > 5 ? '1st Half' : '2nd Half',
        division: division,
        away: {
          name: countries[i].name,
          flag: countries[i].abbr,
          score: Math.floor(Math.random() * 15)
        },
        home: {
          name: countries[i+1].name,
          flag: countries[i+1].abbr,
          score: Math.floor(Math.random() * 15)
        }
      });
    }

    return data;
  }

  var interval;
  var data = [];

  function updateScores(data) {
    // remove all of the current games
    $('.game-ticker-container .games table').remove();

    var gameData = '<table><tr>';

    // for each of the games append the game data
    $(data).each(function(idx, game) {
      gameData += '<td><div class="game">';
      gameData += '<div class="team">';
      gameData += '<div class="name"><span class="flag-icon flag-icon-' + game.away.flag + '"></span> ' + game.away.name + '</div>';
      gameData += '<div class="score">' + game.away.score + '</div>';
      gameData += '</div>';
      gameData += '<div class="team">';
      gameData += '<div class="name"><span class="flag-icon flag-icon-' + game.home.flag + '"></span> ' + game.home.name + '</div>';
      gameData += '<div class="score">' + game.home.score + '</div>';
      gameData += '</div>';
      gameData += '<div class="info">';
      gameData += '<div class="left ' + game.division.class + '">' + game.division.name + '</div>';
      gameData += '<div class="right">' + game.state + '</div>';
      gameData += '</div></td>';
    });

    gameData += '</tr></table>';

    $('.game-ticker-container .games').append(gameData);
  }

  $.fn.gameTicker = function( options ) {
    var settings = $.extend({
      updateFrequency: 10000,
      updateCallback: function() {
        return randomData();
      }
    }, options );

    // add main class to the element
    this.addClass('game-ticker-container');

    // add games container
    this.append('<div class="games"></div>');

    // get inital data
    updateScores(settings.updateCallback());

    // start the ticker polling
    interval = setInterval(function() {
      updateScores(settings.updateCallback());
    }, settings.updateFrequency);
  };

}( jQuery ));