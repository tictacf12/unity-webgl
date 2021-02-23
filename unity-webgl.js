

class UnityWebGL extends HTMLElement {


    static get tag() {
        return "unity-webgl";
    }

    constructor() {
        super();
        this.template = document.createElement("template");
        this.attachShadow({ mode: "open" });
        this.render();
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                this.target = this.getAttribute('target');
                this.compression = this.getAttribute('compression');
                this.streaming_url = this.getAttribute('streaming_url');
                this.company_name = this.getAttribute('company_name');
                this.product_name = this.getAttribute('product_name');
                this.product_version = this.getAttribute('product_version');
                this.width = this.getAttribute('width');
                this.height = this.getAttribute('height');
                this.background = this.getAttribute('background');
            });
        });
        this.observer.observe(this, {
            characterData: true,
            attributes: false,
            childList: false,
            subtree: true,
        });
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
        this.target = this.getAttribute('target');
        this.compression = this.getAttribute('compression');
        this.streaming_url = this.getAttribute('streaming_url');
        this.company_name = this.getAttribute('company_name');
        this.product_name = this.getAttribute('product_name');
        this.product_version = this.getAttribute('product_version');
        this.width = this.getAttribute('width');
        this.height = this.getAttribute('height');
        this.background = this.getAttribute('background');
    }

    render() {
        this.shadowRoot.innerHTML = null;
        this.template.innerHTML = this.html;

        if (window.ShadyCSS) {
            window.ShadyCSS.prepareTemplate(this.template, this.tag);
        }
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        var script = document.createElement('script');
        const parent = this;
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
            alert("Error loading " + this.src); // Error loading https://example.com/404.js
        };
        
    }

    static get observedAttributes() {
        return ["target", "compression",
            "streaming_url", "company_name", "product_name", "product_version",
            "width", "height", "background"];
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

    attributeChangedCallback(attr, oldValue, newValue) {
        if (newValue && oldValue != newValue) {
            this["is_" + attr + "_set"] = true;
            if(this.isReadyToRender()){
                this.render();
            }
            
        }
    }

    isReadyToRender() {
        return this.is_target_set && this.is_compression_set && this.is_streaming_url_set
            && this.is_company_name_set && this.is_product_name_set && this.is_product_version_set
            && this.is_width_set && this.is_height_set && this.is_background_set;
    }
}

customElements.define(UnityWebGL.tag, UnityWebGL);
export { UnityWebGL };