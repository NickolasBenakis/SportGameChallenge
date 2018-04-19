
$(document).ready(function() {
  var url =
      "https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=Chelsea";

  $.getJSON(url, function(data) {
    var player = data.player;
    var name = data.player.strPlayer;
    var image = data.player[0].strCutout;
    var description = data.player[0].strDescriptionEN;
    var transferRate = data.player[0].strSigning;

    // Loop για να αλλάξω τα Strings στο Json
    var sortedplayers;
    var newPlayers = [];

    for (var i = 0; i < data.player.length; i++) {
      data.player[i]["favorite"] = false;
      transferRate = data.player[i].strSigning.replace(/[^\d-]/g, "");
      transferRate = parseFloat(transferRate);
      data.player[i].strSigning = transferRate;
      newPlayers[i] = data.player[i];
    }

    console.log(newPlayers[0]);
    //sorting players
    newPlayers = newPlayers.sort(function(a, b) {
      return a.strSigning - b.strSigning;
    });

    //lista me players
    for (var i = 0; i < newPlayers.length; i++) {
      $("#squad").prepend(
        '<li><a id="link-' + i + '">' + newPlayers[i].strPlayer + "</a> </li>"
      );
      
    }


    //klik event

    var boolean = false;
    var playerStatus23;
    $("#link-23").click(function() {
      if (boolean === false) {
        $("#playerName").html(newPlayers[23].strPlayer);
        $("#description").html(newPlayers[23].strDescriptionEN);
        $("#image").attr("src", newPlayers[23].strThumb);
        boolean = true;
        playerStatus23 = true;
      } else {
        $("#playerName").html("");
        $("#description").html("");
        $("#image").removeAttr("src");
        boolean = false;
      }
    });
    $("#link-22").click(function() {
      if (boolean === false) {
        $("#playerName").html(newPlayers[22].strPlayer);
        $("#description").html(newPlayers[22].strDescriptionEN);
        $("#image").attr("src", newPlayers[22].strThumb);
        boolean = true;
      } else {
        $("#playerName").html("");
        $("#description").html("");
        $("#image").removeAttr("src");
        boolean = false;
      }
    });
    $("#link-0").click(function() {
      if (boolean === false) {
        $("#playerName").html(newPlayers[0].strPlayer);
        $("#description").html(newPlayers[0].strDescriptionEN);
        $("#image").attr("src", newPlayers[0].strThumb);
        boolean = true;
      } else {
        $("#playerName").html("");
        $("#description").html("");
        $("#image").removeAttr("src");
        boolean = false;
      }
    });

    // Favorite Button

    $("#favoriteme").click(function() {
      if (playerStatus23) {
        $("#favoritesSquad").prepend(
          '<li id="del23"><a id="link-' +
          23 +
          '">' +
          newPlayers[23].strPlayer +
          "</a> </>"
        );
      }
    });
    // delete button
    $("#deleteme").click(function() {
      $("#del23").remove();
    });
  });
});


