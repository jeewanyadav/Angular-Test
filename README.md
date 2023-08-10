# **Angular Interview Test**

##### **First Task: **Code Review and Issue Fix****

The existing code has some issues that are causing unexpected behavior in the application. Additionally, the code does not adhere to industry standards. Please review the code, identify the problems, and provide fixes along with a code update.

##### **Second Task: Add Missing Features**

* Allow to add new song
  * Use Reactive Form to take the user input
    * Name - string input
    * List - String value with comma sepreated (While saving, save it in the form of array)
    * Type - Select (option: pop, rock and metal)
  * Display form in new route
  * Preserve the unsaved data in the form(if any) if user accidentally refresh the page or close th browser
  * Before showing the form, ask user to prefill the previously unsaved values in the form(if exist)
  * Perform validation for (Name, Type, and Singer List) whlile submitting the form
    * Highlight the Error field with red color
  * Adding new song should navigate back to the song list page and reset unsaved changes(if exist)
* Allow to update the song (Item should be reflected in the form) No need to preserve the unsaved changes in this case
