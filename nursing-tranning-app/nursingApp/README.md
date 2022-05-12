# Nursing App Generated using Ionic Framework

## How to Add a New Page:
1.  Add new `NewPage.tsx` in `/src/pages/`.
2.  Create new Folder in `/src/components`, if you have page specific components. And put your corresponding components there.
3.  Add new route at `/src/app.tsx/`

    ```HTML
    <Route path="/newPage" exact={true} component={NewPage} />
    ```
4.  Add new menu item in `/src/components/Menu.tsx` if necessary.

    ```javascript
    {
    title: 'New Page',
    url: '/NewPage',
    iosIcon: ionicicon,
    mdIcon: ionicicon
    }

    ```
---
## How to Build iOS version:
1.  TODO

## Placeholder Image
"https://picsum.photos/300"
