document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header");
  const back=document.querySelector(".backtop");
  const cookie=document.querySelector(".cookie");
  const managePanel=cookie?.querySelector(".cookie__manage");
  const nonEssential=cookie?.querySelector("[data-nonessential-cookie]");
  const saveButton=cookie?.querySelector('[data-cookie="save"]');
  const storageAvailable=()=>{try{const key="__oa_storage_test";localStorage.setItem(key,"1");localStorage.removeItem(key);return true}catch{return false}};
  const hasStorage=storageAvailable();
  const getChoice=()=>hasStorage?localStorage.getItem("oaCookieChoice"):null;
  const setChoice=value=>{if(hasStorage)try{localStorage.setItem("oaCookieChoice",value)}catch{}};
  const reveal=()=>document.querySelectorAll(".reveal").forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight*.9)el.classList.add("is-visible")});
  const scroll=()=>{header?.classList.toggle("is-scrolled",window.scrollY>20);back?.classList.toggle("is-visible",window.scrollY>500);reveal()};
  window.addEventListener("scroll",scroll,{passive:true}); scroll();
  back?.addEventListener("click",()=>window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const href=a.getAttribute("href");if(!href||href==="#")return;const target=document.querySelector(href);if(target){e.preventDefault();target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})}}));
  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=String(new Date().getFullYear()));
  if(cookie&&!getChoice()){cookie.hidden=false;cookie.classList.add("is-visible")}
  const closeCookie=value=>{setChoice(value);if(cookie){cookie.hidden=true;cookie.classList.remove("is-visible");cookie.classList.remove("is-managing");managePanel?.setAttribute("hidden","");saveButton?.setAttribute("hidden","")}};
  document.querySelectorAll("[data-cookie]").forEach(button=>button.addEventListener("click",()=>{
    const action=button.dataset.cookie;
    if(action==="manage"){
      const isOpen=!managePanel?.hasAttribute("hidden");
      if(managePanel){if(isOpen)managePanel.setAttribute("hidden","");else managePanel.removeAttribute("hidden")}
      if(saveButton){if(isOpen)saveButton.setAttribute("hidden","");else saveButton.removeAttribute("hidden")}
      cookie?.classList.toggle("is-managing",!isOpen); return;
    }
    if(action==="accepted"){if(nonEssential)nonEssential.checked=true;closeCookie("accepted");return}
    if(action==="rejected"){if(nonEssential)nonEssential.checked=false;closeCookie("rejected");return}
    if(action==="save"){closeCookie(nonEssential?.checked?"accepted":"rejected")}
  }));
  document.querySelectorAll(".newsletter").forEach(form=>form.addEventListener("submit",e=>{
    e.preventDefault();
    const input=form.querySelector('input[type="email"]'); const consent=form.querySelector('input[name="newsletter-consent"]');
    if(!input?.checkValidity()||!consent?.checked){form.reportValidity();return}
    const subject=encodeURIComponent("OA Group Newsletter Subscription");
    const body=encodeURIComponent("Please add this email to the OA Group Nigeria newsletter: "+input.value.trim());
    window.location.href=`mailto:info@oagroupng.com?subject=${subject}&body=${body}`;
  }));
});
