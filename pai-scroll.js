jQuery.fn.extend({
   paiScroll: function(config) {
       config = config || {};
       config.load = config.load || (() => {});
       config.bottom = config.bottom || 0;
       config.page = config.page || 1;
       config.delay = config.delay || 0;
       config.loaderClass = config.loaderClass || 'pai-loader';
       config.loaderColor = config.loaderColor || '#ef233c';
       config.loader = config.loader != false ? config.loader || true : false;

       const $elm = this;
       const $body = $('body');
       const isWindow = (typeof $elm.get(0).window === 'object');
       if (!isWindow) { $elm.addClass('pos-relative'); }
       $('head').append(`<style>.pos-relative{position:relative;}.pai-loader{color:` + config.loaderColor + `;font-size:50px;text-indent:-9999em;overflow:hidden;width:1em;height:1em;border-radius:50%;left:calc(50% - 0.5em);bottom: calc(50% - 0.5em);position:` + (isWindow ? 'fixed' : 'sticky') + `;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation:pai-load 1.7s infinite ease,round 1.7s infinite ease;animation:pai-load 1.7s infinite ease,round 1.7s infinite ease}@-webkit-keyframes pai-load{0%{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}5%,95%{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}10%,59%{box-shadow:0 -.83em 0 -.4em,-.087em -.825em 0 -.42em,-.173em -.812em 0 -.44em,-.256em -.789em 0 -.46em,-.297em -.775em 0 -.477em}20%{box-shadow:0 -.83em 0 -.4em,-.338em -.758em 0 -.42em,-.555em -.617em 0 -.44em,-.671em -.488em 0 -.46em,-.749em -.34em 0 -.477em}38%{box-shadow:0 -.83em 0 -.4em,-.377em -.74em 0 -.42em,-.645em -.522em 0 -.44em,-.775em -.297em 0 -.46em,-.82em -.09em 0 -.477em}100%{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}}@keyframes pai-load{0%{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}5%,95%{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}10%,59%{box-shadow:0 -.83em 0 -.4em,-.087em -.825em 0 -.42em,-.173em -.812em 0 -.44em,-.256em -.789em 0 -.46em,-.297em -.775em 0 -.477em}20%{box-shadow:0 -.83em 0 -.4em,-.338em -.758em 0 -.42em,-.555em -.617em 0 -.44em,-.671em -.488em 0 -.46em,-.749em -.34em 0 -.477em}38%{box-shadow:0 -.83em 0 -.4em,-.377em -.74em 0 -.42em,-.645em -.522em 0 -.44em,-.775em -.297em 0 -.46em,-.82em -.09em 0 -.477em}100%{box-shadow:0 -.83em 0 -.4em,0 -.83em 0 -.42em,0 -.83em 0 -.44em,0 -.83em 0 -.46em,0 -.83em 0 -.477em}}@-webkit-keyframes round{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes round{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}</style>`);
       let thanMore = true;

       const more = () => {
           if (config.loader) { (isWindow ? $body : $elm).append('<div class="' + config.loaderClass + '">'); }
           config.load(config.page).done(() => {
               config.page++;
               setTimeout(() => {
                   thanMore = true;
                   $('.' + config.loaderClass).remove();
                   $elm.scroll();
               }, config.delay);
           });
       }

       $elm.scroll(function() {
           const docHeight = isWindow ? $(document).height() : this.scrollHeight;
           const winInHeight = isWindow ? window.innerHeight : $(this).height();
           const scrollTop = isWindow ? $(window).scrollTop() : $(this).scrollTop();

           const bottom = docHeight - winInHeight <= scrollTop + config.bottom;
           if ((bottom && thanMore) || config.page === 1) {
               thanMore = false;
               more();
           }
       });
       $elm.scroll();
   } 
});
