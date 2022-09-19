import Mercury from '@postlight/mercury-parser';


let container = document.createElement('div');
container.style.position = 'absolute';
container.style.left = 0;
container.style.top = 0;
container.style.zIndex = 999999999;
container.style.backgroundColor = 'orange';

document.body.appendChild(container);
Mercury.parse().then((r) => (container.innerHTML = r.content));
