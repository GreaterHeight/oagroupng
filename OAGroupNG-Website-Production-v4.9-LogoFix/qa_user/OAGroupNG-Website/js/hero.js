/* v4.1 poster fallback */
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
  /* v4.1 poster fallback: poster is not an <img>, so verify it separately. */
  const poster = video.getAttribute('poster');
  const heroSection = video.closest('.hero');
  if (poster && heroSection) {
    const probe = new Image();
    probe.onload = () => heroSection.classList.remove('hero--poster-missing');
    probe.onerror = () => heroSection.classList.add('hero--poster-missing');
    probe.src = poster;
  }
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
