interface IElement {
    type: symbol,
    props: object,
    children: UranusElement[];
}

var data = {
    frame: 'uranus.js'
};

const observe = (target: object, key: string, 
    callBack: (value: object, newValue: object) => void) => {
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

class UranusComponent {

}

class App extends UranusComponent {
    
}

class UranusElement implements IElement{
    type: symbol;
    props: object;
    children: UranusElement[];

    constructor (type: symbol = Symbol(''),
     props: object = {}, children: UranusElement[] = []) {
        this.type = type;
        this.props = {};
        this.children = [];

        for (let prop in props) this.props[prop] = props[prop];
        for (let child in children) this.children[child] = children[child];

        this.children = children.map((child) => {
            return UranusElement.isElement(child) ? child : new UranusTextElement(child.toString());
        });
    }

    static isElement (target: object): boolean {
        return (target instanceof this);
    }
    
}

class UranusTextElement extends UranusElement {
    static Type: symbol = Symbol('text_element');
    constructor (text: string) {
        super(UranusTextElement.Type, { Text: text }, []);
    }
}

class UranusRenderer {
    static render (element: any, parent: any): void {
        if (!UranusElement.isElement(element)) throw new Error('Cannot solve current type');
        
        const { type, props, children }: any = element; 
        
        const dom: any = UranusTextElement.isElement(element) ? document.createTextNode(props.Text) : document.createElement(type.description); 
        for (let key in props) dom[key] = props[key];
        for (let child of children) UranusRenderer.render(child, dom);
        
        parent.appendChild(dom);

    }
}

class UranusParser {
    static parse (element: any): void {
        if (UranusTextElement.isElement(element)) throw new Error('Cannot solve uranus-text-element.');
      
        if (element.hasAttribute('u-data') && element.hasAttribute('u-data-type')) {
          var value: any = element.getAttribute('u-data');
          var type: any = element.getAttribute('u-data-type');
          if (type === 'number') data[value] = 0;
          if (type === 'string') data[value] = '';
          if (type === 'string') data[value] = {};
          if (type === 'array') data[value] = [];
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
          href: 'https://www.bing.com'
        }, 
      [new UranusTextElement('Uranus.js')])]), 
    document.getElementById('app')
);

const setup: (argument: any) => void = (argument) => {
    document.querySelectorAll('*[u-text]').forEach((element) => {
        var value: any= '';
        var formatter: any = '';

        if (element.getAttribute('u-text') !== null && element.textContent !== null && element.textContent !== null) {
            value = element.getAttribute('u-text');
            formatter = element.textContent;
            const regex = /\{[^\)]+\}/g;

            if (formatter.match(regex) !== null) formatter = formatter.match(regex)[0];
                
            UranusParser.parse(element);
            element.textContent = element.textContent.replace(formatter, data[value.toString()]);
        }
    });
};