
/*显示菜单，过渡动画对display属性无效，只能靠透明度实现过渡*/
function displaySubMenu(li) {
    var subMenu = li.getElementsByTagName("ul")[0];            
    subMenu.style.opacity = 1;
    subMenu.style.visibility = "visible";           
}

/*隐藏菜单*/
function hideSubMenu(li) {
    var subMenu = li.getElementsByTagName("ul")[0];              
    subMenu.style.opacity = 0; 
    subMenu.style.visibility = "hidden";         
}