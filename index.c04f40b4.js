!function(){function e(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var r={};function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t,r){t&&n(e.prototype,t);r&&n(e,r);return e};var a=function(){"use strict";function n(){e(t)(this,n),this.searchQuery="",this.page=1}return e(r)(n,[{key:"fetchImages",value:function(){var e=this,t="https://pixabay.com/api/?key=33776129-06b0afe52f3ec0e98d1b43427&q=".concat(this.searchQuery,"&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=").concat(this.page);return fetch(t).then((function(e){return e.json()})).then((function(t){var r=t.hits;console.log(r),e.page+=1}))}},{key:"resetPage",value:function(){this.page=1}}]),n}(),o={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),searchBtn:document.querySelector("button"),loadMoreBtn:document.querySelector(".load-more")},c=new a;o.searchForm.addEventListener("submit",(function(e){if(e.preventDefault(),c.searchQuery=e.currentTarget.elements.searchQuery.value.trim(),""===c.searchQuery)return;o.searchForm.reset(),c.resetPage(),c.fetchImages()})),o.loadMoreBtn.addEventListener("click",(function(){c.fetchImages()}))}();
//# sourceMappingURL=index.c04f40b4.js.map
