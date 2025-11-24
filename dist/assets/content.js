const i="__ext_highlight_style",s=()=>{if(document.getElementById(i))return;const e=document.createElement("style");e.id=i,e.textContent=`
    .ext-highlight {
      background: rgba(34, 211, 238, 0.35);
      box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.7);
      border-radius: 4px;
      padding: 0 2px;
      transition: box-shadow 160ms ease, background 160ms ease;
    }
    .ext-highlight:hover {
      box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.9);
      background: rgba(34, 211, 238, 0.45);
    }
  `,document.head.appendChild(e)},a=()=>{const e=window.getSelection();if(!e||e.rangeCount===0)return{ok:!1,message:"未选中文字"};const r=e.toString().trim();if(!r)return{ok:!1,message:"未选中文字"};const t=e.getRangeAt(0),n=document.createElement("span");n.className="ext-highlight";try{const o=t.extractContents();return n.appendChild(o),t.insertNode(n),e.removeAllRanges(),{ok:!0,message:`已高亮：${r.slice(0,40)}`}}catch(o){return{ok:!1,message:`无法高亮：${o.message}`}}};chrome.runtime.sendMessage({type:"CONTENT_READY"});chrome.runtime.onMessage.addListener((e,r,t)=>{if((e==null?void 0:e.type)==="PING_FROM_POPUP"){t({message:"content script 已收到 Ping"});return}if((e==null?void 0:e.type)==="HIGHLIGHT_SELECTION"){s();const n=a();t(n);return}});
//# sourceMappingURL=content.js.map
