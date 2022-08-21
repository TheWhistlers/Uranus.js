interface IElement {
    type: symbol,
    props: object,
    children: UranusElement[];
}

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
    static render (element: any, parent: any) {
        if (!UranusElement.isElement(element)) throw new Error('Cannot solve current type');
        
        const { type, props, children }: any = element; 
        
        const dom: any = UranusTextElement.isElement(element) ? document.createTextNode(props.Text) : document.createElement(type.description); 
        for (let key in props) dom[key] = props[key];
        for (let child of children) UranusRenderer.render(child, dom);
        
        parent.appendChild(dom);

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