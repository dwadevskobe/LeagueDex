function displayFav(a){if(a){var b=fav.child(a.uid);b&&b.once("value").then(onValue)}}function saveToList(a){if(user=firebase.auth().currentUser,user){if(13==a.which||13==a.keyCode){var b=document.getElementById("chamName").value;return cham.once("value",function(a){if(a.child(b).exists()){var c=fav.child(user.uid);c.once("value",function(a){if(a.exists()){var d=a.val(),e=!1;for(var f in d)if(d[f].name==b){e=!0;break}e?alert("Re-Favorite Existed Champion"):(c.push({name:b}),c.on("value",onValue))}else c.push({name:b}),c.on("value",onValue)})}else alert("Not a Valid Champion Name!")}),document.getElementById("chamName").value="",!1}}else alert("Not logged in")}function refresh(a){for(var b="",c=0;c<a.length;c++)b+="<li>"+a[c].name+'  <button style="margin-left:7px;border-radius:5px;border: 1px solid;" onclick ="deleteFav(\''+a[c].key+"')\">X</button></li>";document.getElementById("fav").innerHTML=b}function deleteFav(a){user=firebase.auth().currentUser;var b=fav.child(user.uid).child(a);b.remove(),fav.child(user.uid).on("value",onValue)}var fav=firebase.database().ref("Favorites"),cham=firebase.database().ref("Champions");firebase.auth().onAuthStateChanged(function(a){a&&displayFav(a)});var onValue=function(a){var b=a.val(),c=[];for(var d in b)console.log(d),console.log(b),b.hasOwnProperty(d)&&c.push({name:b[d].name,key:d});refresh(c)};