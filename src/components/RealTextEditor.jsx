import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

/* 
Plugins:

advlist: Provides advanced list formatting options such as nested lists.
autolink: Automatically converts URLs entered into the editor into clickable links.
lists: Enables bulleted and numbered lists.
link: Allows inserting and editing hyperlinks.
image: Enables inserting and managing images.
charmap: Provides a character map for inserting special characters.
print: Adds a button to print the content of the editor.
preview: Allows previewing the content before saving.
anchor: Enables inserting and managing anchors within the content.
searchreplace: Provides search and replace functionality within the editor.
visualblocks: Highlights the visual blocks of content within the editor.
code: Allows inserting and editing code snippets.
fullscreen: Enables entering fullscreen mode for the editor.
insertdatetime: Allows inserting date and time into the content.
media: Enables inserting and managing media files such as videos and audio.
table: Provides tools for creating and managing tables.
paste: Controls the behavior of pasting content into the editor.
code: Provides syntax highlighting and code editing capabilities.
help: Adds a button to access help documentation.
These plugins enhance the functionality of the editor by providing various features for formatting, inserting content, managing media, and more.

Toolbar:

undo: Allows undoing the last action.
redo: Allows redoing the last undone action.
formatselect: Provides a dropdown to select different text formats.
bold: Applies bold formatting to the selected text.
italic: Applies italic formatting to the selected text.
backcolor: Allows changing the background color of the selected text.
alignLeft, aligncenter, alignright, alignjustify: Controls text alignment options.
bullist: Inserts a bulleted list.
numlist: Inserts a numbered list.
outdent: Decreases the indentation level of the selected text.
indent: Increases the indentation level of the selected text.
removeFormat: Removes formatting from the selected text.
help: Provides access to help documentation.
*/

const RealTextEditor = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue="Type your blog here.."
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount",
              ],
              toolbar: `undo redo | formatselect | bold italic 
                        backcolor | 
                        alignLeft aligncenter alignright alignjustify | 
                        bullist numlist outdent indent | removeFormat | help`,
               content_style: "body {font-family: Poppins,sans-serif; font-size: 14px}"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RealTextEditor;
