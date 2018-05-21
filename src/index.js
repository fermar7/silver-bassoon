import { parseHtml } from './html_parser';

window.onload = function() {
    var components = [
        { selector: 'app-root', render: AppRootComponent, bootstrap: true },
        { selector: 'hello-world', render: HelloWorldComponent }
    ];

    let appRootComponent = getBootstrapComponent(components);
    let html = appRootComponent.render();
    console.log('HTML: ');
    parseHtml(html);

    let appRoot = document.querySelector(appRootComponent.selector);
    appRoot.innerHTML = appRootComponent.render();
}

function getBootstrapComponent(components) {
    for (const iterator of components) {
        if (iterator.bootstrap) {
            return iterator;
        }
    }
}

function AppRootComponent() {
    return `
        <div>
            <h1>App Component</h1>
            <hello-world></hello-world>
            <input />
        </div>
    `;
}

function HelloWorldComponent() {
    return `
        <h3>Hello, world!</h3>
    `;
}