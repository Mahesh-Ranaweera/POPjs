## POPUPJS

```js
new POPUP.modal({
    width: 600,
    height: 'auto',
    heading: 'Save Data',
    content: 'These are some content to be shown',
    showClose: true,
    bgOpacity: 0.21,
    buttons: [
        {
            text: 'OK',
            class: 'primary',
            callback: '_ok',
        },
        {
            text: 'Cancel',
            class: 'secondary',
            callback: '_cancel'
        },
        {
            text: 'Save',
            class: 'red',
            callback: '_save'
        }
    ]
})
.then(function(res){
    console.log(res);

    if( res == 'closed' ) {
        new POPUP.modal({
            heading: 'Safely Closed',
            content: content
        });
    }
});
```
---

### PARAMS
Parameter | Accepted Type | Accepted Values
--- | --- | ---
width | `string | number` | `'auto', ex: 480`
height | `string | number` | `'auto', ex: 480`
heading | `string` | `Header String`
content | `string` | `Body Content, '<h1>Some Header</h1><p>Body Content</p>'`
showClose | `boolean` | `true: show exit btn, false: hide exit button`
bgOpacity | `number` | `Background opacity from 1 - 0`
buttons | `{ text:string, class:string, callback:string }` | `text:SomeBtn, class:[primary, secondary, danger, warning, green, purple, yellow, blue, gray, red, orange], callback: [string] ex:_ok`

---

### CALLBACKS
```js
buttons: [
    {
        text: 'OK',
        class: 'primary',
        callback: '_ok',
    },
    {
        text: 'Cancel',
        class: 'secondary',
        callback: '_cancel'
    },
    {
        text: 'Save',
        class: 'red',
        callback: '_save'
    }
]
```

```js
...
.then(function(res){
    if( res == '_ok' ) {}

    if( res == '_cancel' ) {}

    if( res == '_save' ) {}
});
```

---

### PREVIEW

![alt text](https://raw.githubusercontent.com/Mahesh-Ranaweera/popup/master/v2/preview/preview_1.png?token=ADNIAK73R7GYZK7YTRKOFBS5J6V6S "Preview 1")