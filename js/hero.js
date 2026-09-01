document.addEventListener('DOMContentLoaded',()=>{
  const video=document.querySelector('[data-hero-video]');
  const toggle=document.querySelector('[data-hero-video-toggle]');
  if(!video||!toggle)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{
    if(reduced.matches){
      video.pause();
      toggle.textContent='Play motion';
      toggle.setAttribute('aria-pressed','true');
    }else if(!video.paused){
      toggle.textContent='Pause motion';
      toggle.setAttribute('aria-pressed','false');
    }
  };
  if(reduced.matches)video.pause();
  toggle.addEventListener('click',()=>{
    if(video.paused){
      video.play().catch(()=>{});
      toggle.textContent='Pause motion';
      toggle.setAttribute('aria-pressed','false');
    }else{
      video.pause();
      toggle.textContent='Play motion';
      toggle.setAttribute('aria-pressed','true');
    }
  });
  reduced.addEventListener?.('change',sync);
  sync();
});
