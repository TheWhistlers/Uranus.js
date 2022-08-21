
(() => {
    // src/uranus/index.tsx
    var UranusElement = class {
      constructor(type = Symbol(""), props = {}, children = []) {
        this.type = type;
        this.props = {};
        this.children = [];
        for (let prop in props)
          this.props[prop] = props[prop];
        for (let child in children)
          this.children[child] = children[child];
        this.children = children.map((child) => {
          return UranusElement.isElement(child) ? child : new UranusTextElement(child.toString());
        });
      }
      static isElement(target) {
        return target instanceof this;
      }
    };
    var _UranusTextElement = class extends UranusElement {
      constructor(text) {
        super(_UranusTextElement.Type, { Text: text }, []);
      }
    };
    var UranusTextElement = _UranusTextElement;
    UranusTextElement.Type = Symbol("text_element");
    var UranusRenderer = class {
      static render(element, parent) {
        if (!UranusElement.isElement(element))
          throw new Error("Cannot solve current type");
        const { type, props, children } = element;
        const dom = UranusTextElement.isElement(element) ? document.createTextNode(props.Text) : document.createElement(type.description);
        for (let key in props)
          dom[key] = props[key];
        for (let child of children)
          UranusRenderer.render(child, dom);
        parent.appendChild(dom);
      }
    };
    UranusRenderer.render(
      new UranusElement(Symbol('div'), 
      { style: 'padding-bottom: 12px;' }, 
        [new UranusElement(Symbol('a'),
          {
            style: 'color: darkblue; text-decoration: none; font-size: 30px',
            href: 'https://www.bing.com'
          }, 
        [new UranusTextElement('Uranus.js')])]
      ), 
      document.getElementById('app'));
    var counter = 0;
    var init = () => {
        return {
            count: counter 
        } 
    }
    const doms = document.querySelectorAll('*[u-data]')
    doms.forEach((element, key) => {
        const value = element.getAttribute('u-data');
        var formatter = element.textContent;
        const regex = /\{[^\)]+\}/g;
        formatter = (formatter.match(regex))[0];
        // formatName = formatName.substring(1,formatName.length-1);
        // formatName = formatName.replace(' ', '');
        element.textContent = element.textContent.replace(formatter, init()[value.toString()]);
    });
    const counterText = document.getElementById('counter-content');
    const vCounter = init()[counterText.getAttribute('u-data').toString()];
    document.getElementById('counter-add').onclick = () => {
      counterText.textContent++; 
      setColor();
      console.log(vCounter);
    }

    document.getElementById('counter-sub').onclick = () => {
      counterText.textContent--; 
      setColor();
      console.log(vCounter);
    }
    const setColor = () => {
      counterText.style.color = counterText.textContent < 50 ? 'red' : 'green';
    };
    
    console.log(doms);
})();