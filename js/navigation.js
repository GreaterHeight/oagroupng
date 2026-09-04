document.addEventListener("DOMContentLoaded",()=>{
  "use strict";
  const toggle=document.querySelector(".nav-toggle");
  const menu=document.querySelector(".nav-links");
  if(!toggle||!menu)return;
  const dropdowns=[...menu.querySelectorAll(".nav-dropdown")];
  const closeDropdown=(item)=>{
    item.classList.remove("is-open");
    const trigger=item.querySelector(".nav-dropdown__trigger");
    if(trigger)trigger.setAttribute("aria-expanded","false");
  };
  const closeAllDropdowns=(except=null)=>dropdowns.forEach(d=>{if(d!==except)closeDropdown(d)});
  const closeMenu=()=>{
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded","false");
    toggle.setAttribute("aria-label","Open navigation");
    document.body.classList.remove("nav-open");
    closeAllDropdowns();
  };
  const openMenu=()=>{
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded","true");
    toggle.setAttribute("aria-label","Close navigation");
    document.body.classList.add("nav-open");
  };
  toggle.addEventListener("click",()=>menu.classList.contains("is-open")?closeMenu():openMenu());
  dropdowns.forEach(item=>{
    const trigger=item.querySelector(".nav-dropdown__trigger");
    if(!trigger)return;
    trigger.addEventListener("click",e=>{
      e.preventDefault();
      const willOpen=!item.classList.contains("is-open");
      closeAllDropdowns(item);
      item.classList.toggle("is-open",willOpen);
      trigger.setAttribute("aria-expanded",String(willOpen));
    });
  });
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
  document.addEventListener("click",e=>{
    if(!menu.contains(e.target)&&!toggle.contains(e.target))closeAllDropdowns();
  });
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){
      const open=dropdowns.find(d=>d.classList.contains("is-open"));
      if(open){closeDropdown(open);open.querySelector(".nav-dropdown__trigger")?.focus();return;}
      if(menu.classList.contains("is-open")){closeMenu();toggle.focus();}
    }
  });
  const setCurrent=()=>{
    const currentPath=window.location.pathname.replace(/index\.html$/,'').replace(/\/$/,'')||'/';
    menu.querySelectorAll("a").forEach(a=>{
      const target=new URL(a.href,window.location.origin).pathname.replace(/\/$/,'')||'/';
      if(target===currentPath)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
    });
  };
  setCurrent();
  window.addEventListener("resize",()=>{
    if(window.innerWidth>960){closeMenu();}
  },{passive:true});
});
