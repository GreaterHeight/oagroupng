document.addEventListener('DOMContentLoaded',()=>{
  const form=document.querySelector('#search-form');
  const input=document.querySelector('#search-input');
  const results=document.querySelector('#search-results');
  const status=document.querySelector('#search-status');
  if(!form||!input||!results||!status||!Array.isArray(window.OA_SEARCH_INDEX))return;

  const index=window.OA_SEARCH_INDEX.map(item=>({...item,haystack:`${item.title} ${item.type} ${item.description} ${item.content}`.toLowerCase()}));
  const escapeHtml=value=>String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const tokenize=q=>q.toLowerCase().trim().split(/[^a-z0-9]+/).filter(t=>t.length>1);
  const score=(item,tokens)=>tokens.reduce((total,token)=>{
    let n=0;
    if(item.title.toLowerCase().includes(token))n+=12;
    if(item.type.toLowerCase().includes(token))n+=5;
    if(item.description.toLowerCase().includes(token))n+=7;
    n+=Math.min((item.content.toLowerCase().match(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))||[]).length,8);
    return total+n;
  },0);
  const render=(query,initial=false)=>{
    const tokens=tokenize(query);
    let matches=index.filter(item=>tokens.every(token=>item.haystack.includes(token)));
    if(tokens.length)matches=matches.map(item=>({...item,_score:score(item,tokens)})).sort((a,b)=>b._score-a._score);
    else matches=index.slice().sort((a,b)=>a.type.localeCompare(b.type)||a.title.localeCompare(b.title)).slice(0,8);
    status.textContent=tokens.length?`${matches.length} result${matches.length===1?'':'s'} for “${query.trim()}”`:'Explore site content';
    results.replaceChildren();
    if(!matches.length){
      const p=document.createElement('p');p.className='muted';p.textContent='No matching OA Group content was found. Try a broader phrase or explore the site navigation.';results.append(p);return;
    }
    const frag=document.createDocumentFragment();
    matches.forEach(item=>{
      const article=document.createElement('article');article.className='insight-card search-result-card';
      const body=document.createElement('div');body.className='insight-card__body';
      const meta=document.createElement('div');meta.className='card-meta';
      const type=document.createElement('span');type.textContent=item.type;meta.append(type);
      const h=document.createElement('h3');h.textContent=item.title;
      const p=document.createElement('p');p.className='muted';p.textContent=item.description||item.content.slice(0,220)+'…';
      const a=document.createElement('a');a.className='company-card__link';a.href=item.url;a.textContent='Open →';
      body.append(meta,h,p,a);article.append(body);frag.append(article);
    });
    results.append(frag);
  };
  const submit=query=>{const clean=query.trim();const url=clean?`${location.pathname}?q=${encodeURIComponent(clean)}`:location.pathname;history.replaceState({},'',url);render(clean)};
  form.addEventListener('submit',e=>{e.preventDefault();submit(input.value)});
  input.addEventListener('input',()=>{if(!input.value.trim())submit('')});
  const q=new URLSearchParams(location.search).get('q')||'';input.value=q;render(q,true);
});
