<br/>
<p align="center">
  <h3 align="center">SQL Snippet Generator</h3>

  <p align="center">
    Create reusable SSMS SQL snippets efficiently!
    <br/>
    <br/>
    <a href="https://github.com/mathewedds/sql-snippet-generator">View App</a>
  </p>
</p>



## About The Project

![Screen Shot](https://i.imgur.com/AgrCOXO.png)

This React app helps generate T-SQL snippets for SQL Server Management Studio (SSMS) complete with metadata (title, author, description and snippet type) and variables.

## Built With

- React.js
- React Bootstrap
- Font Awesome

## Snippet Metadata
- <b>Title:</b> the title of your snippet, used as a file name on save
- <b>Author:</b> author of the snippet
- <b>Description:</b> brief description on snipptet functionality
- <b>Snippet Type:</b> defined snippet types either "SurroundsWith" or "Expansion" (<a href="https://learn.microsoft.com/en-us/sql/ssms/scripting/transact-sql-code-snippets?view=sql-server-ver16">see more</a>)

## Variables

### Creating a variable
There are 2 ways to create a variable. The first is simply clicking the "Add Variable" button where a variable will be added at the cursor.

![](https://i.imgur.com/OaEi4OR.gif)

The second way is by highlighting a portion of text within the input field that is a snippet identifier (i.e: begins and ends with '$') then pressing the "Add Variable" button.

![](https://i.imgur.com/XdCBG8r.gif)

Immediately after creating a variable, the variable will automatically be highlighted within the input field. Here, you can rename the variable and it will reflect in the generated snippet

### Editing a variable
To edit a variable, click on the "Edit Variables" button where a modal will appear.

You will see a list of the variables you've created and their default values. The variables within the table are inline editable, so you can click on the fields then update the values. Any change made within here is automatically reflected in the T-SQL input and the generated snippet code.

![Screen Shot](https://i.imgur.com/pGPGLTE.png)

### Using a variable
Once a variable has been created via the methods above, you are free to reference the variable throughout you T-SQL. If there are no references to your variable in the T-SQL input, it is automatically removed.

## Exporting Snippet
There are 2 ways that you can export a snippet.

First of which is copying the snippet code for use elsewhere and the second method is using the "Save Snippet" button to download as a .snippet file. If you have created a title, that will be used as the file name.
