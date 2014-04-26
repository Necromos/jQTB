#jQTB - jQuery Tournament Brackets

Simple yet good plugin for jQuery to setup your own tournament brackets.

##Current version
```
v 0.0.1 alpha
```

##Usage
1. Inlude jQTB js file to your site.
2. Get container for brackets (ie. ```$('#test')```) and call bracket function on it ```$('#test').bracket()```. All done!
	2.1. To change data pass it to the ```.bracket()``` function by object.
	2.2. Or change it by ```$.fn.bracket.default.data = myData;``` in your code.

##Data
Currently plugin is using data in this pattern:

```javascript
data: {
        teams: ['teamA','teamB','teamC','teamD'],
        results: [ [{teamName: 'teamA', points: 2},{teamName: 'teamB', points: 3}], [{teamName: 'teamC', points: 5},{teamName: 'teamD', points: 2}], [{teamName: 'teamB', points: 3},{teamName: 'teamC', points: 2}], [{teamName: 'teamB'}]]
    }
```

##ToDo
1. css for all elements
2. modify brackets layout
3. more data schemes
4. ...

Licensed under [GNU GPL Version 3 license](http://www.gnu.org/licenses/gpl-3.0.txt)

Copyright (c) 2014 Przemysław Królik
