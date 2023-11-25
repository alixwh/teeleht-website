import '../scss/style.scss'
import * as bootstrap from 'bootstrap'
 
function openCloseSideBar() {
    var sidebar = document.getElementById("sidebar-wrapper");
    if (sidebar.style.width == "250px") {
      sidebar.style.width = "0";
      sidebar.style.left = "0";
    } else {
      sidebar.style.width = "250px";
      sidebar.style.left = "250px";
    }

  }

document.getElementById ("navbar-toggler").addEventListener ("click", openCloseSideBar, false);
