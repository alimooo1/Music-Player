export class TimeLine extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          .time-line {
            height: 45%;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            border: 1px rgb(140, 255, 111) solid;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
          
          .time-line:hover {
            cursor: pointer;
          }
          
          .time-line .filler {
            background-color: rgb(140, 255, 111);
            width: 100%;
            height: 100%;
            position: absolute;
            left: -100%;
            transition: all 0.25s;
          }
        </style>
  
        <div class="time-line">
          <div class="filler"></div>
        </div>
      `;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
