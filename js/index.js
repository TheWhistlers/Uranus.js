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

    const data = {
      frame: 'uranus.js'
    }

    const counterElement = document.getElementById('counter-content');
    const counterAttrValue = counterElement.getAttribute('u-text'); 

    const observe = (target, key, callBack) => {
      let value = target[key];
      Object.defineProperty(target, key, 
      {
        get: () => {
          return value;
        },
        set: (newValue) => {
          if (newValue !== value) {
            value = newValue;
            callBack(value, newValue);
          }
        }
      });
    };

    observe(data, counterAttrValue, 
      (value, newValue) => {
        counterElement.textContent = newValue.toString();
      }
    );

    var UranusParser = class {
      static parse (element) {
          if (UranusTextElement.isElement(element)) throw new Error('Cannot solve uranus-text-element.');
        
          if (element.hasAttribute('u-data') && element.hasAttribute('u-data-type')) {
            var value = element.getAttribute('u-data');
            var type = element.getAttribute('u-data-type');
            if (type === 'number')data[value.toString()] = 0;
          }

          for (let i = 0; i < element.children.length; i++) {
            this.parse(element.children[i]);
          }
      }
    }

    UranusRenderer.render(
      new UranusElement(Symbol('div'), 
      { style: 'padding-bottom: 12px;' }, 
        [new UranusElement(Symbol('a'),
          {
            style: 'color: darkblue; text-decoration: none; font-size: 30px',
            href: 'https://github.com/TheWhistlers/Uranus.js'
          }, 
        [new UranusTextElement('Uranus.js')])]
      ), document.getElementById('app'));


    document.querySelectorAll('*[u-text]').forEach((element) => {
        const value = element.getAttribute('u-text');
        var formatter = element.textContent;
        const regex = /\{[^\)]+\}/g;

        formatter = (formatter.match(regex))[0];
        
        UranusParser.parse(element);
        element.textContent = element.textContent.replace(formatter, data[value.toString()]);
    });
    
    document.getElementById('counter-add').onclick = () => {
      data[counterAttrValue]++; 
      setColor();
    }

    document.getElementById('counter-sub').onclick = () => {
      data[counterAttrValue]--; 
      setColor();
    }

    document.body.onkeydown = (event) => {
      if (event.key === '+') document.getElementById('counter-add').onclick.call();
      if (event.key === '-') document.getElementById('counter-sub').onclick.call();
    }

    
    const setColor = () => {
      counterElement.style.color = counterElement.textContent < 50 ? 'red' : 'green';
      console.log(data[counterAttrValue]);
    };


})();