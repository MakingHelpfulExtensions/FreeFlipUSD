//Hosted Code For Easy Updates, Pushes And Bugfixes.
(function () {
  const targetClass = "font-semibold text-sm text-white flex items-center";
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" || mutation.type === "characterData") {
        let target = mutation.target;
        
        if (target.nodeType === Node.TEXT_NODE) {
          target = target.parentElement;
        }
        
        if (target && target.classList.contains("font-semibold")) {
          const textNodes = Array.from(target.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
          textNodes.forEach(node => {
            const value = parseFloat(node.textContent.replace(/,/g, '').trim());
            if (!isNaN(value)) {
              node.textContent = ((value + 1)* 3).toFixed(2);
            }
          });
        }
      }
    });
  });
  
  function observeElements() {
    document.querySelectorAll(`.${targetClass}`).forEach((element) => {
      observer.observe(element, { subtree: true, characterData: true, childList: true });
    });
  }

  observeElements();
  
  const mutationObserver = new MutationObserver(observeElements);
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  window.onload = function() {
  observeElements();
};

})();
