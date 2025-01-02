// ==UserScript==
// @name         Length Tooltips
// @namespace    http://tampermonkey.net/
// @version      1.70
// @description  Alt + Click element
// @author       P Diddy
// @match        https://neal.fun/infinite-craft/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener('click', function(event) {
        if (event.altKey && event.target.closest('.item.instance')) {
            event.preventDefault();
            let element = event.target.closest('.item.instance');

            let bigdude = element.cloneNode(true);
            bigdude.querySelectorAll('.instance-emoji').forEach(emoji => emoji.remove());
            bigdude.querySelectorAll('.instance-discovered-text, img').forEach(nested => nested.remove());

            let text = bigdude.textContent.replace(/\s+/g, ' ').trim();
            let length = text.length;
            if (element.getAttribute('tooltip-prev') !== null) {
                element.setAttribute('tooltip', element.getAttribute('tooltip-prev'));
                element.removeAttribute('tooltip-prev');
            } else {
                element.setAttribute('tooltip-prev', element.getAttribute('tooltip'));
                element.setAttribute('tooltip', `🔡 Character Length: ${length}`);
            }
        }
    });
})();
