import React, { Component } from 'react';
import Input from '../Input/Input';
import Output from '../Output/Output';


class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      author: '',
      description: '',
      snippetType: 'Expansion',
      sqlInput: '',
      sqlOutput: '',
      variables: [],
      selectedVar: '',
      selectedStart: 0
    }

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleAddVariable = this.handleAddVariable.bind(this);
    this.handleEditVariable = this.handleEditVariable.bind(this);
    this.handleVariableDeleted = this.handleVariableDeleted.bind(this);
    this.handleSendToastMessage = this.handleSendToastMessage.bind(this);
  }

  componentDidMount() {
    this.constructSnippet();
  }

  handleValueChange(name, value) {
    const inputTextArea = document.getElementById("sqlInput");
    const startPos = inputTextArea.selectionStart;
    const endPos = inputTextArea.selectionEnd;
    let isVariableEdit = startPos > this.state.selectedStart && inputTextArea.value[endPos] === '$';

    let newVars = this.state.variables;
    let selectedVar = this.state.selectedVar;
    
    if (isVariableEdit && selectedVar !== '' && newVars.some(x => x.id === this.state.selectedVar)) {
      const newId = inputTextArea.value.substring(this.state.selectedStart + 1, endPos);
      newVars.find(x => x.id === this.state.selectedVar).id = newId;
      selectedVar = newId;
    } else {
      selectedVar = '';
    }

    this.setState({
      [name]: value,
      variables: newVars,
      selectedVar: selectedVar
    }, () => {
      if (isVariableEdit) {
        this.constructSnippet();
      } else {
        this.updateVariables();
      }
    });
  }

  handleAddVariable() {
    const newVar = {
      id: `variable-${this.state.variables.length + 1}`,
      default: 'value',
      order: this.state.variables.length + 1
    };

    const inputTextArea = document.getElementById("sqlInput");

    const inputPos = inputTextArea.selectionStart;
    const currVal = this.state.sqlInput;
    const newVarLabel = `$${newVar.id}$`;

    const newVal = currVal.slice(0, inputPos) + newVarLabel + currVal.slice(inputPos);

    // set selection of new variable
    const testStart = newVal.indexOf(newVar.id);

    this.setState({
      variables: [...this.state.variables, newVar],
      sqlInput: newVal,
      selectedVar: newVar.id,
      selectedStart: testStart - 1
    }, () => {
      this.constructSnippet();
      
      // set selection of new variable
      const startPos = this.state.sqlInput.indexOf(newVar.id);
      const endPos = startPos + newVar.id.length;
  
      inputTextArea.focus();
      inputTextArea.selectionStart = startPos;
      inputTextArea.selectionEnd = endPos;
    });


    this.handleSendToastMessage('New variable added');
  }

  handleEditVariable(id, propChanged, value) {
    let newVars = this.state.variables;
    let sqlInput = this.state.sqlInput;

    newVars.forEach(v => {
      if (v.id === id) {
        v[propChanged] = value;

        if (propChanged === "id") {
          sqlInput = sqlInput.split(`$${id}$`).join(`$${value}$`);
        }
      }
    });

    this.setState({
      variables: newVars,
      sqlInput: sqlInput
    }, () => {
      this.constructSnippet();
    })
  }

  handleVariableDeleted(id) {
    this.setState({
      variables: this.state.variables.filter(x => x.id !== id),
      sqlInput: this.state.sqlInput.split(`$${id}$`).join('')
    }, () => {
      this.constructSnippet();
    })

    this.handleSendToastMessage(`Variable "${id}" deleted`);
  }

  handleSendToastMessage(message) {
    this.props.onToastMessageUpdate(message);
  }

  updateVariables() {
    // check if variables still exist in sqlInput
    let newVars = this.state.variables;
    this.state.variables.forEach((v, ix) => {
      if (this.state.sqlInput.indexOf(v.id) === -1) {
        newVars.splice(ix, 1)
      }
    });

    this.setState({
      variables: newVars
    }, () => {
      this.constructSnippet();
    });
  }

  constructSnippet() {
    const title = this.state.title;
    const author = this.state.author;
    const description = this.state.description;
    const snippetType = this.state.snippetType;
    const sqlInput = this.state.sqlInput;
    const variableSnippet = this.constructVariables();

    this.setState({ sqlOutput: 
      `<?xml version="1.0" encoding="utf-8"?>
<CodeSnippets>
  <CodeSnippet Format="1.0.0">
    <Header>
      <Title>${title}</Title>
      <Shortcut />
      <Description>${description}</Description>
      <Author>${author}</Author>
      <SnippetTypes>
        <SnippetType>${snippetType}</SnippetType>
      </SnippetTypes>
    </Header>
    <Snippet>
    <Declarations>${variableSnippet}
    </Declarations>
    <Code Language="sql"><![CDATA[

${sqlInput}

]]></Code>
    </Snippet>
  </CodeSnippet>
</CodeSnippets>`
    });
  }

  constructVariables() {
    let variableSnippet = '';

    this.state.variables.forEach(v => {
      variableSnippet += `
      <Literal>
        <ID>${v.id}</ID>
        <ToolTip />
        <Default>${v.default}</Default>
      </Literal>`
    });

    return variableSnippet;
  }

  render() {
    return (
      <div className="main">

            <Input 
              title={this.state.title}
              author={this.state.author}
              description={this.state.description}
              snippetType={this.state.snippetType}
              sqlInput={this.state.sqlInput}
              variables={this.state.variables}
              onValueChanged={this.handleValueChange}
              onVariableAdded={this.handleAddVariable}
              onSendToastMessage={this.handleSendToastMessage}
            />
            <Output 
              sqlOutput={this.state.sqlOutput}
              variables={this.state.variables}
              title={this.state.title}
              onValueChanged={this.handleValueChange}
              onVariableEdited={this.handleEditVariable}
              onVariableDeleted={this.handleVariableDeleted}
              onSendToastMessage={this.handleSendToastMessage}
            />
            
      </div>
    );
  }

} 

export default Main;
