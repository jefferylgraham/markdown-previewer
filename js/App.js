marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
};

const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...

There's also [links](https://www.freecodecamp.com)

> Block Quotes!

Inline \`code\` has \`back-ticks around\` it.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == "\`\`\`" && lastLine == "\`\`\`") {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

![React Logo w/ Text](https://goo.gl/Umyytc)`;

const Header = props => {
  return <header>{props.children}</header>;
};

const Button = props => {
  return <button onClick={props.onClick}>{props.children}</button>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorActive: false,
      previewActive: false,
      editorInput: defaultText
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({
      editorInput: event.target.value
    });
  }

  handleClick(divName) {
    if (divName === "editor-component") {
      this.setState({
        editorActive: !this.state.editorActive
      });
    } else {
      this.setState({
        previewActive: !this.state.previewActive
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          {this.state.previewActive ? null : (
            <div
              id="editor-component"
              className={this.state.editorActive ? "col-12" : "col-7"}
            >
              <Header>
                Editor
                <Button onClick={() => this.handleClick("editor-component")}>
                  <i
                    className={
                      this.state.editorActive
                        ? "fa fa-window-minimize"
                        : "fa fa-window-maximize"
                    }
                  />
                </Button>
              </Header>
              <textarea
                id="editor"
                value={this.state.editorInput}
                onChange={this.handleChange}
              />
            </div>
          )}
        </div>
        <div className="row justify-content-center">
          {this.state.editorActive ? null : (
            <div
              id="preview-component"
              className={this.state.previewActive ? "col-12" : "col-9"}
            >
              <Header>
                Preview
                <Button onClick={() => this.handleClick("preview-component")}>
                  <i
                    className={
                      this.state.previewActive
                        ? "fa fa-window-minimize"
                        : "fa fa-window-maximize"
                    }
                  />
                </Button>
              </Header>
              <div
                id="preview"
                dangerouslySetInnerHTML={{
                  __html: marked(this.state.editorInput, { renderer })
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
