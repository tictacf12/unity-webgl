

class UnityWebGL extends HTMLElement {

    static get tag() {
        return "unity-webgl";
    }

    constructor() {
        super();
        this.target = this.getAttribute('target');
        this.compression = this.getAttribute('compression');
        this.streaming_url = this.getAttribute('streaming_url');
        this.company_name = this.getAttribute('company_name');
        this.product_name = this.getAttribute('product_name');
        this.product_version = this.getAttribute('product_version');
        this.width = this.getAttribute('width');
        this.height = this.getAttribute('height');
        this.background = this.getAttribute('background');
        this.template = document.createElement("template");
        this.attachShadow({ mode: "open" });
    }

    get html() {
        return `
    <canvas style="width: ${this.width}; height: ${this.height}; background: ${this.background}"></canvas>
    `;
    }

    connectedCallback() {
        if (window.ShadyCSS) {
            window.ShadyCSS.styleElement(this);
        }
    }

    render() {
        this.shadowRoot.innerHTML = null;
        this.template.innerHTML = this.html;

        if (window.ShadyCSS) {
            window.ShadyCSS.prepareTemplate(this.template, this.tag);
        }
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        var script = document.createElement('script');
        var parent = this;
        script.onload = function () {
            //do stuff with the script
            createUnityInstance(parent.shadowRoot.querySelector("canvas"), {
                dataUrl: parent.target + ".data." + parent.compression,
                frameworkUrl: parent.target + ".framework.js." + parent.compression,
                codeUrl: parent.target + ".wasm." + parent.compression,
                streamingAssetsUrl: parent.streaming_url,
                company_name: parent.company_name,
                product_name: parent.product_name,
                product_version: parent.product_version,
            });
        };
        script.src = this.target + ".loader.js";
        this.shadowRoot.appendChild(script);
        script.onerror = function () {
            console.log("Error loading " + this.src);
        };
    }

    static get observedAttributes() {
        return ["target", "compression",
            "streaming_url", "company_name", "product_name", "product_version",
            "width", "height", "background"];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (this.shadowRoot && newValue && oldValue != newValue) {
            clearTimeout(this._debounce);
            var parent = this;
            this._debounce = setTimeout(function() {
                parent.render();                
            }, 0);
        }
    }

    set target(val) {
        this.setAttribute("target", val);
    }
    set compression(val) {
        this.setAttribute("compression", val);
    }
    set streaming_url(val) {
        this.setAttribute("streaming_url", val);
    }
    set company_name(val) {
        this.setAttribute("company_name", val);
    }
    set product_name(val) {
        this.setAttribute("product_name", val);
    }
    set product_version(val) {
        this.setAttribute("product_version", val);
    }
    set width(val) {
        this.setAttribute("width", val);
    }
    set height(val) {
        this.setAttribute("height", val);
    }
    set background(val) {
        this.setAttribute("background", val);
    }

    get target() {
        return this.getAttribute("target");
    }
    get compression() {
        return this.getAttribute("compression");
    }
    get streaming_url() {
        return this.getAttribute("streaming_url");
    }
    get company_name() {
        return this.getAttribute("company_name");
    }
    get product_name() {
        return this.getAttribute("product_name");
    }
    get product_version() {
        return this.getAttribute("product_version");
    }
    get width() {
        return this.getAttribute("width");
    }
    get height() {
        return this.getAttribute("height");
    }
    get background() {
        return this.getAttribute("background");
    }

    static get haxProperties() {
        return {
            canScale: false,
            canPosition: true,
            canEditSource: true,
            gizmo: {
                title: "Unity Player",
                description: "Unity WebGL Player",
                icon: "av:play-circle-filled",
                color: "purple",
                groups: [],
                handles: [],
                meta: {
                    author: "Brainmedia",
                },
            },
            settings: {
                configure: [
                    {
                        property: "target",
                        title: "Target",
                        description: "Target game path",
                        inputMethod: "textfield",
                    },
                    {
                        property: "compression",
                        title: "Compression method",
                        description: "Game's files extention",
                        inputMethod: "textfield",
                    },
                    {
                        property: "streaming_url",
                        title: "Streaming url",
                        description: "Streaming assets url",
                        inputMethod: "textfield",
                    },
                    {
                        property: "company_name",
                        title: "Company Name",
                        description: "Company Name",
                        inputMethod: "textfield",
                    },
                    {
                        property: "product_name",
                        title: "Product Name",
                        description: "Game title",
                        inputMethod: "textfield",
                    },
                    {
                        property: "product_version",
                        title: "Product Version",
                        description: "Release Version",
                        inputMethod: "textfield",
                    },
                    {
                        property: "width",
                        title: "Canvas Width",
                        description: "Canvas CSS Width (with px/em/etc.)",
                        inputMethod: "textfield",
                    },
                    {
                        property: "height",
                        title: "Canvas Height",
                        description: "Canvas CSS Height (with px/em/etc.)",
                        inputMethod: "textfield",
                    },
                    {
                        property: "background",
                        title: "Canvas Background",
                        description: "Canvas CSS Background",
                        inputMethod: "textfield",
                    },
                ],
                advanced: [],
            },
            saveOptions: {
                unsetAttributes: [],
            },
            demoSchema: [
                {
                  tag: "unity-webgl",
                  content: "",
                  properties: {
                    target: "demo/Build/build web",
                    compression: "unityweb",
                    streaming_url: "StreamingAssets",
                    company_name: "DefaultCompany",
                    product_name: "test webgl",
                    product_version: "0.1",
                    width: "460px",
                    height: "400px",
                    background: "#231F20",
                  },
                },
              ],
        };
    }
}

customElements.define(UnityWebGL.tag, UnityWebGL);
export { UnityWebGL };