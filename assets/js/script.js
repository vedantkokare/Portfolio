(function(){
  var root=document.documentElement;
  var tb=document.getElementById('theme');
  if(tb)tb.addEventListener('click',function(){
    var next=(root.dataset.theme==='dark')?'light':'dark';
    root.dataset.theme=next;
    try{localStorage.setItem('theme',next)}catch(e){}
  });
  var links=[].slice.call(document.querySelectorAll('.bar nav a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      links.forEach(function(a){a.setAttribute('aria-current',String(a.getAttribute('href')==='#'+e.target.id))});
    })},{rootMargin:'-40% 0px -55% 0px'});
    links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)io.observe(s)});
  }
  var st=document.getElementById('status');
  [].forEach.call(document.querySelectorAll('[data-copy]'),function(b){
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-copy');
      var done=function(m){st.textContent=m;setTimeout(function(){st.textContent=''},2500)};
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(v).then(function(){done('Email copied.')},function(){done('Copy failed. Select the address and copy it manually.')});
      }else done('Copy is not available here. Select the address and copy it manually.');
    });
  });
})();