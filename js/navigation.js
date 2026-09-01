document.addEventListener("DOMContentLoaded",()=>{
  const toggle=document.querySelector(".nav-toggle"),menu=document.querySelector(".nav-links");
  if(!toggle||!menu)return;
  const closeMenu=()=>{menu.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation");document.body.classList.remove("nav-open")};
  const openMenu=()=>{menu.classList.add("is-open");toggle.setAttribute("aria-expanded","true");toggle.setAttribute("aria-label","Close navigation");document.body.classList.add("nav-open")};
  toggle.addEventListener("click",()=>menu.classList.contains("is-open")?closeMenu():openMenu());
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("is-open")){closeMenu();toggle.focus()}});
  const setCurrent=()=>{const currentPath=window.location.pathname.replace(/index\.html$/,'').replace(/\/$/,'')||'/';menu.querySelectorAll("a").forEach(a=>{const target=new URL(a.href,window.location.origin).pathname.replace(/\/$/,'')||'/';if(target===currentPath)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})};
  setCurrent();
});
